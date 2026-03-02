import { RootState } from "../../store";

export const user = (state: RootState) =>state.auth.user; 
export const isAuthLoading = (state: RootState) => state.auth.isAuthLoading;