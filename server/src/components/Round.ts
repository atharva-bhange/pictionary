import Player from "./Player";

class Round {
	id: number;
	word: string;
	drawerPlayer: Player | null;
	words = [
		"Angel",
		"Eyeball",
		"Pizza",
		"Angry",
		"Fireworks",
		"Pumpkin",
		"Baby",
		"Flower",
		"Rainbow",
		"Beard",
		"Flying saucer",
		"Recycle",
		"Bible",
		"Giraffe",
		"Sand castle",
		"Glasses",
		"Snowflake",
		"Book",
		"High heel",
		"Stairs",
		"Bucket",
		"Ice cream cone",
		"Starfish",
		"Bumble bee",
		"Igloo",
		"Strawberry",
		"Butterfly",
		"Lady bug",
		"Sun",
		"Camera",
		"Lamp",
		"Tire",
		"Cat",
		"Lion",
		"Toast",
		"Church",
		"Mailbox",
		"Toothbrush",
		"Crayon",
		"Night",
		"Toothpaste",
		"Dolphin",
		"Nose",
		"Truck",
		"Egg",
		"Olympics",
		"Volleyball",
		"Eiffel Tower",
		"Peanut",
	];

	constructor(id: number) {
		this.id = id;
		this.drawerPlayer = null;
		this.word = this.words[Math.floor(Math.random() * this.words.length)];
	}

	drawer(player: Player) {
		this.drawerPlayer = player;
	}
}

export default Round;
