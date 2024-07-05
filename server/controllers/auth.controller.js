import bcrypt from "bcryptjs";
import db from "../database/db.js";
import jwt from "jsonwebtoken";
import ms from "ms";

const generateToken = (res, id) => {
  const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: ms(process.env.JWT_EXPIRES_IN),
  });
};

const authController = {
  // @desc    Register a new artist
  // @route   POST /api/auth/signup
  // @access  Public
  signup: async (req, res) => {
    try {
      // get info from request body
      const { name, username, password } = req.body;

      // Check if username already exists
      const artist = await db.artist.findFirst({
        where: {
          username: username,
        },
        select: {
          username: true,
          password: true,
        },
      });
      if (artist) {
        return res.status(400).json({ error: "username is taken!!" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new Artist
      const newArtist = await db.artist.create({
        data: {
          name: name,
          username: username,
          password: hashedPassword,
        },
      });

      // Generate a JWT token
      generateToken(res, newArtist.id);

      // Send the response
      res.status(201).json({
        message: "Artist registered successfully",
        body: newArtist,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "An error occurred while registering a new artist!!",
      });
    }
  },

  // @desc    Login an Artist
  // @route   POST /api/auth/login
  // @access  Public
  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Check if email already exists
      const artist = await db.artist.findFirst({
        where: {
          username: username,
        },
      });
      if (!artist) {
        return res.status(400).json({
          error: "Invalid username",
        });
      }

      // Check if the password is correct
      const isCorrect = await bcrypt.compare(password, artist.password);
      if (!isCorrect) {
        return res.status(400).json({
          error: "Invalid password",
        });
      }

      // Generate a JWT token
      generateToken(res, artist.id);

      // Send the response
      res.status(200).json({
        message: "Logged in successfully",
        body: artist,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "An error occurred while logging in",
      });
    }
  },

  // @desc    Logout an Artist
  // @route   POST /api/auth/logout
  // @access  Private
  logout: async (_req, res) => {
    try {
      // Clear the cookie
      res.clearCookie("token");

      // Send the response
      res.status(200).json({
        message: "Logged out successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "An error occurred while logging out",
      });
    }
  },

  // @desc    Auth logged-in Artist
  // @route   GET /api/auth/me
  // @access  Private
  me: (req, res) => {
    try {
      res.status(200).json({ message: "You are in", body: req.artist });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "An error occurred while getting data.",
      });
    }
  },
};

export default authController;
