import { FC } from "react";
import { Box } from "@mui/material/";

const Container: FC = ({ children }) => {
	return (
		<Box
			sx={{
				maxWidth: 1300,
				width: "100%",
				px: {
					xs: 2,
					sm: 2,
					md: 3
				}
			}}
		>
			{children}
		</Box>
	);
};

export default Container;
