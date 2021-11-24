import Image from "next/image";
import { Typography, Stack } from "@mui/material";

// Component
import Button from "../../../common/Button";

type GreetingCardProps = {
	name: string;
	buttonLabel: string;
	action: () => void;
};

const GreetingCard = ({ name, action, buttonLabel }: GreetingCardProps) => {
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
				src='/assets/svg/greeting-card-illustration.svg'
				height={220}
				width={220}
				alt='Bonding moments'
			/>
		</Stack>
	);
};

export default GreetingCard;
