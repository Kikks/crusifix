import { FC, useState } from "react";
import { useRouter } from "next/router";
import { Hidden, IconButton, Stack } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

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
	const [drawerIsOpen, setDrawerIsOpen] = useState(true);

	return isAuthRoute ? (
		<CheckAuth>
			<>
				<Hidden mdUp>
					<Stack
						sx={{ width: "100%", p: 1 }}
						direction='row'
						justifyContent='flex-end'
					>
						<IconButton onClick={() => setDrawerIsOpen(true)}>
							<MenuIcon />
						</IconButton>
					</Stack>
				</Hidden>
				<div className={styles.auth__container}>
					<Sidebar {...{ drawerIsOpen, setDrawerIsOpen }} />
					<main className={styles.auth__main}>{children}</main>
				</div>
			</>
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
