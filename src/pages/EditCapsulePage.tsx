import { useEffect, useState } from "react";
import { ref, onValue, update } from "firebase/database";
import { realtimeDb } from "../firebase.ts";
import { useNavigate, useParams } from "react-router-dom";
import { TextInputField } from "../components/security/TextInputField";
import { SubmitButton } from "../components/SubmitButton";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import NavigationBar from "../components/dashboardPage/NavigationBar";

function EditCapsulePage() {
  const { id } = useParams<{ id: string }>(); // Get the capsule ID from the URL
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [unlockDate, setUnlockDate] = useState("");
  const [status, setStatus] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch the capsule data based on the ID
  useEffect(() => {
    const dbRef = ref(realtimeDb, `timeCapsules/${id}`);
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setTitle(data.title);
        setMessage(data.message);
        setUnlockDate(data.unlockDate);
        setStatus(data.status);
        setImageUrl(data.imageUrl || "");
      }
    });
  }, [id]);

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
      await update(dbRef, {
        title,
        message,
        unlockDate,
        status,
        imageUrl: updatedImageUrl,
      });

      // Redirect to the dashboard after successful update
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating time capsule:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tl from-blue-400 to-purple-700">
      <NavigationBar />
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-white mb-8">Edit Time Capsule</h1>
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

          {/* Status Input */}
          <TextInputField
            label="Status"
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          />

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
              className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg"
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
          <div className="mt-6">
            <SubmitButton text="Update Capsule" isLoading={isLoading} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCapsulePage;
