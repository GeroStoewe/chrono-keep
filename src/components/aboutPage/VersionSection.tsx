import React from "react";

/**
 * VersionSection component displays the current version of the application.
 *
 * @component
 * @returns {JSX.Element} The rendered VersionSection component.
 */
const VersionSection: React.FC = () => {
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4 select-none">Version</h3>
      <p className="text-lg text-gray-700 select-none">
        <strong>1.0.0</strong>
      </p>
    </div>
  );
};

export default VersionSection;
