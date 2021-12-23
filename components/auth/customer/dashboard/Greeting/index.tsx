import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

// Components
import GreetingCard from "../../../GreetingCard";
import MostPlayed, { Game } from "../../../MostPlayed";

// Store
import { RootState } from "../../../../../store";

const Greeting = ({
	mostPlayedGames,
	isLoading
}: {
	mostPlayedGames: Game[];
	isLoading: boolean;
}) => {
	const { user } = useSelector((state: RootState) => state.user);
	const router = useRouter();

	return (
		<Grid container spacing={2} alignItems='stretch'>
			<Grid item lg={7} md={7} sm={6} xs={12}>
				<GreetingCard
					name={user ? `${user?.firstName} ${user?.lastName}` : ""}
					buttonLabel='See Games'
					action={() => router.push("/auth/customer/games")}
				/>
			</Grid>

			<Grid item lg={5} md={5} sm={6} xs={12}>
				<MostPlayed games={mostPlayedGames} isLoading={isLoading} />
			</Grid>
		</Grid>
	);
};

export default Greeting;
