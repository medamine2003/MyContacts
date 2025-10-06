import jwt from "jsonwebtoken";

const requireAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; 
    if (!token) throw new Error("No token");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.userId };

    next();
  } catch (err) {
    res.status(401).json({ error: "Unauthorized", details: err.message });
  }
};

export default requireAuth;
