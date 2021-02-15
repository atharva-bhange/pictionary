import express from "express";
import morgan from "morgan";
import roomRoutes from "./routes/roomRoutes";

const app = express();

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use(express.json());

app.get("/", (req, res) => {
	res.send("<h1>Hello World</h1>");
});

app.use("/api/v1/room", roomRoutes);

export default app;
