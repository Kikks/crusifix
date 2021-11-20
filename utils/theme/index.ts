import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
	typography: {
		fontFamily: ["Open Sans", "Roboto", "sans-serif"].join(","),
		allVariants: {
			color: "#5a7184"
		},
		h1: {
			fontFamily: ["HK Grotesk", "sans-serif"].join(","),
			fontWeight: "bold",
			color: "#183B56"
		},
		h2: {
			fontFamily: ["HK Grotesk", "sans-serif"].join(","),
			fontWeight: "bold",
			color: "#183B56"
		},
		h3: {
			fontFamily: ["HK Grotesk", "sans-serif"].join(","),
			color: "#183B56"
		},
		h4: {
			fontFamily: ["HK Grotesk", "sans-serif"].join(","),
			color: "#183B56"
		},
		h5: {
			fontFamily: ["HK Grotesk", "sans-serif"].join(","),
			color: "#183B56"
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
			light: "#ef807b",
			main: "#ec615b",
			dark: "#a5433f",
			contrastText: "#000"
		}
	}
});

theme = responsiveFontSizes(theme);

export default theme;
