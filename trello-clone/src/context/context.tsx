import { createContext, useContext, useEffect, useState } from "react";
import { Card, Cards, SelectCard, Comment } from "../types/types";
import { fakeID } from "../utils";
import { useLocalStorage } from "../hook/useLocalStorage";

interface TypeContext {
  cards: Cards[];
  selectedCard: SelectCard;
  setSelectedCard: (selectCard: SelectCard) => void;
  changeCardsTitle: (title: string, lastTitle: string) => void;
  addCardsItem: (item: Card, cards: Cards) => void;
  deleteCardsItem: (selectCard: SelectCard) => void;
  renameCardsItem: (SelectCard: SelectCard) => boolean;
  changeDescrCardsItem: (selectCard: SelectCard) => void;
  addCardsItemComment: (selectCard: SelectCard, comment: Comment) => void;
  deleteCarsItemComment: (selectCard: SelectCard, comment: Comment) => void;
  changeCardsItemComment: (selectCard: SelectCard, comment: Comment) => void;
}

export const TrelloContext = createContext<TypeContext>({} as TypeContext);
export const useTrelloContext = () => useContext(TrelloContext);

type Props = {
  children?: React.ReactNode;
};

const initialData: Cards[] = [
  {
    id: fakeID(),
    title: "TODO",
    item: [],
  },
  {
    id: fakeID(),
    title: "In Progress",
    item: [],
  },
  {
    id: fakeID(),
    title: "Testing",
    item: [],
  },
  {
    id: fakeID(),
    title: "Done",
    item: [],
  },
];

export const TrelloContextProvider = (props: Props) => {
  const [cards, setCards] = useState<Cards[]>([] as Cards[]);
  const [storageCards, setStorageCards] = useLocalStorage("data");

  const [selectedCard, setSelectedCard] = useState<SelectCard>(
    {} as SelectCard
  );

  useEffect(() => {
    if (
      !storageCards ||
      storageCards === null ||
      storageCards === undefined ||
      storageCards === ([] as Cards[])
    ) {
      setCards(initialData);
      setStorageCards(initialData);
    } else {
      setCards(storageCards);
    }
  }, []);

  useEffect(() => {
    setStorageCards(cards);
  }, [cards]);

  const changeCardsTitle = (title: string, lastTitle: string) => {
    const includedCount = cards.reduce((acc: number, card: Cards) => {
      if (card.title.toLowerCase() === title.toLowerCase()) acc += 1;
      return acc;
    }, 0);
    console.log(includedCount);
    if (title && lastTitle && includedCount === 0) {
      setCards((prev) =>
        prev.map((card: Cards): Cards => {
          if (card.title === lastTitle) {
            return { ...card, title: title };
          }
          return card;
        })
      );
      console.log(cards);
    }
  };
  const addCardsItem = (item: Card, cards: Cards) => {
    const includedCount = cards.item.reduce((acc: number, itemCard: Card) => {
      if (item.name.toLowerCase() === itemCard.name.toLowerCase()) acc += 1;
      return acc;
    }, 0);
    if (item.name !== "" && cards && includedCount === 0) {
      setCards((prev) =>
        prev.map((card: Cards): Cards => {
          if (cards.id === card.id) {
            return {
              id: cards.id,
              title: cards.title,
              item: [...cards.item, item],
            };
          }
          return card;
        })
      );
    }
    console.log(cards);
  };
  const deleteCardsItem = (selectCard: SelectCard) => {
    const { item, columnId } = selectCard;

    setCards((prev) =>
      prev.map((card: Cards) => {
        if (card.id === columnId) {
          const withoutItem = card.item.filter(
            (cardItem: Card) => cardItem.id !== item.id
          );
          return {
            ...card,
            item: withoutItem,
          };
        }
        return card;
      })
    );
  };
  const renameCardsItem = (selectCard: SelectCard) => {
    if (!selectCard.item.name) return false;
    const foundCard = cards.find(
      (card: Cards) => card.id === selectCard.columnId
    );
    const includedCount = foundCard?.item.reduce(
      (acc: number, itemCard: Card) => {
        if (selectCard.item.name.toLowerCase() === itemCard.name.toLowerCase())
          acc += 1;
        return acc;
      },
      0
    );
    if (includedCount !== 0) return false;

    setCards((prev) =>
      prev.map((cards: Cards) => {
        if (cards.id === selectCard.columnId) {
          const newListItem: Card[] = cards.item.map((card: Card) => {
            if (card.id === selectCard.item.id) {
              return selectCard.item;
            }
            return card;
          });
          return {
            ...cards,
            item: newListItem,
          };
        }
        return cards;
      })
    );
    return true;
  };
  const changeDescrCardsItem = (selectCard: SelectCard) => {
    setCards((prev) =>
      prev.map((cards: Cards) => {
        if (cards.id === selectCard.columnId) {
          const newListItem: Card[] = cards.item.map((card: Card) => {
            if (card.id === selectCard.item.id) {
              return selectCard.item;
            }
            return card;
          });
          return {
            ...cards,
            item: newListItem,
          };
        }
        return cards;
      })
    );
  };
  const addCardsItemComment = (selectCard: SelectCard, comment: Comment) => {
    if (!comment.content) return;
    setCards((prev) =>
      prev.map((cards: Cards) => {
        if (cards.id === selectCard.columnId) {
          const newListItem: Card[] = cards.item.map((card: Card) => {
            if (card.id === selectCard.item.id) {
              const newComment = {
                ...card,
                countComments: card.countComments + 1,
                comments: [comment, ...card.comments],
              };
              setSelectedCard({
                ...selectCard,
                item: newComment,
              } as SelectCard);
              return newComment;
            }
            return card;
          });

          return {
            ...cards,
            item: newListItem,
          };
        }
        return cards;
      })
    );
  };
  const deleteCarsItemComment = (selectCard: SelectCard, comment: Comment) => {
    if (!comment.content) return;
    setCards((prev) =>
      prev.map((cards: Cards) => {
        if (cards.id === selectCard.columnId) {
          const newListItem: Card[] = cards.item.map((card: Card) => {
            if (card.id === selectCard.item.id) {
              const newComments = card.comments.filter(
                (commentItem: Comment) => commentItem.id !== comment.id
              );
              setSelectedCard({
                ...selectCard,
                item: {
                  ...selectCard.item,
                  countComments: card.countComments - 1,
                  comments: newComments,
                },
              } as SelectCard);
              return {
                ...card,
                comments: newComments,
                countComments: card.countComments - 1,
              };
            }
            return card;
          });

          return {
            ...cards,
            item: newListItem,
          };
        }
        return cards;
      })
    );
  };
  const changeCardsItemComment = (selectCard: SelectCard, comment: Comment) => {
    if (!comment.content) return;
    setCards((prev) =>
      prev.map((cards: Cards) => {
        if (cards.id === selectCard.columnId) {
          const newListItem: Card[] = cards.item.map((card: Card) => {
            if (card.id === selectCard.item.id) {
              const updatedComment = card.comments.map(
                (commentItem: Comment) => {
                  if (commentItem.id === comment.id) {
                    return {
                      ...commentItem,
                      content: comment.content,
                    };
                  }
                  return commentItem;
                }
              );
              return {
                ...card,
                comments: updatedComment,
              };
            }
            return card;
          });

          return {
            ...cards,
            item: newListItem,
          };
        }
        return cards;
      })
    );
  };

  return (
    <TrelloContext.Provider
      value={{
        changeCardsTitle,
        selectedCard,
        setSelectedCard,
        addCardsItem,
        cards,
        deleteCardsItem,
        renameCardsItem,
        changeDescrCardsItem,
        addCardsItemComment,
        deleteCarsItemComment,
        changeCardsItemComment,
      }}
    >
      {props.children}
    </TrelloContext.Provider>
  );
};
