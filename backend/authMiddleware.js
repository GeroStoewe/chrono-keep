import admin from "./firebaseAdmin.js";

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No Token Found" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
    console.log("Authorization Header:", req.headers.authorization);
  } catch (error) {
    console.error("Error with checking the token:", error);
    return res.status(403).json({ error: "Invalid Token!" });
  }
};

export default verifyToken;
