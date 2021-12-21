import { useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { Box, Stack, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

// Components
import PaymentHistory, {
	PaymentsProps
} from "../../../../components/auth/customer/payments/PaymentHistory";
import Loader from "../../../../components/auth/customer/payments/Loader";

// Utils
import { getRequest } from "../../../../utils/api/calls";
import { GET_USER_PAYMENTS } from "../../../../utils/api/urls";
import queryKeys from "../../../../utils/api/queryKeys";

// Store
import { RootState } from "../../../../store";

const Payments: NextPage = () => {
	const { user } = useSelector((state: RootState) => state.user);
	const router = useRouter();
	const [payments, setPayments] = useState<PaymentsProps>([]);
	const { isLoading } = useQuery(
		queryKeys.getPayments,
		() => getRequest({ url: GET_USER_PAYMENTS({ id: user?._id || "" }) }),
		{
			onSuccess(data) {
				setPayments(data?.data?.payments || []);
			},
			onError(error: any) {
				console.error(error?.response?.data);
			}
		}
	);

	return (
		<Box sx={{ p: 3 }}>
			<Head>
				<title>Payments - Crusifix</title>
				<meta name='description' content='Details about your recent payments' />
			</Head>
			<Box sx={{ width: "100%" }}>
				<IconButton onClick={() => router.back()}>
					<ArrowBackIcon />
				</IconButton>
			</Box>

			{isLoading ? (
				<Loader />
			) : (
				<Stack sx={{ pt: 5 }}>
					<PaymentHistory payments={payments} />
				</Stack>
			)}
		</Box>
	);
};

export default Payments;
