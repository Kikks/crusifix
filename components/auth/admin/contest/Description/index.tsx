import { Stack, Typography, Box } from "@mui/material";
import DollarIcon from "@mui/icons-material/MonetizationOn";
import StarIcon from "@mui/icons-material/Stars";
import moment from "moment";

// Components
import Card from "../../../Card";

export type DescriptionProps = {
	name: string;
	contestAmount: number;
	endDate: string;
	description: string;
	amountToPoints: number;
	pointsToAmount: number;
};

const Description = ({
	name,
	contestAmount,
	endDate,
	description,
	amountToPoints,
	pointsToAmount
}: DescriptionProps) => {
	return (
		<Card>
			<Stack spacing={3}>
				<Stack
					direction='row'
					flexWrap='wrap'
					spacing={3}
					justifyContent='space-between'
					alignItems='center'
				>
					<Stack spacing={1}>
						<Typography variant='h5' sx={{ fontWeight: "bold" }}>
							{name}
						</Typography>

						<Stack direction='row' spacing={3} alignItems='center'>
							<Stack spacing={1} direction='row' alignItems='center'>
								<Box
									sx={{
										height: 25,
										width: 25,
										bgcolor: "#aeaeae",
										borderRadius: "50%",
										display: "flex",
										alignItems: "center",
										justifyContent: "center"
									}}
								>
									<DollarIcon sx={{ fontSize: 15, color: "primary.main" }} />
								</Box>
								<Typography
									variant='subtitle2'
									sx={{ fontWeight: "bold" }}
								>{`NGN ${contestAmount?.toLocaleString("en-US")}`}</Typography>
							</Stack>

							<Stack spacing={1} direction='row' alignItems='center'>
								<Box
									sx={{
										height: 25,
										width: 25,
										bgcolor: "#aeaeae",
										borderRadius: "50%",
										display: "flex",
										alignItems: "center",
										justifyContent: "center"
									}}
								>
									<StarIcon sx={{ fontSize: 15, color: "primary.main" }} />
								</Box>
								<Typography variant='subtitle2' sx={{ fontWeight: "bold" }}>
									{`${amountToPoints?.toLocaleString("en-US") || ""}:${
										pointsToAmount?.toLocaleString("en-US") || ""
									}`}
								</Typography>
							</Stack>
						</Stack>
					</Stack>

					<Stack spacing={1}>
						<Typography
							variant='subtitle2'
							sx={{ fontWeight: "bold", textAlign: "right" }}
						>
							{`Scheduled to end on the ${moment(endDate).format("Do")}
                 of ${moment(endDate).format("MMMM")}`}
						</Typography>
						<Typography
							variant='subtitle2'
							sx={{ fontWeight: "bold", textAlign: "right" }}
						>
							{moment(endDate).fromNow()}
						</Typography>
					</Stack>
				</Stack>

				<Stack spacing={2}>
					<Typography sx={{ fontWeight: "bold" }}>Description</Typography>
					<Typography>{description}</Typography>
				</Stack>
			</Stack>
		</Card>
	);
};

export default Description;
