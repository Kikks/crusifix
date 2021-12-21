import { ReactNode, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
	Box,
	Typography,
	IconButton,
	Stack,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	useMediaQuery,
	useTheme
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

// Common
import Button from "../../common/Button";

// Comonents
import Container from "../../components/Container";

// Links
import links from "./links";

interface LinkProps {
	href: string;
	children: ReactNode;
}

const NavLink = ({ href, children }: LinkProps) => {
	return (
		<Link passHref href={href}>
			<Typography
				variant='body2'
				component='a'
				sx={{
					mx: 2,
					p: 0.5,
					fontWeight: 600,
					cursor: "pointer",
					borderBottom: "2px solid transparent",

					":hover": {
						color: "secondary.main",
						borderBottom: "2px solid #ec615b"
					}
				}}
			>
				{children}
			</Typography>
		</Link>
	);
};

const Navigation = () => {
	const router = useRouter();
	const theme = useTheme();
	const smallScreens = useMediaQuery(theme.breakpoints.down("sm"));
	const [drawerIsOpen, setDrawerIsOpen] = useState(false);

	return (
		<Box
			component='nav'
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				position: "sticky",
				top: 0,
				left: 0,
				width: "100%",
				bgcolor: "#fff",
				zIndex: "tooltip"
			}}
		>
			{smallScreens ? (
				<Stack direction='row' alignItems='center' justifyContent="space-between" sx={{ p: 1 }}>
					<div />
					<IconButton onClick={() => setDrawerIsOpen(true)}>
						<MenuIcon />
					</IconButton>
				</Stack>
			) : (
				<Container>
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							width: "100%"
						}}
					>
						<Image
							src='/assets/images/logo.png'
							alt='Crusifix Logo'
							width={80}
							height={80}
						/>
						<Box
							sx={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center"
							}}
						>
							{links.map(({ title, url }) => (
								<NavLink href={url} key={title}>
									{title}
								</NavLink>
							))}
							<Box sx={{ ml: 5 }}>
								<Button
									variant='outlined'
									onClick={() => router.push("/register")}
								>
									Sign Up
								</Button>
							</Box>
						</Box>
					</Box>
				</Container>
			)}

			<Drawer
				variant='temporary'
				anchor='left'
				open={drawerIsOpen}
				sx={{
					width: "100%",
					boxShadow: "15px 15px 35px rgba(0,0,0,0.1)",
					zIndex: 20,
					display: "flex",
					flexDirection: "column",

					"& .MuiDrawer-paper": {
						width: "100%",
						boxSizing: "border-box",
						border: "none"
					}
				}}
			>
				<Stack
					direction='row'
					justifyContent='space-between'
					alignItems='center'
					sx={{ p: 2, pb: 0 }}
				>
					<div />
					<IconButton onClick={() => setDrawerIsOpen(false)}>
						<ChevronLeftIcon />
					</IconButton>
				</Stack>

				<List>
					{links.map(({ title, url }) => (
						<Link href={url} passHref key={title}>
							<ListItem disablePadding>
								<ListItemButton sx={{ justifyContent: "center" }}>
									<ListItemText
										sx={{
											"& span": {
												fontWeight: "600 !important",
												color: "#5a7184"
											}
										}}
										primary={title}
									/>
								</ListItemButton>
							</ListItem>
						</Link>
					))}
					<ListItem disablePadding>
						<Box sx={{ ml: 5 }}>
							<Button
								variant='outlined'
								onClick={() => router.push("/register")}
							>
								Sign Up
							</Button>
						</Box>
					</ListItem>
				</List>
			</Drawer>
		</Box>
	);
};

export default Navigation;
