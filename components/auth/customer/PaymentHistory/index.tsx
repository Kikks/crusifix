import { FC } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Stack,
	Avatar,
	Typography
} from "@mui/material";

// Components
import Card from "../../Card";

// dummydata
import { history } from "./history";

const TableWrapper: FC = ({ children }) => (
	<Card sx={{ mt: 5 }}>{children}</Card>
);

const PaymentHistory = () => {
	return (
		<>
			<Typography variant='h4' sx={{ fontWeight: "bold" }}>
				My payment history
			</Typography>

			<TableContainer component={TableWrapper}>
				<Table sx={{ minWidth: 400 }}>
					<TableHead>
						<TableRow>
							<TableCell align='center' sx={{ border: "none", py: 3 }}>
								<Typography
									sx={{
										color: "#9fa2b4",
										fontWeight: "bold",
										textTransform: "uppercase"
									}}
								>
									Game played
								</Typography>
							</TableCell>
							<TableCell align='center' sx={{ border: "none", py: 3 }}>
								<Typography
									sx={{
										color: "#9fa2b4",
										fontWeight: "bold",
										textTransform: "uppercase"
									}}
								>
									Amount(NGN)
								</Typography>
							</TableCell>
							<TableCell align='center' sx={{ border: "none", py: 3 }}>
								<Typography
									sx={{
										color: "#9fa2b4",
										fontWeight: "bold",
										textTransform: "uppercase"
									}}
								>
									Timestamp
								</Typography>
							</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{history.map(({ name, amount, timeStamp }, index) => (
							<TableRow key={index}>
								<TableCell align='center' sx={{ border: "none", py: 3 }}>
									<Typography sx={{ fontWeight: "bold" }}>{name}</Typography>
								</TableCell>
								<TableCell align='center' sx={{ border: "none", py: 3 }}>
									<Typography sx={{ fontWeight: "bold" }}>{amount}</Typography>
								</TableCell>
								<TableCell align='center' sx={{ border: "none", py: 3 }}>
									<Typography sx={{ fontWeight: "bold" }}>
										{timeStamp}
									</Typography>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default PaymentHistory;
