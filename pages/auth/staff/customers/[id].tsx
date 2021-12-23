import { useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { Box, Stack, IconButton, Skeleton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useQuery, useMutation } from "react-query";
import { useSelector } from "react-redux";

// Components
import Profile, {
	ProfileType
} from "../../../../components/auth/admin/customer/Profile";
import PaymentHistory, {
	PaymentProps
} from "../../../../components/auth/admin/customer/PaymentHistory";

// Utils
import { getRequest, putRequest } from "../../../../utils/api/calls";
import { GET_USER, UPDATE_USER_STATUS } from "../../../../utils/api/urls";
import queryKeys from "../../../../utils/api/queryKeys";

// State
import { RootState } from "../../../../store";

const Customer: NextPage = () => {
	const { user } = useSelector((state: RootState) => state.user);
	const router = useRouter();
	const [profile, setProfile] = useState<ProfileType>({
		firstName: "",
		lastName: "",
		phoneNumber: "",
		email: "",
		lastPlayed: "",
		isActive: false
	});
	const [payments, setPayments] = useState<PaymentProps[]>([]);
	const { id } = router.query;

	const { isLoading, isFetching, refetch } = useQuery(
		queryKeys.getUser,
		() =>
			getRequest({ url: GET_USER({ id: typeof id === "string" ? id : "" }) }),
		{
			onSuccess(data) {
				setProfile(
					{
						...data?.data,
						lastPlayed: data?.paymentHistory[0]?.createdAt
					} || {
						firstName: "",
						lastName: "",
						phoneNumber: "",
						email: "",
						lastPlayed: "",
						isActive: false
					}
				);

				setPayments(data?.paymentHistory || []);
			},
			onError(error: any) {
				console.error(error?.response);
			},
			enabled: !!user?._id,
			refetchOnWindowFocus: false
		}
	);

	const { mutate, isLoading: mutationIsLoading } = useMutation(putRequest, {
		onSuccess(data) {
			refetch();
		},
		onError(error: any) {
			console.error(error?.response);
		}
	});

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
					<Profile
						profile={profile}
						update={() =>
							mutate({
								url: UPDATE_USER_STATUS({
									id: typeof id === "string" ? id : ""
								}),
								data: {}
							})
						}
						loading={mutationIsLoading}
					/>
					<PaymentHistory {...{ payments }} />
				</Stack>
			)}
		</Box>
	);
};

export default Customer;
