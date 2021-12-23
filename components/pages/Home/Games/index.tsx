import Image from "next/image";
import { Box, Typography, Stack, Chip } from "@mui/material";
import Marquee from "react-fast-marquee";

interface GameCardProps {
	platform: string;
	bgImage: string;
	mainImage: string;
	name: string;
	tags: string[];
	color: string;
	last: boolean;
}

const GameCard = ({
	platform,
	bgImage,
	mainImage,
	name,
	tags,
	color,
	last
}: GameCardProps) => {
	return (
		<Stack
			spacing={3}
			sx={{
				borderRadius: 2,
				p: 2,
				backgroundImage: `url(${bgImage})`,
				backgroundSize: "cover",
				backgroundPosition: "center center",
				position: "relative",
				overflow: "hidden",
				width: 300,
				mr: last ? "2rem !important" : 0,
				paddingBottom: "3rem !important"
			}}
		>
			<Box
				sx={{
					width: "100%",
					height: "100%",
					bgcolor: color,
					opacity: 0.8,
					position: "absolute",
					top: 0,
					left: 0
				}}
			/>
			<Stack
				direction='row'
				spacing={2}
				sx={{ zIndex: 500, mt: "0 !important" }}
			>
				<Box
					sx={{
						height: 30,
						width: 30,
						borderRadius: 1,
						bgcolor: "#fff",
						transform: "rotate(45deg)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center"
					}}
				>
					<Typography
						sx={{ color: "#64646C", transform: "rotate(-45deg)" }}
						variant='button'
					>
						{platform}
					</Typography>
				</Box>

				<Typography variant='h6' sx={{ color: "#fff" }}>
					{platform === "ps" ? "PlayStation" : "Virtual Reality"}
				</Typography>
			</Stack>

			<Box
				sx={{ width: "100%", height: 140, position: "relative", zIndex: 5000 }}
			>
				<Image src={mainImage} alt={name} layout='fill' />
			</Box>

			<Typography
				variant='h6'
				sx={{ color: "#fff", textTransform: "uppercase", zIndex: 5000 }}
			>
				{name}
			</Typography>

			<Stack direction='row' spacing={1} sx={{ zIndex: 5000 }}>
				{tags.map(tag => (
					<Chip
						key={tag}
						label={tag}
						size='small'
						variant='outlined'
						sx={{ color: "#fff !important" }}
					/>
				))}
			</Stack>
		</Stack>
	);
};

const psGames = [
	{
		platform: "ps",
		bgImage: "/assets/images/games/fifa-bg.jpg",
		mainImage: "/assets/images/games/fifa-main.jpg",
		name: "FIFA 21",
		tags: ["NGN 1000 ON PS5", "NGN 500 ON PS4"],
		color: "#2F2E39"
	},
	{
		platform: "ps",
		bgImage: "/assets/images/games/mortal-kombat-bg.jpg",
		mainImage: "/assets/images/games/mortal-kombat-main.jpg",
		name: "Mortal Kombat",
		tags: ["NGN 1000 ON PS5", "NGN 500 ON PS4"],
		color: "#162C45"
	},
	{
		platform: "ps",
		bgImage: "/assets/images/games/pes-bg.jpg",
		mainImage: "/assets/images/games/pes-main.jpg",
		name: "PES 21",
		tags: ["NGN 1000 ON PS5", "NGN 500 ON PS4"],
		color: "#01004E"
	},
	{
		platform: "ps",
		bgImage: "/assets/images/games/gta-bg.jpg",
		mainImage: "/assets/images/games/gta-main.jpg",
		name: "GTA V",
		tags: ["NGN 1000 ON PS5", "NGN 500 ON PS4"],
		color: "#756777"
	},
	{
		platform: "ps",
		bgImage: "/assets/images/games/god-of-war-bg.jpg",
		mainImage: "/assets/images/games/god-of-war-main.png",
		name: "God of War",
		tags: ["NGN 1000 ON PS5", "NGN 500 ON PS4"],
		color: "#364A52"
	}
];

const vrGames = [
	{
		platform: "vr",
		bgImage: "/assets/images/games/beat-saber-bg.png",
		mainImage: "/assets/images/games/beat-saber-main.jpg",
		name: "Beat Saber",
		tags: ["NGN 1000"],
		color: "#091E2F"
	},
	{
		platform: "vr",
		bgImage: "/assets/images/games/sonic-bg.jpg",
		mainImage: "/assets/images/games/sonic-main.jpg",
		name: "Sonic Car Racing",
		tags: ["NGN 1000"],
		color: "#324D82"
	},
	{
		platform: "vr",
		bgImage: "/assets/images/games/bravo-team-bg.png",
		mainImage: "/assets/images/games/bravo-team-main.jpg",
		name: "Bravo Team",
		tags: ["NGN 1000"],
		color: "#412821"
	},
	{
		platform: "vr",
		bgImage: "/assets/images/games/vr-car-racing-bg.jpg",
		mainImage: "/assets/images/games/vr-car-racing-main.jpg",
		name: "VR Car Racing",
		tags: ["NGN 1000"],
		color: "#30262F"
	},
	{
		platform: "vr",
		bgImage: "/assets/images/games/arizona-bg.jpg",
		mainImage: "/assets/images/games/arizona-main.jpg",
		name: "Arizona Sunshine",
		tags: ["NGN 1000"],
		color: "#371D14"
	}
];

const Games = () => {
	return (
		<Stack
			spacing={3}
			sx={{
				width: "100%",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				alignContent: "center",
				mt: 15,
				px: 3
			}}
			id='games'
		>
			<Typography
				variant='button'
				sx={{ fontWeight: "bold", textAlign: "center" }}
				data-aos='fade-up'
			>
				Check out the games we&apos;ve got for you
			</Typography>
			<Typography
				variant='h3'
				sx={{ fontWeight: "bold", textAlign: "center" }}
				data-aos='fade-up'
			>
				Play the best and latest games
			</Typography>
			<Typography
				sx={{ maxWidth: 450, textAlign: "center" }}
				data-aos='fade-up'
			>
				We make sure our game library is up to date with the latest and trendy
				games just for your satisfaction.
			</Typography>
			<Marquee pauseOnHover gradient={false}>
				<Stack direction='row' spacing={3} alignItems='center'>
					{psGames.map((game, index) => (
						<GameCard
							key={game.name}
							{...game}
							last={psGames.length - 1 === index}
						/>
					))}
				</Stack>
			</Marquee>
			<Marquee pauseOnHover gradient={false}>
				<Stack direction='row' spacing={3} alignItems='center'>
					{vrGames.map((game, index) => (
						<GameCard
							key={game.name}
							{...game}
							last={vrGames.length - 1 === index}
						/>
					))}
				</Stack>
			</Marquee>
		</Stack>
	);
};

export default Games;
