import React from "react";

/**
 * ContactSection component displays contact information and user ID.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string | null} props.userId - The user ID to be displayed in the contact section.
 * @returns {JSX.Element} The rendered ContactSection component.
 */
const ContactSection: React.FC<{ userId: string | null }> = ({ userId }) => {
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4 select-none">Contact Us</h3>
      <p className="text-lg text-gray-700 mb-4 select-none">
        If you have any questions, suggestions for improvements, or if you spot
        any errors, <strong>feel free</strong> to send an email to
        <a
          href="mailto:gerostoewe@gmx.de"
          className="font-semibold text-blue-600"
        >
          {" "}
          gerostoewe@gmx.de
        </a>{" "}
        or
        <a
          href="mailto:oymak.eileen@gmail.com"
          className="font-semibold text-purple-700"
        >
          {" "}
          oymak.eileen@gmail.com
        </a>
        .
      </p>
      <p className="text-lg text-gray-700 mb-12">
        Please always add your UserID: <strong>{userId}</strong>
      </p>
    </div>
  );
};

export default ContactSection;
