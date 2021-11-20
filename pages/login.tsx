import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.scss";

// Component
import LoginForm from "../components/pages/Login/LoginForm";

const Login: NextPage = () => {
	return (
		<div className={styles.container}>
			<Head>
				<title>Login - Crusifix</title>
				<meta name='description' content='Login to your account' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className={styles.main}>
				<LoginForm />
			</main>
		</div>
	);
};

export default Login;
