import dotenv from "dotenv";
import http from "http";
dotenv.config({ path: "src/config.env" });
import socketio, { Socket } from "socket.io";
import mongoose from "mongoose";

import Hub from "./components/Hub";
import app from "./app";
import { joinGame, disconnectGame } from "./controllers/gameController";

const server = http.createServer(app);

const io = new socketio.Server(server, { path: "/socket" });

const hub = new Hub();

io.on("connection", (socket: Socket) => {
	console.log("New Connection");

	socket.on("join-game", (data) => joinGame(io, socket, hub, data));

	socket.on("disconnect", () => disconnectGame(hub, socket));
});

// let DB = process.env.DATABASE?.replace(
// 	"<USERNAME>",
// 	process.env.DATABASE_USERNAME!
// )!;

// DB = DB.replace("<PASSWORD>", process.env.DATABASE_PASSWORD!);

let DB = process.env.LOCAL_DATABASE!;

mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Connected to Database Server");
	});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
	console.log(`Server is started on port ${PORT}`);
});
