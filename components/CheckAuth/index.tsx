import { useState, useEffect, FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import jwt_decode from "jwt-decode";
import {
	Backdrop,
	CircularProgress,
	Modal,
	Typography,
	Stack
} from "@mui/material";

// Utils
import { getRequest } from "../../utils/api/calls";
import { GET_ME } from "../../utils/api/urls";
import queryKeys from "../../utils/api/queryKeys";

// Store
import { login, logout } from "../../store/user";
import { RootState } from "../../store";

const CheckAuth: FC = ({ children }) => {
	const user = useSelector((state: RootState) => state.user);
	const [backdropIsOpen, setBackdropIsOpen] = useState(false);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const dispatch = useDispatch();
	const router = useRouter();

	let token: string | null = null;

	if (typeof window !== "undefined") {
		token = localStorage.getItem("token");
	}

	const { refetch } = useQuery(
		queryKeys.getMe,
		() => getRequest({ url: GET_ME }),
		{
			onSuccess(data: any) {
				setBackdropIsOpen(false);
				if (data?.data?.isEmailVerified) {
					dispatch(login(data?.data));
				} else {
					setModalIsOpen(true);
				}
			},
			onError(error: any) {
				console.error(error?.response);
				setBackdropIsOpen(false);
			},
			enabled: !!token
		}
	);

	useEffect(() => {
		if (user.user) {
			if (
				router.pathname.split("/")[2] === "admin" &&
				user.user?.role !== ("admin" || "staff")
			) {
				router.push("/login");
			}
			if (
				router.pathname.split("/")[2] === "customer" &&
				user?.user?.role !== "customer"
			) {
				router.push("/login");
			}
		}
	}, [user.user, router]);

	useEffect(() => {
		if (!user.user) {
			if (token) {
				const decodedToken: { exp: any } = jwt_decode(token);

				if (new Date(decodedToken?.exp * 1000) < new Date()) {
					localStorage.removeItem("token");
					router.push("/login");
					dispatch(logout());
				} else {
					setBackdropIsOpen(true);
					refetch();
				}
			} else {
				router.push("/login");
				dispatch(logout());
			}
		}
	}, [token, router, dispatch, refetch, user.user]);

	return (
		<>
			{children}
			<Backdrop
				sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }}
				open={backdropIsOpen}
			>
				<CircularProgress color='inherit' />
			</Backdrop>

			<Modal open={modalIsOpen} sx={{ outline: "none" }}>
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
						p: 4,
						textAlign: "center"
					}}
				>
					<Typography
						variant='h5'
						sx={{ fontWeight: "bold", textAlign: "center" }}
					>
						Confirm Email
					</Typography>

					<Typography>
						You need to confirm you email address to continue. Check your email
						for a link to confirm your email address. If you do not see the
						email, kindly check your spam folder.
					</Typography>
				</Stack>
			</Modal>
		</>
	);
};

export default CheckAuth;
