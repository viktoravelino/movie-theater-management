import { LoginPage } from "./pages/auth/LoginPage";
import { Route, Routes } from "react-router-dom";
import { useAppSelector } from "./app/hooks";
import { selectAuthState } from "./features/user/authSlice";

function App() {
	const { isLogged } = useAppSelector(selectAuthState);

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
					<Route path="/" element={<Logged />} />
				</Routes>
			)}
		</div>
	);
}

function Logged() {
	return <div>Logged</div>;
}

export default App;
