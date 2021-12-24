import { useState } from "react";
import {
	Stack,
	Box,
	Typography,
	Avatar,
	IconButton,
	useTheme
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import CheckIcon from "@mui/icons-material/Check";
import ChevronRight from "@mui/icons-material/ChevronRight";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import SwipeableViews from "react-swipeable-views";

// Components
import Container from "../../../Container";

// Testimonials
import { testimonials } from "./testimonials";

interface TestimonialCardProps {
	rating: number;
	description: string;
	image: string;
	name: string;
}

const TestimonialCard = ({
	rating,
	description,
	image,
	name
}: TestimonialCardProps) => {
	const ratingArray = [];

	for (let i = 0; i < rating; i++) {
		ratingArray.push(i);
	}

	return (
		<Stack
			direction='row'
			alignItems='center'
			justifyContent='center'
			sx={{ width: "100%" }}
		>
			<Stack
				spacing={3}
				sx={{ width: "100%", maxWidth: 400 }}
				alignItems='center'
			>
				<Stack direction='row' spacing={1} alignItems='center'>
					{ratingArray.map(index => (
						<Box
							key={index}
							sx={{
								bgcolor: "#36be7e",
								p: 1.5,
								height: 14,
								width: 14,
								display: "flex",
								justifyContent: "center",
								alignItems: "center"
							}}
						>
							<StarIcon sx={{ color: "#fff", fontSize: 14 }} />
						</Box>
					))}
				</Stack>

				<Typography sx={{ textAlign: "center" }}>{description}</Typography>

				<Stack direction='row' spacing={2} alignItems='center'>
					<Avatar alt={name} src={image} />

					<Stack spacing={1}>
						<Typography
							variant='subtitle2'
							sx={{ fontWeight: "bold", textTransform: "uppercase" }}
						>
							{name}
						</Typography>

						<Stack direction='row' alignItems='center' spacing={1}>
							<Box
								sx={{
									bgcolor: "rgba(54,179,126,.15)",
									borderRadius: 100,
									height: 18,
									width: 18,
									display: "flex",
									justifyContent: "center",
									alignItems: "center"
								}}
							>
								<CheckIcon
									sx={{
										color: "primary.main",
										fontSize: 11,
										fontWeight: "bold"
									}}
								/>
							</Box>

							<Typography variant='subtitle2' sx={{ fontStyle: "italic" }}>
								Verified customer
							</Typography>
						</Stack>
					</Stack>
				</Stack>
			</Stack>
		</Stack>
	);
};

const Testimonials = () => {
	const [activeStep, setActiveStep] = useState(0);
	const maxSteps = testimonials.length;
	const theme = useTheme();

	const handleNext = () => {
		setActiveStep(prevState => {
			if (prevState + 1 > maxSteps - 1) {
				return 0;
			} else {
				return prevState + 1;
			}
		});
	};

	const handlePrevious = () => {
		setActiveStep(prevState => {
			if (prevState - 1 < 0) {
				return maxSteps - 1;
			} else {
				return prevState - 1;
			}
		});
	};

	const handleStepChange = (step: number) => {
		setActiveStep(step);
	};

	return (
		<Box
			sx={{ width: "100%", mt: 15, display: "flex", justifyContent: "center" }}
		>
			<Container>
				<Stack spacing={3} alignContent='center' alignItems='center'>
					<Typography
						variant='button'
						sx={{ textAlign: "center", fontWeight: "bold" }}
						data-aos='fade-up'
					>
						Testimonials
					</Typography>
					<Typography
						variant='h3'
						sx={{ fontWeight: "bold", textAlign: "center" }}
						data-aos='fade-up'
					>
						What our customers have to say
					</Typography>

					<Stack data-aos='fade-up' sx={{ width: "100%", my: 10 }}>
						<SwipeableViews
							axis={theme.direction === "rtl" ? "x-reverse" : "x"}
							index={activeStep}
							onChangeIndex={handleStepChange}
							enableMouseEvents
						>
							{testimonials.map(
								(
									testimonial: JSX.IntrinsicAttributes & TestimonialCardProps
								) => (
									<TestimonialCard key={testimonial.name} {...testimonial} />
								)
							)}
						</SwipeableViews>
					</Stack>
					<Stack
						direction='row'
						alignItems='center'
						justifyContent='space-between'
						spacing={3}
						sx={{ mt: 5, width: "100%", maxWidth: 400 }}
						data-aos='fade-up'
					>
						<IconButton onClick={() => handlePrevious()}>
							<ChevronLeft />
						</IconButton>

						<Stack direction='row' alignItems='center' spacing={1}>
							{testimonials.map((_, index) => (
								<Box
									key={index}
									sx={{
										height: 10,
										width: 10,
										borderRadius: "50%",
										bgcolor: index === activeStep ? "primary.main" : "#eee"
									}}
								/>
							))}
						</Stack>

						<IconButton onClick={() => handleNext()}>
							<ChevronRight />
						</IconButton>
					</Stack>
				</Stack>
			</Container>
		</Box>
	);
};
export default Testimonials;
