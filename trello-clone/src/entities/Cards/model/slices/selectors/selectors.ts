import { RootState } from "@/app/store";
import { createSelector } from "@reduxjs/toolkit";


// export const selectCards = (state: RootState) => state.cards.cards;
// export const selectSelectedCard = (state: RootState) => state.cards.selectedCard;


// search of (need to solve)
export const selectCards = createSelector([(state: RootState) => state.cards.cards],    
    cards => cards
)
export const selectSelectedCard = createSelector([(state: RootState) => state.cards.selectedCard],
    selectedCards => selectedCards
)