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
import { customers } from "./customers";

const headings = ["", "full name", "total games", "total spend", "last played"];

const TableWrapper: FC = ({ children }) => (
	<Card sx={{ mt: 5 }}>{children}</Card>
);

const MVC = () => {
	const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);

	const handleChanged = (id: string) => {
		// console.log(selectedCustomers);
		if (selectedCustomers.includes(id)) {
			setSelectedCustomers(prevState => {
				const customerArrayIndex = prevState.findIndex(
					customerIndex => customerIndex === id
				);
				const newItems = prevState;
				newItems.splice(customerArrayIndex, 1);

				// console.log(newItems);
				return newItems;
			});
		} else {
			setSelectedCustomers(prevState => {
				prevState.push(id);
				// console.log(prevState);
				return prevState;
			});
		}
	};

	return (
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

					<TableBody>
						{customers.map(
							({ id, name, image, totalGames, totalSpend, lastPlayed }) => (
								<TableRow key={id}>
									<TableCell>
										<Typography sx={{ fontWeight: "bold" }}>
											<Checkbox
												checked={selectedCustomers.includes(id)}
												onClick={() => handleChanged(id)}
												// onChange={ }
											/>
										</Typography>
									</TableCell>

									<TableCell>
										<Stack direction='row' alignItems='center' spacing={3}>
											<Avatar src={image} />
											<Typography sx={{ fontWeight: "bold" }}>
												{name}
											</Typography>
										</Stack>
									</TableCell>

									<TableCell>
										<Typography sx={{ fontWeight: "bold" }}>
											{totalGames}
										</Typography>
									</TableCell>

									<TableCell>
										<Typography sx={{ fontWeight: "bold" }}>
											{totalSpend}
										</Typography>
									</TableCell>

									<TableCell>
										<Typography sx={{ fontWeight: "bold" }}>
											{lastPlayed}
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

export default MVC;
