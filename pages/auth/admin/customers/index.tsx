import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import {
	Box,
	Stack,
	IconButton,
	Snackbar,
	Alert,
	AlertColor
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

// Components
import Statistics from "../../../../components/auth/admin/dashboard/Statistics";
import CustomerList, {
	Customer,
	SelectedCustomer
} from "../../../../components/auth/admin/customers/CustomerList";
import Drawer from "../../../../components/auth/admin/customers/Drawer";

// Common
import Button from "../../../../common/Button";

// Utils
import { getRequest } from "../../../../utils/api/calls";
import { GET_USERS } from "../../../../utils/api/urls";
import queryKeys from "../../../../utils/api/queryKeys";

// Store
import { RootState } from "../../../../store";

type DrawerMode = "edit" | "create";

export type AlertProps = {
	isOpen: boolean;
	message: string;
	severity: AlertColor;
};

const emptyCustomer = {
	_id: "",
	firstName: "",
	lastName: "",
	email: "",
	phoneNumber: ""
};

const Customers: NextPage = () => {
	const router = useRouter();
	const { user } = useSelector((state: RootState) => state.user);

	const [drawerIsOpen, setDrawerIsOpen] = useState(false);
	const [drawerMode, setDrawerMode] = useState<DrawerMode>("create");
	const [drawerData, setDrawerData] = useState(emptyCustomer);
	const [customers, setCustomers] = useState<Customer[]>([]);
	const [alertData, setAlertData] = useState<AlertProps>({
		isOpen: false,
		message: "",
		severity: "success"
	});
	const [selectedCustomer, setSelectedCustomer] =
		useState<SelectedCustomer>(emptyCustomer);

	const { isLoading, isFetching, refetch } = useQuery(
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

	useEffect(() => {
		if (drawerMode === "edit") {
			setDrawerData(selectedCustomer);
		} else {
			setDrawerData(emptyCustomer);
		}
	}, [drawerMode, selectedCustomer]);

	const onClickHandler = (mode: DrawerMode) => {
		setDrawerMode(mode);
		setDrawerIsOpen(true);
	};

	const handleAlertClose = () => {
		setAlertData({
			...alertData,
			isOpen: false
		});
	};

	return (
		<Box sx={{ p: 3 }}>
			<Head>
				<title>Customers - Crusifix</title>
				<meta name='description' content='Details about customers' />
			</Head>
			<Stack
				direction='row'
				justifyContent='space-between'
				alignItems='center'
				sx={{ width: "100%" }}
			>
				<IconButton onClick={() => router.back()}>
					<ArrowBackIcon />
				</IconButton>

				<Stack direction='row' alignItems='center' spacing={2}>
					<Button
						variant='contained'
						color='secondary'
						onClick={() => onClickHandler("edit")}
						endIcon={<ArrowForwardIcon />}
						disabled={selectedCustomer._id.trim() === ""}
					>
						Edit
					</Button>

					<Button
						variant='contained'
						color='primary'
						onClick={() => onClickHandler("create")}
						endIcon={<ArrowForwardIcon />}
					>
						Create
					</Button>
				</Stack>
			</Stack>

			<Stack sx={{ pt: 5 }}>
				<Statistics />
				<CustomerList
					{...{
						customers,
						isLoading: isLoading || isFetching,
						selectedCustomer,
						setSelectedCustomer
					}}
				/>
				<Drawer
					{...{
						drawerIsOpen,
						setDrawerIsOpen,
						drawerData,
						drawerMode,
						refetch,
						setAlertData
					}}
				/>
			</Stack>

			<Snackbar
				anchorOrigin={{ vertical: "top", horizontal: "right" }}
				open={alertData.isOpen}
				autoHideDuration={6000}
				onClose={handleAlertClose}
			>
				<Alert
					variant='filled'
					onClose={handleAlertClose}
					severity={alertData.severity}
					sx={{ width: "100%" }}
				>
					{alertData.message}
				</Alert>
			</Snackbar>
		</Box>
	);
};

export default Customers;
