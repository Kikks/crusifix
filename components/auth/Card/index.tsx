import { FC, ReactNode } from "react";
import { Box } from "@mui/material";

type CardProps = {
	children: ReactNode;
	sx?: any;
};

const Card = ({ children, sx }: CardProps) => {
	return (
		<Box
			sx={
				sx
					? {
							bgcolor: "#fff",
							borderRadius: 5,
							p: 3,
							boxShadow: "0 10px 30px rgba(209,213,223,0.5)",
              overflowX: 'auto',
							...sx
					  }
					: {
							bgcolor: "#fff",
							borderRadius: 5,
							p: 3,
							boxShadow: "0 10px 30px rgba(209,213,223,0.5)",
              overflowX: 'auto',
					  }
			}
		>
			{children}
		</Box>
	);
};

export default Card;
