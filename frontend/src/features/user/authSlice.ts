import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface CounterState {
	jwt: String | null;
	isLogged: boolean;
}

const initialState: CounterState = {
	jwt: null,
	isLogged: true,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		signInRedux: (state, action: PayloadAction<string>) => {
			state.jwt = action.payload;
			state.isLogged = true;
		},
		signOutRedux: (state) => {
			state.jwt = null;
			state.isLogged = false;
		},
	},
});

export const { signInRedux, signOutRedux } = authSlice.actions;

// export const selectJwtToken = (state: RootState) => state.auth.jwt;
export const selectAuthState = (state: RootState) => state.auth;

export default authSlice.reducer;
