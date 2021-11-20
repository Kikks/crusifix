import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.scss";

// Component
import Header from "../components/pages/Home/Header";
import About from "../components/pages/Home/About";
import Masonry from "../components/pages/Home/Masonry";
import Games from "../components/pages/Home/Games";
import Testimonials from "../components/pages/Home/Testimonials";
import Contact from "../components/pages/Home/Contact";

const Home: NextPage = () => {
	return (
		<div className={styles.container}>
			<Head>
				<title>Crusifix</title>
				<meta name='description' content='Welcome to Crusifix' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className={styles.main}>
				<Header />
				<About />
				<Masonry />
				<Games />
				<Testimonials />
				<Contact />
			</main>
		</div>
	);
};

export default Home;
