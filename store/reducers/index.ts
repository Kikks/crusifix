import { combineReducers } from "redux";

// Reducers
import userReducer from "./user";

const reducers = combineReducers({
	user: userReducer
});

export default reducers;
