import { FC, ChangeEvent, useState } from "react";
import Link from "next/link";
import {
	Box,
	Stack,
	Typography,
	Link as MUILink,
	Grid,
	IconButton,
	CircularProgress,
	Hidden,
	Snackbar,
	Alert,
	useMediaQuery,
	useTheme
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackwardIcon from "@mui/icons-material/ArrowBack";
import Lottie from "react-lottie";
import { useMutation } from "react-query";

// Lottie
import * as loginAnimation from "../../../assets/lottie/Login Colored.json";

// Common
import TextField from "../../../common/TextField";
import Button from "../../../common/Button";

// Utils
import { postRequest } from "../../../utils/api/calls";
import { FORGOT_PASSWORD } from "../../../utils/api/urls";
import { validateForgotPasswordInput } from "../../../utils/validators";

// Store
import { RootState } from "../../../store";

const lottieOptions = {
	loop: true,
	autoplay: true,
	animationData: loginAnimation,
	renderSettings: {
		preserveAspectRatio: "xMidYMid slice"
	}
};

const initialState = {
	email: ""
};

const ForgotPasswordForm: FC = () => {
	const [alertIsOpen, setAlertIsOpen] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);
	const theme = useTheme();
	const isMediumScreen = useMediaQuery(theme.breakpoints.down("lg"));
	const [payload, setPayload] = useState(initialState);
	const [errors, setErrors] = useState(initialState);

	const { mutate, isLoading } = useMutation(postRequest, {
		onSuccess() {
			setErrors(initialState);
			setIsSubmitted(true);
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
		const { valid, errors: validationErrors } = validateForgotPasswordInput({
			email: payload.email
		});

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
				url: FORGOT_PASSWORD
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
						<Typography
							variant='h3'
							sx={{ textAlign: "center", fontWeight: "bold" }}
						>
							Forgot your password?
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

				{isSubmitted ? (
					<Stack
						sx={{
							my: 5,
							flex: 1,
							maxWidth: 550,
							width: "100%",
							justifyContent: "center",
							alignItems: "center"
						}}
					>
						<Stack
							spacing={2}
							sx={{
								p: 3,
								bgcolor: "secondary.main",
								width: "100%",
								borderRadius: 5
							}}
						>
							<Typography
								variant='h6'
								sx={{ fontWeight: "bold", color: "#fff" }}
							>
								Forgot password
							</Typography>
							<Typography sx={{ color: "#fff" }}>
								You should soon receive an email allowing you to reset your
								password. Please make sure to check your spam and trash if you
								can&apos;t find the email.
							</Typography>
						</Stack>
					</Stack>
				) : (
					<Stack
						alignItems='center'
						justifyContent='center'
						sx={{ my: 5, flex: 1, maxWidth: 550, width: "100%" }}
					>
						<Stack sx={{ mb: 5 }}>
							<Typography variant='h4' sx={{ fontWeight: "bold" }}>
								Recover your password
							</Typography>
						</Stack>

						<Grid container spacing={5}>
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
						</Grid>

						<Stack
							direction='row'
							sx={{
								width: "100%",
								justifyContent: "center",
								alignItems: "center",
								mt: 5
							}}
						>
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
								{isLoading ? <CircularProgress size={30} /> : "Send"}
							</Button>
						</Stack>
					</Stack>
				)}
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
		</Box>
	);
};

export default ForgotPasswordForm;
