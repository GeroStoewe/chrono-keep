// TODO: This is at the moment only a dummy component. It will be extended in the future.

import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { realtimeDb } from "../firebase.ts";

// Define the type for a time capsule
interface TimeCapsule {
  title: string;
  status: string;
  unlockDate: string;
  //description?: string; // Optional property
  //imageUrl?: string; // Optional property
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
          const capsulesArray: TimeCapsule[] = Object.values(data);
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
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">DASHBOARD</h1>
      {capsules.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capsules.map((capsule, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">{capsule.title}</h2>
              <p className="text-gray-600 mb-2">Status: {capsule.status}</p>
              <p className="text-gray-600">Unlock Date: {capsule.unlockDate}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No time capsules found.</p>
      )}
    </div>
  );
}

export default DashboardPage;
