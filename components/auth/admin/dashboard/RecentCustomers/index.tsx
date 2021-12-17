import { FC, useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Stack,
	Avatar,
	Box,
	Skeleton,
	Typography
} from "@mui/material";
import moment from "moment";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

// Components
import Card from "../../../Card";

// Utils
import { getInitials } from "../../../../../utils/formatters";
import { getRequest } from "../../../../../utils/api/calls";
import { GET_RECENT_CUSTOMERS } from "../../../../../utils/api/urls";
import queryKeys from "../../../../../utils/api/queryKeys";

// Store
import { RootState } from "../../../../../store";

export type CustomerProps = {
	_id: string;
	fullname: string;
	email: string;
	month: number;
	image?: string;
};

const headings = ["full name", "email", "joined"];

const TableWrapper: FC = ({ children }) => (
	<Card sx={{ mt: 5 }}>{children}</Card>
);

const RecentCustomers = () => {
	const { user } = useSelector((state: RootState) => state.user);
	const [customers, setCustomers] = useState<CustomerProps[]>([]);

	const { isLoading, isFetching } = useQuery(
		queryKeys.getRecentCustomers,
		() => getRequest({ url: GET_RECENT_CUSTOMERS }),
		{
			onSuccess(data) {
				setCustomers(data?.data);
			},
			onError(error: any) {
				console.error(error?.response);
			},
			enabled: !!user?._id,
			refetchOnWindowFocus: false
		}
	);

	return isLoading || isFetching ? (
		<Skeleton
			animation='wave'
			variant='rectangular'
			width='100%'
			height='60vh'
			sx={{ borderRadius: 5, mt: 5 }}
		/>
	) : (
		<TableContainer component={TableWrapper}>
			<Typography variant='h4' sx={{ fontWeight: "bold", my: 3 }}>
				Recent Cutomers in last 30 days
			</Typography>
			<Table sx={{ minWidth: 400 }}>
				<TableHead>
					<TableRow>
						{headings.map(heading => (
							<TableCell key={heading}>
								<Typography
									sx={{
										color: "#9fa2b4",
										fontWeight: "bold",
										textTransform: "uppercase"
									}}
								>
									{heading}
								</Typography>
							</TableCell>
						))}
					</TableRow>
				</TableHead>

				{customers.length !== 0 && (
					<TableBody>
						{customers.map(({ _id, image, fullname, month, email }) => (
							<TableRow key={_id}>
								<TableCell>
									<Stack direction='row' alignItems='left' spacing={3}>
										<Avatar src={image}>{getInitials(fullname)}</Avatar>
										<Typography
											sx={{
												fontWeight: "bold",
												textTransform: "capitalize"
											}}
										>
											{fullname}
										</Typography>
									</Stack>
								</TableCell>

								<TableCell>
									<Typography sx={{ fontWeight: "bold" }}>{email}</Typography>
								</TableCell>

								<TableCell>
									<Typography sx={{ fontWeight: "bold" }}>
										{moment()
											.month(month - 1)
											.format("MMM")}
									</Typography>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				)}
			</Table>
			{customers.length === 0 && (
				<Box sx={{ width: "100%", p: 5 }}>
					<Typography sx={{ fontWeight: "bold", textAlign: "center" }}>
						There are no customers
					</Typography>
				</Box>
			)}
		</TableContainer>
	);
};

export default RecentCustomers;
