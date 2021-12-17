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
	Checkbox,
	Skeleton
} from "@mui/material";
import HeartIcon from "@mui/icons-material/Favorite";
import moment from "moment";

// Components
import Card from "../../../Card";

// Utils
import { getInitials } from "../../../../../utils/formatters";

export type Customer = {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	image?: string;
	phoneNumber: string;
	noOfGames?: number;
	createdAt: string;
};

export type SelectedCustomer = {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
};

type CustomerListProps = {
	customers: Customer[];
	isLoading: boolean;
	selectedCustomer: SelectedCustomer;
	setSelectedCustomer: (selectedCustomer: SelectedCustomer) => void;
};

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

const CustomerList = ({
	customers,
	isLoading,
	selectedCustomer,
	setSelectedCustomer
}: CustomerListProps) => {
	const handleChanged = ({
		_id,
		firstName,
		lastName,
		email,
		phoneNumber
	}: SelectedCustomer) => {
		setSelectedCustomer({
			_id,
			firstName,
			lastName,
			email,
			phoneNumber
		});
	};

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

				{customers.length !== 0 && (
					<TableBody>
						{customers.map(
							({
								_id,
								firstName,
								lastName,
								image,
								noOfGames,
								email,
								phoneNumber,
								createdAt
							}) => (
								<TableRow
									key={_id}
									sx={{
										cursor: "pointer"
									}}
								>
									<TableCell sx={{ width: "5%" }}>
										<Typography sx={{ fontWeight: "bold" }}>
											<Checkbox
												checked={selectedCustomer._id === _id}
												onChange={() =>
													handleChanged({
														_id,
														firstName,
														lastName,
														email,
														phoneNumber
													})
												}
											/>
										</Typography>
									</TableCell>

									<Link href={`/auth/admin/customers/${_id}`} passHref>
										<TableCell>
											<Stack direction='row' alignItems='center' spacing={3}>
												<Avatar src={image}>
													{getInitials(`${firstName} ${lastName}`)}
												</Avatar>
												<Typography
													sx={{
														fontWeight: "bold",
														textTransform: "capitalize"
													}}
												>
													{`${firstName} ${lastName}`}
												</Typography>
											</Stack>
										</TableCell>
									</Link>

									<Link href={`/auth/admin/customers/${_id}`} passHref>
										<TableCell>
											<Typography sx={{ fontWeight: "bold" }}>
												{email}
											</Typography>
										</TableCell>
									</Link>

									<Link href={`/auth/admin/customers/${_id}`} passHref>
										<TableCell>
											<Typography sx={{ fontWeight: "bold" }}>
												{phoneNumber}
											</Typography>
										</TableCell>
									</Link>

									<Link href={`/auth/admin/customers/${_id}`} passHref>
										<TableCell align='center'>
											<Typography sx={{ fontWeight: "bold" }}>
												{noOfGames}
											</Typography>
										</TableCell>
									</Link>

									<Link href={`/auth/admin/customers/${_id}`} passHref>
										<TableCell>
											<Stack direction='row' alignItems='center' spacing={1}>
												<Typography sx={{ fontWeight: "bold" }}>
													{moment(createdAt).format("DD/MM/YYYY")}
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
				)}
			</Table>

			{customers.length === 0 && (
				<Box sx={{ width: "100%", p: 5 }}>
					<Typography sx={{ fontWeight: "bold", textAlign: "center" }}>
						There are no customers
					</Typography>
				</Box>
			)}
		</TableContainer>
	);
};

export default CustomerList;
