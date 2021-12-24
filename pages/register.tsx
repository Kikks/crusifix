import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.scss";

// Component
import RegistrationForm from "../components/pages/Register/RegistrationForm";

const Register: NextPage = () => {
	return (
		<div className={styles.container}>
			<Head>
				<title>Create an account - Crusifix</title>
				<meta name='description' content='Create an account with Crusifix' />
				<link rel='icon' href='/assets/images/logo.png' />
			</Head>

			<main className={styles.main}>
				<RegistrationForm />
			</main>
		</div>
	);
};

export default Register;
