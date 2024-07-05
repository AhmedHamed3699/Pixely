import jwt from "jsonwebtoken";
import db from "../database/db.js";

const authMiddleware = async (req, res, next) => {
  // Get token from cookie
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ error: "No token provided or Provided token has expired" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.id;

    const artist = await db.artist.findUnique({
      where: {
        id: id,
      },
    });
    if (!artist) {
      return res.status(404).json({ error: "Artist not found" });
    }

    // Attach artist to the request object
    req.artist = artist;
    next();
  } catch (err) {
    console.log(err);
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Provided token has expired" });
    }
    res.status(401).json({ error: "Invalid token" });
  }
};

export default authMiddleware;
