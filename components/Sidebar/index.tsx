import { useEffect, useState, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import {
	Stack,
	Drawer,
	IconButton,
	Hidden,
	List,
	useTheme,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	useMediaQuery
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSelector, useDispatch } from "react-redux";

// Components
import SidebarLink from "./Link";

// Links
import { customerLinks, adminLinks, staffLinks } from "./links";

// Store
import { RootState } from "../../store";
import { logout } from "../../store/user";

type SidebarProps = {
	drawerIsOpen: boolean;
	setDrawerIsOpen: (value: boolean) => void;
};

const DRAWER_WIDTH = 250;

const Sidebar = ({ drawerIsOpen, setDrawerIsOpen }: SidebarProps) => {
	const user = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();
	const theme = useTheme();
	const mediumScreen = useMediaQuery(theme.breakpoints.down("md"));
	const router = useRouter();

	useEffect(() => {
		if (!mediumScreen) {
			setDrawerIsOpen(true);
		} else {
			setDrawerIsOpen(false);
		}
	}, [mediumScreen]);
	return (
		<Drawer
			variant={mediumScreen ? "temporary" : "persistent"}
			anchor='left'
			open={drawerIsOpen}
			onClose={() => setDrawerIsOpen(false)}
			sx={{
				width: DRAWER_WIDTH,
				boxShadow: "15px 15px 35px rgba(0,0,0,0.1)",
				zIndex: 50,
				display: "flex",
				flexDirection: "column",

				"& .MuiDrawer-paper": {
					width: DRAWER_WIDTH,
					boxSizing: "border-box",
					border: "none"
				}
			}}
		>
			<Stack
				direction='row'
				justifyContent={mediumScreen ? "space-between" : "center"}
				alignItems='center'
				sx={{ p: 2, pb: 0 }}
			>
				<Image
					src='/assets/images/logo.png'
					alt='Crusifix Logo'
					width={80}
					height={80}
				/>

				<Hidden mdUp>
					<IconButton
						onClick={() => {
							if (mediumScreen) {
								setDrawerIsOpen(false);
							}
						}}
					>
						<ChevronLeftIcon />
					</IconButton>
				</Hidden>
			</Stack>

			<List sx={{ px: 4, flex: 1 }}>
				{user?.user?.role === "admin"
					? adminLinks.map(({ name, icon, href }) => (
							<SidebarLink
								key={name}
								href={`/auth/admin/${href}`}
								name={name}
								icon={icon}
								onClick={() => {
									if (mediumScreen) {
										setDrawerIsOpen(false);
									}
								}}
							/>
					  ))
					: user?.user?.role === "staff"
					? staffLinks.map(({ name, icon, href }) => (
							<SidebarLink
								key={name}
								href={`/auth/staff/${href}`}
								name={name}
								icon={icon}
								onClick={() => {
									if (mediumScreen) {
										setDrawerIsOpen(false);
									}
								}}
							/>
					  ))
					: customerLinks.map(({ name, icon, href }) => (
							<SidebarLink
								key={name}
								href={`/auth/customer/${href}`}
								name={name}
								icon={icon}
								onClick={() => {
									if (mediumScreen) {
										setDrawerIsOpen(false);
									}
								}}
							/>
					  ))}
			</List>

			<Stack sx={{ px: 4, mb: 2 }}>
				<ListItem disablePadding>
					<ListItemButton
						sx={{ justifyContent: "center" }}
						onClick={() => {
							localStorage.removeItem("token");
							dispatch(logout());
							router.push("/login");
						}}
					>
						<ListItemIcon sx={{ color: "secondary.main" }}>
							<LogoutIcon />
						</ListItemIcon>
						<ListItemText
							sx={{
								"& span": {
									fontWeight: "600 !important",
									color: "secondary.main"
								}
							}}
							primary='Logout'
						/>
					</ListItemButton>
				</ListItem>
			</Stack>
		</Drawer>
	);
};

export default Sidebar;
