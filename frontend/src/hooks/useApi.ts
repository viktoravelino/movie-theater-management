import { api } from "../services/api";
import { Movie, Room } from "../types/types";

export function useApi() {
	async function getAllRooms() {
		try {
			const { data } = await api.get<Room[]>("/rooms");
			return data;
		} catch (error) {
			console.log(error);
		}
	}

	async function getAllMovies() {
		try {
			const { data } = await api.get<Movie[]>("/movies");
			return data;
		} catch (error) {
			console.log(error);
		}
	}

	return { getAllRooms, getAllMovies };
}
