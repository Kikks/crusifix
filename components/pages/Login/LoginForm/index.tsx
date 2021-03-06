import { FC, ChangeEvent, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
	Box,
	Stack,
	Typography,
	Link as MUILink,
	Grid,
	InputAdornment,
	IconButton,
	Checkbox,
	CircularProgress,
	Hidden,
	Snackbar,
	Alert,
	Modal,
	Backdrop,
	useMediaQuery,
	useTheme
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackwardIcon from "@mui/icons-material/ArrowBack";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import Lottie from "react-lottie";
import { useMutation, useQuery } from "react-query";
import { useSelector, useDispatch } from "react-redux";

// Lottie
import * as loginAnimation from "../../../../assets/lottie/Login Colored.json";

// Common
import TextField from "../../../../common/TextField";
import Button from "../../../../common/Button";

// Utils
import { postRequest, getRequest } from "../../../../utils/api/calls";
import { LOGIN, GET_ME } from "../../../../utils/api/urls";
import queryKeys from "../../../../utils/api/queryKeys";
import { validateLoginInputs } from "../../../../utils/validators";

// Store
import { login } from "../../../../store/user";
import { RootState } from "../../../../store";

const lottieOptions = {
	loop: true,
	autoplay: true,
	animationData: loginAnimation,
	renderSettings: {
		preserveAspectRatio: "xMidYMid slice"
	}
};

const initialState = {
	email: "",
	password: ""
};

const LoginForm: FC = () => {
	const user = useSelector((state: RootState) => state.user);
	const [showPassword, setShowPassword] = useState(false);
	const [alertIsOpen, setAlertIsOpen] = useState(false);
	const [backdropIsOpen, setBackdropIsOpen] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [isChecked, setIsChecked] = useState(false);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const theme = useTheme();
	const isMediumScreen = useMediaQuery(theme.breakpoints.down("lg"));
	const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));
	const [payload, setPayload] = useState(initialState);
	const [errors, setErrors] = useState(initialState);
	const dispatch = useDispatch();
	const router = useRouter();

	let token: string | null = null;

	if (typeof window !== "undefined") {
		token = localStorage.getItem("token");
	}

	useEffect(() => {
		if (user.user) {
			router.push(`/auth/${user?.user?.role}/dashboard`);
		}
	}, [user.user, router]);

	const { refetch } = useQuery(
		queryKeys.getMe,
		() => getRequest({ url: GET_ME }),
		{
			onSuccess(data: any) {
				setBackdropIsOpen(false);
				if (data?.data) {
					if (data?.data?.isEmailVerified) {
						dispatch(login(data?.data));
						router.push(`/auth/${data?.data?.role}/dashboard`);
					} else {
						setModalIsOpen(true);
					}
				}
			},
			onError(error: any) {
				console.error(error?.response);
				setBackdropIsOpen(false);
				setErrorMessage(error?.response?.data?.error || "An error occured");
				setAlertIsOpen(true);
			},
			enabled: !!token
		}
	);

	const { mutate, isLoading } = useMutation(postRequest, {
		onSuccess(data: any) {
			localStorage.setItem("token", data?.token);
			setErrors(initialState);
			refetch();
			setBackdropIsOpen(true);
		},
		onError(error: any) {
			setErrorMessage(error?.response?.data?.error || "An error occured");
			setAlertIsOpen(true);
			setErrors(initialState);
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
		const { valid, errors: validationErrors } = validateLoginInputs(
			payload.email,
			payload.password
		);

		if (!valid) {
			setErrors({
				...initialState,
				...validationErrors
			});
		} else {
			mutate({
				data: {
					...payload
				},
				url: LOGIN
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

					<Grid
						container
						spacing={5}
						sx={{ ml: smallScreen ? "-40px !important" : 0 }}
					>
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
								value={payload.password}
								onChange={event => onChangeHandler(event)}
								error={errors.password.trim() !== ""}
								helperText={errors.password}
								name='password'
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

						<Link href='/forgot-password' passHref>
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
						</Link>
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
						{isLoading ? <CircularProgress size={30} /> : "Login"}
					</Button>

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

					<Backdrop
						sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }}
						open={backdropIsOpen}
					>
						<CircularProgress color='inherit' />
					</Backdrop>
				</Stack>
			</Stack>

			<Modal open={modalIsOpen} sx={{ outline: "none" }}>
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
						p: 4,
						textAlign: "center"
					}}
				>
					<Typography
						variant='h5'
						sx={{ fontWeight: "bold", textAlign: "center" }}
					>
						Confirm Email
					</Typography>

					<Typography>
						You need to confirm you email address to continue. Check your email
						for a link to confirm your email address. If you do not see the
						email, kindly check your spam folder.
					</Typography>
				</Stack>
			</Modal>
		</Box>
	);
};

export default LoginForm;
