import classes from "./ColumnOfCards.module.sass";
import Button from "@shared/UI/Button";
import Input from "@shared/UI/Input";
import { FC, useEffect, useRef, useState } from "react";
import { Card, Cards } from "../../app/types";
import CardItem from "@/entities/Card/UI";
import { fakeID } from "@/shared/lib";
import { ActionCards } from "@/entities/Cards";
import { useAppDispatch } from "@/app/store";
import { useSelector } from "react-redux";
import { selectUser } from "@/entities/User";
import { CreateCard } from "@features/Cards/AddCard";

interface Props {
  card: Cards;
}

const ColumnOfCards: FC<Props> = ({ card }) => {
  const dispatch = useAppDispatch();
  const { username } = useSelector(selectUser);

  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [newCardTitle, setNewCardTitle] = useState<string>("");

  const inputNewCardTitleRef = useRef<HTMLDivElement | null>(null);
  const fieldNewCardTitle = useRef<HTMLInputElement | null>(null);

  const handleChangeNewCardTitle = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      setIsAdding(!isAdding);

      clickAddCardItem();
      setNewCardTitle("");
    }
  };

  useEffect(() => {
    const clickOutInputCol = (e: MouseEvent) => {
      if (
        inputNewCardTitleRef.current &&
        !e.composedPath().includes(inputNewCardTitleRef.current)
      ) {
        setIsAdding(false);
        setNewCardTitle("");
      }
    };
    document.addEventListener("click", clickOutInputCol);
    return () => {
      document.removeEventListener("click", clickOutInputCol);
    };
  }, []);

  const clickAddCardItem = () => {
    if (isAdding) {
      const newCard: Card = {
        id: fakeID(),
        name: newCardTitle,
        author: username,
        descr: "",
        comments: [],
        countComments: 0,
      };
      dispatch(ActionCards.addCardsItem({ item: newCard, cards: card }));
    }
    setNewCardTitle("");
    setIsAdding(!isAdding);
  };

  return (
    <div className={classes.columnCards}>
      <CreateCard card={card} />
      <div className={classes.listCards}>
        {card.item.map((item: Card, index: number) => (
          <CardItem key={index} item={item} columnId={card.id} />
        ))}
      </div>
      <div
        ref={inputNewCardTitleRef}
        style={{ display: "flex", gap: "5px", flexDirection: "column" }}
      >
        <Input
          ref={fieldNewCardTitle}
          onKeyDown={handleChangeNewCardTitle}
          hidden={!isAdding}
          value={newCardTitle}
          clearValue={() => setNewCardTitle("")}
          placeholder="Type title of new cards"
          onChange={(e) => setNewCardTitle(e.target.value)}
        />
        <Button
          onClick={() => {
            clickAddCardItem();
            setTimeout(() => fieldNewCardTitle.current?.focus());
          }}
        >
          Add card
        </Button>
      </div>
    </div>
  );
};

export default ColumnOfCards;
