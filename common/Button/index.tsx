import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/system";

interface CustomButtonProps {
	variant: "contained" | "outlined";
}

const ContainedButton = styled(Button)<ButtonProps>(({ theme }) => ({
	backgroundColor: theme.palette.primary.main,
	paddingRight: theme.spacing(4),
	paddingLeft: theme.spacing(4),
	paddingTop: theme.spacing(1),
	paddingBottom: theme.spacing(1),
	textTransform: "capitalize",
	borderRadius: 8,
	fontWeight: 700,
	fontFamily: ["Open Sans", "sans-serif"].join(","),

	"&:hover": {
		backgroundColor: theme.palette.primary.light
	}
}));

const OutlinedButton = styled(Button)<ButtonProps>(({ theme }) => ({
	backgroundColor: "transparent",
	border: `${theme.spacing(0.3)} solid ${theme.palette.primary.main}`,
	paddingRight: theme.spacing(3.7),
	paddingLeft: theme.spacing(3.7),
	paddingTop: theme.spacing(0.7),
	paddingBottom: theme.spacing(0.7),
	textTransform: "capitalize",
	borderRadius: 8,
	fontWeight: 700,
	fontFamily: ["Open Sans", "sans-serif"].join(","),

	"&:hover": {
		backgroundColor: "rgba(68, 57, 129, .2)",
		border: `${theme.spacing(0.3)} solid ${theme.palette.primary.light}`
	}
}));

const CustomButton = ({
	children,
	color = "primary",
	variant = "contained",
	sx,
	...rest
}: any) => {
	const containedStyles =
		color === "secondary"
			? {
					...sx,
					bgcolor: "#ec615b",
					color: "#fff",
					":hover": {
						bgcolor: "#ef807b"
					}
			  }
			: sx;

	return variant === "contained" ? (
		<ContainedButton sx={containedStyles} variant={variant} {...rest}>
			{children}
		</ContainedButton>
	) : (
		<OutlinedButton sx={sx} variant={variant} {...rest}>
			{children}
		</OutlinedButton>
	);
};

export default CustomButton;
