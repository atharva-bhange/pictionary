import mongoose from "mongoose";

const roomsSchema = new mongoose.Schema({
	roomId: String,
	noOfPlayers: Number,
	players: [String],
});

const Rooms = mongoose.model("Rooms", roomsSchema);

export default Rooms;
