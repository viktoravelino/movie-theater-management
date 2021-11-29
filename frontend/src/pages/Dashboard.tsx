import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { Sidebar } from "../components/Sidebar";
import { MainContentContainer } from "../components/MainContentContainer";
import { Navigate, Route, Routes, useLocation } from "react-router";
import { Rooms } from "./RoomsPage/Rooms";
import { Movies } from "./MoviesPage/Movies";
import { Sessions } from "./SessionsPage/Sessions";
import { NewSessionPage } from "./SessionsPage/NewSessionPage";

export default function Dashboard() {
  const location = useLocation();
  const eventKey = location.pathname.split("/")[1];
  return (
    <div className="">
      {/* Header */}
      <Navbar bg="primary" variant="dark" expanded>
        <Container fluid>
          <Navbar.Brand href="/">Popcorn</Navbar.Brand>
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
          <Sidebar defaultEventKey={eventKey} />
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
                <MainContentContainer ContentElement={Movies} title="FILMES" />
              }
            />
            <Route
              path="/sessions/add"
              element={
                <MainContentContainer
                  ContentElement={NewSessionPage}
                  title="NOVA SESSAO"
                />
              }
            />
            <Route
              path="/sessions"
              element={
                <MainContentContainer
                  ContentElement={Sessions}
                  title="SESSÕES"
                />
              }
            />
          </Routes>
          {/* <MainContentContainer /> */}
        </div>
      </Container>
    </div>
  );
}
