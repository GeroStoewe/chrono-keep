import { useEffect, useState } from "react";
import { useAuth } from "../hooks/UseAuth";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
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
  const { user } = useAuth();
  const [capsules, setCapsules] = useState<TimeCapsule[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch time capsules from the backend
  useEffect(() => {
    const fetchCapsules = async () => {
      try {
        const response = await axios.get(`/api/timecapsules/user/${user?.uid}`);

        // Ensure the response is an array before setting the state
        const data = Array.isArray(response.data) ? response.data : [];
        setCapsules(data);
      } catch (err) {
        console.error("Error fetching capsules:", err);
        setError("Failed to load time capsules.");
      } finally {
        setLoading(false);
      }
    };

    fetchCapsules();
  }, [user?.uid]);

  // Handle deleting a time capsule
  const handleDelete = async (capsuleId: string) => {
    try {
      await axios.delete(`/api/timecapsules/delete/${capsuleId}`);
      setCapsules(capsules.filter((capsule) => capsule.id !== capsuleId)); // Remove from state after deletion
    } catch (err) {
      console.error("Error deleting capsule:", err);
      setError("Failed to delete time capsule.");
    }
  };

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
            Here you can create, view, and manage your time capsules securely.
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

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(capsule.id)}
                  className="mt-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
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
