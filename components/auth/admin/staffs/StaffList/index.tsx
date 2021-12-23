import { FC, useState } from "react";
import Link from "next/link";
import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	CircularProgress,
	TableRow,
	Stack,
	Avatar,
	Typography,
	Checkbox,
	Skeleton
} from "@mui/material";
import HeartIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";

// Common
import Button from "../../../../../common/Button";

// Components
import Card from "../../../Card";

// Utils
import { getInitials } from "../../../../../utils/formatters";

export type Staff = {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	image?: string;
	phoneNumber: string;
	noOfGames?: number;
	createdAt: string;
};

export type SelectedStaff = {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
};

type StafffListProps = {
	staffs: Staff[];
	staffCount: number;
	isLoading: boolean;
	selectedStaff: SelectedStaff;
	setSelectedStaff: (selectedStaff: SelectedStaff) => void;
	onDeleteClicked: () => void;
	deleteIsLoading: boolean;
};

const headings = ["", "full name", "email", "phone", "register date"];

const TableWrapper: FC = ({ children }) => (
	<Card sx={{ mt: 2 }}>{children}</Card>
);

const StaffList = ({
	staffs,
	staffCount,
	isLoading,
	selectedStaff,
	setSelectedStaff,
	onDeleteClicked,
	deleteIsLoading
}: StafffListProps) => {
	const handleChanged = ({
		_id,
		firstName,
		lastName,
		email,
		phoneNumber
	}: SelectedStaff) => {
		setSelectedStaff({
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
		<>
			<Stack
				direction='row'
				alignItems='center'
				justifyContent='space-between'
				sx={{ mt: 5 }}
			>
				<Stack direction='row' spacing={1} alignItems='center'>
					<Typography variant='h4' sx={{ fontWeight: "bold" }}>
						Staff List:
					</Typography>
					<Typography
						sx={{ fontWeight: "bold" }}
					>{`${staffCount} Total Staffs`}</Typography>
				</Stack>

				<Button
					variant='contained'
					color='secondary'
					onClick={() => onDeleteClicked()}
					endIcon={<DeleteIcon />}
					disabled={selectedStaff._id.trim() === "" || deleteIsLoading}
				>
					{deleteIsLoading ? <CircularProgress size={30} /> : "Delete"}
				</Button>
			</Stack>
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

					{staffs.length !== 0 && (
						<TableBody>
							{staffs.map(
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
													checked={selectedStaff._id === _id}
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

										<Link href={`/auth/admin/staffs/${_id}`} passHref>
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

										<Link href={`/auth/admin/staffs/${_id}`} passHref>
											<TableCell>
												<Typography sx={{ fontWeight: "bold" }}>
													{email}
												</Typography>
											</TableCell>
										</Link>

										<Link href={`/auth/admin/staffs/${_id}`} passHref>
											<TableCell>
												<Typography sx={{ fontWeight: "bold" }}>
													{phoneNumber}
												</Typography>
											</TableCell>
										</Link>

										<Link href={`/auth/admin/staffs/${_id}`} passHref>
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

				{staffs.length === 0 && (
					<Box sx={{ width: "100%", p: 5 }}>
						<Typography sx={{ fontWeight: "bold", textAlign: "center" }}>
							There are no staffs
						</Typography>
					</Box>
				)}
			</TableContainer>
		</>
	);
};

export default StaffList;
