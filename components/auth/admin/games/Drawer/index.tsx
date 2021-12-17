import { useState, ChangeEvent } from "react";
import {
	Drawer as MUIDrawer,
	Stack,
	Grid,
	IconButton,
	MenuItem,
	Typography,
	CircularProgress
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FileIcon from "@mui/icons-material/InsertDriveFileOutlined";
import { useMutation } from "react-query";

// Components
import TextField from "../../../../../common/TextField";
import Button from "../../../../../common/Button";

// Utils
import { postRequest } from "../../../../../utils/api/calls";
import { CREATE_GAME } from "../../../../../utils/api/urls";
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
	durationInMinutes: 0,
	amount: 0
};

const emptyErrors = {
	name: "",
	platform: "",
	durationInMinutes: "",
	amount: "",
	image: ""
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
	const [image, setImage] = useState<any | null>(null);

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

	const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
		const files = event?.target?.files;

		if (files![0]) {
			if (files![0].type.split("/")[0] !== "image") {
				alert("Please select an image file");
			} else {
				setImage(files![0]);
			}
		}
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
			image
		});
		if (!valid) {
			setErrors(validationErrors);
		} else {
			const formData = new FormData();
			formData.append('gameImage', image)
			formData.append("name", payload.name);
			formData.append("platform", payload.platform);
			formData.append("durationInMinutes", payload.durationInMinutes.toString());
			formData.append('amount', payload.amount.toString())
			// formData.append("durationInMinutes", payload.platform);

			mutate({
				url: CREATE_GAME,
				data: formData
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
								{image ? (
									<>
										<Typography>{image?.name}</Typography>
									</>
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
						name='durationInMinutes'
						value={payload.durationInMinutes}
						onChange={event => onChangeHandler(event)}
						error={errors.durationInMinutes.trim() !== ""}
						helperText={errors.durationInMinutes}
					/>
				</Grid>

				<Grid item lg={12} md={12} sm={12} xs={12}>
					<TextField
						fullWidth
						placeholder='Amount'
						name='amount'
						value={payload.amount}
						onChange={event => onChangeHandler(event)}
						error={errors.amount.trim() !== ""}
						helperText={errors.amount}
					/>
				</Grid>
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
		</MUIDrawer>
	);
};

export default Drawer;
