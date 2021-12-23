import { useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { Box, Stack, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useQuery } from "react-query";

// Components
import GameList from "../../../../components/auth/customer/games/GameList";

const Games: NextPage = () => {
	const router = useRouter();

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

			<GameList />
		</Box>
	);
};

export default Games;
