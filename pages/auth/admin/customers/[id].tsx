import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { Box, Stack, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// Components
import Profile from "../../../../components/auth/admin/customer/Profile";
import PaymentHistory from "../../../../components/auth/admin/customer/PaymentHistory";

const profile = {
	image: "/assets/images/iono.jpg",
	lastPlayed: "10/10/2021",
	firstName: "Matt",
	lastName: "Damon",
	phoneNumber: "08037961468",
	email: "matt@gmail.com"
};

const Customer: NextPage = () => {
	const router = useRouter();
	const { id } = router.query;

	return (
		<Box sx={{ p: 3 }}>
			<Head>
				<title>Customer-{id} - Crusifix</title>
				<meta name='description' content='Customer details' />
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
			</Stack>

			<Stack sx={{ pt: 5 }}>
				<Profile {...profile} />
				<PaymentHistory />
			</Stack>
		</Box>
	);
};

export default Customer;
