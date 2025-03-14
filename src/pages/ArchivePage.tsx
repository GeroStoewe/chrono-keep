import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { realtimeDb } from "../firebase.ts";
import NavigationBar from "../components/dashboardPage/NavigationBar";

/**
 * ArchivePage Component
 *
 * This component displays all archived (unlocked) time capsules.
 * It includes:
 * - A navigation bar for easy navigation.
 * - Fetching data from Firebase Realtime Database.
 * - Displaying archived capsules in a responsive grid layout.
 *
 * @returns {JSX.Element} The Archive Page UI.
 */

// Interface definition for a time capsule object
interface TimeCapsule {
  id: string;
  title: string;
  message: string;
  status: string;
  releaseDate: string;
  imageUrl?: string; 
}

function ArchivePage() {
  const [capsules, setCapsules] = useState<TimeCapsule[]>([]);

  useEffect(() => {
    // Reference to the archived capsules node
    const dbRef = ref(realtimeDb, "archivedCapsules");
    // Listen for changes and update the state
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data && typeof data === "object") {
        // Convert the returned object to an array of capsules
        const capsulesArray: TimeCapsule[] = Object.entries(data).map(
          ([id, capsuleData]) => ({
            id,
            ...(capsuleData as Omit<TimeCapsule, "id">)
          })
        );
        setCapsules(capsulesArray);
      } else {
        setCapsules([]);
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-tl from-blue-400 to-purple-700">
      {/* Navigation Bar */}
      <NavigationBar />

      {/* Archive Page Content */}
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-white mb-2">Archive</h1>
        <p className="text-gray-200 mb-4">
          View your archived/unlocked time capsules here.
        </p>

        {/* Capsules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capsules.length > 0 ? (
            capsules.map((capsule) => (
              <div
                key={capsule.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105"
              >
                {/* Capsule Image */}
                <img
                  src={capsule.imageUrl || "/dashboard-placeholder.jpeg"}
                  alt={capsule.title}
                  className="w-full h-48 object-cover"
                />

                {/* Capsule Details */}
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">
                    {capsule.title}
                  </h2>
                  <p className="text-gray-600 mb-2">
                    Message: {capsule.message}
                  </p>
                  <p className="text-gray-600 mb-2">Status: {capsule.status}</p>
                  <p className="text-gray-600 mb-2">
                    Release Date: {capsule.releaseDate}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white">No archived capsules available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArchivePage;
