import { useState, useEffect, ChangeEvent } from "react";
import {
	Drawer as MUIDrawer,
	Stack,
	Grid,
	IconButton,
	InputAdornment,
	CircularProgress
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { useMutation } from "react-query";

// Components
import TextField from "../../../../../common/TextField";
import Button from "../../../../../common/Button";

// Utils
import { postRequest, putRequest } from "../../../../../utils/api/calls";
import { CREATE_USER, UPDATE_USER } from "../../../../../utils/api/urls";
import { validateCreateAccountInput } from "../../../../../utils/validators";

// Types
import { AlertProps } from "../../../../../pages/auth/admin/customers";

type DrawerProps = {
	drawerIsOpen: boolean;
	drawerData: {
		_id: string;
		firstName: string;
		lastName: string;
		email: string;
		phoneNumber: string;
	};
	drawerMode: "create" | "edit";
	setDrawerIsOpen: (val: boolean) => void;
	refetch: () => void;
	setAlertData: (data: AlertProps) => void;
};

const DRAWER_WIDTH = 450;

const emptyData = {
	firstName: "",
	lastName: "",
	email: "",
	phoneNumber: "",
};

const Drawer = ({
	drawerIsOpen,
	setDrawerIsOpen,
	drawerData,
	drawerMode,
	refetch,
	setAlertData
}: DrawerProps) => {
	const [errors, setErrors] = useState(emptyData);
	const [payload, setPayload] = useState({
		_id: "",
		...emptyData
	});

	useEffect(() => {
		if (drawerData) {
			setPayload({
				...drawerData
			});
		}
	}, [drawerData]);

	const onChangeHandler = (
		event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		setPayload({
			...payload,
			[event.target.name]: event.target.value
		});
	};

	const { mutate: update, isLoading: updateIsLoading } = useMutation(
		putRequest,
		{
			onSuccess(data) {
				refetch();
				setDrawerIsOpen(false);
				setErrors(emptyData);
				setAlertData({
					isOpen: true,
					message: "The user has been updated successfully",
					severity: "success"
				});
			},
			onError(error: any) {
				console.error(error?.response);
				setErrors(emptyData);
				setAlertData({
					isOpen: true,
					message: error?.response?.data?.error,
					severity: "error"
				});
			}
		}
	);

	const { mutate: create, isLoading: createIsLoading } = useMutation(
		postRequest,
		{
			onSuccess(data) {
				console.log(data);
				refetch();
				setDrawerIsOpen(false);
				setErrors(emptyData);
				setAlertData({
					isOpen: true,
					message: "The user has been created successfully",
					severity: "success"
				});
			},

			onError(error: any) {
				console.error(error?.response);
				setErrors(emptyData);
				setAlertData({
					isOpen: true,
					message: error?.response?.message,
					severity: "error"
				});
			}
		}
	);

	const onSubmit = (mode: "edit" | "create") => {
		const { valid, errors } = validateCreateAccountInput(payload);
		if (!valid) {
			setErrors(errors);
		} else {
			if (mode === "edit") {
				update({
					url: UPDATE_USER({ id: payload._id }),
					data: payload
				});
			} else {
				create({
					url: CREATE_USER,
					data: {
						firstName: payload.firstName,
						lastName: payload.lastName,
						email: payload.email,
						phoneNumber: payload.phoneNumber
					}
				});
			}
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
			<Stack
				direction='row'
				sx={{ width: "100%", mb: 5 }}
				justifyContent='flex-start'
			>
				<IconButton onClick={() => setDrawerIsOpen(false)}>
					<ArrowBackIcon />
				</IconButton>
			</Stack>

			<Grid container spacing={3} sx={{ width: "100%", mb: 5, ml: -1 }}>
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
			</Grid>
			<Stack alignItems='center' justifyContent='center'>
				{drawerMode === "edit" ? (
					<Button
						variant='contained'
						color='secondary'
						endIcon={<ArrowForwardIcon />}
						disabled={updateIsLoading}
						onClick={() => onSubmit(drawerMode)}
					>
						{updateIsLoading ? <CircularProgress size={25} /> : "Edit"}
					</Button>
				) : (
					<Button
						variant='contained'
						color='primary'
						endIcon={<ArrowForwardIcon />}
						disabled={createIsLoading}
						onClick={() => onSubmit(drawerMode)}
					>
						{createIsLoading ? <CircularProgress size={25} /> : "Create"}
					</Button>
				)}
			</Stack>
		</MUIDrawer>
	);
};

export default Drawer;
