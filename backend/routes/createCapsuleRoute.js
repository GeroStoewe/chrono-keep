import express from "express";
import { db } from "../firebaseAdmin.js"; // Firebase Admin SDK for Realtime DB

const router = express.Router();

/**
 * Create a new time capsule
 * @route POST /create
 * @param {string} req.body.title - The title of the time capsule.
 * @param {string} req.body.message - The message inside the time capsule.
 * @param {string} req.body.status - The status of the capsule ('locked' or 'unlocked').
 * @param {string} req.body.releaseDate - The release date of the capsule.
 * @param {string} req.body.imageUrl - Optional URL for the capsule's image.
 * @param {string} req.body.userId - The userId of the user creating the capsule.
 * @returns {Object} JSON response indicating success.
 */
router.post("/create", async (req, res) => {
  const { title, message, status, releaseDate, imageUrl, userId } = req.body;

  // Validate required fields
  if (!title || !message || !status || !releaseDate || !userId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Create a new time capsule object
    const newCapsule = {
      title,
      message,
      status,
      releaseDate,
      imageUrl,
      user_id: userId // Link this capsule to the user who created it
    };

    // Save the new time capsule to Firebase Realtime Database
    const timeCapsulesRef = db.ref("timeCapsules"); // Adjust path based on your Firebase structure
    const newCapsuleRef = timeCapsulesRef.push(); // Generate a new ID for the capsule
    await newCapsuleRef.set(newCapsule); // Set the capsule data

    // Return a success response
    res.json({
      message: "Time Capsule created successfully",
      id: newCapsuleRef.key // Return the new ID of the created capsule
    });
  } catch (error) {
    console.error("Error creating time capsule:", error);
    res.status(500).json({ message: "Failed to create time capsule" });
  }
});

export default router;
