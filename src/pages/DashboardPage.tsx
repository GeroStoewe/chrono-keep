import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import { realtimeDb } from "../firebase.ts";
import { CreateButton } from "../components/dashboardPage/CreateButton";
import NavigationBar from "../components/dashboardPage/NavigationBar";

/**
 * Dashboard Component
 *
 * This component provides a user-friendly dashboard with:
 * - Navigation bar.
 * - Create Button for adding a new time capsule.
 * - Display only the logged-in user's locked capsules with an edit button.
 *
 * @returns {JSX.Element} The dashboard UI.
 */

// Define the type for a time capsule
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
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      const dbRef = ref(realtimeDb, "timeCapsules");
      onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // Filter capsules by user_id
          const capsulesArray = Object.keys(data)
            .filter((key) => data[key].user_id === userId)
            .map((key) => ({
              id: key,
              ...data[key]
            }));
          setCapsules(capsulesArray);
        }
      });
    }
  }, [userId]);

  /*
    const auth = getAuth();

    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userId = user.uid;
        const dbRef = ref(realtimeDb, `timeCapsules/${userId}`); // Query only the user's capsules
    
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
          setCapsules([]); // No capsules found
          console.log("No time capsules found in Firebase."); // Debugging log
          setError(null);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching data:", error); // Debugging log
        setError("Failed to fetch data.");
        setLoading(false);
      }
    );
  }else {
    console.log("No user logged in.");
    setError("User not authenticated.");
    setLoading(false);
  }
  });

  return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
*/
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
      </div>
      {/* Create Time Capsule Button (Fixed at Bottom-Right Corner) */}
      <div className="fixed bottom-8 right-8">
        <CreateButton to="/create-capsule" text="Create Time Capsule" />
      </div>
    </div>
  );
}

export default DashboardPage;
