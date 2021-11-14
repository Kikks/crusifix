import * as React from "react";
import InputUnstyled, { InputUnstyledProps } from "@mui/core/InputUnstyled";
import { styled } from "@mui/system";

const StyledInputElement = styled("input")`
	width: 320px;
	font-size: 1rem;
	font-family: Open Sans, sans-serif;
	font-weight: 400;
	line-height: 1.4375em;
	background: #fff;
	border: 1px solid #e5e8ec;
	border-radius: 8px;
	padding: 15px;
	color: #20262d;
	transition: width 300ms ease;

	&:hover {
		background: #eaeef3;
		border-color: #e5e8ec;
	}

	&:focus {
		outline: none;
		width: 340px;
		transition: width 200ms ease-out;
	}
`;

const CustomInput = React.forwardRef(function CustomInput(
	props: InputUnstyledProps,
	ref: React.ForwardedRef<HTMLDivElement>
) {
	return (
		<InputUnstyled
			components={{ Input: StyledInputElement }}
			{...props}
			ref={ref}
		/>
	);
});

export default CustomInput;
