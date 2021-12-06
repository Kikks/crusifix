import { useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { Box, Stack, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// Components
import Statistics from "../../../../components/auth/admin/customers/Statistics";
import CustomerList from "../../../../components/auth/admin/customers/CustomerList";
import Drawer from "../../../../components/auth/admin/customers/Drawer";

// Common
import Button from "../../../../common/Button";

const Customers: NextPage = () => {
	const router = useRouter();
	const [drawerIsOpen, setDrawerIsOpen] = useState(false);

	return (
		<Box sx={{ p: 3 }}>
			<Head>
				<title>Customers - Crusifix</title>
				<meta name='description' content='Details about your recent payments' />
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
						onClick={() => setDrawerIsOpen(true)}
						endIcon={<ArrowForwardIcon />}
					>
						Edit
					</Button>

					<Button
						variant='contained'
						color='primary'
						onClick={() => setDrawerIsOpen(true)}
						endIcon={<ArrowForwardIcon />}
					>
						Create
					</Button>
				</Stack>
			</Stack>

			<Stack sx={{ pt: 5 }}>
				<Statistics />
				<CustomerList />
				<Drawer {...{ drawerIsOpen, setDrawerIsOpen }} />
			</Stack>
		</Box>
	);
};

export default Customers;
