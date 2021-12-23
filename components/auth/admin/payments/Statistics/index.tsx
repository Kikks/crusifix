import { useState } from "react";
import { Grid, Stack, Typography, Skeleton } from "@mui/material";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

// Components
import Card from "../../../Card";

// Utils
import { getRequest } from "../../../../../utils/api/calls";
import {
	GET_TOTAL_AMOUNT_EARNED,
	GET_MOST_PROFITABLE_GAME,
	GET_MOST_VALUABLE_CUSTOMER
} from "../../../../../utils/api/urls";
import queryKeys from "../../../../../utils/api/queryKeys";

// Store
import { RootState } from "../../../../../store";

export type StatProps = {
	title: string;
	value: string;
	loading: boolean;
};

const Stat = ({ title, value, loading }: StatProps) => (
	<Grid key={title} item lg={4} md={4} sm={6} xs={12}>
		{loading ? (
			<Skeleton
				animation='wave'
				variant='rectangular'
				width='100%'
				height={100}
				sx={{ borderRadius: 5 }}
			/>
		) : (
			<Card sx={{ height: "100%" }}>
				<Stack spacing={1} sx={{ height: "100%" }}>
					<Typography sx={{ color: "#9fa2b4", fontWeight: "bold" }}>
						{title}
					</Typography>
					<Typography sx={{ fontWeight: "bold", textTransform: "capitalize" }}>
						{value}
					</Typography>
				</Stack>
			</Card>
		)}
	</Grid>
);

const Statistics = ({ sx }: { sx?: any }) => {
	const { user } = useSelector((state: RootState) => state.user);
	const [totalAmountEarned, setTotalAmountEarned] = useState(0);
	const [mostProfitbleGame, setMostProfitableGame] = useState("");
	const [mvc, setMvc] = useState("");

	const { isLoading: totalAmountEarnedIsLoading, isFetching: totalAmountEarnedIsFetching } =
		useQuery(
			queryKeys.getTotalAmountEarned,
			() => getRequest({ url: GET_TOTAL_AMOUNT_EARNED }),
			{
				onSuccess(data) {
					setTotalAmountEarned(data?.data[0]?.totalSpent || 0);
				},
				onError(error: any) {
					console.error(error?.response);
				},
				enabled: !!user?._id,
				refetchOnWindowFocus: false
			}
		);

	const {
		isLoading: mostProfitableGameIsLoading,
		isFetching: mostProfitableGameIsFetching
	} = useQuery(
		queryKeys.getMostProfitableGame,
		() => getRequest({ url: GET_MOST_PROFITABLE_GAME }),
		{
			onSuccess(data) {
				if (data?.data) {
					setMostProfitableGame(data?.game_info?.name || "");
				}
			},
			onError(error: any) {
				console.error(error?.response);
			},
			enabled: !!user?._id
		}
	);

	const { isLoading: mvcIsLoading, isFetching: mvcIsLoadingFetching } =
		useQuery(
			queryKeys.getMostValuableCustomer,
			() => getRequest({ url: GET_MOST_VALUABLE_CUSTOMER }),
			{
				onSuccess(data) {
					if (data?.data) {
						setMvc(
							`${data?.data?.user_info[0]?.firstName || ""} ${
								data?.data?.user_info[0]?.lastName || ""
							}`
						);
					}
				},
				onError(error: any) {
					console.error(error?.response);
				},
				enabled: !!user?._id
			}
		);

	return (
		<Grid container spacing={3} sx={sx} alignItems='stretch'>
			<Stat
				title='Total Amount Earned'
				value={`${totalAmountEarned.toLocaleString("en-US")}`}
				loading={totalAmountEarnedIsLoading || totalAmountEarnedIsFetching}
			/>
			<Stat
				title='Most profitable game'
				value={`${mostProfitbleGame}`}
				loading={mostProfitableGameIsLoading || mostProfitableGameIsFetching}
			/>
			<Stat
				title='Most Valuable Customer'
				value={mvc}
				loading={mvcIsLoading || mvcIsLoadingFetching}
			/>
		</Grid>
	);
};

export default Statistics;
