// Authentication
export const LOGIN = `${process.env.API_URL}/auth/login`;
export const RGISTER = `${process.env.API_URL}/auth/register`;
export const LOGOUT = `${process.env.API_URL}/auth/logout`;
export const GET_ME = `${process.env.API_URL}/auth/me`;
export const FORGOT_PASSWORD = `${process.env.API_URL}/auth/forgotpassword`;
//// Confirm user and resetpassword routes are not clear yet

// User
export const GET_USERS = `${process.env.API_URL}/users`;
export const CREATE_USER = `${process.env.API_URL}/users`;
export const GET_USER = ({ id }: { id: string }) =>
	`${process.env.API_URL}/users/${id}`;
export const UPDATE_USER = ({ id }: { id: string }) =>
	`${process.env.API_URL}/users/${id}`;
export const UPDATE_USER_STATUS = ({ id }: { id: string }) =>
	`${process.env.API_URL}/users/${id}/updateuserstatus`;
export const GET_USER_PAYMENTS = ({ id }: { id: string }) =>
	`${process.env.API_URL}/users/paymenthistory/${id}`;

// Game
export const CREATE_GAME = `${process.env.API_URL}/game`;
export const UPDATE_GAME = ({ id }: { id: string }) =>
	`${process.env.API_URL}/games/${id}`;
export const GET_GAME = ({
	page = 1,
	limit = 100
}: {
	page?: number;
	limit?: number;
}) => `${process.env.API_URL}/games?page=${page}&limit=${limit}`;

// Contests
export const GET_CONTESTS = `${process.env.API_URL}/contests`;
export const CREATE_CONTEST = `${process.env.API_URL}/contests`;
export const GET_CONTEST = ({ id }: { id: string }) =>
	`${process.env.API_URL}/contests/${id}`;
export const GET_CONTEST_WINNER = ({ id }: { id: string }) =>
	`${process.env.API_URL}/contests/getwinner/${id}`;

// Payments
export const GET_PAYMENTS = `${process.env.API_URL}/payments`;

export const CREATE_PAYMENT = `${process.env.API_URL}/payments`;
export const GET_MVCS = `${process.env.API_URL}/payments/mvcs`;
export const GET_PAYMENT = ({ id }: { id: string }) =>
	`${process.env.API_URL}/payments/${id}`;

// Dashboard
export const GET_ADMIN_DASHBOARD = `${process.env.API_URL}/dashboards/admindash`;
export const GET_CUSTOMER_DASHBOARD = `${process.env.API_URL}/dashboards/customerdash`;
