import React from "react";

interface CallToActionTextProps {
  heading: string;
  subheading: string;
}

/**
 * CallToActionText component
 *
 * Displays a heading and a subheading with a gradient text style. Typically used in call-to-action sections
 * to capture the user's attention and encourage interaction.
 *
 * @param {string} heading - The main heading text displayed in the component.
 * @param {string} subheading - The subheading text displayed in a larger, gradient text style.
 *
 * @returns {JSX.Element} The rendered CallToActionText component with the heading and subheading.
 */
const CallToActionText: React.FC<CallToActionTextProps> = ({
  heading,
  subheading
}) => {
  return (
    <div className="text-center">
      <p className="text-2xl text-gray-800 mb-1 select-none">{heading}</p>
      <p className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-700 bg-clip-text text-transparent select-none">
        {subheading}
      </p>
    </div>
  );
};

export default CallToActionText;
