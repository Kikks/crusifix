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
import HeartIcon from "@mui/icons-material/Favorite";

// Components
import Card from "../../../Card";

// dummydata
import { contestList } from "./contestList";

const headings = [
	"",
	"name",
	"start date",
	"end date",
	"reward amount",
	"cash to point"
];

const TableWrapper: FC = ({ children }) => <Card>{children}</Card>;

const ContestList = () => {
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
						{contestList.map(
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
												checked={selectedCustomers.includes(id)}
												onClick={() => handleChanged(id)}
												// onChange={ }
											/>
										</Typography>
									</TableCell>

									<TableCell>
										<Stack direction='row' alignItems='left' spacing={3}>
											<Typography sx={{ fontWeight: "bold" }}>
												{name}
											</Typography>
										</Stack>
									</TableCell>

									<TableCell>
										<Typography sx={{ fontWeight: "bold" }}>
											{startDate}
										</Typography>
									</TableCell>

									<TableCell>
										<Typography sx={{ fontWeight: "bold" }}>
											{endDate}
										</Typography>
									</TableCell>

									<TableCell>
										<Typography sx={{ fontWeight: "bold" }}>
											{rewardAmount}
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
				</Table>
			</TableContainer>
		</>
	);
};

export default ContestList;
