import "../styles/globals.scss";
import { useEffect } from "react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import AOS from "aos";
import "aos/dist/aos.css";

// Store
import store from "../store";

// Layout
import Layout from "../layout";

// Utils
import theme from "../utils/theme";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
	useEffect(() => {
		AOS.init({
			duration: 1000
		});
	}, []);

	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider theme={theme}>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</ThemeProvider>
			</QueryClientProvider>
		</Provider>
	);
}

export default MyApp;
