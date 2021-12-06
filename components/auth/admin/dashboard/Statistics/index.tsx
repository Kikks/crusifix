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
		title: "Total customers",
		value: "177,836"
	},
	{
		title: "Total games played",
		value: "540 pts"
	},
	{
		title: "Most Valuable Customer",
		value: "Matt Daemon"
	},
	{
		title: "New customers in last 30 days",
		value: "35"
	}
];

const Statistics = () => {
	return (
		<Grid container spacing={3} sx={{ mt: 4 }} alignItems='stretch'>
			{stats.map(({ title, value }) => (
				<Grid key={title} item lg={3} md={4} sm={6} xs={12}>
					<Stat title={title} value={value} />
				</Grid>
			))}
		</Grid>
	);
};

export default Statistics;
