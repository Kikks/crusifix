import { useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { Box, Stack, IconButton, Skeleton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

// Components
import Profile, {
	ProfileProps
} from "../../../../components/auth/admin/customer/Profile";
import PaymentHistory, {
	PaymentProps
} from "../../../../components/auth/admin/customer/PaymentHistory";

// Utils
import { getRequest } from "../../../../utils/api/calls";
import { GET_USER } from "../../../../utils/api/urls";
import queryKeys from "../../../../utils/api/queryKeys";

// State
import { RootState } from "../../../../store";

const Customer: NextPage = () => {
	const { user } = useSelector((state: RootState) => state.user);
	const router = useRouter();
	const [profile, setProfile] = useState<ProfileProps>({
		firstName: "",
		lastName: "",
		phoneNumber: "",
		email: "",
		lastPlayed: ""
	});
	const [payments, setPayments] = useState<PaymentProps[]>([]);
	const { id } = router.query;

	const { isLoading, isFetching } = useQuery(
		queryKeys.getUser,
		() =>
			getRequest({ url: GET_USER({ id: typeof id === "string" ? id : "" }) }),
		{
			onSuccess(data) {
				setProfile(
					data?.data || {
						firstName: "",
						lastName: "",
						phoneNumber: "",
						email: ""
					}
				);

				setPayments(data?.data?.payments || []);
			},
			onError(error: any) {
				console.error(error?.response);
			},
			enabled: !!user?._id,
			refetchOnWindowFocus: false
		}
	);

	return (
		<Box sx={{ p: 3 }}>
			<Head>
				<title>Customer-{id} - Crusifix</title>
				<meta name='description' content='Customer details' />
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

			{isLoading || isFetching ? (
				<>
					<Skeleton
						animation='wave'
						variant='rectangular'
						width='100%'
						height='40vh'
						sx={{ borderRadius: 5, mt: 5 }}
					/>

					<Skeleton
						animation='wave'
						variant='rectangular'
						width='100%'
						height='40vh'
						sx={{ borderRadius: 5, mt: 5 }}
					/>
				</>
			) : (
				<Stack sx={{ pt: 5 }}>
					<Profile {...profile} />
					<PaymentHistory {...{ payments }} />
				</Stack>
			)}
		</Box>
	);
};

export default Customer;
