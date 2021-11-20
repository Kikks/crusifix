import { FC, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
	Box,
	Stack,
	Typography,
	Link as MUILink,
	Grid,
	InputAdornment,
	IconButton,
	TextField as MUITextField,
	TextFieldProps,
	Checkbox,
	Hidden,
	useMediaQuery,
	useTheme
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { makeStyles } from "@mui/styles";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

// Common
// import TextField from "../../../../common/TextField";
import Button from "../../../../common/Button";

const useStyles = makeStyles({
	root: {
		backgroundColor: "transparent",

		"& .MuiOutlinedInput-root": {
			borderRadius: 18,
			padding: ".1rem .5rem",
			boxShadow: "0 15px 25px rgba(0,0,0,.05)"
		}
	}
});

const TextField = ({ ...props }: TextFieldProps) => {
	const classes = useStyles();

	return <MUITextField className={classes.root} size='small' {...props} />;
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
						<Image
							src='/assets/svg/register.svg'
							alt='Girl waving'
							layout='fill'
						/>
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
							<Typography component='span' sx={{ fontWeight: "bold" }}>
								Terms and Conditions
							</Typography>
							, and our{" "}
							<Typography component='span' sx={{ fontWeight: "bold" }}>
								Privacy Policy
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
