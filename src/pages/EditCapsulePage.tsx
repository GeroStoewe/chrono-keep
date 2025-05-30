import { useEffect, useState } from "react";
import { ref, onValue, update, remove } from "firebase/database";
import { getAuth } from "firebase/auth";
import { realtimeDb } from "../firebase.ts";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL
} from "firebase/storage";
import { useNavigate, useParams } from "react-router-dom";
import { TextInputField } from "../components/security/TextInputField";
import { SubmitButton } from "../components/SubmitButton";
import NavigationBar from "../components/dashboardPage/NavigationBar";
import GradientHeading from "../components/GradientHeading.tsx";
import BackArrowButton from "../components/editCapsulePage/BackArrowButton.tsx";
import { enqueueSnackbar, closeSnackbar } from "notistack";

/**
 * EditCapsulePage Component
 *
 * This component provides a form for editing an existing time capsule.
 * Users can modify the title, message, release date, status, and image associated with the capsule.
 * If the capsule is unlocked, it will be moved to the archive. Users can also delete a capsule.
 *
 * Features:
 * - Fetches and displays existing capsule data from Firebase Realtime Database.
 * - Allows users to update text fields and optionally upload a new image.
 * - Updates the capsule in Firebase or archives it if unlocked.
 * - Displays success and error notifications using `notistack`.
 * - Provides a delete option to remove the capsule permanently.
 *
 * @returns {JSX.Element} The EditCapsulePage component containing the edit form.
 */

function EditCapsulePage() {
  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user?.uid;

  const { id } = useParams<{ id: string }>(); // Get the capsule ID from the URL
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [status, setStatus] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" }); // Snackbar state

  // Fetch the capsule data based on the ID
  useEffect(() => {
    if (userId) {
      const dbRef = ref(realtimeDb, `timeCapsules/${id}`);
      onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        if (data && data.user_id === userId) {
          setTitle(data.title);
          setMessage(data.message);
          setReleaseDate(data.releaseDate);
          setStatus(data.status);
          setImageUrl(data.imageUrl || "");
        }
      });
    }
  }, [userId, id]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let updatedImageUrl = imageUrl;

      // Upload new image if selected
      if (imageFile) {
        const storage = getStorage();
        const fileRef = storageRef(storage, `timeCapsules/${imageFile.name}`);
        await uploadBytes(fileRef, imageFile);
        updatedImageUrl = await getDownloadURL(fileRef);
      }

      // Update the capsule data in Firebase
      const dbRef = ref(realtimeDb, `timeCapsules/${id}`);
      if (status === "unlocked") {
        // Move to archive
        const archiveRef = ref(realtimeDb, `archivedCapsules/${userId}/${id}`);
        await update(archiveRef, {
          title,
          message,
          releaseDate,
          status,
          imageUrl: updatedImageUrl,
          user_id: userId
        });

        // Remove from active capsules
        await remove(dbRef);
      } else {
        await update(dbRef, {
          title,
          message,
          releaseDate,
          status,
          imageUrl: updatedImageUrl,
          user_id: userId
        });
      }

      // Success snackbar
      enqueueSnackbar("Capsule updated successfully!", {
        variant: "success",
        autoHideDuration: 2000, // Auto-hide after 2 seconds
        action: (key) => (
          <button
            onClick={() => closeSnackbar(key)}
            className="text-white px-2"
          >
            ✖
          </button>
        )
      });

      setTimeout(() => {
        navigate(status === "unlocked" ? "/archive" : "/dashboard"); // Navigate back to archive if status is unlocked, otherwise navigate back to dashboard after 2 seconds
      }, 2000);
    } catch (error) {
      console.error("Error updating time capsule:", error);

      // Show error snackbar with manual close button
      enqueueSnackbar("Failed to update capsule.", {
        variant: "error",
        action: (key) => (
          <button
            onClick={() => closeSnackbar(key)}
            className="text-white px-2"
          >
            ✖
          </button>
        )
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle delete functionality
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this capsule?")) {
      setIsLoading(true);

      try {
        const dbRef = ref(realtimeDb, `timeCapsules/${id}`);
        await remove(dbRef); // Delete the capsule from Firebase

        // Success snackbar
        setSnackbar({ open: true, message: "Capsule deleted successfully!" });
        setTimeout(() => {
          navigate("/dashboard"); // Navigate back to dashboard after 2 seconds
        }, 2000);
      } catch (error) {
        console.error("Error deleting time capsule:", error);
        setSnackbar({ open: true, message: "Failed to delete capsule." });
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Handle status change
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    // Automatically set release date to today if status is "unlocked"
    if (newStatus === "unlocked") {
      const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
      setReleaseDate(today);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tl from-blue-400 to-purple-700">
      <NavigationBar />
      <div className="max-w-6xl mx-auto p-8">
        {/* Form Wrapper */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          <GradientHeading text="Edit Time Capsule" />
          {/* BackArrowButton */}
          <div className="mb-4">
            <BackArrowButton />
          </div>
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Input */}
            <TextInputField
              label="Title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            {/* Message Input */}
            <TextInputField
              label="Message"
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            {/* Release Date Input */}
            <TextInputField
              label="Release Date"
              type="date"
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
            />

            {/* Status Input */}
            <div>
              <label className="block text-gray-800 font-semibold mb-2">
                Status
              </label>
              <div className="relative">
                <select
                  value={status}
                  onChange={handleStatusChange}
                  className="w-full px-4 py-3 pr-100 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-transparent transition duration-300 transform hover:scale-105 focus:gradient-border appearance-none"
                  required
                >
                  <option value="locked">Locked</option>
                  <option value="unlocked">Unlocked</option>
                </select>
                {/* Custom Arrow (SVG) */}
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  ▼ {/* You can replace this with an actual SVG icon */}
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-gray-800 font-semibold mb-2">
                Upload New Image (Optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg mt-2 inline-block"
              >
                Choose File
              </label>
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Current Capsule Image"
                  className="mt-4 w-32 h-32 object-cover rounded-lg"
                />
              )}
            </div>

            {/* Submit Button */}
            <div className="mt-4">
              <SubmitButton text="Update Capsule" isLoading={isLoading} />
            </div>

            {/* Delete Button */}
            <div className="mt-4">
              <button
                type="button"
                onClick={handleDelete}
                className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                disabled={isLoading}
              >
                Delete Capsule
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Snackbar */}
      {snackbar.open && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
          {snackbar.message}
          <button onClick={() => closeSnackbar} className="ml-4">
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

export default EditCapsulePage;
