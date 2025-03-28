import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/UseAuth";
import NavigationBar from "../components/dashboardPage/NavigationBar";
import VisionSection from "../components/aboutPage/VisionSection";
import ContactSection from "../components/aboutPage/ContactSection";
import VersionSection from "../components/aboutPage/VersionSection";

/**
 * AboutUs component renders the "About Us" page.
 * It includes sections for the vision, contact information, and version details.
 *
 * @component
 * @returns {JSX.Element} The rendered AboutUs component.
 */
const AboutUs: React.FC = () => {
  const { user } = useAuth();
  const [userId, setUserId] = useState<string | null>(null);

  /**
   * Effect hook to update the user ID when authentication state changes.
   * If a user is logged in, their UID is stored in the state.
   */
  useEffect(() => {
    if (user) {
      const userId = user.uid;
      setUserId(userId);
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-tl from-blue-400 to-purple-700">
      <NavigationBar />

      <div className="max-w-6xl mx-auto p-8 relative">
        <h1 className="text-4xl font-bold text-white mb-6 select-none">
          About Us
        </h1>

        <div className="bg-white rounded-xl shadow-2xl p-8 relative">
          <VisionSection></VisionSection>

          <ContactSection userId={userId}></ContactSection>

          <VersionSection></VersionSection>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
