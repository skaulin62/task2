import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface User {
    username: string
}

const initialState: User = {
    username: '',
}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserName: (state, action: PayloadAction<User>) => {
            state.username = action.payload.username
        }
    }
})



export const {setUserName} = userSlice.actions;


export default userSlice.reducer;