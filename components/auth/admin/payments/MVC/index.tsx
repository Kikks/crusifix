import { FC, useState } from "react";
import Link from "next/link";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Stack,
	Avatar,
	Typography,
	Skeleton,
	Box
} from "@mui/material";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

// Components
import Card from "../../../Card";

// Utils
import { getRequest } from "../../../../../utils/api/calls";
import { GET_MVCS } from "../../../../../utils/api/urls";
import queryKeys from "../../../../../utils/api/queryKeys";
import { getInitials } from "../../../../../utils/formatters";

// Store
import { RootState } from "../../../../../store";

type MVCProps = {
	_id: string;
	totalPoints: number;
	totalSpent: number;
	totalGames: number;
	user_id: string;
	user_info: {
		firstName: string;
		lastName: string;
		image?: string;
	}[];
};

const headings = ["full name", "total games", "total spend"];

const TableWrapper: FC = ({ children }) => (
	<Card sx={{ mt: 5 }}>{children}</Card>
);

const MVC = () => {
	const { user } = useSelector((state: RootState) => state.user);
	const [customers, setCustomers] = useState<MVCProps[]>([]);

	const { isLoading } = useQuery(
		queryKeys.getAllMVCs,
		() => getRequest({ url: GET_MVCS }),
		{
			onSuccess(data) {
				setCustomers(data?.data || []);
			},
			onError(error: any) {
				console.error(error?.response);
			},
			enabled: !!user?._id
		}
	);

	return isLoading ? (
		<Skeleton
			animation='wave'
			variant='rectangular'
			width='100%'
			height='60vh'
			sx={{ borderRadius: 5, mt: 5 }}
		/>
	) : (
		<>
			<Typography variant='h4' sx={{ fontWeight: "bold", my: 1 }}>
				Most valuable customers
			</Typography>
			<TableContainer component={TableWrapper}>
				<Table sx={{ minWidth: 400, mt: 5 }}>
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
							{customers.map(
								({ _id, user_info, user_id, totalGames, totalSpent }) => (
									<TableRow key={_id}>
										<Link href={`/auth/admin/customers/${user_id}`} passHref>
											<TableCell sx={{ cursor: "pointer" }}>
												<Stack direction='row' alignItems='center' spacing={3}>
													<Avatar src={user_info[0]?.image}>
														{getInitials(
															`${user_info[0]?.firstName || ""} ${
																user_info[0]?.lastName || ""
															}`
														)}
													</Avatar>
													<Typography
														sx={{
															fontWeight: "bold",
															textTransform: "capitalize"
														}}
													>
														{`${user_info[0]?.firstName || ""} ${
															user_info[0]?.lastName || ""
														}`}
													</Typography>
												</Stack>
											</TableCell>
										</Link>

										<Link href={`/auth/admin/customers/${user_id}`} passHref>
											<TableCell sx={{ cursor: "pointer" }}>
												<Typography sx={{ fontWeight: "bold" }}>
													{totalGames.toLocaleString("en-US")}
												</Typography>
											</TableCell>
										</Link>

										<Link href={`/auth/admin/customers/${user_id}`} passHref>
											<TableCell sx={{ cursor: "pointer" }}>
												<Typography sx={{ fontWeight: "bold" }}>
													{totalSpent.toLocaleString("en-US")}
												</Typography>
											</TableCell>
										</Link>
									</TableRow>
								)
							)}
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
		</>
	);
};

export default MVC;
