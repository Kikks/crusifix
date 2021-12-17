import { Grid, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";

// Components
import Card from "../../../Card";

// Store
import { RootState } from "../../../../../store";

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

const Statistics = () => {
	const { statistics } = useSelector(
		(state: RootState) => state.adminStatistics
	);

	return (
		<Grid container spacing={3} alignItems='stretch'>
			{statistics.map(({ title, value }) => (
				<Grid key={title} item lg={3} md={4} sm={6} xs={12}>
					<Stat title={title} value={value} />
				</Grid>
			))}
		</Grid>
	);
};

export default Statistics;
