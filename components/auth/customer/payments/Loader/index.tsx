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
			<Grid item lg={12} md={12} sm={12} xs={12}>
				<CustomSkeleton height='75vh' />
			</Grid>
		</Grid>
	);
};

export default Loader;
