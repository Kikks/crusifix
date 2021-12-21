import { FC, ChangeEvent, useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
	Box,
	Stack,
	Typography,
	Grid,
	CircularProgress,
	Hidden,
	Snackbar,
	Alert,
	Modal,
	InputAdornment,
	useMediaQuery,
	IconButton,
	useTheme
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import Lottie from "react-lottie";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";

// Lottie
import * as loginAnimation from "../../../assets/lottie/Login Colored.json";

// Common
import TextField from "../../../common/TextField";
import Button from "../../../common/Button";

// Utils
import { putRequest } from "../../../utils/api/calls";
import { RESET_PASSWORD } from "../../../utils/api/urls";
import { validateResetPasswordInput } from "../../../utils/validators";

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
	password: "",
	confirmPassword: ""
};

const ResetPasswordForm: FC = () => {
	const { user } = useSelector((state: RootState) => state.user);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [alertIsOpen, setAlertIsOpen] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const theme = useTheme();
	const isMediumScreen = useMediaQuery(theme.breakpoints.down("lg"));
	const [payload, setPayload] = useState(initialState);
	const [errors, setErrors] = useState(initialState);
	const router = useRouter();
	const { token } = router.query;

	useEffect(() => {
		if (user) {
			router.push(
				user?.role === "admin"
					? "/auth/admin/dashboard"
					: "/auth/customer/dashboard"
			);
		}
	}, [user, router]);

	const { mutate, isLoading } = useMutation(putRequest, {
		onSuccess() {
			setErrors(initialState);
			setModalIsOpen(true);
			router.push("/login");
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
		const { valid, errors: validationErrors } =
			validateResetPasswordInput(payload);

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
				url: RESET_PASSWORD({ token: typeof token === "string" ? token : "" })
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
							Reset Password
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
					alignItems='center'
					justifyContent='center'
					sx={{ my: 5, flex: 1, maxWidth: 550 }}
				>
					<Stack spacing={1} sx={{ mb: 5 }}>
						<Typography variant='h4' sx={{ fontWeight: "bold" }}>
							Recover your password
						</Typography>
					</Stack>

					<Grid container spacing={5}>
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
						<Grid item lg={12} md={12} sm={12} xs={12}>
							<TextField
								fullWidth
								value={payload.confirmPassword}
								onChange={event => onChangeHandler(event)}
								error={errors.confirmPassword.trim() !== ""}
								helperText={errors.confirmPassword}
								name='confirmPassword'
								placeholder='Confirm Password'
								type={showConfirmPassword ? "text" : "password"}
								InputProps={{
									endAdornment: (
										<InputAdornment position='end'>
											<IconButton
												onClick={() =>
													setShowConfirmPassword(prevState => !prevState)
												}
											>
												{showConfirmPassword ? (
													<VisibilityOff />
												) : (
													<Visibility />
												)}
											</IconButton>
										</InputAdornment>
									)
								}}
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
							{isLoading ? <CircularProgress size={30} /> : "Submit"}
						</Button>
					</Stack>
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
						Reset Password Successful
					</Typography>

					<Typography>
						You have been able to reset your password successfully. You can now
						proceed to login.
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

export default ResetPasswordForm;
