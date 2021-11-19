import { AxiosResponse } from "axios";
import { useAppDispatch } from "../app/hooks";
import { api } from "../services/api";
import { signInRedux, signOutRedux } from "../features/user/authSlice";

interface ApiResponse extends AxiosResponse {
	data: {
		jwt: string;
	};
}

export function useAuth() {
	const dispatch = useAppDispatch();

	async function signIn(username: string, password: string) {
		const data = {
			username,
			password,
		};
		try {
			// Sign In requisition
			const {
				data: { jwt },
			}: ApiResponse = await api.post("/auth/authenticate", data);

			const token = `Bearer ${jwt}`;

			//save token on local storage
			localStorage.setItem("token", token);

			// Save token on redux
			dispatch(signInRedux(token));

			// Set the token into the headers
			api.defaults.headers.common["Authorization"] = token;
		} catch (error) {
			alert("Username or password incorrect!");
			console.log(error);
		}
	}

	// function tokenValidation() {}

	function logOut() {
		// Delete from redux
		dispatch(signOutRedux);

		// Delete from localStorage
		localStorage.removeItem("token");

		// Delete the token from the headers
		api.defaults.headers.common["Authorization"] = "";
	}

	return {
		signIn,
		logOut,
	};
}
