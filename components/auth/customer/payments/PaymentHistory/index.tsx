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
	Typography,
	Box
} from "@mui/material";

// Components
import Card from "../../../Card";

export type PaymentsProps = {
	gamePlayed: string;
	amount: number;
	createdAt: string;
}[];

const TableWrapper: FC = ({ children }) => (
	<Card sx={{ mt: 5 }}>{children}</Card>
);

const PaymentHistory = ({ payments }: { payments: PaymentsProps }) => {
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

					{payments.length !== 0 && (
						<TableBody>
							{payments.map(({ gamePlayed, amount, createdAt }, index) => (
								<TableRow key={index}>
									<TableCell align='center' sx={{ border: "none", py: 3 }}>
										<Typography sx={{ fontWeight: "bold" }}>
											{gamePlayed}
										</Typography>
									</TableCell>
									<TableCell align='center' sx={{ border: "none", py: 3 }}>
										<Typography sx={{ fontWeight: "bold" }}>
											{amount}
										</Typography>
									</TableCell>
									<TableCell align='center' sx={{ border: "none", py: 3 }}>
										<Typography sx={{ fontWeight: "bold" }}>
											{createdAt}
										</Typography>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					)}
				</Table>

				{payments.length === 0 && (
					<Box sx={{ width: "100%", p: 5 }}>
						<Typography sx={{ fontWeight: "bold", textAlign: "center" }}>
							You have not made any payment
						</Typography>
					</Box>
				)}
			</TableContainer>
		</>
	);
};

export default PaymentHistory;
