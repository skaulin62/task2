import { Card, Cards, SelectCard, Comment } from "@/app/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fakeID } from "@/shared/lib";

interface ICards {
    cards: Cards[],
    selectedCard: SelectCard
}

const initialState: ICards  =  {
   cards: [
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
   ],
   selectedCard: {} as SelectCard
}

export const cardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        changeCardsTitle:  (state, action: PayloadAction<{title: string, cardsId: number}>) => {
            const {title, cardsId} = action.payload;
            if(!title || !cardsId) return;
            state.cards = state.cards.map((card: Cards) => {
                if(card.id === cardsId) {
                    return {...card, title: title}
                }
                return card;
            })
        },
        addCardsItem:  (state, action: PayloadAction<{item: Card, cards: Cards}>) => {
            const {item, cards} = action.payload;
            if(!item.name || !cards) return;

            state.cards = state.cards.map((cardsItem: Cards) => {
                if(cardsItem.id === cards.id) {
                    return {
                        id: cardsItem.id,
                        title: cardsItem.title,
                        item: [...cardsItem.item, item]
                    }
                }
                return cardsItem
            })
        },
        deleteCardsItem: (state, action: PayloadAction<SelectCard>) => {
            const { item, columnId } = action.payload;
            state.cards = state.cards.map((card: Cards) => {
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
        },
        renameCardsItem: (state, action: PayloadAction<SelectCard>) => {
            const selectCard = action.payload;
            if(!selectCard.item.name) return;
            state.cards = state.cards.map((cards: Cards) => {
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
        },
        changeDescrCardsItem: (state, action: PayloadAction<SelectCard>) => {
            const selectCard = action.payload;
            if(!selectCard) return;
            state.cards = state.cards.map((cards: Cards) => {
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
        },
        setCard: (state, action: PayloadAction<SelectCard>) => {
          state.selectedCard = action.payload;
        },
        unsetCard: (state) => {
          state.selectedCard = {} as SelectCard;
        },
        // i don't know (need to solve)
        addCardsItemComment: (state, action: PayloadAction<{selectCard: SelectCard, comment: Comment}>) => {
            const {comment, selectCard} = action.payload;
            if(!selectCard || !comment.content) return;
            
            state.cards = state.cards.map((cards: Cards) => {
                if (cards.id === selectCard.columnId) {
                    const updateItems: Card[] = cards.item.map((card: Card) => {
                        if(card.id === selectCard.item.id) {
                            const addedComment: Card = {...card, countComments: card.countComments + 1,  comments: [comment, ...card.comments]}
                            state.selectedCard = {...state.selectedCard, item: addedComment};
                        
                            return addedComment;
                        }
                        return card;
                    })
                    return {...cards, item: updateItems};
                }
                return cards;
              })
        },
        deleteCarsItemComment: (state, action: PayloadAction<{selectCard: SelectCard, comment: Comment}>) => {
            const {comment, selectCard} = action.payload;
            if(!selectCard || !comment) return;
            state.cards = state.cards.map((cards: Cards) => {
                if (cards.id === selectCard.columnId) {
                    const updateItems = cards.item.map((card: Card) => {  
                        if(card.id === selectCard.item.id) {
                            const deleteComment: Comment[] = card.comments.filter((commentItem: Comment) => commentItem.id !== comment.id);
                            const deletedComment: Card = {...card, countComments: card.countComments - 1, comments: deleteComment};
                            state.selectedCard = {...state.selectedCard, item: deletedComment};
                            return deletedComment;
                        }
                        return card;
                    })
                    return {...cards, item: updateItems};
                }
                return cards;
              })
        },
        changeCardsItemComment: (state, action: PayloadAction<{selectCard: SelectCard, comment: Comment}>) => {
            const {comment, selectCard} = action.payload;
            if(!selectCard || !comment) return;
            state.cards = state.cards.map((cards: Cards) => {
                if (cards.id === selectCard.columnId) {
                    const updateItems = cards.item.map((card: Card) => {
                        if(card.id === selectCard.item.id) {
                            const updatedComment: Comment[] = card.comments.map((commentItem: Comment) => {
                                if(commentItem.id === comment.id) {
                                    return {...commentItem, content: comment.content}
                                }
                                return commentItem;
                            });
                            const updatedItem: Card =  {...card, comments: updatedComment};
                           
                            return updatedItem;
                          }
                        return card;
                    })
                    return {...cards, item: updateItems};
                }
                return cards;
              })
        },

    }
})



export const {changeCardsTitle, setCard, unsetCard, addCardsItem, deleteCardsItem, renameCardsItem, changeDescrCardsItem, addCardsItemComment, deleteCarsItemComment, changeCardsItemComment} = cardsSlice.actions

export default cardsSlice.reducer
