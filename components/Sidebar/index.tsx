import { useEffect, useState, ReactNode } from "react";
import Image from "next/image";
import {
	Stack,
	Drawer,
	IconButton,
	Hidden,
	List,
	useTheme,
	useMediaQuery
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

// Components
import SidebarLink from "./Link";

// Links
import { customerLinks, adminLinks } from "./links";

const DRAWER_WIDTH = 250;

const Sidebar = () => {
	const theme = useTheme();
	const mediumScreen = useMediaQuery(theme.breakpoints.down("md"));
	const [drawerIsOpen, setDrawerIsOpen] = useState(true);

	let role = "customer";

	useEffect(() => {
		if (!mediumScreen) {
			setDrawerIsOpen(true);
		}
	}, [mediumScreen]);

	return (
		<Drawer
			variant={mediumScreen ? "temporary" : "persistent"}
			anchor='left'
			open={drawerIsOpen}
			sx={{
				width: DRAWER_WIDTH,
				boxShadow: "15px 15px 35px rgba(0,0,0,0.1)",
				zIndex: 20,

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
					<IconButton onClick={() => setDrawerIsOpen(false)}>
						<ChevronLeftIcon />
					</IconButton>
				</Hidden>
			</Stack>

			<List sx={{ px: 4 }}>
				{role === "admin"
					? adminLinks.map(({ name, icon, href }) => (
							<SidebarLink
								key={name}
								href={`/auth/admin/${href}`}
								name={name}
								icon={icon}
							/>
					  ))
					: customerLinks.map(({ name, icon, href }) => (
							<SidebarLink
								key={name}
								href={`/auth/customer/${href}`}
								name={name}
								icon={icon}
							/>
					  ))}
			</List>
		</Drawer>
	);
};

export default Sidebar;
