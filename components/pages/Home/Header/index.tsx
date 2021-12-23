import Image from "next/image";
import { Box, Typography, Stack, Grid, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// Common
import Button from "../../../../common/Button";

// Components
import Container from "../../../Container";

interface PointProps {
	title: string;
	subtitle: string;
	index: number;
}

const Point = ({ title, subtitle, index }: PointProps) => (
	<Grid
		item
		lg={6}
		md={6}
		sm={6}
		xs={12}
		data-aos='fade-up'
		data-aos-delay={(index + 2) * 100}
	>
		<Stack spacing={2} sx={{ mb: 3 }} direction='row'>
			<Image
				src='/assets/icons/header-bullet.svg'
				alt='bullet'
				height={30}
				width={30}
				layout='intrinsic'
			/>

			<Stack spacing={1}>
				<Typography variant='body2' sx={{ fontWeight: 700 }}>
					{title}
				</Typography>
				<Typography variant='subtitle2'>{subtitle}</Typography>
			</Stack>
		</Stack>
	</Grid>
);

const points = [
	{
		title: "PlayStation Games",
		subtitle: "PS5 & PS4 Games"
	},
	{
		title: "Virtual Reality",
		subtitle: "30+ VR games"
	},
	{
		title: "Just Dance & Karaoke",
		subtitle: "Show your awesome skills"
	},
	{
		title: "Lounge, Snooker & More",
		subtitle: "Relax, layback and enjoy"
	}
];

const Header = () => {
	const theme = useTheme();
	const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

	return (
		<Box
			sx={{ width: "100%", display: "flex", justifyContent: "center" }}
			style={{
				background: isSmallScreen
					? "linear-gradient(to right, #fff 0%, #fff 100%)"
					: "linear-gradient(to right, rgba(18, 19, 84, .5) 0%, rgba(18, 19, 84, .5) 30%, rgba(255, 255, 255, 1) 30%, rgba(255, 255, 255, 1) 100%)"
			}}
		>
			<Container>
				<Stack
					direction={isSmallScreen ? "column" : "row"}
					spacing={10}
					alignItems='center'
				>
					<Stack
						flex={0.5}
						sx={{ position: "relative", borderRadius: 5, overflow: "hidden" }}
					>
						<div data-aos='zoom-in'>
							<Image
								src='/assets/images/header-image.gif'
								height={661}
								width={650}
								alt='Gamer'
							/>
						</div>

						<div
							style={{
								position: "absolute",
								top: 0,
								left: 0,
								height: "100%",
								width: "100%",
								backgroundColor: "#121354",
								opacity: 0.5
							}}
						/>
					</Stack>

					<Box sx={{ flex: 0.5 }}>
						<Stack spacing={3} alignItems='flex-start'>
							<Typography variant='h2' data-aos='fade-left'>
								Get your game on now.
							</Typography>
							<Typography
								sx={{ mb: 2, maxWidth: 450 }}
								data-aos='fade-left'
								data-aos-delay={100}
							>
								Whether you are a hardcore gamer or just someone who loves to
								have fun and relax, Crusifix is the place for you.
							</Typography>

							<Grid container>
								{points.map(({ title, subtitle }, index) => (
									<Point key={title} {...{ title, subtitle, index }} />
								))}
							</Grid>

							<Button
								variant='contained'
								size='large'
								data-aos='zoom-in'
								data-aos-delay={100}
							>
								See Games
							</Button>
						</Stack>
					</Box>
				</Stack>
			</Container>
		</Box>
	);
};

export default Header;
