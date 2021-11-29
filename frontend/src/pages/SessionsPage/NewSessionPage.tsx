import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useApi } from "../../hooks/useApi";
import { Movie, Room, Session } from "../../types/types";

export function NewSessionPage() {
  const { getAllMovies, getRoomsAvailable, saveNewSession } = useApi();
  const [movies, setMovies] = useState<Movie[]>();
  const [movieSelected, setMovieSelected] = useState<Movie>();
  const [startTimeSelected, setStartTimeSelected] = useState("");
  const [endTimeSelected, setEndTimeSelected] = useState("");
  const [dateSelected, setDateSelected] = useState("");
  const [roomSelected, setRoomSelected] = useState<Room>();
  const [roomsAvailable, setRoomsAvailable] = useState<Room[]>();
  const [imageTypeSelected, setImageTypeSelected] = useState("NONIMERSIVE");
  const [audioTypeSelected, setAudioTypeSelected] = useState("DUBBED");
  const [ticketCost, setTicketCost] = useState<number>(0);

  useEffect(() => {
    // load movies
    (async () => {
      const data = await getAllMovies();
      setMovies(data);
    })();
    // eslint-disable-next-line
  }, []);

  function populateMoviesSelection() {
    return movies?.map((movie) => (
      <option key={movie.id} value={movie.title}>
        {movie.title}
      </option>
    ));
  }

  function handleMovieSelection(movieTitle: string) {
    if (!movies) return;
    const [movieFiltered] = movies.filter(
      (movie) => movie.title === movieTitle
    );
    setMovieSelected(movieFiltered);
    if (movieSelected) {
      handleStartTimeChange(movieFiltered);
    }
  }

  async function handleStartTimeChange(
    movie: Movie | null = null,
    startTime: any = startTimeSelected
  ) {
    let movieToCalculate = null;
    if (movie) {
      movieToCalculate = movie;
    } else {
      if (!movieSelected) return;
      movieToCalculate = movieSelected;
    }
    setStartTimeSelected(startTime);
    // calculate end time
    const startTimeHours = startTime.split(":")[0];
    const startTimeMinutes = startTime.split(":")[1];
    const startTimeDateType = new Date();
    startTimeDateType.setHours(startTimeHours);
    startTimeDateType.setMinutes(startTimeMinutes);
    const startTimeMill = startTimeDateType.getTime();
    const movieDurationMill = movieToCalculate.duration * 60 * 1000;
    const endTimeMill = startTimeMill + movieDurationMill;
    const endTimeDateType = new Date(endTimeMill);
    let endTimeHours = endTimeDateType.getHours().toString();
    endTimeHours =
      parseInt(endTimeHours) < 10 ? "0" + endTimeHours : endTimeHours;
    let endTimeMinutes = endTimeDateType.getMinutes().toString();
    endTimeMinutes =
      parseInt(endTimeMinutes) < 10 ? "0" + endTimeMinutes : endTimeMinutes;
    setEndTimeSelected(`${endTimeHours}:${endTimeMinutes}`);
    if (!dateSelected) return;
    setRoomsAvailable(
      await getRoomsAvailable(
        dateSelected,
        `${startTimeHours}${startTimeMinutes}`,
        `${endTimeHours}${endTimeMinutes}`
      )
    );
  }

  async function handleDateChange(date: any) {
    setDateSelected(date);
    if (movieSelected && startTimeSelected) {
      const startTime =
        startTimeSelected.split(":")[0] + startTimeSelected.split(":")[1];
      const endTime =
        endTimeSelected.split(":")[0] + endTimeSelected.split(":")[1];
      console.log(startTime);
      console.log(endTime);
      setRoomsAvailable(await getRoomsAvailable(date, startTime, endTime));
    }
  }

  async function handleSaveSession() {
    const startTime =
      startTimeSelected.split(":")[0] + startTimeSelected.split(":")[1];
    const endTime =
      endTimeSelected.split(":")[0] + endTimeSelected.split(":")[1];
    const session = new Session(
      dateSelected,
      startTime,
      endTime,
      ticketCost,
      imageTypeSelected,
      audioTypeSelected,
      roomSelected,
      movieSelected
    );

    await saveNewSession(session);

    // console.log("Movie ->", movieSelected);
    // console.log("Date ->", dateSelected);
    // console.log("Start Time ->", startTimeSelected);
    // console.log("End Time ->", endTimeSelected);
    // console.log("Room->", roomSelected);
    // console.log("Image->", imageTypeSelected);
    // console.log("Audio->", audioTypeSelected);
  }

  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>Data</Form.Label>
        <Form.Control
          type="date"
          onChange={(e: any) => handleDateChange(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Filme</Form.Label>
        <Form.Select
          onChange={(e: any) => handleMovieSelection(e.target.value)}
        >
          <option>Selecione um filme</option>
          {populateMoviesSelection()}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Hora de Inicio</Form.Label>
        <Form.Control
          type="time"
          disabled={!movieSelected || !dateSelected}
          onChange={(e: any) => handleStartTimeChange(null, e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Hora de Termino</Form.Label>
        <Form.Control type="time" readOnly value={endTimeSelected} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Sala</Form.Label>
        <Form.Select
          disabled={!roomsAvailable}
          onChange={(e: any) => {
            if (!roomsAvailable) return;
            const [roomFiltered] = roomsAvailable.filter(
              (room) => room.id === parseInt(e.target.value)
            );
            setRoomSelected(roomFiltered);
          }}
        >
          <option>Selecione uma sala</option>
          {roomsAvailable?.map((room) => (
            <option key={room.id} value={room.id}>
              {room.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Tipo de Imagem</Form.Label>
        <Form.Select
          onChange={(e: any) => setImageTypeSelected(e.target.value)}
          value={imageTypeSelected}
        >
          <option value="NONIMERSIVE">2D</option>
          <option value="IMERSIVE">3D</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Tipo de Imagem</Form.Label>
        <Form.Select
          onChange={(e: any) => setAudioTypeSelected(e.target.value)}
          value={audioTypeSelected}
        >
          <option value="DUBBED">Dublado</option>
          <option value="SUBTITLED">Legendado</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Valor Ingresso</Form.Label>
        <Form.Control
          type="number"
          onChange={(e: any) => setTicketCost(e.target.value)}
          value={ticketCost}
        />
      </Form.Group>
      <button className="btn btn-primary" onClick={handleSaveSession}>
        SAVE
      </button>
    </div>
  );
}
