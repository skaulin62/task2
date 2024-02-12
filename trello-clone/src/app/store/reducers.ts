
import {cardsReducer} from '@entities/Cards';
import {userReducer} from '@/entities/User'
import { combineReducers } from '@reduxjs/toolkit';

export default combineReducers({
    cards: cardsReducer,
    user: userReducer,
})