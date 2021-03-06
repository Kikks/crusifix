import { Box, Typography, Grid, Avatar, Stack } from "@mui/material";
import StarsIcon from "@mui/icons-material/Stars";

// Components
import Card from "../../../Card";

// Utils
import { getInitials } from "../../../../../utils/formatters";

export type WinnerCardProps = {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	image?: string;
	points?: number;
	rank: number;
};

type ToppersProps = {
	contestHasEnded: boolean;
	winners: WinnerCardProps[];
};

const WinnerCard = ({
	firstName,
	lastName,
	email,
	image,
	points,
	rank
}: WinnerCardProps) => {
	let formattedRank = "";
	let color = "";

	if (rank === 1) {
		formattedRank = "1st";
		color = "#ffc107";
	} else if (rank === 2) {
		formattedRank = "2nd";
		color = "#aeadb3";
	} else if (rank === 3) {
		formattedRank = "3rd";
		color = "#f49616";
	}

	return (
		<Grid item lg={4} md={4} sm={6} xs={12}>
			<Card>
				<Stack spacing={3}>
					<Stack direction='row' spacing={2} alignItems='center'>
						<Avatar src={image}>
							{getInitials(`${firstName || ""} ${lastName || ""}`)}
						</Avatar>
						<Stack>
							<Typography
								sx={{ textTransform: "capitalize", fontWeight: "bold" }}
							>
								{`${firstName || ""} ${lastName || ""}`}
							</Typography>
							<Typography>{email}</Typography>
						</Stack>
					</Stack>

					<Stack direction='row' alignItems='center'>
						<Stack flex={1}>
							<Typography sx={{ fontWeight: "bold" }}>{`${
								points?.toLocaleString("en-US") || ""
							} points`}</Typography>
							<Typography>{`For ${formattedRank} place in rank`}</Typography>
						</Stack>
						<StarsIcon sx={{ color, fontSize: 50 }} />
					</Stack>
				</Stack>
			</Card>
		</Grid>
	);
};

const Toppers = ({ contestHasEnded, winners }: ToppersProps) => {
	return (
		<Box sx={{ mt: 5 }}>
			<Typography variant='h4' sx={{ mb: 3, fontWeight: "bold" }}>
				{contestHasEnded ? "Winner" : "Potential winners"}
			</Typography>

			<Grid container spacing={3}>
				{winners.map(
					({ _id, firstName, lastName, email, image, points, rank }) => (
						<WinnerCard
							key={_id}
							{...{ _id, firstName, lastName, email, image, points, rank }}
						/>
					)
				)}
			</Grid>
		</Box>
	);
};

export default Toppers;
