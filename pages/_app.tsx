import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";

// Store
import store from "../store";

// Layout
import Layout from "../layout";

// Utils
import theme from "../utils/theme";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</ThemeProvider>
		</Provider>
	);
}

export default MyApp;
