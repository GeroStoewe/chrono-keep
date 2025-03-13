import { useNavigate } from "react-router-dom";

interface BackArrowButtonProps {
  onClick?: () => void;
}

function BackArrowButton({ onClick }: BackArrowButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1); // Go back to the previous page
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-center w-10 h-10 bg-gradient-to-tl from-blue-400 to-purple-700 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
    </button>
  );
}

export default BackArrowButton;
