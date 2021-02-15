import dotenv from "dotenv";
import http from "http";
dotenv.config({ path: "src/config.env" });
import socketio from "socket.io";
import mongoose from "mongoose";

import app from "./app";

const server = http.createServer(app);

const io = new socketio.Server(server);

let DB = process.env.DATABASE?.replace(
	"<USERNAME>",
	process.env.DATABASE_USERNAME!
)!;

DB = DB.replace("<PASSWORD>", process.env.DATABASE_PASSWORD!);

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
