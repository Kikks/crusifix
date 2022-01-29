import Image from "next/image";
import { Stack, Box, Typography, useTheme, useMediaQuery } from "@mui/material";

// Components
import Container from "../../../Container";

const WinnerImage = ({
	image,
	mt,
	text,
	animation
}: {
	image: string;
	mt: number;
	text: string;
	animation: string;
}) => {
	const theme = useTheme();
	const mediumScreen = useMediaQuery(theme.breakpoints.down("md"));

	return (
		<Box
			mt={mt}
			p={3}
			sx={{
				borderRadius: 3,
				position: "relative",
				height: mediumScreen ? "80vw" : "50vw",
				maxHeight: mediumScreen ? 600 : 500,
				maxWidth: mediumScreen ? 600 : 500,
				width: mediumScreen ? "80vw" : "50vw",
				display: "flex",
				flexDirection: "column",
				justifyContent: "flex-end",
				overflow: "hidden",
				boxShadow: "0 10px 30px rgba(209,213,223,0.5)"
			}}
			data-aos={animation}
		>
			<Image src={image} layout='fill' alt='Winner' />
			<Box
				sx={{
					height: "100%",
					width: "100%",
					position: "absolute",
					top: 0,
					left: 0,
					zIndex: 450,
					background:
						"linear-gradient(to top, rgba(15,15,46,0.7) 0 20%, rgba(127,128,163,0.3) 40% 60%, transparent 80% 100%)"
				}}
			/>

			<Typography
				sx={{ fontWeight: "bold", color: "#fff", zIndex: 500 }}
				variant='h5'
			>
				{text}
			</Typography>
		</Box>
	);
};

const Winners = () => {
	const theme = useTheme();
	const mediumScreen = useMediaQuery(theme.breakpoints.down("md"));
	return (
		<Box
			sx={{ width: "100%", mt: 15, display: "flex", justifyContent: "center" }}
		>
			<Container>
				<Stack spacing={1} alignContent='center' alignItems='center'>
					<Typography
						variant='button'
						sx={{ textAlign: "center", fontWeight: "bold", color: "#36be7e" }}
						data-aos='fade-up'
					>
						OUR FIRST CHAMPION
					</Typography>
					<Typography
						variant='h3'
						sx={{ fontWeight: "bold", textAlign: "center" }}
						data-aos='fade-up'
					>
						Gamers Passion Competition
					</Typography>
					<Typography sx={{ maxWidth: 650, textAlign: "center" }}>
						We&apos;ve had a great competition over the past month, we are happy
						to announce the first winner of the Gamers Passion Competition.
					</Typography>
				</Stack>

				<Stack
					spacing={2}
					direction={mediumScreen ? "column" : "row"}
					justifyContent='center'
					alignItems='center'
					sx={{ width: "100%" }}
					px={3}
					mt={7}
				>
					<WinnerImage
						mt={mediumScreen ? 0 : 7}
						animation='fade-right'
						image='/assets/images/winner-image-1.jpg'
						text='CEO of Crusifix congratulates the winner of the Gamers Passion Competition'
					/>
					<WinnerImage
						mt={mediumScreen ? 0 : -5}
						animation='fade-left'
						image='/assets/images/winner-image-2.jpg'
						text='Reigning Champion!'
					/>
				</Stack>
			</Container>
		</Box>
	);
};
export default Winners;
