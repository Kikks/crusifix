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

const Drawer = ({ drawerIsOpen, setDrawerIsOpen }: DrawerProps) => {
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
				Create new contest
			</Typography>

			<Grid container spacing={3} sx={{ width: "100%", mb: 5, ml: -1 }}>
				<Grid item lg={6} md={12} sm={12} xs={12}>
					<TextField fullWidth placeholder='Contest Name' />
				</Grid>

				<Grid item lg={6} md={12} sm={12} xs={12}>
					<TextField fullWidth placeholder='Reward Amount' type='number' />
				</Grid>

				<Grid item lg={12} md={12} sm={12} xs={12}>
					<TextField
						fullWidth
						placeholder='Contest Description'
						multiline
						InputProps={{ style: { padding: 20 } }}
						maxRows={7}
						rows={7}
					/>
				</Grid>

				<Grid item lg={6} md={12} sm={12} xs={12}>
					<TextField fullWidth placeholder='Start Date' />
				</Grid>

				<Grid item lg={6} md={12} sm={12} xs={12}>
					<TextField fullWidth placeholder='End Date' />
				</Grid>

				<Grid item lg={6} md={12} sm={12} xs={12}>
					<TextField fullWidth placeholder='Cash' />
				</Grid>

				<Grid item lg={6} md={12} sm={12} xs={12}>
					<TextField fullWidth placeholder='Points' type='number' />
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
