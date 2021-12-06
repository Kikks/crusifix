import { User } from "../../reducers/user";

export enum UserActionTypes {
	LOGIN = "LOGIN",
	LOGOUT = "LOGOUT"
}

interface LoginAction {
	type: UserActionTypes.LOGIN;
	userData: User;
}

interface LogoutAction {
	type: UserActionTypes.LOGOUT;
}

export type UserAction = LoginAction | LogoutAction;
