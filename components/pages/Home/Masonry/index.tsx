import Image from "next/image";
import { ReactNode } from "react";
import { Typography, Stack, Box, useTheme, useMediaQuery } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Marquee from "react-fast-marquee";

// Common
import Button from "../../../../common/Button";

// Components
import Container from "../../../Container";

interface MasonryImageProps {
	index: number;
	columns: string;
	rows: string;
}

type ListItemProps = {
	children: ReactNode;
	index: number;
};

const ListItem = ({ children, index }: ListItemProps) => (
	<Stack
		direction='row'
		spacing={2}
		data-aos='fade-up'
		data-aos-delay={(index + 0.5) * 100}
	>
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
		data-aos='zoom-in'
		data-aos-delay={(index + 1) * 100}
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
		rows: "2/7",
		sColumns: "1/5"
	},
	{
		columns: "16/26",
		rows: "1/7",
		sColumns: "5/10"
	},
	{
		columns: "3/18",
		rows: "7/15",
		sColumns: "10/15"
	},
	{
		columns: "18/26",
		rows: "7/17",
		sColumns: "15/17"
	},
	{
		columns: "1/7",
		rows: "15/22",
		sColumns: "17/21"
	},
	{
		columns: "7/18",
		rows: "15/23",
		sColumns: "21/25"
	},
	{
		columns: "18/26",
		rows: "17/24",
		sColumns: "25/28"
	}
];

const Masonry = () => {
	const mediumScreen = useMediaQuery("(max-width: 1000px)");

	return (
		<Box
			sx={{ width: "100%", mt: 15, display: "flex", justifyContent: "center" }}
		>
			<Container>
				<Stack direction='row' alignItems='center'>
					<Stack
						spacing={5}
						flex={mediumScreen ? 1 : 0.5}
						alignItems='flex-start'
					>
						<Stack spacing={1}>
							<Typography
								variant='h2'
								sx={{ maxWidth: 450 }}
								data-aos='fade-left'
							>
								Play To Win NGN 500,000!!!
							</Typography>
							<Typography sx={{ maxWidth: 600 }} data-aos='fade-left'>
								We have organized an engaging contest for our awesome customers,
								play any of these games to earn points. Customer with the
								highest points at the end of the contest wins!
							</Typography>
						</Stack>

						{mediumScreen && (
							<Marquee pauseOnHover gradient={false}>
								<Box
									sx={{
										display: "grid",
										gridTemplateColumns: "repeat(27, 10vw)",
										gridTemplateRows: "35vw",
										gap: "10px"
									}}
								>
									{images.map(({sColumns}, index) => (
										<Box
											key={index}
											sx={{
												borderRadius: 3,
												overflow: "hidden",
												position: "relative",
												gridColumn: sColumns,
												gridRow: "1/2"
											}}
										>
											<Image
												layout='fill'
												src={`/assets/images/masonry-image-${index + 1}.jpg`}
												alt='Gamers'
											/>
										</Box>
									))}
								</Box>
							</Marquee>
						)}

						<Stack spacing={1}>
							{[
								"ps5 and ps4 games",
								"virtual car racing",
								"virtual reality games",
								"just dance & karaoke",
								"snooker and many more"
							].map((item, index) => (
								<ListItem key={item} index={index}>
									{item}
								</ListItem>
							))}
						</Stack>

						<div data-aos='fade-up' data-aos-delay={500}>
							<Button variant='outlined' endIcon={<ArrowForwardIcon />}>
								Register Now
							</Button>
						</div>
					</Stack>

					{!mediumScreen && (
						<Box
							sx={{
								flex: 0.5,
								display: "grid",
								gridTemplateColumns: "repeat(25, 20px)",
								gridTemplateRows: "repeat(23, 20px)",
								gap: "10px"
							}}
						>
							{images.map((image, index) => (
								<MasonryImage key={index} index={index + 1} {...image} />
							))}
						</Box>
					)}
				</Stack>
			</Container>
		</Box>
	);
};

export default Masonry;
