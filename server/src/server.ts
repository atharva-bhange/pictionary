import http from "http";
import app from "./app";

const server = http.createServer(app);

server.listen(4000, () => {
	console.log("Server is started on port 4000");
});
