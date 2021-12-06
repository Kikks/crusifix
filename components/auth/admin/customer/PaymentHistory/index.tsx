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
	Typography,
	Checkbox
} from "@mui/material";

// Components
import Card from "../../../Card";

// dummydata
import { paymentHistory } from "./history";

const headings = [
	"",
	"games played",
	"amount",
	"date",
	"year",
	"points awarded"
];

const TableWrapper: FC = ({ children }) => <Card>{children}</Card>;

const PaymentHistory = () => {
	const [selectedPayment, setSelectedPayment] = useState<string[]>([]);

	const handleChanged = (id: string) => {
		// console.log(selectedPayment);
		if (selectedPayment.includes(id)) {
			setSelectedPayment(prevState => {
				const customerArrayIndex = prevState.findIndex(
					customerIndex => customerIndex === id
				);
				const newItems = prevState;
				newItems.splice(customerArrayIndex, 1);

				// console.log(newItems);
				return newItems;
			});
		} else {
			setSelectedPayment(prevState => {
				prevState.push(id);
				// console.log(prevState);
				return prevState;
			});
		}
	};

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

					<TableBody>
						{paymentHistory.map(
							({ id, name, amount, date, year, pointsAwarded }) => (
								<TableRow key={id}>
									<TableCell sx={{ width: "7%", minWidth: 74 }}>
										<Typography sx={{ fontWeight: "bold" }}>
											<Checkbox
												checked={selectedPayment.includes(id)}
												onClick={() => handleChanged(id)}
												// onChange={ }
											/>
										</Typography>
									</TableCell>

									<TableCell>
										<Typography
											sx={{ fontWeight: "bold", textTransform: "uppercase" }}
										>
											{name}
										</Typography>
									</TableCell>

									<TableCell>
										<Typography sx={{ fontWeight: "bold" }}>
											{amount}
										</Typography>
									</TableCell>

									<TableCell>
										<Typography sx={{ fontWeight: "bold" }}>{date}</Typography>
									</TableCell>

									<TableCell>
										<Typography sx={{ fontWeight: "bold" }}>{year}</Typography>
									</TableCell>

									<TableCell>
										<Typography sx={{ fontWeight: "bold" }}>
											{pointsAwarded}
										</Typography>
									</TableCell>
								</TableRow>
							)
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default PaymentHistory;
