import { LoginPage } from "./pages/auth/LoginPage";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { selectAuthState, signInRedux } from "./features/user/authSlice";
import { useEffect } from "react";
import { api } from "./services/api";
import Dashboard from "./pages/Dashboard";

function App() {
	const { isLogged } = useAppSelector(selectAuthState);
	const dispatch = useAppDispatch();

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			dispatch(signInRedux(token));
			api.defaults.headers.common["Authorization"] = token;
		}
	}, [dispatch]);

	return (
		<div className="App">
			{!isLogged ? (
				// If the user is not logged, show the auth pages
				<Routes>
					<Route path="/" element={<LoginPage />} />
				</Routes>
			) : (
				// if the user is logged, show the application
				<Routes>
					<Route path="/*" element={<Dashboard />} />
				</Routes>
			)}
		</div>
	);
}

export default App;
