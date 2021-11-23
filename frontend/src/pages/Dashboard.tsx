import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { Sidebar } from "../components/Sidebar";
import { MainContentContainer } from "../components/MainContentContainer";
import { Navigate, Route, Routes } from "react-router";
import { Rooms } from "./RoomsPage/Rooms";
import { Movies } from "./MoviesPage/Movies";

export default function Dashboard() {
	return (
		<div className="">
			{/* Header */}
			<Navbar bg="primary" variant="dark" expanded>
				<Container fluid>
					<Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
					<Nav className="ms-auto">
						<Nav.Link as={Button}>
							<FontAwesomeIcon icon={faPowerOff} />
							<span className="ms-2">Sair</span>
						</Nav.Link>
					</Nav>
				</Container>
			</Navbar>
			{/* Header end */}

			{/* Body */}
			<Container fluid className="">
				<div className="row min-vh-100">
					<Sidebar />
					<Routes>
						<Route path="/" element={<Navigate to="/rooms" />} />
						<Route
							path="/rooms"
							element={
								<MainContentContainer ContentElement={Rooms} title="SALAS" />
							}
						/>
						<Route
							path="/movies"
							element={
								<MainContentContainer ContentElement={Movies} title="MOVIES" />
							}
						/>
						<Route
							path="/sessions"
							element={
								<MainContentContainer ContentElement={Rooms} title="SESSÕES" />
							}
						/>
					</Routes>
					{/* <MainContentContainer /> */}
				</div>
			</Container>
		</div>
	);
}
