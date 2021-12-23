import Image from "next/image";
import {
	Box,
	Stack,
	Typography,
	Grid,
	useTheme,
	useMediaQuery
} from "@mui/material";
import Location from "@mui/icons-material/LocationOn";
import GoogleMapReact from "google-map-react";

// Components
import Container from "../../../Container";

const Marker = ({ text }: { text: string }) => (
	<div style={{ display: "flex", alignItems: "center" }}>
		<Location style={{ color: "#ff0000" }} />
		<span style={{ color: "#fff" }}>{text}</span>
	</div>
);

const Contact = () => {
	const theme = useTheme();
	const mediumScreen = useMediaQuery(theme.breakpoints.down("md"));
	const apiKey = process.env.MAP_API_KEY || "";
	const mapOptions = {
		center: {
			lat: 6.4910959,
			lng: 3.3563278
		},
		zoom: 17
	};

	return (
		<Box
			sx={{ mt: 15, width: "100%", display: "flex", justifyContent: "center" }}
		>
			<Container>
				<Stack
					spacing={3}
					alignContent='center'
					alignItems='center'
					data-aos='fade-up'
				>
					<Typography variant='h3' sx={{ fontWeight: "bold" }}>
						Contact Us
					</Typography>

					<Stack
						sx={{ width: "100%" }}
						direction={mediumScreen ? "column" : "row"}
						spacing={3}
					>
						<Stack
							flex={mediumScreen ? "" : 0.3}
							spacing={3}
							sx={{
								p: mediumScreen ? 1 : 3,
								borderRadius: 5,
								border: "solid 1px #E5EAF4"
							}}
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

						<Stack
							flex={mediumScreen ? "" : 0.7}
							sx={{ position: "relative", height: 400 }}
						>
							<GoogleMapReact
								bootstrapURLKeys={{ key: apiKey }}
								defaultCenter={mapOptions.center}
								defaultZoom={mapOptions.zoom}
							>
								<Marker text='Crusifix Games' />
							</GoogleMapReact>
						</Stack>
					</Stack>
				</Stack>
			</Container>
		</Box>
	);
};

export default Contact;
