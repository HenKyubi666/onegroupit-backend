import User from "../models/User";
import jwt from "jsonwebtoken";
import { SECRET } from "../config";
import Role from "../models/Role";

export const signUp = async (req, res) => {
  const { firstName, lastName, email, password, roles } = req.body;

  const userFound = User.find({ email });

  console.log(userFound.email);

  if (!userFound.email) {
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: await User.encryptPassword(password),
    });

    if (roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      newUser.roles = foundRoles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "user" });
      newUser.roles = [role._id];
    }

    const savedUser = await newUser.save();

    const token = jwt.sign({ id: savedUser._id }, SECRET, {
      expiresIn: 86400,
    });

    res.status(200).json(token);
  } else {
    res.status(412).json("User already exists");
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  const userFound = await User.findOne({ email }).populate("roles");
  if (!userFound) return res.status(400).json({ message: "User not found" });

  const matchPassword = await User.comparePassword(
    password,
    userFound.password
  );

  if (!matchPassword)
    return res.status(401).json({ token: null, message: "Invalid password" });
  const token = jwt.sign({ id: userFound._id }, SECRET, {
    expiresIn: 86400,
  });
  res.json({ token });
};
