import Image from "next/image";
import {
	Stack,
	Typography,
	Box,
	IconButton,
	Grid,
	Chip,
	useTheme,
	useMediaQuery
} from "@mui/material";
import DownIcon from "@mui/icons-material/ArrowDropDown";
import ListIcon from "@mui/icons-material/ViewList";
import GridIcon from "@mui/icons-material/ViewComfy";

// Common
import Button from "../../../../../common/Button";

interface GameCardProps {
	platform: string;
	bgImage: string;
	mainImage: string;
	name: string;
	tags: string[];
	color: string;
}

const games = [
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
	},
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

const GameCard = ({
	platform,
	bgImage,
	mainImage,
	name,
	tags,
	color
}: GameCardProps) => {
	const theme = useTheme();
	const mediumScreen = useMediaQuery(theme.breakpoints.down("md"));
	const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
				width: smallScreen ? 300 : mediumScreen ? 250 : 300,
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
				sx={{ width: "100%", height: 140, position: "relative", zIndex: 100 }}
			>
				<Image src={mainImage} alt={name} layout='fill' />
			</Box>

			<Typography
				variant='h6'
				sx={{ color: "#fff", textTransform: "uppercase", zIndex: 100 }}
			>
				{name}
			</Typography>

			<Stack
				direction='row'
				spacing={1}
				sx={{ zIndex: 100, width: "100%", flexWrap: "wrap" }}
			>
				{tags.map(tag => (
					<Chip
						key={tag}
						label={tag}
						size='small'
						variant='outlined'
						sx={{
							color: "#fff !important",
							mb: smallScreen ? 0 : mediumScreen ? 2 : 0
						}}
					/>
				))}
			</Stack>
		</Stack>
	);
};

const GameList = () => {
	return (
		<Box sx={{ display: "grid", width: "100%", mt: 3 }}>
			<Typography variant='h4' sx={{ fontWeight: "bold", mb: 1 }}>
				My games
			</Typography>

			<Stack direction='row' justifyContent='flex-end' spacing={2}>
				<Button variant='contained' color='secondary' endIcon={<DownIcon />}>
					Filter by
				</Button>

				<Stack direction='row' alignItems='center'>
					<IconButton
						sx={{
							bgcolor: "#fff",
							borderRadius: 0,
							borderTopLeftRadius: 7,
							borderBottomLeftRadius: 7,
							border: "solid 1px #eee"
						}}
					>
						<ListIcon />
					</IconButton>

					<IconButton
						sx={{
							bgcolor: "secondary.main",
							borderRadius: 0,
							borderTopRightRadius: 7,
							borderBottomRightRadius: 7
						}}
					>
						<GridIcon sx={{ color: "#fff" }} />
					</IconButton>
				</Stack>
			</Stack>

			<Grid container spacing={3} sx={{ mt: 5 }}>
				{games.map((game, index) => (
					<Grid
						item
						alignItems='center'
						alignContent='center'
						sx={{
							display: "grid",
							justifyItems: "center",
							justifyContent: "center"
						}}
						key={index}
						lg={3}
						md={4}
						sm={6}
						xs={12}
					>
						<GameCard {...game} />
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default GameList;
