import { useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { Box, Stack, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// Components
import Statistics from "../../../../components/auth/admin/payments/Statistics";
import PaymentList from "../../../../components/auth/admin/payments/PaymentList";
import Drawer from "../../../../components/auth/admin/payments/Drawer";
import MVC from "../../../../components/auth/admin/payments/MVC";

// Common
import Button from "../../../../common/Button";

const Payments: NextPage = () => {
	const router = useRouter();
	const [drawerIsOpen, setDrawerIsOpen] = useState(false);
	const [showMVC, setShowMVC] = useState(false);

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
						<PaymentList />
					</>
				)}
				<Drawer {...{ drawerIsOpen, setDrawerIsOpen }} />
			</Stack>
		</Box>
	);
};

export default Payments;
