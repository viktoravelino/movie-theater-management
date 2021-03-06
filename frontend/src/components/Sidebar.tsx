import React from "react";
import {
	faChalkboard,
	faClipboardList,
	faFilm,
	faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Nav } from "react-bootstrap";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { useNavigate } from "react-router-dom";

type SidebarProps = {
	defaultEventKey: string;
};

export function Sidebar({ defaultEventKey }: SidebarProps) {
	const navigate = useNavigate();

	return (
		<div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 border-end">
			<div className="d-flex flex-column px-sm-3 pt-2 ">
				{/* Sidebar header */}
				<span className="d-flex align-items-center justify-content-center py-3 mb-md-0 text-decoration-none text-primary text-center">
					<FontAwesomeIcon icon={faUserCircle} size="2x" />
					<span className="fs-5 d-none d-sm-inline ms-3">Administrador</span>
				</span>
				{/* Sidebar header end */}
				{/* Sidebar menu items */}
				<Nav
					defaultActiveKey={`${defaultEventKey}`}
					onSelect={(selectedKey) => navigate(`/${selectedKey}`)}
					className="nav-flush flex-column"
					id="menu"
					variant="pills"
				>
					<SidebarMenuItem eventKey="rooms" icon={faChalkboard} text="Salas" />
					<SidebarMenuItem eventKey="movies" icon={faFilm} text="Filmes" />
					<SidebarMenuItem
						eventKey="sessions"
						icon={faClipboardList}
						text="Sessões"
					/>
				</Nav>
				{/* Sidebar menu items end */}
			</div>
		</div>
	);
}
