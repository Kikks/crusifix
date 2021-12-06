import { Grid, Stack, Typography } from "@mui/material";

// Components
import Card from "../../../Card";

type StatProps = {
	title: string;
	value: string;
};

const Stat = ({ title, value }: StatProps) => (
	<Card>
		<Stack spacing={1}>
			<Typography sx={{ color: "#9fa2b4", fontWeight: "bold" }}>
				{title}
			</Typography>
			<Typography sx={{ fontWeight: "bold" }}>{value}</Typography>
		</Stack>
	</Card>
);

const stats = [
	{
		title: "Total games played",
		value: "177,836"
	},
	{
		title: "Total points earned",
		value: "540 pts"
	},
	{
		title: "Current position",
		value: "#105"
	}
];

const Statistics = () => {
	return (
		<Grid container spacing={3} sx={{ mt: 4 }}>
			{stats.map(({ title, value }) => (
				<Grid key={title} item lg={4} md={4} sm={6} xs={12}>
					<Stat title={title} value={value} />
				</Grid>
			))}
		</Grid>
	);
};

export default Statistics;
