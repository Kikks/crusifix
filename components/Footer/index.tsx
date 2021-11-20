import * as React from "react";
import Image from "next/image";
import { Box, Typography, Stack, Paper } from "@mui/material";
import InputUnstyled, { InputUnstyledProps } from "@mui/core/InputUnstyled";
import { styled } from "@mui/system";
import GoogleIcon from "@mui/icons-material/Google";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YoutubeIcon from "@mui/icons-material/YouTube";

// Common
import Button from "../../common/Button";

// Components
import Container from "../Container";

const StyledInputElement = styled("input")`
	width: 320px;
	font-size: 1rem;
	font-family: Open Sans, sans-serif;
	font-weight: 400;
	line-height: 1.4375em;
	background: #fff;
	border: 1px solid #e5e8ec;
	border-radius: 8px;
	padding: 15px;
	color: #20262d;
	transition: width 300ms ease;

	&:hover {
		background: #eaeef3;
		border-color: #e5e8ec;
	}

	&:focus {
		outline: none;
		width: 340px;
		transition: width 200ms ease-out;
	}
`;

const TextField = React.forwardRef(function CustomInput(
	props: InputUnstyledProps,
	ref: React.ForwardedRef<HTMLDivElement>
) {
	return (
		<InputUnstyled
			components={{ Input: StyledInputElement }}
			{...props}
			ref={ref}
		/>
	);
});

const Footer = () => {
	return (
		<Box
			sx={{
				bgcolor: "primary.main",
				mt: 15,
				display: "flex",
				justifyContent: "center",
				p: 5,
				pt: 30,
				position: "relative",
				overflow: "hidden"
			}}
		>
			<Box
				sx={{
					height: 1000,
					width: "200%",
					bgcolor: "#fff",
					position: "absolute",
					top: "-45%",
					left: "50%",
					borderRadius: "100%",
					transform: "translate(-50%, -50%)",
					clipPath: "ellipse(100% 100% at 50% 50%)"
				}}
			/>
			<Container>
				<Stack
					direction='row'
					spacing={5}
					sx={{ py: 8 }}
					justifyContent='space-between'
				>
					<Stack spacing={5} flex={0.5}>
						<Typography
							variant='h4'
							sx={{ color: "#fff", fontWeight: "bold", maxWidth: 500 }}
						>
							Ready to get game? submit your email so we can update you on the
							latest games and events
						</Typography>

						<Stack spacing={1} direction='row'>
							<TextField placeholder='Your Email' />
							<Button sx={{ bgcolor: "#1565D8" }} variant='contained'>
								Get Started
							</Button>
						</Stack>

						<Stack
							alignContent='center'
							alignItems='center'
							spacing={2}
							sx={{ width: "70%" }}
						>
							<Typography variant='caption' sx={{ color: "#5A7184" }}>
								Follow us on social media platforms
							</Typography>

							<Stack direction='row' spacing={2}>
								<GoogleIcon
									sx={{
										fontSize: 18,
										color: "#5A7184",
										transition: 'color .2s',
										":hover": { color: "secondary.main" }
									}}
								/>
								<TwitterIcon
									sx={{
										fontSize: 18,
										color: "#5A7184",
										transition: 'color .2s',
										":hover": { color: "secondary.main" }
									}}
								/>
								<InstagramIcon
									sx={{
										fontSize: 18,
										color: "#5A7184",
										transition: 'color .2s',
										":hover": { color: "secondary.main" }
									}}
								/>
								<LinkedInIcon
									sx={{
										fontSize: 18,
										color: "#5A7184",
										transition: 'color .2s',
										":hover": { color: "secondary.main" }
									}}
								/>
								<YoutubeIcon
									sx={{
										fontSize: 18,
										color: "#5A7184",
										transition: 'color .2s',
										":hover": { color: "secondary.main" }
									}}
								/>
							</Stack>
						</Stack>
					</Stack>

					<Stack flex={0.4}>
						<Paper
							sx={{
								p: 5,
								borderRadius: 5,
								boxShadow: "-50px 50px 50px rgba(0,0,0,.15)",
								mb: -3,
								ml: -5,
								zIndex: 500,
								maxWidth: 450
							}}
						>
							<Stack direction='row' spacing={2}>
								<div>
									<Image
										src='/assets/icons/footer-icon-1.svg'
										alt='pricing'
										height={100}
										width={100}
									/>
								</div>

								<Stack spacing={2}>
									<Typography variant='h6' sx={{ fontWeight: "bold" }}>
										We have the best prices
									</Typography>

									<Typography>
										Our game prices are affordable and allows you play to your
										satisfaction.
									</Typography>
								</Stack>
							</Stack>
						</Paper>

						<Paper sx={{ p: 5, borderRadius: 5, maxWidth: 450, zIndex: 400 }}>
							<Stack direction='row' spacing={2}>
								<div>
									<Image
										src='/assets/icons/footer-icon-2.svg'
										alt='like'
										height={70}
										width={70}
									/>
								</div>

								<Stack spacing={2}>
									<Typography variant='h6' sx={{ fontWeight: "bold" }}>
										We make gaming fun
									</Typography>

									<Typography>
										We&apos;re committed to making gaming as fun engaging for
										you.
									</Typography>
								</Stack>
							</Stack>
						</Paper>
					</Stack>
				</Stack>
			</Container>
		</Box>
	);
};

export default Footer;
