import { FC, ChangeEvent, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
	Box,
	Stack,
	Typography,
	Link as MUILink,
	Grid,
	InputAdornment,
	IconButton,
	Checkbox,
	Hidden,
	Backdrop,
	CircularProgress,
	Alert,
	Snackbar,
	Modal,
	useMediaQuery,
	useTheme
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackwardIcon from "@mui/icons-material/ArrowBack";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import Lottie from "react-lottie";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";

// Lottie
import * as registerAnimation from "../../../../assets/lottie/Growth Animation.json";

// Common
import TextField from "../../../../common/TextField";
import Button from "../../../../common/Button";

// Utils
import { postRequest } from "../../../../utils/api/calls";
import { REGISTER } from "../../../../utils/api/urls";
import { validateRegisterInputs } from "../../../../utils/validators";

// Store
import { RootState } from "../../../../store";

const lottieOptions = {
	loop: true,
	autoplay: true,
	animationData: registerAnimation,
	renderSettings: {
		preserveAspectRatio: "xMidYMid slice"
	}
};

const initialState = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	phoneNumber: ""
};

const RegistrationForm: FC = () => {
	const user = useSelector((state: RootState) => state.user);
	const [showPassword, setShowPassword] = useState(false);
	const [isChecked, setIsChecked] = useState(false);
	const [alertIsOpen, setAlertIsOpen] = useState(false);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const theme = useTheme();
	const isMediumScreen = useMediaQuery(theme.breakpoints.down("lg"));
	const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));
	const [payload, setPayload] = useState(initialState);
	const [errors, setErrors] = useState({ ...initialState, checkbox: "" });
	const router = useRouter();

	useEffect(() => {
		if (user.user) {
			router.push(
				user?.user?.role === "admin"
					? "/auth/admin/dashboard"
					: "/auth/customer/dashboard"
			);
		}
	}, [user.user, router]);

	const { mutate, isLoading } = useMutation(postRequest, {
		onSuccess() {
			setErrors({ ...initialState, checkbox: "" });
			setModalIsOpen(true);
		},
		onError(error: any) {
			setErrorMessage(error?.response?.data?.error || "An error occured");
			setAlertIsOpen(true);
			setErrors({ ...initialState, checkbox: "" });
			console.error(error?.response?.data);
		}
	});

	const onChangeHandler = (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setPayload({
			...payload,
			[event.target.name]: event.target.value
		});
	};

	const handleClose = () => {
		setAlertIsOpen(false);
	};

	const onSubmit = () => {
		const { valid, errors: validationErrors } = validateRegisterInputs({
			...payload,
			isChecked
		});

		if (!valid) {
			setErrors({
				...errors,
				...validationErrors
			});
		} else {
			mutate({
				data: {
					...payload
				},
				url: REGISTER
			});
		}
	};

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
					p: smallScreen ? 2 : 5,
					bgcolor: "#fff",
					flex: isMediumScreen ? 1 : 0.65,
					height: "100vh",
					overflowY: "auto"
				}}
			>
				<Stack
					direction='row'
					justifyContent='space-between'
					alignItems='center'
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

					<Grid
						container
						spacing={5}
						sx={{ ml: smallScreen ? "-40px !important" : 0 }}
					>
						<Grid item lg={6} md={6} sm={6} xs={12}>
							<TextField
								fullWidth
								placeholder='First name'
								name='firstName'
								value={payload.firstName}
								onChange={event => onChangeHandler(event)}
								error={errors.firstName.trim() !== ""}
								helperText={errors.firstName}
							/>
						</Grid>

						<Grid item lg={6} md={6} sm={6} xs={12}>
							<TextField
								fullWidth
								placeholder='Last name'
								name='lastName'
								value={payload.lastName}
								onChange={event => onChangeHandler(event)}
								error={errors.lastName.trim() !== ""}
								helperText={errors.lastName}
							/>
						</Grid>

						<Grid item lg={12} md={12} sm={12} xs={12}>
							<TextField
								fullWidth
								placeholder='Email address'
								name='email'
								value={payload.email}
								onChange={event => onChangeHandler(event)}
								error={errors.email.trim() !== ""}
								helperText={errors.email}
							/>
						</Grid>

						<Grid item lg={12} md={12} sm={12} xs={12}>
							<TextField
								fullWidth
								placeholder='Phone number'
								name='phoneNumber'
								value={payload.phoneNumber}
								onChange={event => onChangeHandler(event)}
								error={errors.phoneNumber.trim() !== ""}
								helperText={errors.phoneNumber}
							/>
						</Grid>

						<Grid item lg={12} md={12} sm={12} xs={12}>
							<TextField
								fullWidth
								placeholder='Password'
								type={showPassword ? "text" : "password"}
								name='password'
								value={payload.password}
								onChange={event => onChangeHandler(event)}
								error={errors.password.trim() !== ""}
								helperText={
									errors.password.trim() === ""
										? "Must be 8 characters"
										: errors.password
								}
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

					<Stack>
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
									<Link href='/terms-and-conditions' passHref>
										<MUILink
											color='primary.main'
											underline='hover'
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
									</Link>
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

						{errors.checkbox.trim() !== "" && (
							<Typography
								sx={{
									fontFamily: "Open Sans, Roboto, sans-serif",
									color: "#d32f2f",
									fontSize: "0.75rem",
									textAlign: "left",
									lineHeight: 1.66,
									margin: "14px 0 0 14px"
								}}
							>
								{errors.checkbox}
							</Typography>
						)}
					</Stack>

					<Button
						variant='outlined'
						endIcon={<ArrowForwardIcon />}
						sx={{
							alignSelf: "flex-start",
							display: "flex",
							alignItems: "center",
							justifyContent: "center"
						}}
						onClick={onSubmit}
						disabled={isLoading}
					>
						{isLoading ? <CircularProgress size={30} /> : "Register"}
					</Button>
				</Stack>
			</Stack>

			<Snackbar
				anchorOrigin={{ vertical: "top", horizontal: "right" }}
				open={alertIsOpen}
				autoHideDuration={6000}
				onClose={handleClose}
			>
				<Alert
					variant='filled'
					onClose={handleClose}
					severity='error'
					sx={{ width: "100%" }}
				>
					{errorMessage}
				</Alert>
			</Snackbar>

			<Modal open={modalIsOpen}>
				<Stack
					spacing={2}
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: "95%",
						maxWidth: 600,
						bgcolor: "background.paper",
						boxShadow: 24,
						borderRadius: 5,
						p: 4
					}}
				>
					<Typography
						variant='h5'
						sx={{ fontWeight: "bold", textAlign: "center" }}
					>
						Registered Successfully
					</Typography>

					<Typography>
						You have created an account successfully. Kindly check your email
						for a link to verify your account.
					</Typography>

					<Stack justifyContent='center'>
						<Button
							variant='contained'
							color='primary'
							onClick={() => router.push("/login")}
						>
							Continue
						</Button>
					</Stack>
				</Stack>
			</Modal>
		</Box>
	);
};

export default RegistrationForm;
