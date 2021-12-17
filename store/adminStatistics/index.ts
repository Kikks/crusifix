import { createSlice } from "@reduxjs/toolkit";

type Statistics = {
	title: string;
	value: string;
};

export const adminStatisticsSlice = createSlice({
	name: "adminStatistics",
	initialState: {
		statistics: [] as Statistics[]
	},
	reducers: {
		setStatistics: (state, action) => {
			state.statistics = action.payload;
		},
		clearStatistics: state => {
			state.statistics = [];
		}
	}
});

export const { setStatistics, clearStatistics } = adminStatisticsSlice.actions;
export default adminStatisticsSlice.reducer;
