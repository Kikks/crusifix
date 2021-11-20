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
import * as loginAnimation from "../../../../assets/lottie/Login Colored.json";

// Common
import TextField from "../../../../common/TextField";
import Button from "../../../../common/Button";

const lottieOptions = {
	loop: true,
	autoplay: true,
	animationData: loginAnimation,
	renderSettings: {
		preserveAspectRatio: "xMidYMid slice"
	}
};

const LoginForm: FC = () => {
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
						flex: 0.35,
						boxShadow: "15px 15px 35px rgba(0,0,0,0.1)",
						zIndex: 10
					}}
				>
					<div>
						<Typography variant='h2' sx={{ textAlign: "center" }}>
							Hey! you are back.
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
					<Typography>
						Don&apos;t have an account?{" "}
						<Link href='/register' passHref>
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
								Get Started
							</MUILink>
						</Link>
					</Typography>
				</Stack>

				<Stack
					spacing={3}
					alignItems='center'
					justifyContent='center'
					sx={{ my: 5, flex: 1, maxWidth: 550 }}
				>
					<Stack spacing={1}>
						<Typography variant='h4' sx={{ fontWeight: "bold" }}>
							Welcome back!
						</Typography>

						<Typography sx={{ textAlign: "center" }}>
							Good to see you here again!
						</Typography>
					</Stack>

					<Grid container spacing={5}>
						<Grid item lg={12} md={12} sm={12} xs={12}>
							<TextField fullWidth placeholder='Email address' />
						</Grid>

						<Grid item lg={12} md={12} sm={12} xs={12}>
							<TextField
								fullWidth
								placeholder='Password'
								type={showPassword ? "text" : "password"}
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
						justifyContent='space-between'
						alignItems='center'
						sx={{ width: "100%" }}
					>
						<Stack direction='row' spacing={1} alignItems='center'>
							<Checkbox
								checked={isChecked}
								onChange={() => setIsChecked(prevState => !prevState)}
							/>
							<Typography>Remember me</Typography>
						</Stack>

						<Typography>
							<MUILink
								color='primary.main'
								underline='hover'
								component='span'
								sx={{
									fontWeight: "bold",
									":hover": {
										cursor: "pointer"
									}
								}}
							>
								Forgot Password?
							</MUILink>
						</Typography>
					</Stack>

					<Button
						variant='outlined'
						endIcon={<ArrowForwardIcon />}
						sx={{ alignSelf: "flex-start" }}
					>
						Login
					</Button>
				</Stack>
			</Stack>
		</Box>
	);
};

export default LoginForm;
