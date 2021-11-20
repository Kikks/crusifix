import { TextField as MUITextField, TextFieldProps } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
	root: {
		backgroundColor: "transparent",

		"& .MuiOutlinedInput-root": {
			borderRadius: 18,
			padding: ".1rem .5rem",
			boxShadow: "0 15px 25px rgba(0,0,0,.05)"
		}
	}
});

const TextField = ({ ...props }: TextFieldProps) => {
	const classes = useStyles();

	return <MUITextField className={classes.root} size='small' {...props} />;
};

export default TextField;
