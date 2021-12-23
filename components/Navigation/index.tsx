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
import CancelIcon from "@mui/icons-material/Close";

// Common
import Button from "../../common/Button";

// Comonents
import Container from "../../components/Container";

// Links
import links from "./links";

interface LinkProps {
	href: string;
	children: ReactNode;
	index: number;
}

const NavLink = ({ href, children, index }: LinkProps) => {
	return (
		<a href={href}>
			<Typography
				variant='body2'
				component='a'
				data-aos='fade-left'
				data-aos-delay={(index + 0.5) * 100}
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
		</a>
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
				zIndex: 1000
			}}
		>
			{smallScreens ? (
				<Stack
					direction='row'
					alignItems='center'
					justifyContent='space-between'
					sx={{ p: 1, width: "100%" }}
				>
					<div />
					<IconButton onClick={() => setDrawerIsOpen(prevState => !prevState)}>
						{drawerIsOpen ? <CancelIcon /> : <MenuIcon />}
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
							{links.map(({ title, url }, index) => (
								<NavLink href={url} key={title} index={index}>
									{title}
								</NavLink>
							))}
							<Box sx={{ ml: 5 }} data-aos='fade-left' data-aos-delay={400}>
								<Button
									variant='outlined'
									onClick={() => router.push("/register")}
								>
									Sign Up/Sign In
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
						border: "none",
						zIndex: 2000
					}
				}}
			>
				<List sx={{ mt: 10 }}>
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
						<Box sx={{ ml: 2, mt: 2 }}>
							<Button
								variant='outlined'
								onClick={() => router.push("/register")}
							>
								Sign Up/Sign In
							</Button>
						</Box>
					</ListItem>
				</List>
			</Drawer>
		</Box>
	);
};

export default Navigation;
