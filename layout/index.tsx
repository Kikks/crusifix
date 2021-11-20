import { FC } from "react";
import { useRouter } from "next/router";

// Component
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

// Utils
import { routesWithNavAndFooter } from "../utils/constants";

const Layout: FC = ({ children }) => {
	const { pathname } = useRouter();

	return routesWithNavAndFooter.includes(pathname) ? (
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
