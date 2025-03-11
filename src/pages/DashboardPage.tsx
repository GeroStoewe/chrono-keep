import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { realtimeDb } from "../firebase.ts";
import { Link } from "react-router-dom";
import GradientHeading from "../components/GradientHeading";
import { SubmitButton } from "../components/SubmitButton";

/**
 * Dashboard Component
 *
 * This component provides a user-friendly dashboard with:
 * - Navigation bar.
 * - Create Time Capsule button.
 * - Display of all time capsules.
 *
 * @returns {JSX.Element} The dashboard UI.
 */

// Define the type for a time capsule
interface TimeCapsule {
  id: string; // Add ID for unique key
  title: string;
  status: string;
  unlockDate: string;
  imageUrl?: string; // Optional property for image placeholder
}

function DashboardPage() {
  const [capsules, setCapsules] = useState<TimeCapsule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const dbRef = ref(realtimeDb, "timeCapsules");
    onValue(
      dbRef,
      (snapshot) => {
        const data = snapshot.val();
        console.log("Data from Firebase:", data); // Debugging log
        if (data) {
          // Convert the object of capsules into an array
          const capsulesArray: TimeCapsule[] = Object.entries(data).map(
            ([id, capsule]) => ({
              id,
              ...(capsule as TimeCapsule), // Spread the capsule data
            })
          );
          setCapsules(capsulesArray);
        } else {
          console.log("No data found in Firebase."); // Debugging log
          setError("No time capsules found.");
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching data:", error); // Debugging log
        setError("Failed to fetch data.");
        setLoading(false);
      }
    );
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-tl from-blue-400 to-purple-700">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <GradientHeading text="CHRONO KEEP" />
            <div className="flex space-x-8">
              <Link to="/archive" className="text-gray-800 hover:text-purple-700">
                Archive
              </Link>
              <Link to="/about" className="text-gray-800 hover:text-purple-700">
                About Us
              </Link>
              <Link to="/profile" className="text-gray-800 hover:text-purple-700">
                Profile
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="max-w-6xl mx-auto p-8">
        {/* Create Time Capsule Button */}
        <div className="flex justify-end mb-8">
          <Link to="/create-capsule">
            <SubmitButton text="Create Time Capsule" isLoading={false} />
          </Link>
        </div>

        {/* Time Capsules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capsules.map((capsule) => (
            <div
              key={capsule.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              {/* Image Placeholder */}
              <img
                src={capsule.imageUrl || "/placeholder-image.png"} // Use placeholder if no image
                alt={capsule.title}
                className="w-full h-48 object-cover"
              />

              {/* Capsule Details */}
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{capsule.title}</h2>
                <p className="text-gray-600 mb-2">Status: {capsule.status}</p>
                <p className="text-gray-600">Unlock Date: {capsule.unlockDate}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;