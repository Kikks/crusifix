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
		<Grid container rowSpacing={5} columnSpacing={3} sx={{ mt: 3 }}>
			<Grid item lg={4} md={4} sm={6} xs={12}>
				<CustomSkeleton height={100} />
			</Grid>
			<Grid item lg={4} md={4} sm={6} xs={12}>
				<CustomSkeleton height={100} />
			</Grid>
			<Grid item lg={4} md={4} sm={6} xs={12}>
				<CustomSkeleton height={100} />
			</Grid>

			<Grid item lg={12} md={12} sm={12} xs={12}>
				<CustomSkeleton height='40vh' />
			</Grid>
		</Grid>
	);
};

export default Loader;
