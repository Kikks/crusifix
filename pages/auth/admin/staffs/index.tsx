import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import {
	Box,
	Stack,
	IconButton,
	Snackbar,
	Alert,
	AlertColor
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useQuery, useMutation } from "react-query";
import { useSelector } from "react-redux";

// Components
import StaffList, {
	Staff,
	SelectedStaff
} from "../../../../components/auth/admin/staffs/StaffList";
import Drawer from "../../../../components/auth/admin/staffs/Drawer";

// Common
import Button from "../../../../common/Button";

// Utils
import { getRequest, deleteRequest } from "../../../../utils/api/calls";
import { GET_STAFFS, DELETE_STAFF } from "../../../../utils/api/urls";
import queryKeys from "../../../../utils/api/queryKeys";

// Store
import { RootState } from "../../../../store";

type DrawerMode = "edit" | "create";

export type AlertProps = {
	isOpen: boolean;
	message: string;
	severity: AlertColor;
};

const emptyStaff = {
	_id: "",
	firstName: "",
	lastName: "",
	email: "",
	phoneNumber: ""
};

const Staffs: NextPage = () => {
	const router = useRouter();
	const { user } = useSelector((state: RootState) => state.user);

	const [drawerIsOpen, setDrawerIsOpen] = useState(false);
	const [drawerMode, setDrawerMode] = useState<DrawerMode>("create");
	const [drawerData, setDrawerData] = useState(emptyStaff);
	const [staffs, setStaffs] = useState<Staff[]>([]);
	const [staffCount, setStaffCount] = useState(0);
	const [alertData, setAlertData] = useState<AlertProps>({
		isOpen: false,
		message: "",
		severity: "success"
	});
	const [selectedStaff, setSelectedStaff] = useState<SelectedStaff>(emptyStaff);

	const { isLoading, isFetching, refetch } = useQuery(
		queryKeys.getAllStaffs,
		() => getRequest({ url: GET_STAFFS }),
		{
			onSuccess(data) {
				setStaffs(data?.data || []);
				setStaffCount(data?.staffCount || 0);
			},
			onError(error: any) {
				console.error(error?.response);
			},
			enabled: !!user?._id,
			refetchOnWindowFocus: false
		}
	);

	const { mutate: deleteStaff, isLoading: deleteIsLoading } = useMutation(
		deleteRequest,
		{
			onSuccess() {
				refetch();
				setAlertData({
					isOpen: true,
					message: "The staff has been deleted successfully",
					severity: "success"
				});
				setSelectedStaff(emptyStaff);
			},

			onError(error: any) {
				console.error(error?.response);
				setAlertData({
					isOpen: true,
					message: error?.response?.message,
					severity: "error"
				});
			}
		}
	);

	useEffect(() => {
		if (drawerMode === "edit") {
			setDrawerData(selectedStaff);
		} else {
			setDrawerData(emptyStaff);
		}
	}, [drawerMode, selectedStaff]);

	useEffect(() => {
		if (user?.role !== "admin") {
			router.push("/login");
		}
	}, [user, router]);

	const onClickHandler = (mode: DrawerMode) => {
		setDrawerMode(mode);
		setDrawerIsOpen(true);
	};

	const handleAlertClose = () => {
		setAlertData({
			...alertData,
			isOpen: false
		});
	};

	const onDeleteClicked = () => {
		deleteStaff({ url: DELETE_STAFF({ id: selectedStaff._id }), data: null });
	};

	return (
		<Box sx={{ p: 3 }}>
			<Head>
				<title>Staffs - Crusifix</title>
				<meta name='description' content='Details about customers' />
			</Head>
			<Stack
				direction='row'
				justifyContent='space-between'
				alignItems='center'
				sx={{ width: "100%" }}
			>
				<IconButton onClick={() => router.back()}>
					<ArrowBackIcon />
				</IconButton>

				<Stack direction='row' alignItems='center' spacing={2}>
					<Button
						variant='contained'
						color='secondary'
						onClick={() => onClickHandler("edit")}
						endIcon={<ArrowForwardIcon />}
						disabled={selectedStaff._id.trim() === ""}
					>
						Edit
					</Button>

					<Button
						variant='contained'
						color='primary'
						onClick={() => onClickHandler("create")}
						endIcon={<ArrowForwardIcon />}
					>
						Create
					</Button>
				</Stack>
			</Stack>

			<Stack sx={{ pt: 5 }}>
				<StaffList
					{...{
						staffs,
						isLoading: isLoading || isFetching,
						selectedStaff,
						setSelectedStaff,
						staffCount,
						onDeleteClicked,
						deleteIsLoading
					}}
				/>
				<Drawer
					{...{
						drawerIsOpen,
						setDrawerIsOpen,
						drawerData,
						drawerMode,
						refetch,
						setAlertData
					}}
				/>
			</Stack>

			<Snackbar
				anchorOrigin={{ vertical: "top", horizontal: "right" }}
				open={alertData.isOpen}
				autoHideDuration={6000}
				onClose={handleAlertClose}
			>
				<Alert
					variant='filled'
					onClose={handleAlertClose}
					severity={alertData.severity}
					sx={{ width: "100%" }}
				>
					{alertData.message}
				</Alert>
			</Snackbar>
		</Box>
	);
};

export default Staffs;
