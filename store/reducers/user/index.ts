import { Role } from "../../../types";
import { UserAction } from "../../actions/user/actionTypes";
import { UserActionTypes } from "../../actions/user/actionTypes";

export type User = {
	id: string;
	firstName?: string;
	lastName?: string;
	email?: string;
	phoneNumber?: string;
	role: Role;
	isActive: boolean;
	isEmailVerified: boolean;
} | null;

const InitialState: User = null;

const reducer = (state: User = InitialState, action: UserAction): User => {
	switch (action.type) {
		case UserActionTypes.LOGIN:
			return action.userData;

		case UserActionTypes.LOGOUT: {
			return null;
		}

		default:
			return state;
	}
};

export default reducer;
