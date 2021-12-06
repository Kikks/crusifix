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

const headings = [
	"",
	"full name",
	"email",
	"phone",
	"no. of games",
	"register date"
];

const TableWrapper: FC = ({ children }) => (
	<Card sx={{ mt: 5 }}>{children}</Card>
);

const RecentCustomers = () => {
	const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
	console.log(selectedCustomers);

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
		<TableContainer component={TableWrapper}>
			<Typography variant='h4' sx={{ fontWeight: "bold", my: 3 }}>
				Recent Customers in last 30 days
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

				<TableBody>
					{customers.map(
						({
							id,
							name,
							image,
							noOfGames,
							email,
							phoneNumber,
							registerDate
						}) => (
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
									<Stack direction='row' alignItems='left' spacing={3}>
										<Avatar src={image} />
										<Typography sx={{ fontWeight: "bold" }}>{name}</Typography>
									</Stack>
								</TableCell>

								<TableCell>
									<Typography sx={{ fontWeight: "bold" }}>{email}</Typography>
								</TableCell>

								<TableCell>
									<Typography sx={{ fontWeight: "bold" }}>
										{phoneNumber}
									</Typography>
								</TableCell>

								<TableCell align='center'>
									<Typography sx={{ fontWeight: "bold" }}>
										{noOfGames}
									</Typography>
								</TableCell>

								<TableCell>
									<Typography sx={{ fontWeight: "bold" }}>
										{registerDate}
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

export default RecentCustomers;
