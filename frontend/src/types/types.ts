export type Room = {
	id: number;
	name: string;
	numberOfSeats: number;
};

// export type Movie = {
// 	id: number;
// 	coverUrl: string;
// 	title: string;
// 	description: string;
// 	duration: number;
// };

export class Movie {
	id?: number;
	coverURL: string;
	title: string;
	description: string;
	duration: number;

	constructor(
		title: string,
		description: string,
		duration: number,
		coverURL: string,
		id?: number
	) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.duration = duration;
		this.coverURL = coverURL;
	}

	static getEmptyMovie() {
		return new Movie(" ", " ", 0, " ");
	}
}

export class Session {
	id?: number;
	date: string;
	timeStart: string;
	timeEnd: string;
	ticketCost: number;
	animationType: any;
	audioType: any;
	movie: Movie | undefined | null;
	room: Room | undefined;

	constructor(
		date: string,
		timeStart: string,
		timeEnd: string,
		ticketCost: number,
		animationType: any,
		audioType: any,
		room?: Room,
		movie?: Movie,
		id?: number
	) {
		this.date = date;
		this.timeStart = timeStart;
		this.timeEnd = timeEnd;
		this.ticketCost = ticketCost;
		this.animationType = animationType;
		this.audioType = audioType;
		this.movie = movie;
		this.room = room;
		this.id = id;
	}

	static getEmptySession() {
		return new Session(" ", " ", " ", 0, " ", " ");
	}
}
