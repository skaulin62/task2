import { useEffect, useRef, useState } from "react";
import classes from "./CardDetailsPopup.module.sass";
import { Cards, Comment, SelectCard } from "../../../app/types";
import IconCloseButton from "@shared/UI/IconCloseButton";
import Input from "@shared/UI/Input";
import Button from "@shared/UI/Button";
import CommentItem from "@/entities/Comment/UI";

import { fakeID } from "@/shared/lib";
import { useAppDispatch } from "@/app/store";
import { ActionCards } from "@/entities/Cards";
import { useForm } from "react-hook-form";
import { useGetCardsById } from "../hook";

type CardFormInput = {
  title: string;
  descr: string;
  comment: string;
};

const CardDetailsPopup = ({ data }: { data: SelectCard }) => {
  const dispatch = useAppDispatch();
  const selectedCard = data;
  const { item, columnId } = selectedCard;

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<CardFormInput>({
    defaultValues: {
      title: selectedCard.item.name,
      descr: selectedCard.item.descr,
      comment: "",
    },
  });

  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const fieldNameRef = useRef<HTMLInputElement | null>(null);
  const inputNameRef = useRef<HTMLDivElement | null>(null);
  const inputCardTitle = useRef<HTMLHeadingElement | null>(null);
  useEffect(() => {
    const keyBoardHandler = (e: KeyboardEventInit) => {
      if (e.key === "Escape") {
        dispatch(ActionCards.unsetCard());
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
        if (inputCardTitle.current) {
          setValue("title", inputCardTitle.current.innerText);
        }
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
      dispatch(ActionCards.deleteCardsItem(selectedCard));
      dispatch(ActionCards.unsetCard());
    }
  };

  const handleChangeNewName = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (getValues().title) {
        dispatch(
          ActionCards.renameCardsItem({
            item: {
              ...item,
              name: getValues().title,
            },
            columnId: selectedCard.columnId,
          })
        );
      } else {
        if (inputCardTitle.current) {
          inputCardTitle.current.innerText = selectedCard.item.name;
        }
      }

      setIsEditingName(false);
    }
  };

  const cardsOne: Cards = useGetCardsById(columnId);

  return (
    <div className={classes.overlay}>
      <form onSubmit={handleSubmit(() => {})} className={classes.cardDetail}>
        <div className={classes.closeBlock}>
          <IconCloseButton onClick={() => dispatch(ActionCards.unsetCard())} />
        </div>
        <span className={classes.colInfo}>
          Column: {cardsOne.title} &nbsp; | &nbsp; Author: {item.author}
        </span>

        <div ref={inputNameRef} className={classes.title}>
          <div style={{ width: "400px" }}>
            <h3
              ref={inputCardTitle}
              onClick={() => {
                setIsEditingName(true);
                setTimeout(() => fieldNameRef.current?.focus());
              }}
              hidden={isEditingName}
              style={{ paddingLeft: "10px" }}
            >
              {getValues().title}
            </h3>
            <Input
              {...register("title", { required: "The title is required" })}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setValue("title", e.target.value)
              }
              onKeyDown={handleChangeNewName}
              ref={fieldNameRef}
              hidden={!isEditingName}
              clearValue={() => setValue("title", "")}
              error={errors.title?.message}
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
            {...register("descr")}
          />
          <Button
            type="submit"
            onClick={() =>
              dispatch(
                ActionCards.changeDescrCardsItem({
                  item: {
                    ...item,
                    descr: getValues().descr,
                  },
                  columnId: selectedCard.columnId,
                })
              )
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
                clearValue={() => setValue("comment", "")}
                placeholder="Typing something"
                {...register("comment", { required: "true" })}
              />
              <div className={classes.wrapperBtn}>
                <Button
                  onClick={() => {
                    dispatch(
                      ActionCards.addCardsItemComment({
                        selectCard: selectedCard,
                        comment: {
                          id: fakeID(),
                          content: getValues().comment,
                          author: selectedCard.item.author,
                        },
                      })
                    );
                    setValue("comment", "");
                  }}
                >
                  Post
                </Button>
              </div>
            </div>
          </div>
          {item.comments.length ? <div className={classes.split}></div> : null}
          <div className={classes.listComments}>
            {item.comments.map((comment: Comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CardDetailsPopup;
