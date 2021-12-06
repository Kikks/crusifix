import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { Box, Stack, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// Components
import PaymentHistory from "../../../../components/auth/customer/payments/PaymentHistory";

const Payments: NextPage = () => {
	const router = useRouter();
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

			<Stack sx={{ pt: 5 }}>
				<PaymentHistory />
			</Stack>
		</Box>
	);
};

export default Payments;
