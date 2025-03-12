import NavigationBar from "../components/dashboardPage/NavigationBar"; // Import the NavBar component

function ArchivePage() {
  return (
    <div className="min-h-screen bg-gradient-to-tl from-blue-400 to-purple-700">
      {/* Use the NavBar component */}
      <NavigationBar />

      {/* Archive Page Content */}
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-white mb-2">Archive</h1>
        <p className="text-gray-200">View your archived time capsules here.</p>
      </div>
    </div>
  );
}

export default ArchivePage;
