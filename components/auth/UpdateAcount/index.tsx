import { useState, ChangeEvent } from "react";
import {
	Stack,
	Avatar,
	Typography,
	Divider,
	Grid,
	CircularProgress
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "react-query";

// Common
import Button from "../../../common/Button";
import TextField from "../../../common/TextField";

// Components
import Card from "../Card";

// Utils
import { getInitials } from "../../../utils/formatters";
import { putRequest } from "../../../utils/api/calls";
import { UPDATE_USER } from "../../../utils/api/urls";
import { validateUpdateAccountInput } from "../../../utils/validators";

// Store
import { RootState } from "../../../store";
import { login } from "../../../store/user";

// Types
import { AlertProps } from "../../../pages/auth/admin/settings";

const emptyData = {
	firstName: "",
	lastName: "",
	email: "",
	phoneNumber: ""
};

const UpdateAccount = ({
	setAlertData
}: {
	setAlertData: (data: AlertProps) => void;
}) => {
	const { user } = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();
	const [payload, setPayload] = useState({
		firstName: user?.firstName || "",
		lastName: user?.lastName || "",
		email: user?.email || "",
		phoneNumber: user?.phoneNumber || ""
	});
	const [errors, setErrors] = useState(emptyData);

	const { mutate, isLoading } = useMutation(putRequest, {
		onSuccess(data) {
			if (data?.data) {
				dispatch(login(data.data));
			}
			setErrors(emptyData);
			setAlertData({
				isOpen: true,
				message: "Profile updated successfully",
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
			validateUpdateAccountInput(payload);
		if (!valid) {
			setErrors(validationErrors);
		} else {
			mutate({
				url: UPDATE_USER({ id: user?._id || "" }),
				data: payload
			});
		}
	};

	return (
		<Stack spacing={3} sx={{ mt: 5, p: 2 }}>
			<Stack spacing={1}>
				<Stack
					direction='row'
					alignItems='center'
					justifyContent='space-between'
				>
					<Typography variant='h4' sx={{ fontWeight: "bold" }}>
						Personal Settings
					</Typography>

					<Button
						variant='contained'
						color='secondary'
						onClick={() => onSubmit()}
						endIcon={<ArrowForwardIcon />}
						disabled={isLoading}
					>
						{isLoading ? <CircularProgress /> : "Save"}
					</Button>
				</Stack>

				<Stack direction='row' spacing={2} alignItems='center'>
					<Avatar src={"/"} sx={{ bgcolor: "green" }}>
						{getInitials(`${user?.firstName || ""} ${user?.lastName || ""}`)}
					</Avatar>
					<Typography
						sx={{
							textTransform: "capitalize",
							fontWeight: "bold",
							color: "#9fa2b4"
						}}
					>{`${user?.firstName || ""} ${user?.lastName || ""}`}</Typography>
				</Stack>
			</Stack>

			<Divider />

			<Card>
				<Grid container spacing={5} sx={{ width: "100%", py: 3, ml: -1 }}>
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

					<Grid item lg={6} md={6} sm={6} xs={12}>
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

					<Grid item lg={6} md={6} sm={6} xs={12}>
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
			</Card>
		</Stack>
	);
};

export default UpdateAccount;
