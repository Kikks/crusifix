import { Box, Typography, Grid, Avatar, Stack } from "@mui/material";
import StarsIcon from "@mui/icons-material/Stars";

// Components
import Card from "../../Card";

type WinnerCardProps = {
	name: string;
	email: string;
	image: string;
	points: number;
	rank: number;
};

const WinnerCard = ({ name, email, image, points, rank }: WinnerCardProps) => {
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
						<Avatar src={image} />
						<Stack>
							<Typography
								sx={{ textTransform: "capitalize", fontWeight: "bold" }}
							>
								{name}
							</Typography>
							<Typography>{email}</Typography>
						</Stack>
					</Stack>

					<Stack direction='row' alignItems='center'>
						<Stack flex={1}>
							<Typography
								sx={{ fontWeight: "bold" }}
							>{`${points} points`}</Typography>
							<Typography>{`For ${formattedRank} place in rank`}</Typography>
						</Stack>
						<StarsIcon sx={{ color, fontSize: 50 }} />
					</Stack>
				</Stack>
			</Card>
		</Grid>
	);
};

const winners = [
	{
		name: "Matt Damon",
		email: "matt@mail.com",
		image: "/assets/images/avatar-1.png",
		points: 540,
		rank: 1
	},
	{
		name: "John Doe",
		email: "john@mail.com",
		image: "/assets/images/avatar-1.png",
		points: 510,
		rank: 2
	},
	{
		name: "Laty Doe",
		email: "larry@mail.com",
		image: "/assets/images/avatar-1.png",
		points: 410,
		rank: 3
	}
];

const PotentialWinners = () => {
	return (
		<Box sx={{ mt: 5 }}>
			<Typography variant='h4' sx={{ mb: 3, fontWeight: "bold" }}>
				Potential winners for November Dream Contest
			</Typography>

			<Grid container spacing={3}>
				{winners.map(({ name, email, image, points, rank }) => (
					<WinnerCard key={name} {...{ name, email, image, points, rank }} />
				))}
			</Grid>
		</Box>
	);
};

export default PotentialWinners;
