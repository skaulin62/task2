import classes from "./Comment.module.sass";

import Button from "@shared/UI/Button";
import { Comment } from "@app/types";
import { FC, useEffect, useRef, useState } from "react";
import { useAppDispatch } from "@/app/store";
import { useSelector } from "react-redux";
import { selectSelectedCard } from "@/entities/Cards";
import { ActionCards } from "@/entities/Cards";

interface Props {
  comment: Comment;
}

const CommentItem: FC<Props> = ({ comment }) => {
  const dispatch = useAppDispatch();

  const selectedCard = useSelector(selectSelectedCard);

  const [isEditingComment, setIsEditingComment] = useState<boolean>(false);
  const [text, setText] = useState<string>(comment.content);
  const inputComment = useRef<HTMLDivElement | null>(null);

  const onClickConfirmDelete = () => {
    const isConfirmed: boolean = confirm(
      "Do you really want to remove this comment?"
    );
    if (isConfirmed) {
      dispatch(
        ActionCards.deleteCarsItemComment({ selectCard: selectedCard, comment })
      );
    }
  };

  const onClickSaveComment = () => {
    if (text) {
      dispatch(
        ActionCards.changeCardsItemComment({
          selectCard: selectedCard,
          comment: { ...comment, content: text },
        })
      );
      setIsEditingComment(false);
    } else {
      setIsEditingComment(false);
      setText(comment.content);
    }
  };

  useEffect(() => {
    const onClickBeyondElem = (e: MouseEvent) => {
      if (
        inputComment.current &&
        !e.composedPath().includes(inputComment.current)
      ) {
        setIsEditingComment(false);
        setText(comment.content);
      }
    };
    document.addEventListener("click", onClickBeyondElem);

    return () => {
      document.removeEventListener("click", onClickBeyondElem);
    };
  }, []);

  return (
    <div ref={inputComment} className={classes.comment}>
      <div className={classes.userIcon}>
        <img src="https://trello-members.s3.amazonaws.com/65b89f439f456aba16f40989/3b4ea385fc3f4513edce3dad4a12061a/170.png" />
      </div>
      <div className={classes.mainBlock}>
        <span className={classes.userName}>{comment.author}</span>

        {isEditingComment ? (
          <textarea
            className={classes.commentText}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        ) : (
          <span className={classes.text}>{text}</span>
        )}

        <div className={classes.actions}>
          {!isEditingComment ? (
            <>
              <Button onClick={() => setIsEditingComment(true)}>Edit</Button>
              <Button onClick={() => onClickConfirmDelete()}>Remove</Button>
            </>
          ) : (
            <>
              <Button onClick={() => onClickSaveComment()}>Save</Button>
              <Button onClick={() => setIsEditingComment(false)}>Cancel</Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
