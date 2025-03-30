import { useEffect, useState, useCallback } from "react";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ref, onValue, get, set, remove } from "firebase/database";
import { getAuth } from "firebase/auth";
import { realtimeDb } from "../firebase.ts";
import { CreateButton } from "../components/dashboardPage/CreateButton";
import { UnlockButton } from "../components/dashboardPage/UnlockButton";
import NavigationBar from "../components/dashboardPage/NavigationBar";

/**
 * Dashboard Component
 *
 * The `DashboardPage` component serves as the main interface for users to manage their time capsules.
 * It provides a visually appealing and user-friendly experience with the following features:
 *
 * - **Navigation Bar**: Ensures access to other sections of the application.
 * - **Create Button**: Allows users to add a new time capsule.
 * - **Unlock Button**: Checks for due time capsules and moves them to the archive when they reach their release date.
 * - **Time Capsule Display**:
 *   - Shows only the logged-in user's locked time capsules.
 *   - Each capsule is displayed with its title, message, status, and release date.
 *   - Users can edit their time capsules via edit button.
 * - **Automatic Unlocking Mechanism**:
 *   - Periodically checks if any locked time capsules have reached their release date.
 *   - Moves unlocked capsules to an archived section and removes them from dashboard to the archives capsules.
 *
 * @returns {JSX.Element} The functional and interactive dashboard UI.
 */

// The type for a time capsule
interface TimeCapsule {
  id: string; // Unique ID for each capsule
  title: string;
  message: string;
  status: string;
  releaseDate: string;
  imageUrl?: string;
}

function DashboardPage() {
  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user?.uid;

  const [capsules, setCapsules] = useState<TimeCapsule[]>([]);

  useEffect(() => {
    if (userId) {
      const dbRef = ref(realtimeDb, "timeCapsules");
      onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // Filter capsules by user_id
          const capsulesArray = Object.keys(data)
            .filter((key) => data[key].user_id === userId && data[key].status === "locked")
            .map((key) => ({
              id: key,
              ...data[key] 
            }));
          setCapsules(capsulesArray);
        }
      });
    }
  }, [userId]);

  const checkAndUnlockCapsules = useCallback(async () => {
    const now = new Date();
    console.log("Current Date in unlock function:", now); // Debugging log
    for (const capsule of capsules) {
      console.log("Checking capsule:", capsule.title, "ID:", capsule.id, "Release Date:", capsule.releaseDate, "Status:", capsule.status); // Debugging log
      if (capsule.status === "locked") {
        const releaseDate = new Date(capsule.releaseDate);
        console.log("Parsed Release Date:", releaseDate); // Debugging log
        console.log("Comparison:", releaseDate.getTime() <= now.getTime()); // Debugging log
        if (releaseDate <= now) {
          const capsuleRef = ref(realtimeDb, `timeCapsules/${capsule.id}`);
          const archivedCapsuleRef = ref(realtimeDb, `archivedCapsules/${userId}/${capsule.id}`);

          try {
            const snapshot = await get(capsuleRef);
            const capsuleData = snapshot.val();

            if (capsuleData) {
              await set(archivedCapsuleRef, { ...capsuleData, status: "unlocked" });
              await remove(capsuleRef);
              console.log(`Time capsule "${capsule.title}" (ID: ${capsule.id}) unlocked and moved to archive.`); // Debugging log
              setCapsules((prevCapsules) =>
                prevCapsules.filter((c) => c.id !== capsule.id)
              );
            } else {
              console.warn(`Could not retrieve data for capsule with ID: ${capsule.id}`); // Debugging log
            }
          } catch (error) {
            console.error("Error unlocking and archiving time capsule:", error); // Debugging log
          }
        } else {
          console.log(`Capsule "${capsule.title}" (ID: ${capsule.id}) release date is in the future.`); // Debugging log
        }
      } else {
        console.log(`Capsule "${capsule.title}" (ID: ${capsule.id}) is not locked.`); // Debugging log
      }
    }
  }, [capsules, userId]);

  useEffect(() => {
    const intervalId = setInterval(checkAndUnlockCapsules, 60 * 60 * 1000); // Checks every hour
    return () => clearInterval(intervalId);
  }, [checkAndUnlockCapsules]);

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
                src={capsule.imageUrl || "/dashboard-placeholder.jpeg"} // Use placeholder image if no image is selected
                alt={capsule.title}
                className="w-full h-70 object-center"
              />

              {/* Capsule Details */}
              <div className="p-6">
                {/* Edit Icon */}
                <Link
                  to={`/edit-capsule/${capsule.id}`} // Link to the edit page
                  className="absolute top right-4 p-2 bg-purple-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                >
                  <FaEdit className="w-4 h-4" />
                </Link>
                <h2 className="text-xl font-semibold mb-2">{capsule.title}</h2>
                <p className="text-gray-600 mb-2">Message: {capsule.message}</p>
                <p className="text-gray-600 mb-2">Status: {capsule.status}</p>
                <p className="text-gray-600 mb-2">
                  Release Date: {capsule.releaseDate}
                </p>
              </div>
            </div>
          ))}
        </div>
      <div className="fixed bottom-30 right-8 flex flex-col gap-4">
      <UnlockButton
            onClick={checkAndUnlockCapsules}
            isLoading={false} 
            text={"Unlock"} 
            to={""} />
        </div>
      </div>
      {/* Create Time Capsule Button */}
      <div className="fixed bottom-8 right-8">
        <CreateButton to="/create-capsule" text="Create Time Capsule" />
      </div>
      </div>
  );
}

export default DashboardPage;
