import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import userReducer from "./user";
import adminStatisticsReducer from "./adminStatistics";

const store = configureStore({
	reducer: {
		user: userReducer,
		adminStatistics: adminStatisticsReducer
	},
	middleware: [thunk]
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
