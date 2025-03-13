import { useState } from "react";
import { ref, push } from "firebase/database";
import { realtimeDb } from "../firebase.ts";
import { Link, useNavigate } from "react-router-dom";
import GradientHeading from "../components/GradientHeading";
import { TextInputField } from "../components/security/TextInputField";
import { SubmitButton } from "../components/SubmitButton";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
//import NavigationBar from "../components/dashboardPage/NavigationBar";
/**
 * CreateCapsulePage Component
 *
 * This component provides a form for creating new time capsules.
 *
 * @returns {JSX.Element} The form UI.
 */

function CreateCapsulePage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [unlockDate, setUnlockDate] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

      // Save the time capsule data to Firebase Realtime Database
      const newCapsuleRef = ref(realtimeDb, "timeCapsules");
      await push(newCapsuleRef, {
        title,
        message,
        unlockDate,
        status: "saved", // Default status
        imageUrl, // Placeholder for image URL (to be updated after upload)
      });

      // Redirect to the dashboard after successful submission
      navigate("/dashboard");
    } catch (error) {
      console.error("Error saving time capsule:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tl from-blue-400 to-purple-700">

      <div className="flex flex-col lg:flex-row bg-white rounded-xl shadow-2xl max-w-6xl w-full">
        {/* Left section - Create Time Capsul Image */}
        <div className="lg:w-1/2 w-full">
          <img
            src="/create-capsule.jpeg"
            alt="Capsule Form Illustration"
            className="w-full h-full object-cover rounded-l-xl select-none"
          />
        </div>

      {/* Right section - Form */}
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-xl w-full">
        <GradientHeading text="Create Time Capsule" />

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <TextInputField
            label="Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          {/* Message Input */}
          <TextInputField
            label="Message"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />

          {/* Unlock Date Input */}
          <TextInputField
            label="Unlock Date"
            type="date"
            value={unlockDate}
            onChange={(e) => setUnlockDate(e.target.value)}
            required
          />

          {/* Image Upload (Optional) */}
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
          <Link to="/dashboard" className="text-blue-600 hover:text-purple-700">
            Back to Dashboard
          </Link>
        </p>
      </div>
    </div>
   </div>
  );
}

export default CreateCapsulePage;
