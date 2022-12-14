import User from "../models/User";

export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  const email = await User.findOne({ email: req.body.email });
  if (email) return res.status(400).json({ message: "The email already exist" });
  next();
};