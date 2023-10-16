const User = require("../model/userModel");
const bcrypt = require("bcrypt");
module.exports.register = async (req, res, next) => {
  console.log(req.body);
  try {
    const { username, email, password } = req.body;

    // Perform validation here (e.g., check if required fields are provided)
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.json({
        message: "User with this email already exists.",
        status: false,
      });
    }
    // Check if the user with the same email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.json({
        message: "User with this email already exists.",
        status: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user in the database
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword, // You should hash the password before saving it to the database
    });
    delete newUser.password;
    console.log("Data to be returned:", {
      message: "User registered successfully.",
      newUser,
    });

    // Respond with a success message or token, depending on your authentication system
    return res
      .status(201)
      .json({ message: "User registered successfully.", newUser });
  } catch (error) {
    // Handle any errors that occur during registration
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};
