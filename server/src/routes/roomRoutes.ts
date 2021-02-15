import express from "express";

import { createRoom, getRoom } from "../controllers/roomController";

const router = express.Router();

router.route("/").get(getRoom).post(createRoom);

export default router;
