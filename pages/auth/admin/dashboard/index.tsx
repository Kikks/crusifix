import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { Box, Stack } from "@mui/material";

// Components
import Greeting from "../../../../components/auth/admin/dashboard/Greeting";
import Statistics from "../../../../components/auth/admin/dashboard/Statistics";
import RecentCustomers from "../../../../components/auth/admin/dashboard/RecentCustomers";
import ContestList from "../../../../components/auth/admin/dashboard/ContestList";

const Dashboard: NextPage = () => {
	return (
		<Box sx={{ p: 3, pt: 10 }}>
			<Head>
				<title>Dashboard - Crusifix</title>
				<meta name='description' content='Welcome to Crusifix' />
			</Head>

			<Stack>
				<Greeting />
				<Statistics sx={{ mt: 4 }} />
				<RecentCustomers />
				<ContestList />
			</Stack>
		</Box>
	);
};

export default Dashboard;
