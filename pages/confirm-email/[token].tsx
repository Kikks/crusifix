import { useState, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.scss";
import {
	Backdrop,
	CircularProgress,
	Stack,
	Typography,
	Modal
} from "@mui/material";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";

// Common
import Button from "../../common/Button";

// Utils
import { CONFIRM_EMAIL } from "../../utils/api/urls";
import { putRequest } from "../../utils/api/calls";

// State
import { RootState } from "../../store";

const ConfirmEMail: NextPage = () => {
	const { user } = useSelector((state: RootState) => state.user);
	const [backdropIsOpen, setBackdropIsOpen] = useState(true);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [errorOccured, setErrorOccured] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const router = useRouter();
	const { token } = router.query;

	useEffect(() => {
		if (user) {
			router.push(
				user?.role === "admin"
					? "/auth/admin/dashboard"
					: "/auth/customer/dashboard"
			);
		}
	}, [user, router]);

	const { mutate } = useMutation(putRequest, {
		onSuccess(data: any) {
			setErrorOccured(false);
			setBackdropIsOpen(false);
			setModalIsOpen(true);
		},
		onError(error: any) {
			setBackdropIsOpen(false);
			setModalIsOpen(true);
			setErrorOccured(true);
			setErrorMessage(
				error?.response?.data?.error ||
					"There was a problem confirming you email. Refresh the page to try again."
			);
			console.error(error?.response?.data);
		}
	});

	useEffect(() => {
		if (typeof token === "string") {
			if (token.trim() !== "") {
				mutate({
					url: CONFIRM_EMAIL({ token: typeof token === "string" ? token : "" }),
					data: {}
				});
			}
		}
	}, [mutate, token]);

	return (
		<div className={styles.container}>
			<Head>
				<title>Confirm Email - Crusifix</title>
				<meta
					name='description'
					content='Confirm the email you have used to register for an account'
				/>
				<link rel='icon' href='/assets/images/logo.png' />
			</Head>

			<main className={styles.main}>
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
						{errorOccured ? (
							<>
								<Typography
									variant='h5'
									sx={{ fontWeight: "bold", textAlign: "center" }}
								>
									Confirm Email Failed
								</Typography>

								<Typography>{errorMessage}</Typography>
							</>
						) : (
							<>
								<Typography
									variant='h5'
									sx={{ fontWeight: "bold", textAlign: "center" }}
								>
									Confirm Email Successful
								</Typography>

								<Typography>
									Your email has been confirmed. You can now proceed to login.
								</Typography>

								<Stack justifyContent='center'>
									<Button
										variant='contained'
										color='primary'
										onClick={() => router.push("/login")}
									>
										Continue
									</Button>
								</Stack>
							</>
						)}
					</Stack>
				</Modal>
			</main>
		</div>
	);
};

export default ConfirmEMail;
