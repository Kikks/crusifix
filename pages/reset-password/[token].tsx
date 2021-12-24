import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/Home.module.scss";

// Component
import ResetPasswordForm from "../../components/pages/ResetPassword";

const ResetPassword: NextPage = () => {
	return (
		<div className={styles.container}>
			<Head>
				<title>Reset Password - Crusifix</title>
				<meta name='description' content='Reset your password' />
				<link rel='icon' href='/assets/images/logo.png' />
			</Head>

			<main className={styles.main}>
				<ResetPasswordForm />
			</main>
		</div>
	);
};

export default ResetPassword;
