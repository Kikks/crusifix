import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { Box, Stack, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// Components
import Description from "../../../../components/auth/admin/contest/Description";
import Toppers from "../../../../components/auth/admin/contest/Toppers";
import Standings from "../../../../components/auth/admin/contest/Standings";

// Common
import Button from "../../../../common/Button";

const description = {
	name: "November Dream",
	price: 500000,
	cashToPoints: "NGN 1,000: 10pts.",
	endDate: "12/04/2021",
	description:
		"Lorem ipsum dolor sit amet consectetur adipisicing elit.Earum id aliquam corporis iure! Nihil aliquam accusantium eveniet quis velit iusto optio iste veniam laudantium, repellendus ducimus perspiciatis nobis dolore nemo quo tenetur obcaecati sed corporis veritatis perferendis, enim minus officia? Dignissimos error quam commodi minima, unde culpa adipisci asperiores sint."
};

const winners = [
	{
		name: "Matt Damon",
		email: "matt@mail.com",
		image: "/assets/images/avatar-1.png",
		points: 540,
		rank: 1
	},
	{
		name: "John Doe",
		email: "john@mail.com",
		image: "/assets/images/avatar-1.png",
		points: 510,
		rank: 2
	},
	{
		name: "Laty Doe",
		email: "larry@mail.com",
		image: "/assets/images/avatar-1.png",
		points: 410,
		rank: 3
	}
];

const contestHasEnded = true;

const Contest: NextPage = () => {
	const router = useRouter();
	const { id } = router.query;
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

				{!contestHasEnded && (
					<Button
						variant='contained'
						color='secondary'
						// onClick={() => setDrawerIsOpen(true)}
						endIcon={<ArrowForwardIcon />}
					>
						Announce winner
					</Button>
				)}
			</Stack>

			<Stack sx={{ pt: 5 }}>
				<Description {...description} />
				<Toppers {...{ winners, contestHasEnded }} />
				<Standings />
			</Stack>
		</Box>
	);
};

export default Contest;
