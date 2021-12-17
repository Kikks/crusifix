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
	AlertColor,
	Modal,
	Typography,
	CircularProgress
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useSelector } from "react-redux";
import { useQuery, useMutation } from "react-query";

// Components
import Description, {
	DescriptionProps
} from "../../../../components/auth/admin/contest/Description";
import Toppers, {
	WinnerCardProps
} from "../../../../components/auth/admin/contest/Toppers";
import Standings from "../../../../components/auth/admin/contest/Standings";
import Loader from "../../../../components/auth/admin/contest/Loader";

// Common
import Button from "../../../../common/Button";

// Utils
import { getRequest, putRequest } from "../../../../utils/api/calls";
import { GET_CONTEST, ANNOUNCE_WINNER } from "../../../../utils/api/urls";
import queryKeys from "../../../../utils/api/queryKeys";

// Store
import { RootState } from "../../../../store";

type AlertProps = {
	isOpen: boolean;
	message: string;
	severity: AlertColor;
};

const Contest: NextPage = () => {
	const { user } = useSelector((state: RootState) => state.user);
	const router = useRouter();
	const { id } = router.query;
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [isAnnounced, setIsAnnounced] = useState(true);
	const [winners, setWinners] = useState<WinnerCardProps[]>([]);
	const [standings, setStandings] = useState([]);
	const [description, setDescription] = useState<DescriptionProps>({
		name: "",
		contestAmount: 0,
		amountToPoints: 0,
		pointsToAmount: 0,
		endDate: new Date().toDateString(),
		description: ""
	});
	const [alertData, setAlertData] = useState<AlertProps>({
		isOpen: false,
		message: "",
		severity: "success"
	});

	const { isLoading, isFetching, refetch } = useQuery(
		queryKeys.getContest,
		() =>
			getRequest({
				url: GET_CONTEST({ id: typeof id === "string" ? id : "" })
			}),
		{
			onSuccess(data) {
				if (data?.data) {
					setDescription(
						data?.data || {
							name: "",
							contestAmount: 0,
							amountToPoints: 0,
							pointsToAmount: 0,
							endDate: new Date().toDateString(),
							description: ""
						}
					);
					setIsAnnounced(data?.data?.isAnnounced);
				}

				if (
					data?.potentialFirstWinner &&
					data?.potentialSecondWinner &&
					data?.potentialSecondWinner
				) {
					setWinners([
						{
							rank: 1,
							...data?.potentialFirstWinner[0]
						},
						{
							rank: 2,
							...data?.potentialSecondWinner[0]
						},
						{
							rank: 3,
							...data?.potentialSecondWinner[0]
						}
					]);
				}

				if (data?.leaderBoard) {
					setStandings(data?.leaderBoard);
				}
			},
			onError(error: any) {
				console.error(error?.response);
				setAlertData({
					isOpen: true,
					message: error?.response?.data?.error || "An error occured!",
					severity: "error"
				});
			},
			enabled: !!user?._id,
			refetchOnWindowFocus: false
		}
	);

	const { mutate, isLoading: mutationLoading } = useMutation(putRequest, {
		onSuccess(data) {
			refetch();
			setModalIsOpen(false);
			setAlertData({
				isOpen: true,
				message: "The winner has been annonuced successfully",
				severity: "success"
			});
		},
		onError(error: any) {
			console.error(error?.response);
			setModalIsOpen(false);
			setAlertData({
				isOpen: true,
				message: error?.response?.data?.error,
				severity: "error"
			});
		}
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
				<title>Contest-{id} - Crusifix</title>
				<meta name='description' content='Contest details' />
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

				{!isAnnounced && (
					<Button
						variant='contained'
						color='secondary'
						onClick={() => setModalIsOpen(true)}
						endIcon={<ArrowForwardIcon />}
					>
						Announce winner
					</Button>
				)}
			</Stack>

			{isLoading || isFetching ? (
				<Loader />
			) : (
				<Stack sx={{ pt: 5 }}>
					<Description {...description} />
					<Toppers {...{ winners, contestHasEnded: isAnnounced }} />
					<Standings {...{ standings }} />
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

			<Modal open={modalIsOpen} onClose={() => setModalIsOpen(false)}>
				<Stack
					spacing={2}
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: "95%",
						maxWidth: 600,
						bgcolor: "background.paper",
						boxShadow: 24,
						borderRadius: 5,
						p: 4
					}}
				>
					<Typography
						variant='h5'
						sx={{ fontWeight: "bold", textAlign: "center" }}
					>
						Announce Winner
					</Typography>

					<Typography>{`Are you sure you want to announce the winner for the ${description.name} contest`}</Typography>

					<Stack direction='row' spacing={3} justifyContent='flex-end'>
						<Button
							variant='contained'
							color='secondary'
							onClick={() => setModalIsOpen(false)}
							disabled={mutationLoading}
						>
							No
						</Button>
						<Button
							variant='contained'
							color='primary'
							disabled={mutationLoading}
							onClick={() =>
								mutate({
									url: ANNOUNCE_WINNER({
										id: typeof id === "string" ? id : ""
									}),
									data: {}
								})
							}
						>
							{mutationLoading ? <CircularProgress /> : "Yes"}
						</Button>
					</Stack>
				</Stack>
			</Modal>
		</Box>
	);
};

export default Contest;
