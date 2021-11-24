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
import { standings } from "./standings";

const TableWrapper: FC = ({ children }) => (
	<Card sx={{ mt: 5 }}>{children}</Card>
);

const Standings = () => {
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

				<TableBody>
					{standings.map(({ name, image, points }, index) => (
						<TableRow key={index}>
							<TableCell>
								<Typography sx={{ fontWeight: "bold" }}>{index + 1}</Typography>
							</TableCell>
							<TableCell sx={{ width: "80%" }}>
								<Stack direction='row' alignItems='center' spacing={3}>
									<Avatar src={image} />
									<Typography sx={{ fontWeight: "bold" }}>{name}</Typography>
								</Stack>
							</TableCell>
							<TableCell>
								<Typography
									sx={{ fontWeight: "bold" }}
								>{`${points} pt.`}</Typography>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default Standings;
