import { FC, useState } from "react";
import Link from "next/link";
import {
	Box,
	Stack,
	Typography,
	Link as MUILink,
	Grid,
	InputAdornment,
	IconButton,
	TextFieldProps,
	Checkbox,
	Hidden,
	useMediaQuery,
	useTheme
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackwardIcon from "@mui/icons-material/ArrowBack";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import Lottie from "react-lottie";

// Lottie
import * as registerAnimation from "../../../../assets/lottie/Growth Animation.json";

// Common
import TextField from "../../../../common/TextField";
import Button from "../../../../common/Button";

const lottieOptions = {
	loop: true,
	autoplay: true,
	animationData: registerAnimation,
	renderSettings: {
		preserveAspectRatio: "xMidYMid slice"
	}
};

const RegistrationForm: FC = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [isChecked, setIsChecked] = useState(false);
	const theme = useTheme();
	const isMediumScreen = useMediaQuery(theme.breakpoints.down("lg"));

	return (
		<Box
			sx={{
				height: "100vh",
				width: "100%",
				display: "flex"
			}}
		>
			<Hidden lgDown>
				<Stack
					spacing={2}
					justifyContent='center'
					alignItems='center'
					sx={{
						height: "100vh",
						width: "100%",
						flex: 0.35,
						boxShadow: "15px 15px 35px rgba(0,0,0,0.1)",
						zIndex: 10
					}}
				>
					<div>
						<Typography variant='h2' sx={{ textAlign: "center" }}>
							Welcome to Crusifix!
						</Typography>
					</div>
					<Box sx={{ position: "relative", height: "50%", width: "100%" }}>
						<Lottie options={lottieOptions} />
					</Box>
				</Stack>
			</Hidden>
			<Stack
				spacing={5}
				alignItems='center'
				sx={{
					p: 5,
					bgcolor: "#fff",
					flex: isMediumScreen ? 1 : 0.65,
					height: "100vh",
					overflowY: "auto"
				}}
			>
				<Stack
					direction='row'
					justifyContent='space-between'
					sx={{ width: "100%" }}
				>
					<Link href='/' passHref>
						<IconButton>
							<ArrowBackwardIcon />
						</IconButton>
					</Link>
					<Typography sx={{ alignSelf: "flex-end" }}>
						Already have an account?{" "}
						<Link href='/login' passHref>
							<MUILink
								color='secondary.main'
								underline='hover'
								component='span'
								sx={{
									":hover": {
										cursor: "pointer"
									}
								}}
							>
								Login
							</MUILink>
						</Link>
					</Typography>
				</Stack>

				<Stack
					spacing={5}
					alignItems='center'
					justifyContent='center'
					sx={{ flex: 1, maxWidth: 550 }}
				>
					<Stack spacing={1}>
						<Typography variant='h4' sx={{ fontWeight: "bold" }}>
							Create your account
						</Typography>

						<Typography sx={{ textAlign: "center" }}>
							It&apos;s free and easy
						</Typography>
					</Stack>

					<Grid container spacing={5}>
						<Grid item lg={6} md={6} sm={6} xs={12}>
							<TextField fullWidth placeholder='First name' />
						</Grid>

						<Grid item lg={6} md={6} sm={6} xs={12}>
							<TextField fullWidth placeholder='Last name' />
						</Grid>

						<Grid item lg={12} md={12} sm={12} xs={12}>
							<TextField fullWidth placeholder='Email address' />
						</Grid>

						<Grid item lg={12} md={12} sm={12} xs={12}>
							<TextField fullWidth placeholder='Phone number' />
						</Grid>

						<Grid item lg={12} md={12} sm={12} xs={12}>
							<TextField
								fullWidth
								placeholder='Password'
								type={showPassword ? "text" : "password"}
								helperText='Must be 8 characters'
								InputProps={{
									endAdornment: (
										<InputAdornment position='end'>
											<IconButton
												onClick={() => setShowPassword(prevState => !prevState)}
											>
												{showPassword ? <VisibilityOff /> : <Visibility />}
											</IconButton>
										</InputAdornment>
									)
								}}
							/>
						</Grid>
					</Grid>

					<Stack
						direction='row'
						spacing={1}
						alignItems='flex-start'
						sx={{ width: "100%" }}
					>
						<Checkbox
							checked={isChecked}
							onChange={() => setIsChecked(prevState => !prevState)}
						/>
						<Typography>
							By creating an account means you agree to the{" "}
							<Typography component='span'>
								<MUILink
									color='primary.main'
									underline='hover'
									href='https://drive.google.com/file/d/1gX2ihW0ubXv7S3nA4g5gM-cEEcR4V3A3/view?usp=sharing'
									target='_blank'
									rel='noopener'
									sx={{
										fontWeight: "bold",
										":hover": {
											cursor: "pointer"
										}
									}}
								>
									Terms and Conditions
								</MUILink>
							</Typography>
							, and our{" "}
							<Typography component='span'>
								<MUILink
									color='primary.main'
									underline='hover'
									sx={{
										fontWeight: "bold",
										":hover": {
											cursor: "pointer"
										}
									}}
								>
									Privacy Policy
								</MUILink>
							</Typography>
						</Typography>
					</Stack>

					<Button
						variant='outlined'
						endIcon={<ArrowForwardIcon />}
						sx={{ alignSelf: "flex-start", mt: 5 }}
					>
						Register
					</Button>
				</Stack>
			</Stack>
		</Box>
	);
};

export default RegistrationForm;
