import { FC } from "react";

// Component
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const Layout: FC = ({ children }) => {
	return (
		<>
			<Navigation />
			<main>{children}</main>
			<Footer />
		</>
	);
};

export default Layout;
