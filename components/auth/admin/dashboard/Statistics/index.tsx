import { useState } from "react";
import { Grid, Stack, Typography, Skeleton } from "@mui/material";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

// Components
import Card from "../../../Card";

// Utils
import { getRequest } from "../../../../../utils/api/calls";
import {
	GET_RECENT_CUSTOMERS_COUNT,
	GET_TOTAL_GAMES_PLAYED,
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
	<Grid key={title} item lg={3} md={4} sm={6} xs={12}>
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
					<Typography sx={{ fontWeight: "bold" }}>{value}</Typography>
				</Stack>
			</Card>
		)}
	</Grid>
);

const Statistics = ({ sx }: { sx?: any }) => {
	const { user } = useSelector((state: RootState) => state.user);
	const [totalCustomers, setTotalCustomers] = useState(177836);
	const [totalGames, setTotalGames] = useState(0);
	const [mvc, setMvc] = useState("");
	const [recentCustomers, setRecentCustomers] = useState(0);

	const { isLoading: totalGamesIsLoading, isFetching: totalGamesIsFetching } =
		useQuery(
			queryKeys.getTotalGamesPlayed,
			() => getRequest({ url: GET_TOTAL_GAMES_PLAYED }),
			{
				onSuccess(data) {
					setTotalGames(data?.data[0]?.totalGames || 0);
				},
				onError(error: any) {
					console.error(error?.response);
				},
				enabled: !!user?._id,
				refetchOnWindowFocus: false
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
							`${data?.data?.user_info?.firstName || ""} ${
								data?.data?.user_info?.lastName || ""
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

	const {
		isLoading: recentCustomersIsLoading,
		isFetching: recentCustomFetching
	} = useQuery(
		queryKeys.getNoOfRecentCustomers,
		() => getRequest({ url: GET_RECENT_CUSTOMERS_COUNT }),
		{
			onSuccess(data) {
				setRecentCustomers(data?.data[0]?.total || 0);
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
				title='Total customers'
				value={`${totalCustomers.toLocaleString("en-US")}`}
				loading={totalGamesIsLoading || totalGamesIsFetching}
			/>
			<Stat
				title='Total games played'
				value={`${totalGames.toLocaleString("en-US")}`}
				loading={totalGamesIsLoading || totalGamesIsFetching}
			/>
			<Stat
				title='Most Valuable Customer'
				value={mvc}
				loading={mvcIsLoading || mvcIsLoadingFetching}
			/>
			<Stat
				title='New customers in last 30 days'
				value={`${recentCustomers.toLocaleString("en-US")}`}
				loading={recentCustomersIsLoading || recentCustomFetching}
			/>
		</Grid>
	);
};

export default Statistics;
