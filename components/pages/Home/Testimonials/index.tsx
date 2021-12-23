import { Stack, Box, Typography, Avatar, Grid } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import CheckIcon from "@mui/icons-material/Check";

// Components
import Container from "../../../Container";

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
		<Grid item lg={3} md={3} sm={6} xs={12} data-aos='fade-up'>
			<Stack spacing={3}>
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

				<Typography>{description}</Typography>

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
		</Grid>
	);
};

const testimonials = [
	{
		rating: 5,
		description:
			"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur explicabo nesciunt, voluptatum minus quia quis.",
		image: "/assets/images/avatar-1.png",
		name: "Viola Manisa"
	},
	{
		rating: 5,
		description:
			"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur explicabo nesciunt, voluptatum minus quia quis.",
		image: "/assets/images/avatar-2.png",
		name: "Bryon Arnoldy"
	},
	{
		rating: 5,
		description:
			"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur explicabo nesciunt, voluptatum minus quia quis.",
		image: "/assets/images/avatar-3.png",
		name: "Joshua William"
	},
	{
		rating: 5,
		description:
			"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur explicabo nesciunt, voluptatum minus quia quis.",
		image: "/assets/images/avatar-4.png",
		name: "George Scott"
	}
];

const Testimonials = () => {
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

					<Grid container spacing={4}>
						{testimonials.map(testimonial => (
							<TestimonialCard key={testimonial.name} {...testimonial} />
						))}
					</Grid>
				</Stack>
			</Container>
		</Box>
	);
};
export default Testimonials;
