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
	Typography,
	Checkbox
} from "@mui/material";

// Components
import Card from "../../../Card";

// dummydata
import { payments } from "./payments";

const headings = ["", "full name", "game played", "amount(ngn)", "timestamp"];

const TableWrapper: FC = ({ children }) => (
	<Card sx={{ mt: 5 }}>{children}</Card>
);

const Payments = () => {
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

				<TableBody>
					{payments.map(
						({ id, name, image, gamePlayed, amount, timestamp }) => (
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

								<TableCell>
									<Stack direction='row' alignItems='center' spacing={3}>
										<Avatar src={image} />
										<Typography sx={{ fontWeight: "bold" }}>{name}</Typography>
									</Stack>
								</TableCell>

								<TableCell>
									<Typography sx={{ fontWeight: "bold" }}>
										{gamePlayed}
									</Typography>
								</TableCell>

								<TableCell>
									<Typography sx={{ fontWeight: "bold" }}>{amount}</Typography>
								</TableCell>

								<TableCell>
									<Typography sx={{ fontWeight: "bold" }}>
										{timestamp}
									</Typography>
								</TableCell>
							</TableRow>
						)
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default Payments;
