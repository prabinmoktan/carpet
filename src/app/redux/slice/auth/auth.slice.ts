import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userTypes{
    _id: string;
    firstName: string;
    lastName: string;
    role: string;
    email: string;

}
interface AuthState{
    user: userTypes | null;
    isAuthLoading: boolean;
}

const initialState:AuthState = {
    user: null,
    isAuthLoading: true,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<userTypes>){
            state.user = action.payload;
            state.isAuthLoading = false;
        },
        clearUser(state){
            state.user = null;
            state.isAuthLoading = false;
        },
        setAuthLoading(state, action: PayloadAction<boolean>){
            state.isAuthLoading = action.payload;
        }
    }
})
export const {setUser, clearUser, setAuthLoading} = authSlice.actions;
export default authSlice.reducer;