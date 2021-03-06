// Authentication
export const LOGIN = `${process.env.API_URL}/auth/login`;
export const REGISTER = `${process.env.API_URL}/auth/register`;
export const LOGOUT = `${process.env.API_URL}/auth/logout`;
export const GET_ME = `${process.env.API_URL}/auth/me`;
export const FORGOT_PASSWORD = `${process.env.API_URL}/auth/forgotpassword`;
export const CONFIRM_EMAIL = ({ token }: { token: string }) =>
	`${process.env.API_URL}/auth/confirmemail/${token}`;
export const RESET_PASSWORD = ({ token }: { token: string }) =>
	`${process.env.API_URL}/auth/resetpassword/${token}`;

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

// Staff
export const GET_STAFFS = `${process.env.API_URL}/users/staff`;
export const CREATE_STAFF = `${process.env.API_URL}/users/staff/create`;
export const UPDATE_STAFF = ({ id }: { id: string }) =>
	`${process.env.API_URL}/users/${id}`;
export const DELETE_STAFF = ({ id }: { id: string }) =>
	`${process.env.API_URL}/users/${id}`;

// Game
export const CREATE_GAME = `${process.env.API_URL}/games`;
export const UPDATE_GAME = ({ id }: { id: string }) =>
	`${process.env.API_URL}/games/${id}`;
export const GET_GAMES = ({
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
export const ANNOUNCE_WINNER = ({ id }: { id: string }) =>
	`${process.env.API_URL}/contests/getwinner/${id}`;

// Payments
export const GET_PAYMENTS = `${process.env.API_URL}/payments`;

export const CREATE_PAYMENT = `${process.env.API_URL}/payments`;
export const GET_MVCS = `${process.env.API_URL}/payments/mvcs`;
export const GET_PAYMENT = ({ id }: { id: string }) =>
	`${process.env.API_URL}/payments/${id}`;

// Dashboard
export const GET_ADMIN_DASHBOARD = `${process.env.API_URL}/dashboards/admindash`;
export const GET_CUSTOMER_DASHBOARD = ({ id }: { id: string }) =>
	`${process.env.API_URL}/dashboards/${id}`;
export const GET_RECENT_CUSTOMERS_COUNT = `${process.env.API_URL}/dashboards/recentcustomercount`;
export const GET_RECENT_CUSTOMERS = `${process.env.API_URL}/dashboards/recentcustomerlist`;
export const GET_TOTAL_GAMES_PLAYED = `${process.env.API_URL}/dashboards/totalgamesplayed`;
export const GET_MOST_VALUABLE_CUSTOMER = `${process.env.API_URL}/dashboards/mostvaluablecustomer`;
export const GET_DASHBOARD_CONTESTS = `${process.env.API_URL}/dashboards/contestlist`;
export const GET_MOST_PLAYED_GAMES = `${process.env.API_URL}/dashboards/mostplayedgames`;
export const GET_TOTAL_GAMES = `${process.env.API_URL}/dashboards/totalgames`;
export const GET_MOST_PROFITABLE_GAME = `${process.env.API_URL}/dashboards/mostprofitablegame`;
export const GET_TOTAL_CUSTOMERS = `${process.env.API_URL}/dashboards/totalcustomers`;
export const GET_TOTAL_AMOUNT_EARNED = `${process.env.API_URL}/dashboards/totalamountearned`;

// Upload image
export const UPLOAD_IMAGE = `https://api.cloudinary.com/v1_1/dh2w0dqug/image/upload`;
