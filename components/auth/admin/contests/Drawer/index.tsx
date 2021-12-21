import { useState, ChangeEvent } from "react";
import {
	Drawer as MUIDrawer,
	Stack,
	Grid,
	IconButton,
	Typography,
	CircularProgress
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useMutation } from "react-query";

// Components
import TextField from "../../../../../common/TextField";
import Button from "../../../../../common/Button";

// Utils
import { postRequest } from "../../../../../utils/api/calls";
import { CREATE_CONTEST } from "../../../../../utils/api/urls";
import { validateCreateContestInput } from "../../../../../utils/validators";

// Types
import { AlertProps } from "../../../../../pages/auth/admin/contests";

type DrawerProps = {
	drawerIsOpen: boolean;
	setDrawerIsOpen: (val: boolean) => void;
	refetch: () => void;
	setAlertData: (data: AlertProps) => void;
};

const emptyData = {
	name: "",
	description: "",
	contestAmount: 0,
	amountToPoints: 0,
	pointsToAmount: 0,
	startDate: "",
	endDate: ""
};

const emptyErrors = {
	name: "",
	description: "",
	contestAmount: "",
	amountToPoints: "",
	pointsToAmount: "",
	startDate: "",
	endDate: ""
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

	const { mutate, isLoading } = useMutation(postRequest, {
		onSuccess(data) {
			console.log(data);
			refetch();
			setDrawerIsOpen(false);
			setErrors(emptyErrors);
			setAlertData({
				isOpen: true,
				message: "The contest has been created successfully",
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

	const onChangeHandler = (
		event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		setPayload({
			...payload,
			[event.target.name]: event.target.value
		});
	};

	const onSubmit = () => {
		const { valid, errors: validationErrors } =
			validateCreateContestInput(payload);
		if (!valid) {
			setErrors(validationErrors);
		} else {
			mutate({
				url: CREATE_CONTEST,
				data: payload
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
				Create new contest
			</Typography>

			<Grid container spacing={3} sx={{ width: "100%", mb: 5, ml: -1 }}>
				<Grid item lg={6} md={12} sm={12} xs={12}>
					<TextField
						fullWidth
						placeholder='Contest Name'
						name='name'
						value={payload.name}
						onChange={event => onChangeHandler(event)}
						error={errors.name.trim() !== ""}
						helperText={errors.name}
					/>
				</Grid>

				<Grid item lg={6} md={12} sm={12} xs={12}>
					<TextField
						fullWidth
						placeholder='Reward Amount'
						type='number'
						name='contestAmount'
						value={payload.contestAmount === 0 ? '' : payload.contestAmount}
						onChange={event => onChangeHandler(event)}
						error={errors.contestAmount.trim() !== ""}
						helperText={errors.contestAmount}
					/>
				</Grid>

				<Grid item lg={12} md={12} sm={12} xs={12}>
					<TextField
						fullWidth
						placeholder='Contest Description'
						multiline
						InputProps={{ style: { padding: 20 } }}
						maxRows={7}
						rows={7}
						name='description'
						value={payload.description}
						onChange={event => onChangeHandler(event)}
						error={errors.description.trim() !== ""}
						helperText={errors.description}
					/>
				</Grid>

				<Grid item lg={6} md={12} sm={12} xs={12}>
					<TextField
						fullWidth
						placeholder='Start Date'
						type='date'
						name='startDate'
						value={payload.startDate}
						onChange={event => onChangeHandler(event)}
						error={errors.startDate.trim() !== ""}
						helperText={errors.startDate}
					/>
				</Grid>

				<Grid item lg={6} md={12} sm={12} xs={12}>
					<TextField
						fullWidth
						placeholder='End Date'
						type='date'
						name='endDate'
						value={payload.endDate}
						onChange={event => onChangeHandler(event)}
						error={errors.endDate.trim() !== ""}
						helperText={errors.endDate}
					/>
				</Grid>

				<Grid item lg={6} md={12} sm={12} xs={12}>
					<TextField
						fullWidth
						placeholder='Cash'
						type='number'
						name='amountToPoints'
						value={payload.amountToPoints === 0 ? '' : payload.amountToPoints}
						onChange={event => onChangeHandler(event)}
						error={errors.amountToPoints.trim() !== ""}
						helperText={errors.amountToPoints}
					/>
				</Grid>

				<Grid item lg={6} md={12} sm={12} xs={12}>
					<TextField
						fullWidth
						placeholder='Points'
						type='number'
						name='pointsToAmount'
						value={payload.pointsToAmount === 0 ? '' : payload.pointsToAmount}
						onChange={event => onChangeHandler(event)}
						error={errors.pointsToAmount.trim() !== ""}
						helperText={errors.pointsToAmount}
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
