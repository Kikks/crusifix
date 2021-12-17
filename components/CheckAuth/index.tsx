import { useState, useEffect, FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import jwt_decode from "jwt-decode";
import { Backdrop, CircularProgress } from "@mui/material";

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
				dispatch(login(data?.data));
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
			if (router.pathname.split("/")[2] !== user.user?.role) {
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
		</>
	);
};

export default CheckAuth;
