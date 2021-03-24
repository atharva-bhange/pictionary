import express from "express";
import morgan from "morgan";
// import roomRoutes from "./routes/roomRoutes";
import path from "path";
const app = express();

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use(express.json());

app.use("/", express.static(path.join(__dirname, "../../../../client/build")));

// app.use("/api/v1/room", roomRoutes);

export default app;
