import { RequestHandler } from "express";
import Room from "../models/roomModel";

export const getRoom: RequestHandler = async (req, res, next) => {
	try {
		const count = await Room.count();
		if (count === 0) {
			res.status(204).json({ status: "success" });
		} else {
			var random = Math.floor(Math.random() * count);
			const randomRoom = await Room.findOne().skip(random);
			res.status(200).json({ status: "success", room: randomRoom });
		}
	} catch (err) {
		res.status(500).json({ status: "fail", err });
	}
};

export const createRoom: RequestHandler = async (req, res, next) => {
	try {
		const newRoom = await Room.create(req.body);
		res.status(200).json({
			status: "success",
			room: newRoom,
		});
	} catch (err) {
		res.status(500).json({ status: "fail", err });
	}
};
