import { useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { Box, Stack, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// Components
import Statistics from "../../../../components/auth/admin/contests/Statistics";
import ContestList from "../../../../components/auth/admin/contests/ContestList";
import Drawer from "../../../../components/auth/admin/contests/Drawer";

// Common
import Button from "../../../../common/Button";

const Payments: NextPage = () => {
	const router = useRouter();
	const [drawerIsOpen, setDrawerIsOpen] = useState(false);

	return (
		<Box sx={{ p: 3 }}>
			<Head>
				<title>Contests - Crusifix</title>
				<meta name='description' content='Details about contests' />
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
						color='primary'
						onClick={() => setDrawerIsOpen(true)}
						endIcon={<ArrowForwardIcon />}
					>
						Create new contest
					</Button>
				</Stack>
			</Stack>

			<Stack sx={{ pt: 5 }}>
				<Statistics />
				<ContestList />
				<Drawer {...{ drawerIsOpen, setDrawerIsOpen }} />
			</Stack>
		</Box>
	);
};

export default Payments;
