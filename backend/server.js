import express from "express";
import cors from "cors";
import verifyToken from "./authMiddleware.js";
import timeCapsulesRoutes from "./routes/timeCapsules.js";
import createCapsuleRoute from "./routes/createCapsuleRoute.js";

const app = express();

app.use(cors());
app.use(express.json());

// API-Routes
app.use("/api/timecapsules", timeCapsulesRoutes);
app.use("/api/createcapsule", createCapsuleRoute);

app.get("/", (req, res) => {
  res.send("API is running!");
});

app.get("/api/auth", verifyToken, (req, res) => {
  res.json({ message: "Authenticated successfully!", user: req.user });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server runs on: http://localhost:${PORT}`);
});
