import NavigationBar from "../components/dashboardPage/NavigationBar"; // Import the NavBar component

function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-tl from-blue-400 to-purple-700">
      {/* Use the NavBar component */}
      <NavigationBar />

      {/* Profile Page Content */}
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-white mb-2">Profile</h1>
        <p className="text-gray-200">Manage your profile settings.</p>
      </div>
    </div>
  );
}

export default ProfilePage;
