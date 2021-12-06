import { useState } from "react";
import {
	Drawer as MUIDrawer,
	Stack,
	Grid,
	IconButton,
	InputAdornment
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

// Components
import TextField from "../../../../../common/TextField";
import Button from "../../../../../common/Button";

type DrawerProps = {
	drawerIsOpen: boolean;
	setDrawerIsOpen: (val: boolean) => void;
};

const DRAWER_WIDTH = 450;

const Drawer = ({ drawerIsOpen, setDrawerIsOpen }: DrawerProps) => {
	const [showPassword, setShowPassword] = useState(false);

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
			<Stack
				direction='row'
				sx={{ width: "100%", mb: 5 }}
				justifyContent='flex-start'
			>
				<IconButton onClick={() => setDrawerIsOpen(false)}>
					<ArrowBackIcon />
				</IconButton>
			</Stack>

			<Grid container spacing={3} sx={{ width: "100%", mb: 5, ml: -1 }}>
				<Grid item lg={6} md={6} sm={6} xs={12}>
					<TextField fullWidth placeholder='First name' />
				</Grid>

				<Grid item lg={6} md={6} sm={6} xs={12}>
					<TextField fullWidth placeholder='Last name' />
				</Grid>

				<Grid item lg={12} md={12} sm={12} xs={12}>
					<TextField fullWidth placeholder='Email address' />
				</Grid>

				<Grid item lg={12} md={12} sm={12} xs={12}>
					<TextField fullWidth placeholder='Phone number' />
				</Grid>

				<Grid item lg={12} md={12} sm={12} xs={12}>
					<TextField
						fullWidth
						placeholder='Password'
						type={showPassword ? "text" : "password"}
						helperText='Must be 8 characters'
						InputProps={{
							endAdornment: (
								<InputAdornment position='end'>
									<IconButton
										onClick={() => setShowPassword(prevState => !prevState)}
									>
										{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							)
						}}
					/>
				</Grid>
			</Grid>
			<Stack alignItems='center' justifyContent='center'>
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
