import { useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { Box, Stack, IconButton, Skeleton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

// Components
import GameList, {
	Game
} from "../../../../components/auth/customer/games/GameList";

// Utils
import { getRequest } from "../../../../utils/api/calls";
import { GET_GAMES } from "../../../../utils/api/urls";
import queryKeys from "../../../../utils/api/queryKeys";

// Store
import { RootState } from "../../../../store";

const Games: NextPage = () => {
	const { user } = useSelector((state: RootState) => state.user);
	const router = useRouter();
	const [games, setGames] = useState<Game[]>([]);

	const { isLoading } = useQuery(
		queryKeys.getGames,
		() => getRequest({ url: GET_GAMES({ page: 1, limit: 100 }) }),
		{
			onSuccess(data) {
				setGames(data?.data || []);
			},
			onError(error: any) {
				console.error(error?.response);
			},
			enabled: !!user?._id,
			retry: 3
		}
	);

	return (
		<Box sx={{ p: 3 }}>
			<Head>
				<title>Payments - Crusifix</title>
				<meta name='description' content='Details about your recent payments' />
			</Head>
			<Box sx={{ width: "100%" }}>
				<IconButton onClick={() => router.back()}>
					<ArrowBackIcon />
				</IconButton>
			</Box>

			{isLoading ? (
				<Skeleton
					animation='wave'
					variant='rectangular'
					width='100%'
					sx={{ borderRadius: 5 }}
					height='50vh'
				/>
			) : (
				<GameList games={games} />
			)}
		</Box>
	);
};

export default Games;
