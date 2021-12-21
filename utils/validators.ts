import moment from "moment";

export const validateLoginInputs = (email: string, password: string) => {
	const errors = {
		email: "",
		password: ""
	};
	let valid = true;

	const regex =
		/^([a-zA-Z0-9\.-_]+)@([a-zA-Z0-9-]+)\.([a-z]{2,20})(\.[a-z]{2,20})?$/;

	if (email.trim() === "") {
		errors.email = "Email field cannot be empty";
	} else if (!email.match(regex)) {
		errors.email = "Invalid Email supplied";
	}

	if (password.trim() === "") {
		errors.password = "Password field cannot be empty";
	}

	for (const item of Object.values(errors)) {
		if (item.trim() !== "") {
			valid = false;
		}
	}

	return {
		valid,
		errors
	};
};

export const validateRegisterInputs = ({
	email,
	password,
	firstName,
	lastName,
	phoneNumber,
	isChecked
}: {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	phoneNumber: string;
	isChecked: boolean;
}) => {
	const errors = {
		email: "",
		password: "",
		firstName: "",
		lastName: "",
		phoneNumber: "",
		checkbox: ""
	};
	let valid = true;

	const regex =
		/^([a-zA-Z0-9\.-_]+)@([a-zA-Z0-9-]+)\.([a-z]{2,20})(\.[a-z]{2,20})?$/;

	if (email.trim() === "") {
		errors.email = "Email field cannot be empty";
	} else if (!email.match(regex)) {
		errors.email = "Invalid Email supplied";
	}

	if (password.trim() === "") {
		errors.password = "Password field cannot be empty";
	}

	if (firstName.trim() === "") {
		errors.firstName = "First name cannot be empty";
	}

	if (lastName.trim() === "") {
		errors.lastName = "Last name cannot be empty";
	}

	if (phoneNumber.trim() === "") {
		errors.phoneNumber = "Phone number cannot be empty";
	}

	if (!isChecked) {
		errors.checkbox = "This must not be left unchecked";
	}

	for (const item of Object.values(errors)) {
		if (item.trim() !== "") {
			valid = false;
		}
	}

	return {
		valid,
		errors
	};
};

export const validateCreateAccountInput = ({
	email,
	password,
	firstName,
	lastName,
	phoneNumber
}: {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	phoneNumber: string;
}) => {
	const errors = {
		email: "",
		password: "",
		firstName: "",
		lastName: "",
		phoneNumber: ""
	};
	let valid = true;

	const regex =
		/^([a-zA-Z0-9\.-_]+)@([a-zA-Z0-9-]+)\.([a-z]{2,20})(\.[a-z]{2,20})?$/;

	if (email.trim() === "") {
		errors.email = "Email field cannot be empty";
	} else if (!email.match(regex)) {
		errors.email = "Invalid Email supplied";
	}

	if (password.trim() === "") {
		errors.password = "Password field cannot be empty";
	}

	if (firstName.trim() === "") {
		errors.firstName = "First name cannot be empty";
	}

	if (lastName.trim() === "") {
		errors.lastName = "Last name cannot be empty";
	}

	if (phoneNumber.trim() === "") {
		errors.phoneNumber = "Phone number cannot be empty";
	}

	for (const item of Object.values(errors)) {
		if (item.trim() !== "") {
			valid = false;
		}
	}

	return {
		valid,
		errors
	};
};

export const validateCreateContestInput = ({
	name,
	description,
	contestAmount,
	amountToPoints,
	pointsToAmount,
	startDate,
	endDate
}: {
	name: string;
	description: string;
	contestAmount: number;
	amountToPoints: number;
	pointsToAmount: number;
	startDate: string;
	endDate: string;
}) => {
	const errors = {
		name: "",
		description: "",
		contestAmount: "",
		amountToPoints: "",
		pointsToAmount: "",
		startDate: "",
		endDate: ""
	};
	let valid = true;

	if (name.trim() === "") {
		errors.name = "Name field cannot be empty";
	}
	if (description.trim() === "") {
		errors.description = "Description field cannot be empty";
	}

	if (contestAmount <= 0) {
		errors.contestAmount = "Contest amount must be greater than 0";
	}

	if (amountToPoints <= 0) {
		errors.amountToPoints = "Amount To points must be greater than 0";
	}

	if (pointsToAmount <= 0) {
		errors.pointsToAmount = "Points to amount must be greater than 0";
	}

	if (startDate.trim() === "") {
		errors.startDate = "Start Date must not be empty";
	} else if (moment(startDate) < moment()) {
		errors.startDate = "Start Date cannot be in the past";
	}

	if (endDate.trim() === "") {
		errors.endDate = "End Date must not be empty";
	} else if (moment(endDate) < moment(startDate)) {
		errors.endDate = "End Date cannot be earlier than the Start date";
	}

	for (const item of Object.values(errors)) {
		if (item.trim() !== "") {
			valid = false;
		}
	}

	return {
		valid,
		errors
	};
};

export const validateCreateGameInput = ({
	name,
	platform,
	durationInMins,
	image,
	psFourCost,
	psFiveCost,
	vrCost
}: {
	name: string;
	platform: string;
	durationInMins: number;
	image: string;
	psFourCost: number;
	psFiveCost: number;
	vrCost: number;
}) => {
	const errors = {
		name: "",
		platform: "",
		durationInMins: "",
		amount: "",
		image: "",
		psFourCost: "",
		psFiveCost: "",
		vrCost: ""
	};
	let valid = true;

	if (name.trim() === "") {
		errors.name = "Name field cannot be empty";
	}
	if (platform === "Platform") {
		errors.platform = "Please slect a platform";
	}

	if (durationInMins <= 0) {
		errors.durationInMins = "Duration must be greater than 0";
	}

	if (image.trim() === "") {
		errors.image = "Please select an image";
	}

	if (platform === "ps") {
		if (psFourCost <= 0) {
			errors.psFourCost = "Amount be greater than 0";
		}

		if (psFiveCost <= 0) {
			errors.psFiveCost = "Amount be greater than 0";
		}
	}

	if (platform === "vr") {
		if (vrCost <= 0) {
			errors.vrCost = "Amount be greater than 0";
		}
	}

	for (const item of Object.values(errors)) {
		if (item.trim() !== "") {
			valid = false;
		}
	}

	return {
		valid,
		errors
	};
};

export const validateUpdateAccountInput = ({
	firstName,
	lastName,
	email,
	phoneNumber
}: {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
}) => {
	const errors = {
		email: "",
		firstName: "",
		lastName: "",
		phoneNumber: ""
	};
	let valid = true;

	const regex =
		/^([a-zA-Z0-9\.-_]+)@([a-zA-Z0-9-]+)\.([a-z]{2,20})(\.[a-z]{2,20})?$/;

	if (email.trim() === "") {
		errors.email = "Email field cannot be empty";
	} else if (!email.match(regex)) {
		errors.email = "Invalid Email supplied";
	}

	if (firstName.trim() === "") {
		errors.firstName = "First name cannot be empty";
	}

	if (lastName.trim() === "") {
		errors.lastName = "Last name cannot be empty";
	}

	if (phoneNumber.trim() === "") {
		errors.phoneNumber = "Phone number cannot be empty";
	}

	for (const item of Object.values(errors)) {
		if (item.trim() !== "") {
			valid = false;
		}
	}

	return {
		valid,
		errors
	};
};

export const validateCreatePaymentInput = ({
	user,
	amount,
	gamePlayed,
	contestForPoints
}: {
	user: string;
	amount: number;
	gamePlayed: string;
	contestForPoints: string;
}) => {
	const errors = {
		user: "",
		amount: "",
		gamePlayed: "",
		contestForPoints: ""
	};
	let valid = true;

	if (user === "Customer Name" || user.trim() === "") {
		errors.user = "Please select a customer";
	}

	if (amount <= 0) {
		errors.amount = "Amount must be greater than 0";
	}

	if (gamePlayed === "Select Game" || gamePlayed.trim() === "") {
		errors.gamePlayed = "Please Select a game";
	}

	if (contestForPoints === "Select Contest" || contestForPoints.trim() === "") {
		errors.contestForPoints = "Please select a contest";
	}

	for (const item of Object.values(errors)) {
		if (item.trim() !== "") {
			valid = false;
		}
	}

	return {
		valid,
		errors
	};
};

export const validateForgotPasswordInput = ({ email }: { email: string }) => {
	const errors = {
		email: ""
	};
	let valid = true;

	const regex =
		/^([a-zA-Z0-9\.-_]+)@([a-zA-Z0-9-]+)\.([a-z]{2,20})(\.[a-z]{2,20})?$/;

	if (email.trim() === "") {
		errors.email = "Email field cannot be empty";
	} else if (!email.match(regex)) {
		errors.email = "Invalid Email supplied";
	}

	for (const item of Object.values(errors)) {
		if (item.trim() !== "") {
			valid = false;
		}
	}

	return {
		valid,
		errors
	};
};

export const validateResetPasswordInput = ({
	password,
	confirmPassword
}: {
	password: string;
	confirmPassword: string;
}) => {
	const errors = {
		password: "",
		confirmPassword: ""
	};
	let valid = true;

	if (password.trim() === "") {
		errors.password = "Password must not be empty";
	} else if (password !== confirmPassword) {
		errors.confirmPassword = "Passwords must match";
	}

	for (const item of Object.values(errors)) {
		if (item.trim() !== "") {
			valid = false;
		}
	}

	return {
		valid,
		errors
	};
};
