import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { Movie } from "../../types/types";
import "./moviesPageStyle.scss";

const MOVIES_PER_PAGE = 10;

export function Movies() {
	const { getAllMovies } = useApi();
	const [moviesArray, setMoviesArray] = useState<Movie[]>();
	const [numberOfPages, setNumberOfPages] = useState<number>(1);
	const [selectedPage, setSelectedPage] = useState<number>(1);

	useEffect(() => {
		(async function () {
			const data = await getAllMovies();
			setMoviesArray(data);

			if (data) {
				setNumberOfPages(Math.ceil(data.length / MOVIES_PER_PAGE));
			}
		})();
	}, []);

	if (!moviesArray) {
		return <h2>Loading...</h2>;
	}

	function changePage(newPage: number) {
		setSelectedPage(newPage);
	}

	function renderPagination() {
		return Array.from({ length: numberOfPages }).map((_, index) => {
			const page = index + 1;
			return (
				<button
					className={
						"btn btn-outline-primary " + (page === selectedPage ? "active" : "")
					}
					onClick={() => changePage(page)}
				>
					{page}
				</button>
			);
		});
	}

	function renderMoviesList() {
		const pageIndex = (selectedPage - 1) * MOVIES_PER_PAGE;
		const moviesToRender = moviesArray?.slice(
			pageIndex,
			pageIndex + MOVIES_PER_PAGE
		);
		return moviesToRender?.map((movie) => {
			const hours = Math.floor(movie.duration / 60);
			const minutes = movie.duration % 60;
			const duration = `${hours}h ${minutes}m`;
			return (
				<tr>
					<td>{movie.title}</td>
					<td>{movie.description}</td>
					<td>{duration}</td>
					<td>
						<button className="btn btn-sm text-primary">
							<FontAwesomeIcon icon={faPen} />
						</button>
						<button className="btn btn-sm ms-2 text-primary">
							<FontAwesomeIcon icon={faTrash} />
						</button>
					</td>
				</tr>
			);
		});
	}

	return (
		<div className="moviesContentContainer text-primary">
			<div className="moviesContentHeader">
				<div className="addMovie">add icon</div>
				<div className="search">search</div>
			</div>
			<table>
				<thead>
					<tr>
						<th>Título</th>
						<th>Descrição</th>
						<th>Duração</th>
						<th>Operações</th>
					</tr>
				</thead>
				<tbody>{renderMoviesList()}</tbody>
			</table>
			<div className="paginationSection">
				<div className="btn-group float-right">{renderPagination()}</div>
			</div>
		</div>
	);
}
