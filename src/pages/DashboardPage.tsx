import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { realtimeDb } from "../firebase.ts";
import { CreateButton } from "../components/dashboardPage/CreateButton";
import NavigationBar from "../components/dashboardPage/NavigationBar";

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
  id: string; // Unique ID for each capsule
  title: string;
  status: string;
  unlockDate: string;
  imageUrl?: string; // Optional property for image placeholder
}

function DashboardPage() {
  const [capsules, setCapsules] = useState<TimeCapsule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch time capsules from Firebase Realtime Database
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
              ...(capsule as TimeCapsule) // Spread the capsule data
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
      <NavigationBar />

      {/* Dashboard Content */}
      <div className="max-w-6xl mx-auto p-8">
        {/* Welcome Message */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome to the Dashboard
          </h1>
          <p className="text-gray-200 mb-4">
            Here you can create, view and manage your time capsules securely.
          </p>
        </div>

        {/* Time Capsules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capsules.map((capsule) => (
            <div
              key={capsule.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105"
            >
              {/* Image Placeholder */}
              <img
                src={capsule.imageUrl || "/dashboard-placeholder.jpeg"} // Use placeholder image if no image
                alt={capsule.title}
                className="w-full h-48 object-cover"
              />

              {/* Capsule Details */}
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{capsule.title}</h2>
                <p className="text-gray-600 mb-2">Status: {capsule.status}</p>
                <p className="text-gray-600">
                  Unlock Date: {capsule.unlockDate}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Create Time Capsule Button (Fixed at Bottom-Right Corner) */}
      <div className="fixed bottom-8 right-8">
        <CreateButton to="/create-capsule" text="Create Time Capsule" />
      </div>
    </div>
  );
}

export default DashboardPage;
