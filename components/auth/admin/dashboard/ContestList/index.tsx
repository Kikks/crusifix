import { FC, useState } from "react";
import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Stack,
	Skeleton,
	Typography
} from "@mui/material";
import HeartIcon from "@mui/icons-material/Favorite";
import moment from "moment";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

// Components
import Card from "../../../Card";

// Utils
import { getInitials } from "../../../../../utils/formatters";
import { getRequest } from "../../../../../utils/api/calls";
import { GET_DASHBOARD_CONTESTS } from "../../../../../utils/api/urls";
import queryKeys from "../../../../../utils/api/queryKeys";

// Store
import { RootState } from "../../../../../store";

export type ContestProps = {
	_id: string;
	name: string;
	endDate: string;
	startDate: string;
	rewardAmount: number;
	cashToPoints: string;
};

const headings = [
	"name",
	"start date",
	"end date",
	"reward amount",
	"cash to point"
];

const TableWrapper: FC = ({ children }) => <Card>{children}</Card>;

const ContestList = () => {
	const { user } = useSelector((state: RootState) => state.user);
	const [contests, setContests] = useState<ContestProps[]>([]);

	const { isLoading, isFetching } = useQuery(
		queryKeys.getContestList,
		() => getRequest({ url: GET_DASHBOARD_CONTESTS }),
		{
			onSuccess(data) {
				setContests(data?.data);
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
		<>
			<Typography variant='h4' sx={{ fontWeight: "bold", mt: 5, mb: 3 }}>
				Contest List
			</Typography>
			<TableContainer component={TableWrapper}>
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

					{contests.length !== 0 && (
						<TableBody>
							{contests.map(
								({
									_id,
									name,
									endDate,
									startDate,
									rewardAmount,
									cashToPoints
								}) => (
									<TableRow key={_id}>
										<TableCell>
											<Stack direction='row' alignItems='left' spacing={3}>
												<Typography sx={{ fontWeight: "bold" }}>
													{name}
												</Typography>
											</Stack>
										</TableCell>

										<TableCell>
											<Typography sx={{ fontWeight: "bold" }}>
												{moment(startDate).format("DD/MM/YYYY")}
											</Typography>
										</TableCell>

										<TableCell>
											<Typography sx={{ fontWeight: "bold" }}>
												{moment(endDate).format("DD/MM/YYYY")}
											</Typography>
										</TableCell>

										<TableCell>
											<Typography sx={{ fontWeight: "bold" }}>
												{rewardAmount.toLocaleString("en-US")}
											</Typography>
										</TableCell>

										<TableCell align='center'>
											<Stack direction='row' alignItems='center' spacing={1}>
												<Typography sx={{ fontWeight: "bold" }}>
													{cashToPoints}
												</Typography>
												<Box
													sx={{
														bgcolor: "#eb5757",
														p: 1,
														display: "flex",
														alignItems: "center",
														justifyContent: "center",
														borderRadius: 2
													}}
												>
													<HeartIcon sx={{ fontSize: 15, color: "#fff" }} />
												</Box>
											</Stack>
										</TableCell>
									</TableRow>
								)
							)}
						</TableBody>
					)}
				</Table>

				{contests.length === 0 && (
					<Box sx={{ width: "100%", p: 5 }}>
						<Typography sx={{ fontWeight: "bold", textAlign: "center" }}>
							There are no contests
						</Typography>
					</Box>
				)}
			</TableContainer>
		</>
	);
};

export default ContestList;
