import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { Box, Stack } from "@mui/material";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

// Components
import Greeting from "../../../../components/auth/customer/dashboard/Greeting";
import { Game } from "../../../../components/auth/MostPlayed";
import Statistics, {
	StatProps
} from "../../../../components/auth/customer/dashboard/Statistics";
import PotentialWinners from "../../../../components/auth/customer/dashboard/PotentialWinners";
import Standings, {
	StandingsProps
} from "../../../../components/auth/customer/dashboard/Standings";
import Loader from "../../../../components/auth/customer/dashboard/Loader";

// Utils
import { getRequest } from "../../../../utils/api/calls";
import { GET_CUSTOMER_DASHBOARD } from "../../../../utils/api/urls";
import queryKeys from "../../../../utils/api/queryKeys";

// Store
import { RootState } from "../../../../store";

const Dashboard: NextPage = () => {
	const { user } = useSelector((state: RootState) => state.user);
	const [statistics, setStatistics] = useState<StatProps[]>([]);
	const [standings, setStandings] = useState<StandingsProps>([]);
	const [mostPlayedGames, setMostPlayedGames] = useState<Game[]>([]);
	const { isLoading } = useQuery(
		queryKeys.getCustomerDashboard,
		() => getRequest({ url: GET_CUSTOMER_DASHBOARD({ id: user?._id || "" }) }),
		{
			onSuccess(data) {
				setMostPlayedGames(data?.mostPlayedGame || []);
				setStatistics([
					{
						title: "Total games played",
						value: `${data?.userTotalPointsAndTotalGames[0]?.totalGames}` || ""
					},
					{
						title: "Total points earned",
						value:
							`${data?.userTotalPointsAndTotalGames[0]?.totalPoints} pts` || ""
					},
					{
						title: "Current position",
						value: `#${data?.myCurrentPosition || ""}`
					}
				]);
				setStandings(data?.leaderBoard || []);
			},
			onError(error: any) {
				console.error(error?.response);
			},
			enabled: !!user?._id,
			retry: 3
		}
	);

	return (
		<Box sx={{ p: 3, pt: 10 }}>
			<Head>
				<title>Dashboard - Crusifix</title>
				<meta name='description' content='Welcome to Crusifix' />
			</Head>

			{isLoading ? (
				<Loader />
			) : (
				<Stack>
					<Greeting mostPlayedGames={mostPlayedGames} isLoading={isLoading} />
					<Statistics statistics={statistics} />
					<PotentialWinners />
					<Standings standings={standings} />
				</Stack>
			)}
		</Box>
	);
};

export default Dashboard;
