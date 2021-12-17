import { FC } from "react";
import { useRouter } from "next/router";

// Component
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import CheckAuth from "../components/CheckAuth";

// Utils
import { routesWithNavAndFooter } from "../utils/constants";

// Styles
import styles from "../styles/Layout.module.scss";

const Layout: FC = ({ children }) => {
	const { pathname } = useRouter();
	const isAuthRoute = pathname.split("/")[1] === "auth";

	return isAuthRoute ? (
		<CheckAuth>
			<div className={styles.auth__container}>
				<Sidebar />
				<main className={styles.auth__main}>{children}</main>
			</div>
		</CheckAuth>
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
