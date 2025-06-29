import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const login = (req, res) => {
  // only login page for the user no register

  try {
    // create the user

    const { email, password } = req.body;

    // chech the hardcoded values

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // generate jwt token

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    // Store JWT token in an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true, // Prevents client-side JS from accessing the cookie
      // secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "Strict",
      maxAge: 2 * 60 * 60 * 1000 // Cookie expires in 2 hours
    });

    res.status(200).json({ message: "Admin Login Successfull", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error creating a login" });
  }
};

//logout

export const logout = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "server error logging out" });  // done
  }
};
