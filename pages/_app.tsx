import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";

// Store
import store from "../store";

// Layout
import Layout from "../layout";

// Utils
import theme from "../utils/theme";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
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
