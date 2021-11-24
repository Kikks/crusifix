import type { NextPage } from "next";
import Head from "next/head";
import { Box, Stack } from "@mui/material";

// Components
import Greeting from "../../../../components/auth/customer/Greeting";
import Statistics from "../../../../components/auth/customer/Statistics";
import PotentialWinners from "../../../../components/auth/customer/PotentialWinners";
import Standings from "../../../../components/auth/customer/Standings";

const Dashboard: NextPage = () => {
	return (
		<Box sx={{ p: 3, pt: 10 }}>
			<Head>
				<title>Dashboard - Crusifix</title>
				<meta name='description' content='Welcome to Crusifix' />
			</Head>

			<Stack>
				<Greeting />
				<Statistics />
				<PotentialWinners />
				<Standings />
			</Stack>
		</Box>
	);
};

export default Dashboard;
