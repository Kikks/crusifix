import { FC, useState } from "react";
import Link from "next/link";
import {
	Box,
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
import HeartIcon from "@mui/icons-material/Favorite";

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

const CustomerList = () => {
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
							<TableRow
								key={id}
								sx={{
									cursor: "pointer"
								}}
							>
								<TableCell>
									<Typography sx={{ fontWeight: "bold" }}>
										<Checkbox
											checked={selectedCustomers.includes(id)}
											onClick={() => handleChanged(id)}
											// onChange={ }
										/>
									</Typography>
								</TableCell>

								<Link key={id} href={`/auth/admin/customers/${id}`} passHref>
									<TableCell>
										<Stack direction='row' alignItems='center' spacing={3}>
											<Avatar src={image} />
											<Typography sx={{ fontWeight: "bold" }}>
												{name}
											</Typography>
										</Stack>
									</TableCell>
								</Link>

								<Link key={id} href={`/auth/admin/customers/${id}`} passHref>
									<TableCell>
										<Typography sx={{ fontWeight: "bold" }}>{email}</Typography>
									</TableCell>
								</Link>

								<Link key={id} href={`/auth/admin/customers/${id}`} passHref>
									<TableCell>
										<Typography sx={{ fontWeight: "bold" }}>
											{phoneNumber}
										</Typography>
									</TableCell>
								</Link>

								<Link key={id} href={`/auth/admin/customers/${id}`} passHref>
									<TableCell align='center'>
										<Typography sx={{ fontWeight: "bold" }}>
											{noOfGames}
										</Typography>
									</TableCell>
								</Link>

								<Link key={id} href={`/auth/admin/customers/${id}`} passHref>
									<TableCell>
										<Stack direction='row' alignItems='center' spacing={1}>
											<Typography sx={{ fontWeight: "bold" }}>
												{registerDate}
											</Typography>
											<Box
												sx={{
													bgcolor: "#219653",
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
	);
};

export default CustomerList;
