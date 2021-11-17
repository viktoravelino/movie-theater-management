import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface CounterState {
	jwt: String | null;
	isLogged: boolean;
}

const initialState: CounterState = {
	jwt: null,
	isLogged: false,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setJwt: (state, action: PayloadAction<string>) => {
			state.jwt = action.payload;
			state.isLogged = true;
		},
	},
});

export const { setJwt } = authSlice.actions;

// export const selectJwtToken = (state: RootState) => state.auth.jwt;
export const selectAuthState = (state: RootState) => state.auth;

export default authSlice.reducer;