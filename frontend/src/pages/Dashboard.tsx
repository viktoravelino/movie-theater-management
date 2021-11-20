import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faClipboardList,
	faUserCircle,
	faFilm,
	faChalkboard,
	faPowerOff,
} from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
	return (
		<div className="h-100">
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
			<Container fluid className="h-100">
				{/* Page Content */}
				<div className="row flex-nowrap h-100">
					{/* Sidebar menu */}
					<div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-primary">
						<div className="d-flex flex-column px-sm-3 pt-2 text-white">
							{/* Sidebar header */}
							<span className="d-flex align-items-center justify-content-center py-3 mb-md-0  text-white text-decoration-none text-center">
								<FontAwesomeIcon icon={faUserCircle} size="2x" />
								<span className="fs-5 d-none d-sm-inline ms-3">
									Administrador
								</span>
							</span>
							{/* Sidebar header end */}
							{/* Sidebar menu items */}
							<Nav
								defaultActiveKey="rooms"
								// onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
								className="nav-flush flex-column"
								id="menu"
								variant="pills"
							>
								<NavItem eventKey="rooms" icon={faChalkboard} text="Salas" />
								<NavItem eventKey="movies" icon={faFilm} text="Filmes" />
								<NavItem
									eventKey="sessions"
									icon={faClipboardList}
									text="Sessões"
								/>
							</Nav>
							{/* Sidebar menu items end */}
						</div>
					</div>
					{/* Sidebar end */}

					{/*  Main Content */}
					<div className="col px-0">
						<div className="shadow" style={{ backgroundColor: "#ffffff" }}>
							<div className="py-4 ps-4">
								<span className="fs-4 fw-bold text-primary">SALAS</span>
							</div>
						</div>
						<hr className="mt-0" style={{ opacity: "0" }} />
						<div className="px-3" style={{ backgroundColor: "#fff" }}>
							content
						</div>
					</div>
				</div>
			</Container>
		</div>
	);
}

type NavItemProps = {
	eventKey: string;
	icon: any;
	text: string;
};

function NavItem({ eventKey, icon, text }: NavItemProps) {
	return (
		<Nav.Item>
			<Nav.Link
				eventKey={eventKey}
				className="text-white text-center text-sm-start py-3 py-sm-3"
			>
				<FontAwesomeIcon icon={icon} />{" "}
				<span className="d-none d-sm-inline">{text}</span>
			</Nav.Link>
		</Nav.Item>
	);
}
