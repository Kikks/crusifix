import { useState } from "react";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

// Components
import GreetingCard from "../../../GreetingCard";
import MostPlayed, { Game } from "../../../MostPlayed";

// Utils
import queryKeys from "../../../../../utils/api/queryKeys";
import { getRequest } from "../../../../../utils/api/calls";
import { GET_MOST_PLAYED_GAMES } from "../../../../../utils/api/urls";

// Store
import { RootState } from "../../../../../store";

const Greeting = () => {
	const { user } = useSelector((state: RootState) => state.user);
	const [games, setGames] = useState<Game[]>([]);
	const router = useRouter();

	const { isLoading } = useQuery(
		queryKeys.getMostPlayedGames,
		() => getRequest({ url: GET_MOST_PLAYED_GAMES }),
		{
			onSuccess(data) {
				setGames(data?.data || []);
			},
			onError(error: any) {
				console.error(error?.response);
			},
			enabled: !!user?._id,
			retry: 3
		}
	);

	return (
		<Grid container spacing={2} alignItems='stretch'>
			<Grid item lg={7} md={7} sm={6} xs={12}>
				<GreetingCard
					name={user ? `${user?.firstName} ${user?.lastName}` : ""}
					buttonLabel='Register Payments'
					action={() => router.push("/auth/admin/payments?drawerIsOpen=true")}
				/>
			</Grid>

			<Grid item lg={5} md={5} sm={6} xs={12}>
				<MostPlayed games={games} isLoading={isLoading} />
			</Grid>
		</Grid>
	);
};

export default Greeting;
