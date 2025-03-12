import { Link } from "react-router-dom";
import GradientHeading from "../GradientHeading";

function NavBar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <GradientHeading text="CHRONO KEEP" />
          <div className="flex space-x-8">
            <Link
              to="/dashboard"
              className="text-gray-800 hover:text-purple-700"
            >
              Dashboard
            </Link>
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
  );
}

export default NavBar;
