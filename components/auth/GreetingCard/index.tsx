import Image from "next/image";
import { Typography, Stack } from "@mui/material";
import { useSelector } from "react-redux";

// Component
import Button from "../../../common/Button";

// Store
import { RootState } from "../../../store";

type GreetingCardProps = {
	name: string;
	buttonLabel: string;
	action: () => void;
};

const GreetingCard = ({ name, action, buttonLabel }: GreetingCardProps) => {
	const { user } = useSelector((state: RootState) => state.user);

	return (
		<Stack
			direction='row'
			justifyContent='space-between'
			sx={{
				width: "100%",
				bgcolor: "#302c99",
				borderRadius: 5,
				boxShadow: "0 10px 30px rgba(209,213,223,0.5)"
			}}
		>
			<Stack justifyContent='space-between' sx={{ p: 3 }}>
				<Stack spacing={1}>
					<Typography sx={{ color: "#fff" }}>Welcome back,</Typography>
					<Typography sx={{ color: "#fff", textTransform: "capitalize" }}>
						{name}
					</Typography>
				</Stack>

				<Button variant='contained' color='secondary' onClick={() => action()}>
					{buttonLabel}
				</Button>
			</Stack>

			<Image
				src={
					user?.role === "admin"
						? "/assets/svg/admin-greeting-card-illustration.svg"
						: "/assets/svg/greeting-card-illustration.svg"
				}
				height={220}
				width={220}
				alt='Bonding moments'
			/>
		</Stack>
	);
};

export default GreetingCard;
