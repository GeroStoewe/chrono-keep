import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL
} from "firebase/storage";
import GradientHeading from "../components/GradientHeading";
import { TextInputField } from "../components/security/TextInputField";
import { SubmitButton } from "../components/SubmitButton";
import { enqueueSnackbar, closeSnackbar } from "notistack"; // Import useSnackbar
import { getAuth } from "firebase/auth";

/**
 * CreateCapsulePage Component
 *
 * This component provides a form for creating new time capsules.
 *
 * @returns {JSX.Element} The form UI.
 */

function CreateCapsulePage() {
  const auth = getAuth();
  const user = auth.currentUser; // Get the current user
  const userId = user?.uid; // Get the user ID

  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [status, setStatus] = useState("locked"); // Default status is "locked"
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Automatically set the release date when the status is set to "unlocked"
  useEffect(() => {
    if (status === "unlocked") {
      const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
      setReleaseDate(today); // Automatically set release date to today's date
    }
  }, [status]); // This effect runs when the status changes

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let imageUrl = "";

      // Upload image to Firebase Storage (if an image is selected)
      if (imageFile) {
        const storage = getStorage();
        const fileRef = storageRef(storage, `timeCapsules/${imageFile.name}`);
        await uploadBytes(fileRef, imageFile); // Upload the file
        imageUrl = await getDownloadURL(fileRef); // Get the download URL
      }

      const response = await fetch(
        "https://createcapsule-6udqjh4w5q-uc.a.run.app",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title,
            message,
            releaseDate,
            status,
            imageUrl,
            user_id: userId
          })
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save the capsule");
      }

      const data = await response.json();
      console.log("Capsule saved:", data);

      enqueueSnackbar("The capsule is saved successfully!", {
        variant: "success",
        autoHideDuration: 2000, // Auto-hide after 3 seconds
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
        navigate(status === "locked" ? "/dashboard" : "/archive");
      }, 2000);
    } catch (error) {
      console.error("Error saving time capsule:", error);
      // Show error snackbar notification
      enqueueSnackbar("Failed to save the capsule. Please try again.", {
        variant: "error",
        autoHideDuration: 2000
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
    console.log("Selected Status:", e.target.value); // Debugging
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tl from-blue-400 to-purple-700">
      <div className="flex flex-col lg:flex-row bg-white rounded-xl shadow-2xl max-w-4xl w-full">
        {/* Left section - Create Time Capsule Image */}
        <div className="lg:w-1/2 w-full">
          <img
            src="/create-capsule.jpeg"
            alt="Capsule Form Illustration"
            className="w-full h-full object-cover rounded-l-xl select-none"
          />
        </div>

        {/* Right section - Form */}
        <div className="w-full lg:w-1/2 p-8">
          <GradientHeading text="Create Time Capsule" />

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex space-x-4"></div>
            {/* Title Input */}
            <div className="flex-1">
              <TextInputField
                label="Title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

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
                  id="status"
                  name="status"
                  value={status}
                  onChange={handleStatusChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-transparent transition duration-300 transform hover:scale-105 focus:gradient-border appearance-none"
                >
                  <option value="locked">Locked</option>
                  <option value="unlocked">Unlocked</option>
                </select>
                {/* Custom Arrow (SVG) */}
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  ▼
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-gray-800 font-semibold mb-0.5 select-none">
                Upload Image (Optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="hidden"
                id="file-upload"
              />

              <div>
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out block text-center"
                >
                  Choose File
                </label>
                <p className="text-sm text-gray-500 mt-2 text-center">
                  {imageFile ? imageFile.name : "No file chosen"}
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <SubmitButton text="Save Capsule" isLoading={isLoading} />
            </div>
          </form>

          {/* Back to Dashboard */}
          <p className="mt-4 text-center text-gray-800">
            <Link
              to="/dashboard"
              className="text-blue-600 hover:text-purple-700"
            >
              Back to Dashboard
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CreateCapsulePage;
