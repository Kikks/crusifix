import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Box, Typography } from "@mui/material";

// Common
import Button from "../../common/Button";

// Comonents
import Container from "../../components/Container";

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
						<NavLink href='/'>Home</NavLink>
						<NavLink href='/'>About Us</NavLink>
						<NavLink href='/'>Games</NavLink>
						<NavLink href='/'>Location</NavLink>
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
		</Box>
	);
};

export default Navigation;
