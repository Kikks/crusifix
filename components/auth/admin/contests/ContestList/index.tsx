import { FC } from "react";
import Link from "next/link";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Stack,
	Typography,
	Box
} from "@mui/material";

import HeartIcon from "@mui/icons-material/Favorite";
import moment from "moment";

// Components
import Card from "../../../Card";

export type ContestProps = {
	_id: string;
	name: string;
	startDate: string;
	endDate: string;
	contestAmount: number;
	amountToPoints: number;
	pointsToAmount: number;
};

const headings = [
	"name",
	"start date",
	"end date",
	"reward amount",
	"cash to points"
];

const TableWrapper: FC = ({ children }) => <Card>{children}</Card>;

const ContestList = ({ contests }: { contests: ContestProps[] }) => {
	return (
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
									startDate,
									endDate,
									contestAmount,
									amountToPoints,
									pointsToAmount
								}) => (
									<TableRow key={_id}>
										<Link href={`/auth/admin/contests/${_id}`} passHref>
											<TableCell sx={{ cursor: "pointer" }}>
												<Typography
													sx={{
														fontWeight: "bold",
														textTransform: "capitalize"
													}}
												>
													{name}
												</Typography>
											</TableCell>
										</Link>

										<Link href={`/auth/admin/contests/${_id}`} passHref>
											<TableCell sx={{ cursor: "pointer" }}>
												<Typography sx={{ fontWeight: "bold" }}>
													{moment(startDate).format("DD/MM/YYYY")}
												</Typography>
											</TableCell>
										</Link>

										<Link href={`/auth/admin/contests/${_id}`} passHref>
											<TableCell sx={{ cursor: "pointer" }}>
												<Typography sx={{ fontWeight: "bold" }}>
													{moment(endDate).format("DD/MM/YYYY")}
												</Typography>
											</TableCell>
										</Link>

										<Link href={`/auth/admin/contests/${_id}`} passHref>
											<TableCell sx={{ cursor: "pointer" }}>
												<Typography sx={{ fontWeight: "bold" }}>
													{`${contestAmount.toLocaleString("en-US")}`}
												</Typography>
											</TableCell>
										</Link>

										<Link href={`/auth/admin/contests/${_id}`} passHref>
											<TableCell sx={{ cursor: "pointer" }}>
												<Stack direction='row' alignItems='center' spacing={1}>
													<Typography sx={{ fontWeight: "bold" }}>
														{`${amountToPoints.toLocaleString("en-US") || ""}:${
															pointsToAmount.toLocaleString("en-US") || ""
														}`}
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
										</Link>
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
