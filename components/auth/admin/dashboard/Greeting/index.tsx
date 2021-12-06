import { Grid } from "@mui/material";

// Components
import GreetingCard from "../../../GreetingCard";
import MostPlayed from "../../../MostPlayed";

const Greeting = () => {
	return (
		<Grid container spacing={2}>
			<Grid item lg={7} md={7} sm={6} xs={12}>
				<GreetingCard
					name='John Doe'
					buttonLabel='Register Payments'
					action={() => alert("Hello!")}
				/>
			</Grid>

			<Grid item lg={5} md={5} sm={6} xs={12}>
				<MostPlayed
					image='/assets/images/games/pes-main.jpg'
					name='PES 2022'
					role='admin'
					frequency={40}
					days={10}
				/>
			</Grid>
		</Grid>
	);
};

export default Greeting;
