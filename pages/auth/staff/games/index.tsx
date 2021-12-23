import { useState, useEffect } from "react";
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
} from "../../../../components/auth/admin/games/Statistics";
import GameList, {
	GameProps
} from "../../../../components/auth/admin/games/GameList";
import Drawer from "../../../../components/auth/admin/games/Drawer";
import Loader from "../../../../components/auth/admin/games/Loader";

// Common
import Button from "../../../../common/Button";

// Utils
import { getRequest } from "../../../../utils/api/calls";
import {
	GET_GAMES,
	GET_TOTAL_GAMES,
	GET_TOTAL_GAMES_PLAYED,
	GET_MOST_PROFITABLE_GAME
} from "../../../../utils/api/urls";
import queryKeys from "../../../../utils/api/queryKeys";

// Store
import { RootState } from "../../../../store";

export type AlertProps = {
	isOpen: boolean;
	message: string;
	severity: AlertColor;
};

export type PaginationProps = {
	limit: number;
	page: number;
	count: number;
	end: boolean;
};

const Games: NextPage = () => {
	const { user } = useSelector((state: RootState) => state.user);
	const router = useRouter();
	const [drawerIsOpen, setDrawerIsOpen] = useState(false);
	const [games, setGames] = useState<GameProps[]>([]);
	const [alertData, setAlertData] = useState<AlertProps>({
		isOpen: false,
		message: "",
		severity: "success"
	});
	const [pagination, setPagination] = useState({
		limit: 5,
		page: 1,
		count: 2,
		end: false
	});

	const { isLoading, isFetching, refetch } = useQuery(
		queryKeys.getGames,
		() =>
			getRequest({
				url: GET_GAMES({ limit: pagination.limit, page: pagination.page })
			}),
		{
			onSuccess(data: any) {
				if (data) {
					setGames(data?.data || []);

					setPagination({
						...pagination,
						count: data?.pagination?.next
							? data?.pagination?.next?.page
							: data?.pagination?.prev
							? data?.pagination?.prev?.page + 1
							: 1,
						end: !data?.pagination?.next ? true : false
					});
				}
			},
			onError(error: any) {
				console.error(error?.response);
			},
			enabled: !!user?._id,
			refetchOnWindowFocus: false
		}
	);

	useEffect(() => {
		refetch();
	}, [pagination.page, pagination.limit, refetch]);

	const handleAlertClose = () => {
		setAlertData({
			...alertData,
			isOpen: false
		});
	};

	return (
		<Box sx={{ p: 3 }}>
			<Head>
				<title>Games - Crusifix</title>
				<meta name='description' content='Details about games' />
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
						Create new game
					</Button>
				</Stack>
			</Stack>

			<Stack sx={{ pt: 5 }}>
				<Statistics />
				{isLoading || isFetching ? (
					<Loader />
				) : (
					<GameList {...{ games, setPagination, pagination }} />
				)}
				<Drawer {...{ drawerIsOpen, setDrawerIsOpen, refetch, setAlertData }} />
			</Stack>

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

export default Games;
