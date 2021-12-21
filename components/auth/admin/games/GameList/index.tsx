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
	Box,
	Pagination
} from "@mui/material";

// Components
import Card from "../../../Card";

// Utils
import { getPlatform } from "../../../../../utils/formatters";

// Types
import { PaginationProps } from "../../../../../pages/auth/admin/games";

export type GameProps = {
	_id: string;
	name: string;
	gameImage?: string;
	platform: string;
	psFiveCost?: number;
	psFourCost?: number;
	vrCost?: number;
};

const headings = ["name", "platform", "ps 4 cost", "ps 5 cost", "vr cost"];

const TableWrapper: FC = ({ children }) => <Card>{children}</Card>;

const GameList = ({
	games,
	pagination,
	setPagination
}: {
	games: GameProps[];
	pagination: PaginationProps;
	setPagination: (data: PaginationProps) => void;
}) => {
	return (
		<>
			<Typography variant='h4' sx={{ fontWeight: "bold", mt: 5, mb: 3 }}>
				Game List
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

					{games.length !== 0 && (
						<TableBody>
							{games.map(
								({
									_id,
									name,
									platform,
									gameImage,
									psFiveCost,
									psFourCost,
									vrCost
								}) => (
									<TableRow key={_id}>
										<TableCell>
											<Stack direction='row' alignItems='center' spacing={3}>
												<Avatar
													src={gameImage}
													sx={{ textTransform: "capitalize" }}
												>
													{name.split("")[0]}
												</Avatar>
												<Typography
													sx={{
														fontWeight: "bold",
														textTransform: "capitalize"
													}}
												>
													{name}
												</Typography>
											</Stack>
										</TableCell>

										<TableCell>
											<Typography sx={{ fontWeight: "bold" }}>
												{getPlatform(platform)}
											</Typography>
										</TableCell>

										<TableCell>
											<Typography sx={{ fontWeight: "bold" }}>
												{psFourCost?.toLocaleString("en-US") || "-"}
											</Typography>
										</TableCell>

										<TableCell>
											<Typography sx={{ fontWeight: "bold" }}>
												{psFiveCost?.toLocaleString("en-US") || "-"}
											</Typography>
										</TableCell>

										<TableCell>
											<Typography sx={{ fontWeight: "bold" }}>
												{vrCost?.toLocaleString("en-US") || "-"}
											</Typography>
										</TableCell>
									</TableRow>
								)
							)}
						</TableBody>
					)}
				</Table>

				{games.length === 0 && (
					<Box sx={{ width: "100%", p: 5 }}>
						<Typography sx={{ fontWeight: "bold", textAlign: "center" }}>
							There are no games
						</Typography>
					</Box>
				)}

				<Stack
					direction='row'
					sx={{ mt: 3, width: "100%", justifyContent: "center" }}
				>
					<Pagination
						count={pagination.count}
						page={pagination.page}
						hidePrevButton={pagination.page == 1}
						hideNextButton={pagination.end}
						onChange={(_, value) =>
							setPagination({
								...pagination,
								page: value
							})
						}
					/>
				</Stack>
			</TableContainer>
		</>
	);
};

export default GameList;
