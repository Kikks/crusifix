import { useState, ChangeEvent } from "react";
import {
	Drawer as MUIDrawer,
	Stack,
	Grid,
	IconButton,
	Backdrop,
	MenuItem,
	Avatar,
	Typography,
	CircularProgress
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FileIcon from "@mui/icons-material/InsertDriveFileOutlined";
import { useMutation } from "react-query";
import axios from "axios";

// Components
import TextField from "../../../../../common/TextField";
import Button from "../../../../../common/Button";

// Utils
import { postRequest } from "../../../../../utils/api/calls";
import { CREATE_GAME, UPLOAD_IMAGE } from "../../../../../utils/api/urls";
import { validateCreateGameInput } from "../../../../../utils/validators";

// Types
import { AlertProps } from "../../../../../pages/auth/admin/contests";

type DrawerProps = {
	drawerIsOpen: boolean;
	setDrawerIsOpen: (val: boolean) => void;
	refetch: () => void;
	setAlertData: (data: AlertProps) => void;
};

const platforms = [
	{
		value: "vr",
		key: "Virtual Reality"
	},
	{
		value: "ps",
		key: "PlayStation"
	}
];

const emptyData = {
	name: "",
	platform: "Platform",
	durationInMins: 0,
	psFourCost: 0,
	psFiveCost: 0,
	vrCost: 0
};

const emptyErrors = {
	name: "",
	platform: "",
	durationInMins: "",
	amount: "",
	image: "",
	psFourCost: "",
	psFiveCost: "",
	vrCost: ""
};

const DRAWER_WIDTH = 450;

const Drawer = ({
	drawerIsOpen,
	setDrawerIsOpen,
	refetch,
	setAlertData
}: DrawerProps) => {
	const [errors, setErrors] = useState(emptyErrors);
	const [payload, setPayload] = useState({
		...emptyData
	});
	const [gameImageInfo, setGameImageInfo] = useState({
		gameImage: "",
		cloudinaryId: ""
	});
	const [backdropIsOpen, setBackdropIsOpen] = useState(false);

	const { mutate, isLoading } = useMutation(postRequest, {
		onSuccess(data) {
			refetch();
			setDrawerIsOpen(false);
			setErrors(emptyErrors);
			setAlertData({
				isOpen: true,
				message: "The game has been created successfully",
				severity: "success"
			});
		},
		onError(error: any) {
			console.error(error?.response);
			setErrors(emptyErrors);
			setAlertData({
				isOpen: true,
				message: error?.response?.data?.error,
				severity: "error"
			});
		}
	});

	const uploadImage = (url: string, formData: FormData) => {
		axios
			.post(url, formData)
			.then(res => {
				setGameImageInfo({
					gameImage: res.data?.secure_url || "",
					cloudinaryId: res.data?.asset_id || ""
				});
				setBackdropIsOpen(false);
			})
			.catch(err => {
				setGameImageInfo({
					gameImage: "",
					cloudinaryId: ""
				});
				setBackdropIsOpen(false);
				console.error(err?.response);
			});
	};

	const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
		setBackdropIsOpen(true);
		const data = new FormData();
		data.append("file", event?.target?.files![0]);
		data.append("upload_preset", "ece3ntzr");
		uploadImage(UPLOAD_IMAGE, data);
	};

	const onChangeHandler = (
		event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		setPayload({
			...payload,
			[event.target.name]: event.target.value
		});
	};

	const onSubmit = () => {
		const { valid, errors: validationErrors } = validateCreateGameInput({
			...payload,
			image: gameImageInfo.gameImage
		});
		if (!valid) {
			setErrors(validationErrors);
		} else {
			mutate({
				url: CREATE_GAME,
				data:
					payload.platform === "vr"
						? {
								gameImage: gameImageInfo.gameImage,
								cloudinaryId: gameImageInfo.cloudinaryId,
								name: payload.name,
								vrCost: payload.vrCost,
								durationInMins: payload.durationInMins,
								platform: payload.platform
						  }
						: {
								gameImage: gameImageInfo.gameImage,
								cloudinaryId: gameImageInfo.cloudinaryId,
								name: payload.name,
								psFourCost: payload.psFourCost,
								psFiveCost: payload.psFiveCost,
								durationInMins: payload.durationInMins,
								platform: payload.platform
						  }
			});
		}
	};

	return (
		<MUIDrawer
			open={drawerIsOpen}
			onClose={() => setDrawerIsOpen(false)}
			variant='temporary'
			anchor='right'
			sx={{
				width: "100vw",
				maxWidth: DRAWER_WIDTH,
				zIndex: 50,

				"& .MuiDrawer-paper": {
					width: "100vw",
					maxWidth: DRAWER_WIDTH,
					boxSizing: "border-box",
					border: "none",
					p: 1
				}
			}}
		>
			<Stack direction='row' sx={{ width: "100%" }} justifyContent='flex-start'>
				<IconButton onClick={() => setDrawerIsOpen(false)}>
					<ArrowBackIcon />
				</IconButton>
			</Stack>

			<Typography
				variant='h5'
				sx={{ textAlign: "center", fontWeight: "bold", my: 3 }}
			>
				Create new game
			</Typography>

			<Grid container spacing={3} sx={{ width: "100%", mb: 5, ml: -1 }}>
				<Grid item lg={12} md={12} sm={12} xs={12}>
					<label htmlFor='file'>
						<Stack spacing={1}>
							<Stack
								direction='row'
								spacing={2}
								alignItems='center'
								sx={{
									width: "100%",
									bgcolor: "#fff",
									borderRadius: 18,
									padding: ".7rem 1.2rem",
									boxShadow: "0 15px 25px rgba(0,0,0,.05)",
									border:
										errors.image.trim() !== ""
											? "solid 1px #d32f2f"
											: "solid 1px rgba(0,0,0,0.23)",
									cursor: "pointer"
								}}
							>
								{gameImageInfo.gameImage.trim() !== "" ? (
									<Stack
										direction='row'
										sx={{ width: "100%", justifyContent: "center" }}
									>
										<Avatar
											src={gameImageInfo.gameImage}
											sx={{ width: 70, height: 70 }}
										/>
									</Stack>
								) : (
									<>
										<FileIcon />
										<Typography>Tap to upload game image</Typography>
									</>
								)}
							</Stack>
							<Typography
								variant='caption'
								sx={{
									color:
										errors.image.trim() !== ""
											? "#d32f2f !important"
											: "inherit"
								}}
							>
								{errors.image.trim() !== ""
									? errors.image
									: "Max image size of 6MB"}
							</Typography>
						</Stack>
						<input
							type='file'
							style={{ display: "none" }}
							name='file'
							id='file'
							onChange={event => handleImageChange(event)}
						/>
					</label>
				</Grid>

				<Grid item lg={12} md={12} sm={12} xs={12}>
					<TextField
						fullWidth
						placeholder='Name'
						name='name'
						value={payload.name}
						onChange={event => onChangeHandler(event)}
						error={errors.name.trim() !== ""}
						helperText={errors.name}
					/>
				</Grid>

				<Grid item lg={12} md={12} sm={12} xs={12}>
					<TextField
						fullWidth
						select
						placeholder='Platform'
						value={payload.platform}
						onChange={event =>
							setPayload({
								...payload,
								platform: event.target.value
							})
						}
						error={errors.platform.trim() !== ""}
						helperText={errors.platform}
					>
						<MenuItem value='Platform'>
							<em>Platform</em>
						</MenuItem>
						{platforms.map(({ key, value }) => (
							<MenuItem key={value} value={value}>
								{key}
							</MenuItem>
						))}
					</TextField>
				</Grid>

				<Grid item lg={12} md={12} sm={12} xs={12}>
					<TextField
						fullWidth
						placeholder='Duration(in mins)'
						type='number'
						name='durationInMins'
						value={payload.durationInMins === 0 ? "" : payload.durationInMins}
						onChange={event =>
							setPayload({
								...payload,
								durationInMins: Number(event.target.value)
							})
						}
						error={errors.durationInMins.trim() !== ""}
						helperText={errors.durationInMins}
					/>
				</Grid>

				{payload.platform === "vr" && (
					<Grid item lg={12} md={12} sm={12} xs={12}>
						<TextField
							fullWidth
							placeholder='VR Amount'
							type='number'
							name='vrCost'
							value={payload.vrCost === 0 ? "" : payload.vrCost}
							onChange={event =>
								setPayload({
									...payload,
									vrCost: Number(event.target.value)
								})
							}
							error={errors.vrCost.trim() !== ""}
							helperText={errors.vrCost}
						/>
					</Grid>
				)}

				{payload.platform === "ps" && (
					<>
						<Grid item lg={12} md={12} sm={12} xs={12}>
							<TextField
								fullWidth
								placeholder='PS4 Amount'
								type='number'
								name='psFourCost'
								value={payload.psFourCost === 0 ? "" : payload.psFourCost}
								onChange={event =>
									setPayload({
										...payload,
										psFourCost: Number(event.target.value)
									})
								}
								error={errors.psFourCost.trim() !== ""}
								helperText={errors.psFourCost}
							/>
						</Grid>

						<Grid item lg={12} md={12} sm={12} xs={12}>
							<TextField
								fullWidth
								placeholder='PS5 Amount'
								type='number'
								name='psFiveCost'
								value={payload.psFiveCost === 0 ? "" : payload.psFiveCost}
								onChange={event =>
									setPayload({
										...payload,
										psFiveCost: Number(event.target.value)
									})
								}
								error={errors.psFiveCost.trim() !== ""}
								helperText={errors.psFiveCost}
							/>
						</Grid>
					</>
				)}
			</Grid>
			<Stack
				direction='row'
				alignItems='center'
				justifyContent='center'
				spacing={2}
			>
				<Button
					variant='contained'
					color='primary'
					onClick={() => onSubmit()}
					endIcon={<ArrowForwardIcon />}
					disabled={isLoading}
				>
					{isLoading ? <CircularProgress /> : "Create"}
				</Button>
			</Stack>

			<Backdrop
				sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }}
				open={backdropIsOpen}
			>
				<CircularProgress color='inherit' />
			</Backdrop>
		</MUIDrawer>
	);
};

export default Drawer;
