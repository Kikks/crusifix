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
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";

// Components
import Statistics, {
	StatProps
} from "../../../../components/auth/admin/contests/Statistics";
import ContestList, {
	ContestProps
} from "../../../../components/auth/admin/contests/ContestList";
import Drawer from "../../../../components/auth/admin/contests/Drawer";
import Loader from "../../../../components/auth/admin/contests/Loader";

// Common
import Button from "../../../../common/Button";

// Utils
import { getRequest } from "../../../../utils/api/calls";
import { GET_CONTESTS } from "../../../../utils/api/urls";
import queryKeys from "../../../../utils/api/queryKeys";

// Store
import { RootState } from "../../../../store";

export type AlertProps = {
	isOpen: boolean;
	message: string;
	severity: AlertColor;
};

const Contests: NextPage = () => {
	const { user } = useSelector((state: RootState) => state.user);
	const router = useRouter();
	const [drawerIsOpen, setDrawerIsOpen] = useState(false);
	const [statistics, setStatistics] = useState<StatProps[]>([]);
	const [contests, setContests] = useState<ContestProps[]>([]);
	const [alertData, setAlertData] = useState<AlertProps>({
		isOpen: false,
		message: "",
		severity: "success"
	});

	const { isLoading, isFetching, refetch } = useQuery(
		queryKeys.getContests,
		() => getRequest({ url: GET_CONTESTS }),
		{
			onSuccess(data: any) {
				if (data) {
					setStatistics([
						{
							title: "Total Contests",
							value: `${
								data?.totalRewardMoneyAndNumOfContest[0]?.numContest || ""
							}`
						},
						{
							title: "Total Reward Money",
							value: `${
								data?.totalRewardMoneyAndNumOfContest[0]?.totalRewardMoney || ""
							}`
						},
						{
							title: "Recent Winner",
							value: `${data?.getMostRecentWinner?.firstName || ""} ${
								data?.getMostRecentWinner?.lastName || ""
							}`
						}
					]);
					setContests(data?.data || []);
				}
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

			{isLoading || isFetching ? (
				<Loader />
			) : (
				<Stack sx={{ pt: 5 }}>
					<Statistics {...{ statistics }} />
					<ContestList {...{ contests }} />
					<Drawer
						{...{ drawerIsOpen, setDrawerIsOpen, refetch, setAlertData }}
					/>
				</Stack>
			)}

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

export default Contests;
