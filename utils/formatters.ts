export const getInitials = (string: string) => {
	const names = string.split(" ");
	return `${names[0][0] || ""}${names[1][0] || ""}`.toUpperCase();
};

export const getPlatform = (string: string) => {
	switch (string) {
		case "ps":
			return "PlayStation";
		case "vr":
			return "Virtual Reality";
		default:
			return "Others";
	}
};
