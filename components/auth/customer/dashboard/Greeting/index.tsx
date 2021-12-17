import { Grid } from "@mui/material";
import { useSelector } from "react-redux";

// Components
import GreetingCard from "../../../GreetingCard";
import MostPlayed from "../../../MostPlayed";

// Store
import { RootState } from "../../../../../store";

const Greeting = () => {
	const { user } = useSelector((state: RootState) => state.user);

	return (
		<Grid container spacing={2}>
			<Grid item lg={7} md={7} sm={6} xs={12}>
				<GreetingCard
					name={user ? `${user?.firstName} ${user?.lastName}` : ""}
					buttonLabel='See Contest Points'
					action={() => alert("Hello!")}
				/>
			</Grid>

			<Grid item lg={5} md={5} sm={6} xs={12}>
				<MostPlayed
					image='/assets/images/games/pes-main.jpg'
					name='PES 2022'
					role={user ? user?.role : "customer"}
					frequency={40}
					days={90}
				/>
			</Grid>
		</Grid>
	);
};

export default Greeting;
