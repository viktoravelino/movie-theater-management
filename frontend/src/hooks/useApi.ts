import { useNavigate } from "react-router";
import { api } from "../services/api";
import { Movie, Room, Session } from "../types/types";

export function useApi() {
  const navigate = useNavigate();

  async function getAllRooms() {
    try {
      const response = await api.get<Room[]>("/rooms");
      return response.data;
    } catch (error: any) {
      console.log(error.response);
    }
  }

  async function getRoomById(roomId: number) {
    try {
      const response = await api.get<Room>(`/rooms/${roomId}`);
      return response.data as Room;
    } catch (error: any) {
      console.log(error.response);
      if (error.response.data.message) {
        alert(error.response.data.message);
      }
    }
  }

  async function getRoomsAvailable(
    date: string,
    startTime: string,
    endTime: string
  ) {
    try {
      const response = await api.get<Room[]>(
        `/rooms/?date=${date}&startTime=${startTime}&endTime=${endTime}`
      );
      return response.data as Room[];
    } catch (error: any) {
      console.log(error.response);
      if (error.response.data.message) {
        alert(error.response.data.message);
      }
    }
  }

  async function getAllMovies() {
    try {
      const { data } = await api.get<Movie[]>("/movies");
      return data;
    } catch (error: any) {
      console.log(error.response);
    }
  }

  async function deleteMovieById(movieId: number) {
    try {
      await api.delete(`/movies/${movieId}`);
      return true;
    } catch (error: any) {
      console.log(error.response);
      if (error.response.data.message) {
        alert(error.response.data.message);
      }
      return false;
    }
  }

  async function saveEditedMovie(movie: Movie) {
    try {
      const response = await api.put<Movie>(`/movies`, movie);
      // console.log(response);
      return response.data;
    } catch (error: any) {
      console.log(error.response);
      if (error.response.data.message) {
        alert(error.response.data.message);
      }
      return null;
    }
  }

  async function getAllSessions() {
    try {
      const { data } = await api.get<any[]>("/sessions");
      data.forEach(async (session) => {
        const room = await getRoomById(parseInt(session.room));
        if (!room) return;
        session.room = room;
      });
      return data as Session[];
    } catch (error: any) {
      console.log(error.response);
    }
  }

  async function deleteSessionById(sessionId: number) {
    try {
      await api.delete(`/sessions/${sessionId}`);
      return true;
    } catch (error: any) {
      console.log(error.response);
      if (error.response.data.message) {
        alert(error.response.data.message);
      }
      return false;
    }
  }

  async function saveNewSession(session: Session) {
    try {
      await api.post<Movie>(`/sessions`, {
        date: session.date,
        timeStart: session.timeStart,
        ticketCost: session.ticketCost,
        animationType: session.animationType,
        audioType: session.audioType,
        movieId: session.movie?.id,
        roomId: session.room?.id,
      });

      navigate("/sessions");
    } catch (error: any) {
      console.log(error.response);
      if (error.response.data.message) {
        alert(error.response.data.message);
      }
      return null;
    }
  }

  return {
    getAllRooms,
    getAllMovies,
    deleteMovieById,
    saveEditedMovie,
    getAllSessions,
    getRoomById,
    getRoomsAvailable,
    deleteSessionById,
    saveNewSession,
  };
}
