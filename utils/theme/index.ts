import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
	typography: {
		fontFamily: ["Open Sans", "Roboto", "sans-serif"].join(","),
		allVariants: {
			color: "#183B56"
		},
		h1: {
			fontFamily: ["HK Grotesk", "sans-serif"].join(","),
			fontWeight: "bold"
		},
		h2: {
			fontFamily: ["HK Grotesk", "sans-serif"].join(","),
			fontWeight: "bold"
		},
		h3: {
			fontFamily: ["HK Grotesk", "sans-serif"].join(",")
		},
		h4: {
			fontFamily: ["HK Grotesk", "sans-serif"].join(",")
		},
		h5: {
			fontFamily: ["HK Grotesk", "sans-serif"].join(",")
		}
	},
	palette: {
		primary: {
			light: "#443981",
			main: "#121354",
			dark: "#00002c",
			contrastText: "#fff"
		},
		secondary: {
			light: "#59e9a9",
			main: "#00b67a",
			dark: "#00854e",
			contrastText: "#000"
		}
	}
});

theme = responsiveFontSizes(theme);

export default theme;
