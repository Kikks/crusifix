import { Grid, Stack, Typography } from "@mui/material";

// Components
import Card from "../../../Card";

type StatProps = {
	title: string;
	value: string;
};

const Stat = ({ title, value }: StatProps) => (
	<Card sx={{ height: "100%" }}>
		<Stack spacing={1} sx={{ height: "100%" }}>
			<Typography sx={{ color: "#9fa2b4", fontWeight: "bold" }}>
				{title}
			</Typography>
			<Typography sx={{ fontWeight: "bold" }}>{value}</Typography>
		</Stack>
	</Card>
);

const stats = [
	{
		title: "Total Contests",
		value: "12"
	},
	{
		title: "Total Reward Money",
		value: "NGN 3,000,000"
	},
	{
		title: "Recent Winner",
		value: "Matt Daemon"
	},
	{
		title: "Total Points awarded",
		value: "12000"
	}
];

const Statistics = () => {
	return (
		<Grid container spacing={3} alignItems='stretch'>
			{stats.map(({ title, value }) => (
				<Grid key={title} item lg={3} md={4} sm={6} xs={12}>
					<Stat title={title} value={value} />
				</Grid>
			))}
		</Grid>
	);
};

export default Statistics;
