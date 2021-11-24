import { FC } from "react";
import { useRouter } from "next/router";

// Component
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

// Utils
import { routesWithNavAndFooter } from "../utils/constants";

// Styles
import styles from "../styles/Layout.module.scss";

const Layout: FC = ({ children }) => {
	const { pathname } = useRouter();
	const isAuthRoute = pathname.split("/")[1] === "auth";

	return isAuthRoute ? (
		<div className={styles.auth__container}>
			<Sidebar />
			<main className={styles.auth__main}>{children}</main>
		</div>
	) : routesWithNavAndFooter.includes(pathname) ? (
		<>
			<Navigation />
			<main>{children}</main>
			<Footer />
		</>
	) : (
		<main>{children}</main>
	);
};

export default Layout;
