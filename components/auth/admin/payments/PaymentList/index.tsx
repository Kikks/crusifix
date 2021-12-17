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
	Checkbox,
	Box,
	Skeleton
} from "@mui/material";
import moment from "moment";

// Components
import Card from "../../../Card";

// Utils
import { getInitials } from "../../../../../utils/formatters";

export type PaymentProps = {
	_id: string;
	user: {
		firstName: string;
		lastName: string;
		image?: string;
	};
	gamePlayed: {
		name: string;
	};
	amount: number;
	createdAt: string;
};

type PaymentsProps = {
	payments: PaymentProps[];
	isLoading: boolean;
};

const headings = ["full name", "game played", "amount(ngn)", "timestamp"];

const TableWrapper: FC = ({ children }) => (
	<Card sx={{ mt: 5 }}>{children}</Card>
);

const Payments = ({ payments, isLoading }: PaymentsProps) => {
	return isLoading ? (
		<Skeleton
			animation='wave'
			variant='rectangular'
			width='100%'
			height='60vh'
			sx={{ borderRadius: 5, mt: 5 }}
		/>
	) : (
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

				{payments.length !== 0 && (
					<TableBody>
						{payments.map(({ _id, user, gamePlayed, amount, createdAt }) => (
							<TableRow key={_id}>
								<TableCell>
									<Stack direction='row' alignItems='center' spacing={3}>
										<Avatar src={user?.image}>
											{getInitials(
												`${user?.firstName || ""} ${user?.lastName || ""}`
											)}
										</Avatar>
										<Typography
											sx={{ fontWeight: "bold", textTransform: "capitalize" }}
										>
											{`${user?.firstName || ""} ${user?.lastName || ""}`}
										</Typography>
									</Stack>
								</TableCell>

								<TableCell>
									<Typography sx={{ fontWeight: "bold" }}>
										{gamePlayed.name}
									</Typography>
								</TableCell>

								<TableCell>
									<Typography sx={{ fontWeight: "bold" }}>{amount}</Typography>
								</TableCell>

								<TableCell>
									<Typography sx={{ fontWeight: "bold" }}>
										{moment(createdAt).format("DD/MM/YYY hh:mm A")}
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
						There are no payments
					</Typography>
				</Box>
			)}
		</TableContainer>
	);
};

export default Payments;
