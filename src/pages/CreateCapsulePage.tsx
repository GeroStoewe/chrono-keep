import { useState } from "react";
import { ref, push } from "firebase/database";
import { realtimeDb } from "../firebase.ts";
import { Link, useNavigate } from "react-router-dom";
import GradientHeading from "../components/GradientHeading";
import { TextInputField } from "../components/security/TextInputField";
import { SubmitButton } from "../components/SubmitButton";

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
      // Save the time capsule data to Firebase
      const newCapsuleRef = ref(realtimeDb, "timeCapsules");
      await push(newCapsuleRef, {
        title,
        message,
        unlockDate,
        status: "saved", // Default status
        imageUrl: "", // Placeholder for image URL (to be updated after upload)
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
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
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
            <label className="block text-sm font-medium text-gray-700">
              Upload Image (Optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="mt-1 block w-full"
            />
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
  );
}

export default CreateCapsulePage;
