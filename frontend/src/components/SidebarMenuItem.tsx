import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Nav } from "react-bootstrap";

type NavItemProps = {
	eventKey: string;
	icon: any;
	text: string;
};

export function SidebarMenuItem({ eventKey, icon, text }: NavItemProps) {
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
