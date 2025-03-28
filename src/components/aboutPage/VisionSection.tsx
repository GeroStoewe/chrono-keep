import React from "react";

/**
 * VisionSection component describes the purpose and concept behind Chrono Keep.
 *
 * @component
 * @returns {JSX.Element} The rendered VisionSection component.
 */
const VisionSection: React.FC = () => {
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4 select-none">
        The Vision Behind Chrono Keep
      </h3>
      <p className="text-lg text-gray-700 mb-4 select-none">
        <strong>Chrono Keep</strong> is a web application developed as part of
        the{" "}
        <span className="text-blue-600 font-semibold"> Web Programming </span>
        course in the <strong>4th semester of the dual study program</strong> in
        computer science.
      </p>
      <p className="text-lg text-gray-700 mb-4 select-none">
        With <strong>Chrono Keep</strong>, you can <strong>create</strong>{" "}
        digital time capsules by saving
        <strong> messages and images</strong> and <strong>setting</strong> a
        future date.
      </p>
    </div>
  );
};

export default VisionSection;
