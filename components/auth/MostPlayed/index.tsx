import { useState } from "react";
import { Box, Stack, Typography, useTheme, Skeleton } from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { useSelector } from "react-redux";

// Store
import { RootState } from "../../../store";

export type Game = {
	game_info: {
		gameImage?: string;
		name: string;
	}[];
};

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const MostPlayed = ({
	games,
	isLoading
}: {
	games: Game[];
	isLoading: boolean;
}) => {
	const { user } = useSelector((state: RootState) => state.user);
	const theme = useTheme();
	const [activeStep, setActiveStep] = useState(0);
	const maxSteps = games.length;

	const handleNext = () => {
		setActiveStep(prevState => prevState + 1);
	};

	const handlePrevious = () => {
		setActiveStep(prevState => prevState - 1);
	};

	const handleStepChange = (step: number) => {
		setActiveStep(step);
	};

	return isLoading ? (
		<Skeleton
			animation='wave'
			variant='rectangular'
			width='100%'
			sx={{ borderRadius: 5 }}
			height={220}
		/>
	) : games.length === 0 ? (
		<Stack
			justifyContent='flex-end'
			sx={{
				width: "100%",
				height: "100%",
				background: `linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.4)), url("https://via.placeholder.com/300.png?text=Crusifix"}) center center`,
				backgroundSize: "cover",
				borderRadius: 5,
				boxShadow: "0 10px 30px rgba(209,213,223,0.5)",
				minHeight: 220
			}}
		>
			<Stack spacing={1} sx={{ p: 3 }}>
				<Typography variant='h6' sx={{ color: "#fff", fontWeight: "bold" }}>
					You haven&apos;t played any game yet
				</Typography>
			</Stack>
		</Stack>
	) : (
		<AutoPlaySwipeableViews
			axis={theme.direction === "rtl" ? "x-reverse" : "x"}
			index={activeStep}
			onChangeIndex={handleStepChange}
			enableMouseEvents
		>
			{games.map(({ game_info }, index) => (
				<Stack
					key={index}
					justifyContent='flex-end'
					sx={{
						width: "100%",
						height: "100%",
						background: `linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.4)), url(${
							game_info[0]?.gameImage ||
							"https://via.placeholder.com/300.png?text=Crusifix"
						}) center center`,
						backgroundSize: "cover",
						borderRadius: 5,
						boxShadow: "0 10px 30px rgba(209,213,223,0.5)",
						minHeight: 220
					}}
				>
					<Stack spacing={1} sx={{ p: 3 }}>
						<Typography variant='h6' sx={{ color: "#fff", fontWeight: "bold" }}>
							{user?.role === "admin"
								? "Most Games played this week"
								: "Your most played games"}
						</Typography>
						<Typography sx={{ color: "#fff", textTransform: "capitalize" }}>
							{game_info[0]?.name || ""}
						</Typography>
					</Stack>
				</Stack>
			))}
		</AutoPlaySwipeableViews>
	);
};

export default MostPlayed;
