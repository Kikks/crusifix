import { Box, Stack, Typography } from "@mui/material";

type MostPlayedProps = {
	image: string;
	role: string;
	name: string;
	frequency: number;
	days: number;
};

const MostPlayed = ({
	image,
	role,
	name,
	frequency,
	days
}: MostPlayedProps) => {
	return (
		<Stack
			justifyContent='flex-end'
			sx={{
				width: "100%",
				height: "100%",
				background: `url(${image}) center center`,
				backgroundSize: "cover",
				borderRadius: 5,
				boxShadow: "0 10px 30px rgba(209,213,223,0.5)"
			}}
		>
			<Stack spacing={1} sx={{ p: 3 }}>
				<Typography variant='h6' sx={{ color: "#fff", fontWeight: "bold" }}>
					{role === "admin"
						? "Most Games played this week"
						: "Your most played games"}
				</Typography>
				<Typography sx={{ color: "#fff" }}>{name}</Typography>
				<Typography
					sx={{ color: "#fff" }}
				>{`Played ${frequency} times in the last ${days} days`}</Typography>
			</Stack>
		</Stack>
	);
};

export default MostPlayed;
