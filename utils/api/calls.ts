import baseAxiosMethod from "./baseAxiosMethod";

type CallArguments = {
	url: string;
	data: any;
};

export const postRequest = async ({ url, data }: CallArguments) => {
	const response = await baseAxiosMethod.post(url, data);
	return response?.data || response;
};

export const putRequest = async ({ url, data }: CallArguments) => {
	const response = await baseAxiosMethod.put(url, data);
	return response?.data || response;
};

export const patchRequest = async ({ url, data }: CallArguments) => {
	const response = await baseAxiosMethod.patch(url, data);
	return response?.data || response;
};

export const getRequest = async (
	{ url }: any,
	formatResponse: (arg0: any) => any
) => {
	const response = await baseAxiosMethod.get(url);
	if (formatResponse) {
		return formatResponse(response?.data);
	}
	return response?.data || response;
};

export const deleteRequest = async ({ url, data }: CallArguments) => {
	const response = await baseAxiosMethod.delete(url, { data });
	return response?.data || response;
};
