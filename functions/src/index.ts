import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import cors from "cors";

admin.initializeApp();

const corsMiddleware = cors({ origin: true });

exports.createCapsule = functions.https.onRequest((req, res) => {
  // Setze CORS-Header explizit
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  // Behandle OPTIONS-Preflight-Anfrage (CORS Preflight)
  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  corsMiddleware(req, res, async () => {
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method Not Allowed" });
      return;
    }

    try {
      const { title, message, releaseDate, status, imageUrl, user_id } =
        req.body;

      if (!title || !message || !releaseDate || !status || !user_id) {
        res.status(400).json({ error: "Missing required fields" });
        return;
      }

      const newCapsuleRef = admin
        .database()
        .ref(status === "unlocked" ? "archivedCapsules" : "timeCapsules")
        .push();

      await newCapsuleRef.set({
        title,
        message,
        releaseDate,
        status,
        imageUrl,
        user_id
      });

      res.status(200).json({ message: "Capsule saved successfully!" });
    } catch (error) {
      console.error("Error saving time capsule:", error);
      res.status(500).json({ error: "Failed to save the capsule" });
    }
  });
});
