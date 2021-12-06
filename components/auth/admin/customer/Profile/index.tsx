import { ReactNode } from "react";
import {
	Stack,
	Avatar,
	Typography,
	Divider,
	Grid,
	useMediaQuery
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AccountIcon from "@mui/icons-material/AssignmentIndSharp";
import PhoneIcon from "@mui/icons-material/PhoneInTalkSharp";
import EmailIcon from "@mui/icons-material/AttachEmailSharp";
import moment from "moment";

// Component
import Card from "../../../Card";

// Common
import Button from "../../../../../common/Button";

type ProfileCardProps = {
	icon: ReactNode;
	title: string;
	value: string;
};

type ProfileProps = {
	image?: string;
	lastPlayed: string;
	firstName: string;
	lastName: string;
	phoneNumber: string;
	email: string;
};

const ProfileCard = ({ icon, title, value }: ProfileCardProps) => {
	return (
		<Grid item lg={4} md={4} sm={6} xs={12}>
			<Card sx={{ height: "100%" }}>
				<Stack direction='row' alignItems='flex-start' spacing={2}>
					{icon}

					<Stack spacing={1}>
						<Typography sx={{ fontWeight: "bold", color: "#9fa2b4" }}>
							{title}
						</Typography>

						<Typography sx={{ fontWeight: "bold" }}>{value}</Typography>
					</Stack>
				</Stack>
			</Card>
		</Grid>
	);
};

const Profile = ({
	image,
	lastPlayed,
	firstName,
	lastName,
	phoneNumber,
	email
}: ProfileProps) => {
	const largeScreenDown = useMediaQuery("(max-width: 1024px)");

	return (
		<Card>
			<Stack
				direction='row'
				flexWrap='wrap'
				justifyContent='space-between'
				alignItems='center'
				spacing={3}
			>
				<Stack spacing={1}>
					<Stack direction='row' alignItems='center' spacing={1}>
						<Avatar
							sx={{ bgcolor: "green" }}
							alt={`${firstName} ${lastName}`}
							src={image}
						/>
						<Typography
							variant='h6'
							sx={{ textTransform: "capitalize", color: "#9fa2b4" }}
						>{`${firstName} ${lastName}`}</Typography>
					</Stack>

					<Typography sx={{ fontWeight: "bold" }}>
						{`Last played: ${moment(lastPlayed).fromNow()}`}
					</Typography>
				</Stack>

				<Button
					variant='contained'
					color='secondary'
					onClick={() => alert("Heyo")}
					endIcon={<ArrowForwardIcon />}
				>
					Deactivate user
				</Button>
			</Stack>

			<Divider sx={{ my: 2 }} />

			<Grid
				container
				spacing={3}
				sx={{ width: largeScreenDown ? "100%" : "85%" }}
			>
				<ProfileCard
					icon={<AccountIcon sx={{ color: "#9fa2b4" }} />}
					title='First name'
					value={firstName}
				/>

				<ProfileCard
					icon={<AccountIcon sx={{ color: "#9fa2b4" }} />}
					title='Last name'
					value={lastName}
				/>

				<ProfileCard
					icon={<PhoneIcon sx={{ color: "#9fa2b4" }} />}
					title='Phone'
					value={phoneNumber}
				/>

				<ProfileCard
					icon={<EmailIcon sx={{ color: "#9fa2b4" }} />}
					title='E-mail'
					value={email}
				/>
			</Grid>
		</Card>
	);
};

export default Profile;
