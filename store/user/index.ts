import { createSlice } from "@reduxjs/toolkit";

type SliceState = null | {
	createdAt: string;
	email: string;
	firstName: string;
	_id: string;
	isActive: boolean;
	isEmailVerified: boolean;
	isEmailVerifiedToken: string;
	isEmailVerifiedTokenExpire: string;
	lastName: string;
	phoneNumber: string;
	role: string;
};

export const userSlice = createSlice({
	name: "user",
	initialState: {
		user: null as SliceState
	},
	reducers: {
		login: (state, action) => {
			state.user = action.payload;
		},
		logout: state => {
			state.user = null;
		}
	}
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
