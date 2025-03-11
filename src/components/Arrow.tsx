import React from "react";

interface ArrowProps {
  leftPosition: string;
  gradientId: string;
}

/**
 * Arrow component
 *
 * This component renders an arrow icon that can be positioned using the `leftPosition` prop.
 * The arrow is styled with a gradient that is defined by the `gradientId` prop.
 * It is only visible on medium-sized screens and above.
 *
 * @param {Object} props - The properties for the Arrow component.
 * @param {string} props.leftPosition - The CSS `left` position of the arrow.
 * @param {string} props.gradientId - The ID of the gradient to be applied to the arrow stroke.
 *
 * @returns {JSX.Element} The rendered arrow component.
 */
const Arrow: React.FC<ArrowProps> = ({ leftPosition, gradientId }) => {
  return (
    <div
      className="hidden md:block absolute top-1/2 transform -translate-y-1/2"
      style={{ left: leftPosition }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke={`url(#${gradientId})`}
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#9333ea" />
          </linearGradient>
        </defs>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </div>
  );
};

export default Arrow;
