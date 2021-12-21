import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import {
	Box,
	Stack,
	IconButton,
	Alert,
	AlertColor,
	Snackbar
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

// Components
import Statistics from "../../../../components/auth/admin/payments/Statistics";
import PaymentList, {
	PaymentProps
} from "../../../../components/auth/admin/payments/PaymentList";
import Drawer from "../../../../components/auth/admin/payments/Drawer";
import MVC from "../../../../components/auth/admin/payments/MVC";

// Common
import Button from "../../../../common/Button";

// Utils
import { getRequest } from "../../../../utils/api/calls";
import { GET_PAYMENTS } from "../../../../utils/api/urls";
import queryKeys from "../../../../utils/api/queryKeys";

// Store
import { RootState } from "../../../../store";

export type AlertProps = {
	isOpen: boolean;
	message: string;
	severity: AlertColor;
};

const Payments: NextPage = () => {
	const { user } = useSelector((state: RootState) => state.user);
	const router = useRouter();
	const [drawerIsOpen, setDrawerIsOpen] = useState(false);
	const [showMVC, setShowMVC] = useState(false);
	const [payments, setPayments] = useState<PaymentProps[]>([]);
	const [alertData, setAlertData] = useState<AlertProps>({
		isOpen: false,
		message: "",
		severity: "success"
	});

	useEffect(() => {
		if (router.query?.drawerIsOpen) {
			console.log(router.query?.drawerIsOpen);
			setDrawerIsOpen(true);
		}
	}, [router]);

	const { isLoading, isFetching, refetch } = useQuery(
		queryKeys.getAllPayments,
		() => getRequest({ url: GET_PAYMENTS }),
		{
			onSuccess(data) {
				setPayments(data?.data || []);
			},
			onError(error: any) {
				console.error(error?.response);
			},
			enabled: !!user?._id,
			refetchOnWindowFocus: false
		}
	);

	const handleAlertClose = () => {
		setAlertData({
			...alertData,
			isOpen: false
		});
	};

	return (
		<Box sx={{ p: 3 }}>
			<Head>
				<title>Payments - Crusifix</title>
				<meta name='description' content='Details about your recent payments' />
			</Head>
			<Stack
				direction='row'
				justifyContent='space-between'
				alignItems='center'
				sx={{ width: "100%" }}
			>
				<IconButton
					onClick={() => (showMVC ? setShowMVC(false) : router.back())}
				>
					<ArrowBackIcon />
				</IconButton>

				<Stack direction='row' alignItems='center' spacing={2}>
					{!showMVC && (
						<Button
							variant='contained'
							color='secondary'
							onClick={() => setShowMVC(true)}
							endIcon={<ArrowForwardIcon />}
						>
							Most valuable customers
						</Button>
					)}

					<Button
						variant='contained'
						color='primary'
						onClick={() => setDrawerIsOpen(true)}
						endIcon={<ArrowForwardIcon />}
					>
						Create new payment
					</Button>
				</Stack>
			</Stack>

			<Stack sx={{ pt: 5 }}>
				{showMVC ? (
					<MVC />
				) : (
					<>
						<Statistics />
						<PaymentList
							{...{ isLoading: isLoading || isFetching, payments }}
						/>
					</>
				)}
				<Drawer {...{ drawerIsOpen, setDrawerIsOpen, setAlertData, refetch }} />
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

export default Payments;
