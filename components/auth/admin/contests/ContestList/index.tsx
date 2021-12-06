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
	Checkbox,
	Box
} from "@mui/material";

import HeartIcon from "@mui/icons-material/Favorite";

// Components
import Card from "../../../Card";

// dummydata
import { contests } from "./contests";

const headings = [
	"",
	"name",
	"start date",
	"end date",
	"reward amount",
	"cash to points"
];

const TableWrapper: FC = ({ children }) => <Card>{children}</Card>;

const ContestList = () => {
	const [selectedPayments, setSelectedPayments] = useState<string[]>([]);

	const handleChanged = (id: string) => {
		// console.log(selectedPayments);
		if (selectedPayments.includes(id)) {
			setSelectedPayments(prevState => {
				const customerArrayIndex = prevState.findIndex(
					customerIndex => customerIndex === id
				);
				const newItems = prevState;
				newItems.splice(customerArrayIndex, 1);

				// console.log(newItems);
				return newItems;
			});
		} else {
			setSelectedPayments(prevState => {
				prevState.push(id);
				// console.log(prevState);
				return prevState;
			});
		}
	};

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

					<TableBody>
						{contests.map(
							({
								id,
								name,
								startDate,
								endDate,
								rewardAmount,
								cashToPoints
							}) => (
								<TableRow key={id}>
									<TableCell>
										<Typography sx={{ fontWeight: "bold" }}>
											<Checkbox
												checked={selectedPayments.includes(id)}
												onClick={() => handleChanged(id)}
												// onChange={ }
											/>
										</Typography>
									</TableCell>
									<Link href={`/auth/admin/contests/${id}`} passHref>
										<TableCell sx={{ cursor: "pointer" }}>
											<Typography sx={{ fontWeight: "bold" }}>
												{name}
											</Typography>
										</TableCell>
									</Link>

									<Link href={`/auth/admin/contests/${id}`} passHref>
										<TableCell sx={{ cursor: "pointer" }}>
											<Typography sx={{ fontWeight: "bold" }}>
												{startDate}
											</Typography>
										</TableCell>
									</Link>

									<Link href={`/auth/admin/contests/${id}`} passHref>
										<TableCell sx={{ cursor: "pointer" }}>
											<Typography sx={{ fontWeight: "bold" }}>
												{endDate}
											</Typography>
										</TableCell>
									</Link>

									<Link href={`/auth/admin/contests/${id}`} passHref>
										<TableCell sx={{ cursor: "pointer" }}>
											<Typography sx={{ fontWeight: "bold" }}>
												{rewardAmount}
											</Typography>
										</TableCell>
									</Link>

									<Link href={`/auth/admin/contests/${id}`} passHref>
										<TableCell sx={{ cursor: "pointer" }}>
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
									</Link>
								</TableRow>
							)
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default ContestList;
