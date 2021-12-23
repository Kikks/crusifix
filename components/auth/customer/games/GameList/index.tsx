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
	mainImage: string;
	name: string;
	vrCost?: number;
	psFourCost?: number;
	psFiveCost?: number;
	color: string;
}

export type Game = {
	name: string;
	platform: string;
	gameImage: string;
	vrCost?: number;
	psFourCost?: number;
	psFiveCost?: number;
};

const colors = [
	"#2F2E39",
	"#162C45",
	"#01004E",
	"#756777",
	"#364A52",
	"#091E2F",
	"#324D82",
	"#412821",
	"#30262F",
	"#371D14"
];

const GameCard = ({
	platform,
	mainImage,
	name,
	psFourCost,
	psFiveCost,
	vrCost,
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
				<Image
					src={mainImage || "https://via.placeholder.com/300.png?text=Crusifix"}
					alt={name}
					layout='fill'
				/>
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
				{psFourCost && (
					<Chip
						label={`N${psFourCost} on PS4`}
						size='small'
						variant='outlined'
						sx={{
							color: "#fff !important",
							mb: smallScreen ? 0 : mediumScreen ? 2 : 0
						}}
					/>
				)}

				{psFiveCost && (
					<Chip
						label={`N${psFiveCost} on PS5`}
						size='small'
						variant='outlined'
						sx={{
							color: "#fff !important",
							mb: smallScreen ? 0 : mediumScreen ? 2 : 0
						}}
					/>
				)}

				{vrCost && (
					<Chip
						label={`N${vrCost}`}
						size='small'
						variant='outlined'
						sx={{
							color: "#fff !important",
							mb: smallScreen ? 0 : mediumScreen ? 2 : 0
						}}
					/>
				)}
			</Stack>
		</Stack>
	);
};

const GameList = ({ games }: { games: Game[] }) => {
	const isBigScreen = useMediaQuery("(min-width: 1500px)");

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
						lg={isBigScreen ? 3 : 4}
						md={4}
						sm={6}
						xs={12}
					>
						<GameCard
							{...{
								platform: game?.platform,
								mainImage: game?.gameImage,
								name: game?.name,
								vrCost: game?.vrCost,
								psFourCost: game?.psFourCost,
								psFiveCost: game?.psFiveCost,
								color:
									colors[
										index % games.length > colors.length - 1
											? index % (colors.length - 1)
											: index
									]
							}}
						/>
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default GameList;
