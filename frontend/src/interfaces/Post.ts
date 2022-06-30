export interface ITags {
	title: string;
}

export interface IPost {
	title: string;
	image: string;
	body: string;
	tags: ITags[];
}
