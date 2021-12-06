import { useState } from "react";
import {
	Drawer as MUIDrawer,
	Stack,
	Grid,
	IconButton,
	Typography,
	MenuItem
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// Components
import TextField from "../../../../../common/TextField";
import Button from "../../../../../common/Button";

type DrawerProps = {
	drawerIsOpen: boolean;
	setDrawerIsOpen: (val: boolean) => void;
};

const DRAWER_WIDTH = 450;

const customerNames = ["James Rodriguez", "Kareem Benzema", "Gareth Bale"];

const games = ["FIFA 22", "PES 2022", "GTA V5"];

const contests = ["Soccer Championship", "Adventure King", "Survival"];

const Drawer = ({ drawerIsOpen, setDrawerIsOpen }: DrawerProps) => {
	const [customerName, setCustomerName] = useState("Customer Name");
	const [game, setGame] = useState("Select Game");
	const [contest, setContest] = useState("Select Contest");

	return (
		<MUIDrawer
			open={drawerIsOpen}
			onClose={() => setDrawerIsOpen(false)}
			variant='temporary'
			anchor='right'
			sx={{
				width: "100vw",
				maxWidth: DRAWER_WIDTH,
				zIndex: 50,

				"& .MuiDrawer-paper": {
					width: "100vw",
					maxWidth: DRAWER_WIDTH,
					boxSizing: "border-box",
					border: "none",
					p: 1
				}
			}}
		>
			<Stack direction='row' sx={{ width: "100%" }} justifyContent='flex-start'>
				<IconButton onClick={() => setDrawerIsOpen(false)}>
					<ArrowBackIcon />
				</IconButton>
			</Stack>

			<Typography
				variant='h5'
				sx={{ textAlign: "center", fontWeight: "bold", my: 3 }}
			>
				Create new payment
			</Typography>

			<Grid container spacing={3} sx={{ width: "100%", mb: 5, ml: -1 }}>
				<Grid item lg={12} md={12} sm={12} xs={12}>
					<TextField
						fullWidth
						select
						placeholder='Customer Name'
						value={customerName}
						onChange={event => setCustomerName(event.target.value)}
					>
						<MenuItem value='Customer Name'>
							<em>Customer Name</em>
						</MenuItem>
						{customerNames.map(item => (
							<MenuItem key={item} value={item}>
								{item}
							</MenuItem>
						))}
					</TextField>
				</Grid>

				<Grid item lg={12} md={12} sm={12} xs={12}>
					<TextField fullWidth placeholder='Amount' type='number' />
				</Grid>

				<Grid item lg={12} md={12} sm={12} xs={12}>
					<TextField
						fullWidth
						select
						placeholder='Select Game'
						value={game}
						onChange={event => setGame(event.target.value)}
					>
						<MenuItem value='Select Game'>
							<em>Select Game</em>
						</MenuItem>
						{games.map(item => (
							<MenuItem key={item} value={item}>
								{item}
							</MenuItem>
						))}
					</TextField>
				</Grid>

				<Grid item lg={12} md={12} sm={12} xs={12}>
					<TextField
						fullWidth
						select
						placeholder='Select Contest'
						value={contest}
						onChange={event => setContest(event.target.value)}
					>
						<MenuItem value='Select Contest'>
							<em>Select Contest</em>
						</MenuItem>
						{contests.map(item => (
							<MenuItem key={item} value={item}>
								{item}
							</MenuItem>
						))}
					</TextField>
				</Grid>
			</Grid>
			<Stack
				direction='row'
				alignItems='center'
				justifyContent='center'
				spacing={2}
			>
				<Button
					variant='contained'
					color='secondary'
					onClick={() => alert("Heyo")}
					endIcon={<ArrowForwardIcon />}
				>
					Multi payment
				</Button>

				<Button
					variant='contained'
					color='primary'
					onClick={() => alert("Heyo")}
					endIcon={<ArrowForwardIcon />}
				>
					Create
				</Button>
			</Stack>
		</MUIDrawer>
	);
};

export default Drawer;
