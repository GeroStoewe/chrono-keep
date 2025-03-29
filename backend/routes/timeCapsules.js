import express from "express";
import { db } from "../firebaseAdmin.js";

const router = express.Router();

/**
 * Adds a new time capsule to the user's time capsule collection.
 * @route POST /create
 * @param {string} req.body.deviceId - The unique identifier of the user's device.
 * @param {string} req.body.title - The title of the time capsule.
 * @param {string} req.body.message - The message inside the time capsule.
 * @param {string} req.body.status - The status of the capsule (e.g., 'locked', 'released').
 * @param {string} req.body.releaseDate - The release date of the capsule.
 * @param {string} [req.body.imageUrl] - Optional URL for the capsule's image.
 * @returns {Object} JSON response indicating success.
 */
router.post("/create", async (req, res) => {
  const { deviceId, title, message, status, releaseDate, imageUrl } = req.body;

  if (!deviceId || !title || !message || !status || !releaseDate) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newCapsule = {
    title,
    message,
    status,
    releaseDate,
    imageUrl,
    user_id: deviceId // Assuming the deviceId is associated with the user
  };

  // Add the new time capsule to the Firebase database
  const timeCapsulesRef = db.ref(`timeCapsules`);
  const newCapsuleRef = timeCapsulesRef.push();
  await newCapsuleRef.set(newCapsule);

  res.json({
    message: "Time Capsule created successfully",
    id: newCapsuleRef.key
  });
});

/**
 * Fetches all time capsules for a specific user.
 * @route GET /user/:deviceId
 * @param {string} req.params.deviceId - The unique identifier of the user's device.
 * @returns {Object[]} An array of time capsule objects.
 */
router.get("/user/:deviceId", async (req, res) => {
  const { deviceId } = req.params;

  if (!deviceId) {
    return res.status(400).json({ message: "Device ID is required" });
  }

  // Query time capsules by user_id
  const timeCapsulesRef = db.ref(`timeCapsules`);
  const snapshot = await timeCapsulesRef
    .orderByChild("user_id")
    .equalTo(deviceId)
    .once("value");

  if (!snapshot.exists()) {
    return res.status(404).json({ message: "No time capsules found" });
  }

  const capsules = [];
  snapshot.forEach((childSnapshot) => {
    capsules.push({ id: childSnapshot.key, ...childSnapshot.val() });
  });

  res.json(capsules);
});

/**
 * Fetches a specific time capsule by its ID.
 * @route GET /:capsuleId
 * @param {string} req.params.capsuleId - The ID of the time capsule.
 * @returns {Object} The time capsule object.
 */
router.get("/:capsuleId", async (req, res) => {
  const { capsuleId } = req.params;

  const capsuleRef = db.ref(`timeCapsules/${capsuleId}`);
  const snapshot = await capsuleRef.once("value");

  if (!snapshot.exists()) {
    return res.status(404).json({ message: "Time Capsule not found" });
  }

  res.json({ id: capsuleId, ...snapshot.val() });
});

/**
 * Updates a time capsule by its ID.
 * @route PUT /update/:capsuleId
 * @param {string} req.params.capsuleId - The ID of the time capsule to update.
 * @param {Object} req.body - The updated fields of the time capsule.
 * @returns {Object} JSON response indicating success.
 */
router.put("/update/:capsuleId", async (req, res) => {
  const { capsuleId } = req.params;
  const { title, message, status, releaseDate, imageUrl } = req.body;

  const capsuleRef = db.ref(`timeCapsules/${capsuleId}`);
  const snapshot = await capsuleRef.once("value");

  if (!snapshot.exists()) {
    return res.status(404).json({ message: "Time Capsule not found" });
  }

  const updatedCapsule = {
    title,
    message,
    status,
    releaseDate,
    imageUrl
  };

  await capsuleRef.update(updatedCapsule);
  res.json({ message: "Time Capsule updated successfully" });
});

/**
 * Deletes a time capsule by its ID.
 * @route DELETE /delete/:capsuleId
 * @param {string} req.params.capsuleId - The ID of the time capsule to delete.
 * @returns {Object} JSON response indicating success.
 */
router.delete("/delete/:capsuleId", async (req, res) => {
  const { capsuleId } = req.params;

  const capsuleRef = db.ref(`timeCapsules/${capsuleId}`);
  const snapshot = await capsuleRef.once("value");

  if (!snapshot.exists()) {
    return res.status(404).json({ message: "Time Capsule not found" });
  }

  await capsuleRef.remove();
  res.json({ message: "Time Capsule deleted successfully" });
});

export default router;
