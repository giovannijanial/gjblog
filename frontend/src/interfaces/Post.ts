import { User } from "firebase/auth";

export interface ITags {
	id: number;
	title: string;
}

export interface IPost {
	title: string;
	image: string;
	body: string;
	tags: ITags[];
	uid?: string;
	username?: string | null;
}
