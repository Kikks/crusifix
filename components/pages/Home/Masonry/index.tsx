import Image from "next/image";
import { FC } from "react";
import { Typography, Stack, Box } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// Common
import Button from "../../../../common/Button";

// Components
import Container from "../../../Container";

interface MasonryImageProps {
	index: number;
	columns: string;
	rows: string;
}

const ListItem: FC = ({ children }) => (
	<Stack direction='row' spacing={2}>
		<Box
			sx={{
				bgcolor: "#36be7e",
				borderRadius: 100,
				height: 24,
				width: 24,
				display: "flex",
				justifyContent: "center",
				alignItems: "center"
			}}
		>
			<CheckIcon sx={{ color: "#fff", fontSize: 15, fontWeight: "bold" }} />
		</Box>

		<Typography variant='button' sx={{ fontWeight: "bold" }}>
			{children}
		</Typography>
	</Stack>
);

const MasonryImage = ({ index, rows, columns }: MasonryImageProps) => (
	<Box
		sx={{
			borderRadius: 3,
			overflow: "hidden",
			position: "relative",
			gridColumn: columns,
			gridRow: rows
		}}
	>
		<Image
			layout='fill'
			src={`/assets/images/masonry-image-${index}.jpg`}
			alt='Gamers'
		/>
	</Box>
);

const images = [
	{
		columns: "7/16",
		rows: "2/7"
	},
	{
		columns: "16/26",
		rows: "1/7"
	},
	{
		columns: "3/18",
		rows: "7/15"
	},
	{
		columns: "18/26",
		rows: "7/17"
	},
	{
		columns: "1/7",
		rows: "15/22"
	},
	{
		columns: "7/18",
		rows: "15/23"
	},
	{
		columns: "18/26",
		rows: "17/24"
	}
];

const Masonry = () => {
	return (
		<Box
			sx={{ width: "100%", mt: 15, display: "flex", justifyContent: "center" }}
		>
			<Container>
				<Stack direction='row' alignItems='center'>
					<Stack spacing={5} flex={0.5} alignItems='flex-start'>
						<Stack spacing={1}>
							<Typography variant='h2' sx={{ maxWidth: 450 }}>
								Play To Win NGN 500,000!!!
							</Typography>
							<Typography>
								We have organized an engaging contest for our awesome customers,
								play any of these games to earn points. Customer with the
								highest points at the end of the contest wins!
							</Typography>
						</Stack>

						<Stack spacing={1}>
							{[
								"ps5 and ps4 games",
								"virtual car racing",
								"virtual reality games",
								"just dance & karaoke",
								"snooker and many more"
							].map(item => (
								<ListItem key={item}>{item}</ListItem>
							))}
						</Stack>

						<Button variant='outlined' endIcon={<ArrowForwardIcon />}>
							Register Now
						</Button>
					</Stack>

					<Box
						sx={{
							flex: 0.5,
							display: "grid",
							gridTemplateColumns: "repeat(25, 20px)",
              gridTemplateRows: "repeat(23, 20px)",
              gap: '10px'
						}}
					>
						{images.map((image, index) => (
							<MasonryImage key={index} index={index + 1} {...image} />
						))}
					</Box>
				</Stack>
			</Container>
		</Box>
	);
};

export default Masonry;
