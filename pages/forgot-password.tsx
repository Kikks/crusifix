import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.scss";

// Component
import ForgotPasswordForm from "../components/pages/ForgotPassword";

const ForgotPassword: NextPage = () => {
	return (
		<div className={styles.container}>
			<Head>
				<title>Forgot Password - Crusifix</title>
				<meta name='description' content="Forgot Password? We've got you covered" />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className={styles.main}>
				<ForgotPasswordForm />
			</main>
		</div>
	);
};

export default ForgotPassword;
