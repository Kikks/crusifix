import { useState } from "react";
import { Grid, Stack, Typography, Skeleton } from "@mui/material";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

// Components
import Card from "../../../Card";

// Utils
import { getRequest } from "../../../../../utils/api/calls";
import {
	GET_TOTAL_GAMES_PLAYED,
	GET_MOST_PROFITABLE_GAME,
	GET_TOTAL_GAMES
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
	const [totalGamesPlayed, setTotalGamesPlayed] = useState(0);
	const [totalGames, setTotalGames] = useState(0);
	const [mostProfitbleGame, setMostProfitableGame] = useState("");

	const { isLoading: totalGamesIsLoading, isFetching: totalGamessIsFetching } =
		useQuery(
			queryKeys.getTotalCustomers,
			() => getRequest({ url: GET_TOTAL_GAMES }),
			{
				onSuccess(data) {
					setTotalGamesPlayed(data?.data[0]?.["total games "] || 0);
				},
				onError(error: any) {
					console.error(error?.response);
				},
				enabled: !!user?._id,
				refetchOnWindowFocus: false
			}
		);

	const {
		isLoading: totalGamesPlayedIsLoading,
		isFetching: totalGamesPlayedIsFetching
	} = useQuery(
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

	return (
		<Grid container spacing={3} sx={sx} alignItems='stretch'>
			<Stat
				title='Total Games'
				value={`${totalGamesPlayed.toLocaleString("en-US")}`}
				loading={totalGamesIsLoading || totalGamessIsFetching}
			/>
			<Stat
				title='Total games played'
				value={`${totalGames.toLocaleString("en-US")}`}
				loading={totalGamesPlayedIsLoading || totalGamesPlayedIsFetching}
			/>
			<Stat
				title='Most Profitable Game'
				value={mostProfitbleGame}
				loading={mostProfitableGameIsLoading || mostProfitableGameIsFetching}
			/>
		</Grid>
	);
};

export default Statistics;
