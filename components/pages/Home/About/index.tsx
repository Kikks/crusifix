import Image from "next/image";
import { Box, Stack, Typography } from "@mui/material";

// Components
import Container from "../../../../components/Container";

// Styles
import styles from "../../../../styles/Home.module.scss";

const About = () => {
	return (
		<Box
			sx={{ width: "100%", mt: 15, display: "flex", justifyContent: "center" }}
		>
			<Container>
				<Box sx={{ display: "flex", position: "relative", pl: 5 }}>
					<Box
						sx={{
							overflow: "hidden",
							borderRadius: 5,
							position: "relative",
							flex: 0.7,
							height: 500
						}}
					>
						<Image
							src='/assets/images/home-about-image.jpg'
							layout='fill'
							height={500}
							width={754}
							alt='Gaming Arena'
						/>

						<div className={styles["home__floating-circle"]} />
					</Box>

					<Stack
						spacing={2}
						sx={{
							position: "absolute",
							right: 70,
							bgcolor: "#fff",
							p: 5,
							border: "1px solid #121354",
							width: "35vw",
							minWidth: 400,
							maxWidth: 563,
							borderRadius: 5,
							mt: -5,
							boxShadow: "-50px 50px 50px rgba(0,0,0,.05)",
							zIndex: 10
						}}
					>
						<Typography variant='h4' sx={{ fontWeight: 700 }}>
							About Crusifix Games And Lounge
						</Typography>

						<Typography variant='subtitle1'>
							Crusifix provides the most unique gaming arcade and lounge
							experience in Lagos. Crusifix houses everything you need to throw
							an awesome party! We&apos;re talking game consoles, WiFi, pool
							tables, high definition TVs with projectors (and more!) We&apos;re
							not catering to just adults either- Crusifix is the perfect place
							for kids birthday parties. We will ensure that they have a blast
							playing games that most kids see on YouTube or live streams! You
							won&apos;t find anything like this anywhere in your area. Crusifix
							offers plenty of goodies to satisfy any craving. Come by anytime-
							we&apos;ll be waiting with open arms!
						</Typography>
					</Stack>
				</Box>
			</Container>
		</Box>
	);
};

export default About;
