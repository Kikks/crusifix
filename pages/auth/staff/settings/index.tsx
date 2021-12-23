import { useState } from "react";
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

// Components
import UpdateAccount from "../../../../components/auth/UpdateAcount";

export type AlertProps = {
	isOpen: boolean;
	message: string;
	severity: AlertColor;
};

const Settings: NextPage = () => {
	const router = useRouter();
	const [alertData, setAlertData] = useState<AlertProps>({
		isOpen: false,
		message: "",
		severity: "success"
	});

	const handleAlertClose = () => {
		setAlertData({
			...alertData,
			isOpen: false
		});
	};

	return (
		<Box sx={{ p: 3 }}>
			<Head>
				<title>Settings - Crusifix</title>
				<meta name='description' content='Account Settings' />
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

			<UpdateAccount {...{ setAlertData }} />

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

export default Settings;
