import { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { Session } from "../../types/types";
import { Button } from "react-bootstrap";

import "./sessionPageStyle.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faTrash } from "@fortawesome/free-solid-svg-icons";

const SESSIONS_PER_PAGE = 10;

export function Sessions() {
	const { getAllSessions } = useApi();
	const [sessionsArray, setSessionArray] = useState<Session[]>();

	const [numberOfPages, setNumberOfPages] = useState<number>(1);
	const [selectedPage, setSelectedPage] = useState<number>(1);

	useEffect(() => {
		load();
	}, []);

	async function load() {
		const data = await getAllSessions();
		setSessionArray(data);
		if (data) {
			calculateNumberOfPages(data);
		}
	}

	function calculateNumberOfPages(data = sessionsArray) {
		if (!data) return;
		setNumberOfPages(Math.ceil(data?.length / SESSIONS_PER_PAGE));
	}

	function renderSessionList() {
		const pageIndex = (selectedPage - 1) * SESSIONS_PER_PAGE;
		const sessionsToRender = sessionsArray?.slice(
			pageIndex,
			pageIndex + SESSIONS_PER_PAGE
		);
		if (!sessionsToRender) return;
		return sessionsToRender.map((session) => {
			return (
				<tr key={session.id}>
					<td>{session.date}</td>
					<td>{session.timeStart}</td>
					<td>{session.timeEnd}</td>
					<td>{session.room?.name}</td>
					<td>{session.movie?.title}</td>
					<td>{"R$ " + session.ticketCost.toFixed(2)}</td>
					<td>{session.animationType}</td>
					<td>{session.audioType}</td>
					<td>
						<button
							className="btn btn-sm ms-2 text-primary"
							// onClick={() => handleDelete(movie)}
						>
							<FontAwesomeIcon icon={faTrash} />
						</button>
					</td>
				</tr>
			);
		});
	}

	function renderPagination() {
		return Array.from({ length: numberOfPages }).map((_, index) => {
			const page = index + 1;
			return (
				<button
					key={index}
					className={
						"btn btn-outline-primary " + (page === selectedPage ? "active" : "")
					}
					onClick={() => setSelectedPage(page)}
				>
					{page}
				</button>
			);
		});
	}

	return (
		<div className="sessionsContentContainer text-primary">
			<div className="sessionsContentHeader">
				<Button
					variant="outline-primary"
					className="addSession"
					// onClick={handleCreateNewMovieClick}
				>
					<FontAwesomeIcon icon={faPlusCircle} />
				</Button>
				{/* <Form.Control
					type="text"
					placeholder="Search"
					className="w-25"
					onChange={(e: any) => {
						handleSearch(e.target.value);
					}}
				/> */}
			</div>
			<table>
				<thead>
					<tr>
						<th>Data</th>
						<th>Hora Inicio</th>
						<th>Hora Fim</th>
						<th>Sala</th>
						<th>Filme</th>
						<th>Valor Ingresso</th>
						<th>Tipo de Imagem</th>
						<th>Audio</th>
						<th>Operações</th>
					</tr>
				</thead>
				<tbody>{renderSessionList()}</tbody>
			</table>
			<div className="paginationSection">
				<div className="btn-group float-right">{renderPagination()}</div>
			</div>
			{/* Edit movie modal */}
			{/* <Modal
				shouldShow={shouldShowModal}
				onRequestClose={() => setShouldShowModal(false)}
			>
				<h4>Edit Movie</h4>
				<hr />

				<Form.Group className="mb-3">
					<Form.Label>Título</Form.Label>
					<Form.Control
						type="text"
						value={modalInputs.title}
						onChange={(e: any) => {
							setModalInputs({ ...modalInputs, title: e.target.value });
						}}
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Descrição</Form.Label>
					<Form.Control
						type="text"
						value={modalInputs.description}
						onChange={(e: any) => {
							setModalInputs({ ...modalInputs, description: e.target.value });
						}}
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Duração</Form.Label>
					<Form.Control
						type="text"
						value={modalInputs.duration}
						onChange={(e: any) => {
							setModalInputs({ ...modalInputs, duration: e.target.value });
						}}
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Imagem URL</Form.Label>
					<Form.Control
						type="text"
						value={modalInputs.coverUrl}
						onChange={(e: any) => {
							setModalInputs({ ...modalInputs, coverUrl: e.target.value });
						}}
					/>
				</Form.Group>

				<hr />
				<Button
					variant="outline-primary text-gra"
					onClick={() => setShouldShowModal(false)}
				>
					Cancel
				</Button>
				<Button
					variant="primary"
					className="ms-2 text-white"
					onClick={handleSaveEditedMovie}
				>
					Save
				</Button>
			</Modal> */}
		</div>
	);
}
