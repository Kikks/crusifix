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
	Box,
	Typography
} from "@mui/material";

// Components
import Card from "../../../Card";

// Utils
import { getInitials } from "../../../../../utils/formatters";

export type StandingsProps = {
	totalPoints: number;
	user_info: {
		image?: string;
		firstName: string;
		lastName: string;
	}[];
}[];

const TableWrapper: FC = ({ children }) => (
	<Card sx={{ mt: 5 }}>{children}</Card>
);

const Standings = ({ standings }: { standings: StandingsProps }) => {
	return (
		<TableContainer component={TableWrapper}>
			<Table sx={{ minWidth: 400 }}>
				<TableHead>
					<TableRow>
						<TableCell />
						<TableCell>
							<Typography
								sx={{
									color: "#9fa2b4",
									fontWeight: "bold",
									textTransform: "uppercase"
								}}
							>
								Customer
							</Typography>
						</TableCell>
						<TableCell>
							<Typography
								sx={{
									color: "#9fa2b4",
									fontWeight: "bold",
									textTransform: "uppercase"
								}}
							>
								Points
							</Typography>
						</TableCell>
					</TableRow>
				</TableHead>

				{standings.length !== 0 && (
					<TableBody>
						{standings.map(({ totalPoints, user_info }, index) => (
							<TableRow key={index}>
								<TableCell>
									<Typography sx={{ fontWeight: "bold" }}>
										{index + 1}
									</Typography>
								</TableCell>
								<TableCell sx={{ width: "80%" }}>
									<Stack direction='row' alignItems='center' spacing={3}>
										<Avatar src={user_info[0]?.image}>
											{getInitials(
												`${user_info[0]?.firstName} ${user_info[0]?.lastName}`
											)}
										</Avatar>
										<Typography
											sx={{ fontWeight: "bold", textTransform: "capitalize" }}
										>
											{`${user_info[0]?.firstName} ${user_info[0]?.lastName}`}
										</Typography>
									</Stack>
								</TableCell>
								<TableCell>
									<Typography
										sx={{ fontWeight: "bold" }}
									>{`${totalPoints?.toLocaleString("en-US")} pt.`}</Typography>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				)}
			</Table>
			{standings.length === 0 && (
				<Box sx={{ width: "100%", p: 5 }}>
					<Typography sx={{ fontWeight: "bold", textAlign: "center" }}>
						There are no contestants
					</Typography>
				</Box>
			)}
		</TableContainer>
	);
};

export default Standings;
