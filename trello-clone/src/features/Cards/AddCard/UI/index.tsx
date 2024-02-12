import { Cards } from "@/app/types";
import Input from "@/shared/UI/Input";
import React, { useEffect, useRef, useState } from "react";
import classes from "./CreateCard.module.sass";
import { useAppDispatch } from "@/app/store";
import { ActionCards } from "@/entities/Cards";

const CreateCard = ({ card }: { card: Cards }) => {
  const inputColRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();

  const fieldColTitle = useRef<HTMLInputElement | null>(null);
  const [newColTitle, setNewColTitle] = useState<string>("");
  const [isEditColTitle, setIsEditColTitle] = useState<boolean>(false);

  const handleChangeColTitle = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEditColTitle(!isEditColTitle);
      dispatch(
        ActionCards.changeCardsTitle({ title: newColTitle, cardsId: card.id })
      );
      setNewColTitle("");
    }
  };

  useEffect(() => {
    const clickOutInputCol = (e: MouseEvent) => {
      if (
        inputColRef.current &&
        !e.composedPath().includes(inputColRef.current)
      ) {
        setIsEditColTitle(false);
        setNewColTitle("");
      }
    };
    document.addEventListener("click", clickOutInputCol);
    return () => {
      document.removeEventListener("click", clickOutInputCol);
    };
  }, []);

  return (
    <div ref={inputColRef} className={classes.title}>
      <h3
        onClick={() => {
          setIsEditColTitle(!isEditColTitle);
          setTimeout(() => fieldColTitle.current?.focus());
        }}
        hidden={isEditColTitle}
      >
        {card.title}
      </h3>
      <Input
        ref={fieldColTitle}
        onKeyDown={(e) => handleChangeColTitle(e)}
        placeholder="Type new title"
        onChange={(e) => setNewColTitle(e.target.value)}
        value={newColTitle}
        hidden={!isEditColTitle}
        clearValue={() => setNewColTitle("")}
      />
    </div>
  );
};

export default CreateCard;
