import { useState, useEffect } from "react";
import { useApi } from "../../hooks/useApi";

import { Room } from "../../types/types";

import "./roomPageStyle.scss";

export function Rooms() {
	const { getAllRooms } = useApi();
	const [roomsArray, setRoomsArray] = useState<Room[]>();

	useEffect(() => {
		(async function () {
			const data = await getAllRooms();
			setRoomsArray(data);
		})();
	}, []);

	if (!roomsArray) {
		return <h2>Loading...</h2>;
	}

	return (
		<div className="roomsContentContainer text-primary">
			<table>
				<thead>
					<tr>
						<th>Sala</th>
						<th>Quantidade de Assentos</th>
					</tr>
				</thead>
				<tbody>
					{roomsArray.map((room) => {
						return (
							<tr key={room.id}>
								<td>{room.name}</td>
								<td>{room.numberOfSeats}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
