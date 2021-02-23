import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	name: String,
});

const Users = mongoose.model("Users", userSchema);

export default Users;
