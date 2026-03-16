import axios from "axios";
import type { AxiosRequestConfig } from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const apiGet = async <T>(name: string, options: AxiosRequestConfig = {}): Promise<T> => {
	try {
		const response = await axios.get(`${BASE_URL}/${name}`, {
			...options,
			headers: {
				"Content-Type": "application/vnd.api+json",
				"x-api-key": import.meta.env.VITE_API_KEY,
				...options.headers,
			},
		});
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
