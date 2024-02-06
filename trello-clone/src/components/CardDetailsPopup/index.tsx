import { useEffect, useRef, useState } from "react";
import classes from "./CardDetailsPopup.module.sass";
import { Cards, Comment, SelectCard } from "../../types/types";
import IconCloseButton from "../UI/IconCloseButton";
import Input from "../UI/Input";
import Button from "../UI/Button";
import CommentItem from "../Comment";
import { useTrelloContext } from "../../context/context";
import { fakeID } from "../../utils";

const CardDetailsPopup = () => {
  const { selectedCard: selectCard } = useTrelloContext();
  const { item, columnId } = selectCard;
  const {
    setSelectedCard,
    deleteCardsItem,
    cards,
    renameCardsItem,
    changeDescrCardsItem,
    addCardsItemComment,
  } = useTrelloContext();

  const [descr, setDescr] = useState<string>(item.descr);
  const [name, setName] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>(item.name);
  const [comment, setComment] = useState<string>("");

  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const fieldNameRef = useRef<HTMLInputElement | null>(null);
  const inputNameRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const keyBoardHandler = (e: KeyboardEventInit) => {
      if (e.key === "Escape") {
        setSelectedCard({} as SelectCard);
      }
    };
    document.addEventListener("keydown", keyBoardHandler, true);
    return () => document.removeEventListener("keydown", keyBoardHandler, true);
  }, []);

  useEffect(() => {
    const clickOutInputCol = (e: MouseEvent) => {
      if (
        inputNameRef.current &&
        !e.composedPath().includes(inputNameRef.current)
      ) {
        setIsEditingName(false);
        setName("");
      }
    };
    document.addEventListener("click", clickOutInputCol);
    return () => {
      document.removeEventListener("click", clickOutInputCol);
    };
  }, []);

  const onClickDeleteCard = () => {
    const isConfirmed = confirm("Do you really want to remove this card?");
    if (isConfirmed) {
      deleteCardsItem(selectCard);
      setSelectedCard({} as SelectCard);
    }
  };

  const handleChangeNewName = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (
        renameCardsItem({
          item: {
            ...item,
            name,
          },
          columnId: selectCard.columnId,
        })
      ) {
        setDisplayName(name);

        setName("");
      }
      setIsEditingName(false);
    }
  };

  const cardsOne: Cards =
    cards.find((card: Cards) => card.id === columnId) || ({} as Cards);

  return (
    <div className={classes.overlay}>
      <div className={classes.cardDetail}>
        <div className={classes.closeBlock}>
          <IconCloseButton onClick={() => setSelectedCard({} as SelectCard)} />
        </div>
        <span className={classes.colInfo}>
          Column: {cardsOne.title} &nbsp; | &nbsp; Author: {item.author}
        </span>

        <div ref={inputNameRef} className={classes.title}>
          <div style={{ width: "400px" }}>
            <h3
              onClick={() => {
                setIsEditingName(true);
                setTimeout(() => fieldNameRef.current?.focus());
              }}
              hidden={isEditingName}
              style={{ paddingLeft: "10px" }}
            >
              {displayName}
            </h3>
            <Input
              onKeyDown={handleChangeNewName}
              ref={fieldNameRef}
              hidden={!isEditingName}
              clearValue={() => setName("")}
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
            />
          </div>
        </div>
        <button
          onClick={() => onClickDeleteCard()}
          className={classes.deleteCard}
        >
          Delete
        </button>
        <div className={classes.descr}>
          <h3>Description</h3>
          <textarea
            placeholder="Typing what you think about..."
            className={classes.descrText}
            value={descr}
            onChange={(e) => setDescr(e.target.value)}
          />
          <Button
            onClick={() =>
              changeDescrCardsItem({
                item: {
                  ...item,
                  descr,
                },
                columnId: selectCard.columnId,
              })
            }
          >
            Save
          </Button>
        </div>
        <div className={classes.comments}>
          <h3 className={classes.descrTitle}>Comments</h3>
          <div className={classes.addComment}>
            <div className={classes.userIcon}>
              <img src="https://trello-members.s3.amazonaws.com/65b89f439f456aba16f40989/3b4ea385fc3f4513edce3dad4a12061a/170.png" />
            </div>
            <div className={classes.blockInfo}>
              <Input
                clearValue={() => setComment("")}
                placeholder="Typing something"
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
              <div className={classes.wrapperBtn}>
                <Button
                  onClick={() => {
                    addCardsItemComment(selectCard, {
                      id: fakeID(),
                      content: comment,
                      author: selectCard.item.author,
                    });
                    setComment("");
                  }}
                >
                  Post
                </Button>
              </div>
            </div>
          </div>
          {item.comments.length > 0 ? (
            <div className={classes.split}></div>
          ) : null}
          <div className={classes.listComments}>
            {item.comments.map((comment: Comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetailsPopup;
