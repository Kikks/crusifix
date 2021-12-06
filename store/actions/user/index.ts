import { Dispatch } from "redux";

import { User } from "../../reducers/user";
import { UserActionTypes, UserAction } from "./actionTypes";

export const login = (userData: User) => {
	return (dispatch: Dispatch<UserAction>) => {
		dispatch({
			type: UserActionTypes.LOGIN,
			userData
		});
	};
};

export const logout = () => {
	return (dispatch: Dispatch<UserAction>) => {
		dispatch({
			type: UserActionTypes.LOGOUT
		});
	};
};
