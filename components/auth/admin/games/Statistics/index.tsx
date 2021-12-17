import { Grid, Stack, Typography } from "@mui/material";

// Components
import Card from "../../../Card";

export type StatProps = {
	title: string;
	value: string;
};

const Stat = ({ title, value }: StatProps) => (
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
);

const Statistics = ({ statistics }: { statistics: StatProps[] }) => {
	return (
		<Grid container spacing={3} alignItems='stretch'>
			{statistics.map(({ title, value }) => (
				<Grid key={title} item lg={4} md={4} sm={6} xs={12}>
					<Stat title={title} value={value} />
				</Grid>
			))}
		</Grid>
	);
};

export default Statistics;
