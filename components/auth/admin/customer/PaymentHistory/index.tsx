import { FC, useState } from "react";
import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography
} from "@mui/material";
import moment from "moment";

// Components
import Card from "../../../Card";

export type PaymentProps = {
	_id: string;
	gamePlayed: {
		name: string;
	};
	amount: number;
	createdAt: string;
	pointsAwarded: number;
};

type PaymentHistoryProps = {
	payments: PaymentProps[];
};

const headings = ["games played", "amount", "date", "year", "points awarded"];

const TableWrapper: FC = ({ children }) => <Card>{children}</Card>;

const PaymentHistory = ({ payments }: PaymentHistoryProps) => {
	return (
		<>
			<Typography variant='h4' sx={{ fontWeight: "bold", mt: 5, mb: 3 }}>
				Payment History
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

					{payments.length !== 0 && (
						<TableBody>
							{payments.map(
								({ _id, gamePlayed, amount, createdAt, pointsAwarded }) => (
									<TableRow key={_id}>
										<TableCell>
											<Typography
												sx={{ fontWeight: "bold", textTransform: "uppercase" }}
											>
												{gamePlayed?.name || ""}
											</Typography>
										</TableCell>

										<TableCell>
											<Typography sx={{ fontWeight: "bold" }}>
												{amount.toLocaleString("en-US")}
											</Typography>
										</TableCell>

										<TableCell>
											<Typography sx={{ fontWeight: "bold" }}>
												{moment(createdAt).format("DD/MM/YYYY")}
											</Typography>
										</TableCell>

										<TableCell>
											<Typography sx={{ fontWeight: "bold" }}>
												{moment(createdAt).format("YYYY")}
											</Typography>
										</TableCell>

										<TableCell>
											<Typography sx={{ fontWeight: "bold" }}>
												{pointsAwarded.toLocaleString("en-US")}
											</Typography>
										</TableCell>
									</TableRow>
								)
							)}
						</TableBody>
					)}
				</Table>

				{payments.length === 0 && (
					<Box sx={{ width: "100%", p: 5 }}>
						<Typography sx={{ fontWeight: "bold", textAlign: "center" }}>
							This customer has not made any payment
						</Typography>
					</Box>
				)}
			</TableContainer>
		</>
	);
};

export default PaymentHistory;
