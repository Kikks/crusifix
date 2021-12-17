import { Grid, Skeleton, SkeletonProps } from "@mui/material";

import React from "react";

const CustomSkeleton = (props: SkeletonProps) => (
	<Skeleton
		animation='wave'
		variant='rectangular'
		width='100%'
		sx={{ borderRadius: 5 }}
		{...props}
	/>
);

const Loader = () => {
	return (
		<Grid container rowSpacing={5} columnSpacing={3}>
			<Grid item lg={7} md={7} sm={6} xs={12}>
				<CustomSkeleton height={200} />
			</Grid>
			<Grid item lg={5} md={5} sm={6} xs={12}>
				<CustomSkeleton height={200} />
			</Grid>

			<Grid item lg={3} md={4} sm={6} xs={12}>
				<CustomSkeleton height={100} />
			</Grid>
			<Grid item lg={3} md={4} sm={6} xs={12}>
				<CustomSkeleton height={100} />
			</Grid>
			<Grid item lg={3} md={4} sm={6} xs={12}>
				<CustomSkeleton height={100} />
			</Grid>
			<Grid item lg={3} md={4} sm={6} xs={12}>
				<CustomSkeleton height={100} />
			</Grid>

			<Grid item lg={12} md={12} sm={12} xs={12}>
				<CustomSkeleton height='40vh' />
			</Grid>

			<Grid item lg={12} md={12} sm={12} xs={12}>
				<CustomSkeleton height='40vh' />
			</Grid>
		</Grid>
	);
};

export default Loader;
