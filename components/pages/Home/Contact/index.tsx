import Image from "next/image";
import { Box, Stack, Typography, Grid } from "@mui/material";

// Components
import Container from "../../../Container";

const Contact = () => {
	return (
		<Box
			sx={{ mt: 15, width: "100%", display: "flex", justifyContent: "center" }}
		>
			<Container>
				<Stack spacing={3} alignContent='center' alignItems='center'>
					<Typography variant='h3' sx={{ fontWeight: "bold" }}>
						Contact Us
					</Typography>

					<Stack sx={{ width: "100%" }} direction='row' spacing={3}>
						<Stack
							flex={0.3}
							spacing={3}
							sx={{ p: 3, borderRadius: 5, border: "solid 1px #E5EAF4" }}
							alignItems='flex-start'
						>
							<Image
								src='/assets/icons/contact.svg'
								height={64}
								width={64}
								alt='contact'
							/>

							<Grid spacing={2} container>
								<Grid item lg={3} md={3} sm={3} xs={3}>
									<Typography variant='h6' sx={{ fontWeight: "bold " }}>
										Address:
									</Typography>
								</Grid>

								<Grid item lg={9} md={9} sm={9} xs={9}>
									<Typography sx={{ maxWidth: 200 }}>
										2nd Floor Leisure Mall 96 Adeniran Ogunsanya St Surulere
										101241, Lagos
									</Typography>
								</Grid>
							</Grid>

							<Grid spacing={2} container>
								<Grid item lg={3} md={3} sm={3} xs={3}>
									<Typography variant='h6' sx={{ fontWeight: "bold " }}>
										Email:
									</Typography>
								</Grid>

								<Grid item lg={9} md={9} sm={9} xs={9}>
									<Typography>crusifixgamesng@gmail.com</Typography>
								</Grid>
							</Grid>

							<Grid spacing={2} container>
								<Grid item lg={3} md={3} sm={3} xs={3}>
									<Typography variant='h6' sx={{ fontWeight: "bold " }}>
										Phone:
									</Typography>
								</Grid>

								<Grid item lg={9} md={9} sm={9} xs={9}>
									<Typography>+234 706 885 4303</Typography>
								</Grid>
							</Grid>
						</Stack>

						<Stack flex={0.7} sx={{ position: "relative", height: 400 }}>
							<Image src='/assets/images/map.png' layout='fill' alt='map' />
							<Box
								sx={{
									width: "100%",
									height: "100%",
									bgcolor: "#000",
									opacity: 0.6,
									position: "absolute"
								}}
							/>
						</Stack>
					</Stack>
				</Stack>
			</Container>
		</Box>
	);
};

export default Contact;
