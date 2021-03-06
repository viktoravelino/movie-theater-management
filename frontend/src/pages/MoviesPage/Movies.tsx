import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { Movie } from "../../types/types";
import "./moviesPageStyle.css";
import { Modal } from "../../components/Modal";
import { Button, Form } from "react-bootstrap";

const MOVIES_PER_PAGE = 10;

export function Movies() {
  const { getAllMovies, deleteMovieById, saveEditedMovie } = useApi();
  const [moviesArrayBackup, setMoviesArrayBackup] = useState<Movie[]>();
  const [moviesArray, setMoviesArray] = useState<Movie[]>();
  const [numberOfPages, setNumberOfPages] = useState<number>(1);
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [shouldShowModal, setShouldShowModal] = useState(false);
  const [movieToEdit, setMovieToEdit] = useState<Movie>();

  const [modalInputs, setModalInputs] = useState({
    title: "",
    duration: "",
    description: "",
    coverUrl: " ",
  });

  useEffect(() => {
    load();
    // eslint-disable-next-line
  }, []);

  if (!moviesArray) {
    return <h2>Loading...</h2>;
  }

  async function load() {
    const data = await getAllMovies();
    setMoviesArray(data);
    setMoviesArrayBackup(data);
    if (data) {
      calculateNumberOfPages(data);
    }
  }

  function changePage(newPage: number) {
    setSelectedPage(newPage);
  }

  function calculateNumberOfPages(data = moviesArray) {
    if (!data) return;
    setNumberOfPages(Math.ceil(data?.length / MOVIES_PER_PAGE));
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
        <tr key={movie.id} className="border-bottom border-primary">
          <td>{movie.title}</td>
          <td>{movie.description}</td>
          <td>{duration}</td>
          <td>
            <button
              className="btn btn-sm text-primary"
              onClick={() => handleEditClick(movie)}
            >
              <FontAwesomeIcon icon={faPen} />
            </button>
            <button
              className="btn btn-sm ms-2 text-primary"
              onClick={() => handleDelete(movie)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </td>
        </tr>
      );
    });
  }

  function handleEditClick(movie: Movie) {
    setMovieToEdit(movie);
    setModalInputs({
      title: movie.title,
      description: movie.description,
      duration: movie.duration.toString(),
      coverUrl: movie.coverURL,
    });
    setShouldShowModal(true);
  }

  async function handleDelete(movie: Movie) {
    const confirmDelete = window.confirm("Voc?? gostaria mesmo de excluir?");
    if (!confirmDelete) return;
    const deleted = await deleteMovieById(movie.id as number);
    if (!deleted) return;
    load();
  }

  async function handleSaveEditedMovie() {
    const movieToSave = movieToEdit;
    if (!movieToSave) return;
    // eslint-disable-next-line
    movieToSave.id = movieToSave.id;
    movieToSave.title = modalInputs.title;
    movieToSave.duration = parseInt(modalInputs.duration);
    movieToSave.description = modalInputs.description;
    movieToSave.coverURL = modalInputs.coverUrl;
    const movie = new Movie(
      movieToSave.title,
      movieToSave.description,
      movieToSave.duration,
      movieToSave.coverURL,
      movieToSave.id
    );
    const movieSaved = await saveEditedMovie(movie);
    if (!movieSaved) return;
    load();
    setShouldShowModal(false);
  }

  function handleCreateNewMovieClick() {
    const movie = Movie.getEmptyMovie();
    setMovieToEdit(movie);
    setModalInputs({
      title: movie.title,
      description: movie.description,
      duration: movie.duration.toString(),
      coverUrl: movie.coverURL,
    });
    setShouldShowModal(true);
  }

  function handleSearch(str: string) {
    const searchArray = moviesArrayBackup?.filter((movie) =>
      movie.title.toLowerCase().includes(str.toLowerCase())
    );
    if (!searchArray) return;
    setNumberOfPages(Math.ceil(searchArray.length / MOVIES_PER_PAGE));
    console.log(searchArray);
    calculateNumberOfPages(searchArray);
    setMoviesArray(searchArray);
  }

  return (
    <div className="moviesContentContainer text-primary">
      <div className="moviesContentHeader">
        <Button
          variant="outline-primary"
          className="addMovie"
          onClick={handleCreateNewMovieClick}
        >
          <FontAwesomeIcon icon={faPlusCircle} />
        </Button>
        <Form.Control
          type="text"
          placeholder="Search"
          className="w-25"
          onChange={(e: any) => {
            handleSearch(e.target.value);
          }}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>T??tulo</th>
            <th>Descri????o</th>
            <th>Dura????o</th>
            <th>Opera????es</th>
          </tr>
        </thead>
        <tbody>{renderMoviesList()}</tbody>
      </table>
      <div className="paginationSection">
        <div className="btn-group float-right">{renderPagination()}</div>
      </div>
      {/* Edit movie modal */}
      <Modal
        shouldShow={shouldShowModal}
        onRequestClose={() => setShouldShowModal(false)}
      >
        <h4>Edit Movie</h4>
        <hr />

        <Form.Group className="mb-3">
          <Form.Label>T??tulo</Form.Label>
          <Form.Control
            type="text"
            value={modalInputs.title}
            onChange={(e: any) => {
              setModalInputs({ ...modalInputs, title: e.target.value });
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Descri????o</Form.Label>
          <Form.Control
            type="text"
            value={modalInputs.description}
            onChange={(e: any) => {
              setModalInputs({ ...modalInputs, description: e.target.value });
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Dura????o</Form.Label>
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
      </Modal>
    </div>
  );
}
