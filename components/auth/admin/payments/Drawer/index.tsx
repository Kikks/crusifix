import { useState } from "react";
import {
	Drawer as MUIDrawer,
	Stack,
	Grid,
	IconButton,
	Typography,
	CircularProgress,
	MenuItem
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useQuery, useMutation } from "react-query";
import { useSelector } from "react-redux";

// Common
import TextField from "../../../../../common/TextField";
import Button from "../../../../../common/Button";

// Components
import Card from "../../../Card";

// Utils
import {
	GET_USERS,
	GET_CONTESTS,
	GET_GAMES,
	CREATE_PAYMENT
} from "../../../../../utils/api/urls";
import { getRequest, postRequest } from "../../../../../utils/api/calls";
import queryKeys from "../../../../../utils/api/queryKeys";
import { validateCreatePaymentInput } from "../../../../../utils/validators";

// Store
import { RootState } from "../../../../../store";

// Types
import { AlertProps } from "../../../../../pages/auth/admin/payments";

type DrawerProps = {
	drawerIsOpen: boolean;
	setDrawerIsOpen: (val: boolean) => void;
	setAlertData: (data: AlertProps) => void;
	refetch: () => void;
};

type CustomerProps = {
	_id: string;
	firstName: string;
	lastName: string;
};

type GameProps = {
	_id: string;
	name: string;
};

type ContestProps = {
	_id: string;
	name: string;
};

type PaymentProps = {
	gamePlayed: string;
	contestForPoints: string;
	amount: number;
	user: string;
};

type PaymentObjectProps = {
	gamePlayed: GameProps;
	contestForPoints: ContestProps;
	amount: number;
	user: CustomerProps;
};

const PaymentInfo = ({ info }: { info: string }) => (
	<Grid item lg={6} md={6} sm={12} xs={12}>
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
				border: "solid 1px rgba(0,0,0,0.23)",
				cursor: "pointer"
			}}
		>
			<Typography sx={{ textTransform: "capitalize" }}>{info}</Typography>
		</Stack>
	</Grid>
);

const DRAWER_WIDTH = 500;

const emptyPaymentObject = {
	gamePlayed: {
		_id: "",
		name: ""
	},
	contestForPoints: {
		_id: "",
		name: ""
	},
	amount: 0,
	user: {
		_id: "",
		firstName: "",
		lastName: ""
	}
};

const emptyPayload = {
	gamePlayed: "Select Game",
	contestForPoints: "Select Contest",
	amount: 0,
	user: "Customer Name"
};

const emptyError = {
	gamePlayed: "",
	contestForPoints: "",
	amount: "",
	user: ""
};

const Drawer = ({
	drawerIsOpen,
	setDrawerIsOpen,
	setAlertData,
	refetch
}: DrawerProps) => {
	const { user } = useSelector((state: RootState) => state.user);
	const [customers, setCustomers] = useState<CustomerProps[]>([]);
	const [games, setGames] = useState<GameProps[]>([]);
	const [contests, setContests] = useState<ContestProps[]>([]);
	const [currentPaymentObject, setCurrentPaymentObject] =
		useState<PaymentObjectProps>(emptyPaymentObject);
	const [payload, setPayload] = useState<PaymentProps>(emptyPayload);
	const [errors, setErrors] = useState(emptyError);
	const [multiPayments, setMultiPayments] = useState<PaymentObjectProps[]>([]);

	const { isLoading: usersIsFetching } = useQuery(
		queryKeys.getAllUsers,
		() => getRequest({ url: GET_USERS }),
		{
			onSuccess(data) {
				setCustomers(data?.data || []);
			},
			onError(error: any) {
				console.error(error?.response);
			},
			enabled: !!user?._id,
			refetchOnWindowFocus: false
		}
	);

	const { isLoading: gameIsFetching } = useQuery(
		queryKeys.getGames,
		() => getRequest({ url: GET_GAMES({ page: 1, limit: 50 }) }),
		{
			onSuccess(data) {
				setGames(data?.data || []);
			},
			onError(error: any) {
				console.error(error?.response);
			},
			enabled: !!user?._id,
			refetchOnWindowFocus: false
		}
	);

	const { isLoading: contestIsFetching } = useQuery(
		queryKeys.getContests,
		() => getRequest({ url: GET_CONTESTS }),
		{
			onSuccess(data) {
				setContests(data?.data || []);
			},
			onError(error: any) {
				console.error(error?.response);
			},
			enabled: !!user?._id,
			refetchOnWindowFocus: false
		}
	);

	const { mutate, isLoading } = useMutation(postRequest, {
		onSuccess(data) {
			setErrors(emptyError);
			refetch();
			setDrawerIsOpen(false);
			setAlertData({
				isOpen: true,
				message: "The payment has been created successfully",
				severity: "success"
			});
			setCurrentPaymentObject(emptyPaymentObject);
			setPayload(emptyPayload);
			setMultiPayments([]);
		},

		onError(error: any) {
			console.error(error?.response);
			setErrors(emptyError);
			setAlertData({
				isOpen: true,
				message: error?.response?.message || error?.response?.data?.error,
				severity: "error"
			});
		}
	});

	const onMultiPaymentClick = (data: PaymentObjectProps) => {
		const { valid, errors: validationErrors } = validateCreatePaymentInput({
			user: data.user._id,
			gamePlayed: data.gamePlayed._id,
			amount: data.amount,
			contestForPoints: data.contestForPoints._id
		});

		if (!valid) {
			setErrors(validationErrors);
		} else {
			setMultiPayments([...multiPayments, { ...data }]);
			setCurrentPaymentObject(emptyPaymentObject);
			setPayload(emptyPayload);
		}
	};

	const onSubmit = (data: PaymentObjectProps) => {
		const { valid, errors: validationErrors } =
			validateCreatePaymentInput(payload);

		if (!valid) {
			setErrors(validationErrors);
		} else {
			if (multiPayments.length == 0) {
				mutate({
					url: CREATE_PAYMENT,
					data: payload
				});
			} else {
				const paymentsData = [...multiPayments, { ...data }];
				for (const item of paymentsData) {
					mutate({
						url: CREATE_PAYMENT,
						data: {
							gamePlayed: item.gamePlayed._id,
							contestForPoints: item.contestForPoints._id,
							amount: item.amount,
							user: item.user._id
						}
					});
				}
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
			<Stack direction='row' sx={{ width: "100%" }} justifyContent='flex-start'>
				<IconButton onClick={() => setDrawerIsOpen(false)}>
					<ArrowBackIcon />
				</IconButton>
			</Stack>

			<Typography
				variant='h5'
				sx={{ textAlign: "center", fontWeight: "bold", my: 3 }}
			>
				Create new payment
			</Typography>

			{multiPayments.map(
				({ user, amount, gamePlayed, contestForPoints }, index) => (
					<Card key={index} sx={{ mb: 3, minHeight: 180 }}>
						<Grid container spacing={3}>
							<PaymentInfo
								info={`${user.firstName || ""} ${user.lastName || ""}`}
							/>
							<PaymentInfo info={amount.toString()} />
							<PaymentInfo info={gamePlayed.name} />
							<PaymentInfo info={contestForPoints.name} />
						</Grid>
					</Card>
				)
			)}

			{usersIsFetching || gameIsFetching || contestIsFetching ? (
				<Stack
					sx={{ width: "100%", height: 400 }}
					alignItems='center'
					justifyContent='center'
				>
					<CircularProgress />
				</Stack>
			) : (
				<Grid container spacing={3} sx={{ width: "100%", mb: 5, ml: -1 }}>
					<Grid item lg={12} md={12} sm={12} xs={12}>
						<TextField
							fullWidth
							select
							placeholder='Customer Name'
							value={payload.user}
							onChange={event =>
								setPayload({
									...payload,
									user: event.target.value
								})
							}
							error={errors.user.trim() !== ""}
							helperText={errors.user}
						>
							<MenuItem value='Customer Name'>
								<em>Customer Name</em>
							</MenuItem>
							{customers.map(({ _id, firstName, lastName }) => (
								<MenuItem
									key={_id}
									value={_id}
									sx={{ textTransform: "capitalize" }}
									onClick={() => {
										setCurrentPaymentObject({
											...currentPaymentObject,
											user: {
												_id,
												firstName,
												lastName
											}
										});
									}}
								>
									{`${firstName || ""} ${lastName || ""}`}
								</MenuItem>
							))}
						</TextField>
					</Grid>

					<Grid item lg={12} md={12} sm={12} xs={12}>
						<TextField
							fullWidth
							placeholder='Amount'
							type='number'
							value={payload.amount}
							onChange={event => {
								setPayload({
									...payload,
									amount: Number(event.target.value)
								});
								setCurrentPaymentObject({
									...currentPaymentObject,
									amount: Number(event.target.value)
								});
							}}
							error={errors.amount.trim() !== ""}
							helperText={errors.amount}
						/>
					</Grid>

					<Grid item lg={12} md={12} sm={12} xs={12}>
						<TextField
							fullWidth
							select
							placeholder='Select Game'
							value={payload.gamePlayed}
							onChange={event =>
								setPayload({
									...payload,
									gamePlayed: event.target.value
								})
							}
							error={errors.gamePlayed.trim() !== ""}
							helperText={errors.gamePlayed}
						>
							<MenuItem value='Select Game'>
								<em>Select Game</em>
							</MenuItem>
							{games.map(({ _id, name }) => (
								<MenuItem
									key={_id}
									value={_id}
									sx={{ textTransform: "capitalize" }}
									onClick={() =>
										setCurrentPaymentObject({
											...currentPaymentObject,
											gamePlayed: {
												_id,
												name
											}
										})
									}
								>
									{name}
								</MenuItem>
							))}
						</TextField>
					</Grid>

					<Grid item lg={12} md={12} sm={12} xs={12}>
						<TextField
							fullWidth
							select
							placeholder='Select Contest'
							value={payload.contestForPoints}
							onChange={event =>
								setPayload({
									...payload,
									contestForPoints: event.target.value
								})
							}
							error={errors.contestForPoints.trim() !== ""}
							helperText={errors.contestForPoints}
						>
							<MenuItem value='Select Contest'>
								<em>Select Contest</em>
							</MenuItem>
							{contests.map(({ _id, name }) => (
								<MenuItem
									key={_id}
									value={_id}
									sx={{ textTransform: "capitalize" }}
									onClick={() =>
										setCurrentPaymentObject({
											...currentPaymentObject,
											contestForPoints: {
												_id,
												name
											}
										})
									}
								>
									{name}
								</MenuItem>
							))}
						</TextField>
					</Grid>
				</Grid>
			)}

			<Stack
				direction='row'
				alignItems='center'
				justifyContent='center'
				spacing={2}
			>
				<Button
					variant='contained'
					color='secondary'
					disabled={
						usersIsFetching || gameIsFetching || contestIsFetching || isLoading
					}
					onClick={() => onMultiPaymentClick(currentPaymentObject)}
					endIcon={<ArrowForwardIcon />}
				>
					{isLoading ? <CircularProgress /> : "Multi payment"}
				</Button>

				<Button
					variant='contained'
					color='primary'
					disabled={
						usersIsFetching || gameIsFetching || contestIsFetching || isLoading
					}
					onClick={() => onSubmit(currentPaymentObject)}
					endIcon={<ArrowForwardIcon />}
				>
					{isLoading ? <CircularProgress /> : "Create"}
				</Button>
			</Stack>
		</MUIDrawer>
	);
};

export default Drawer;
