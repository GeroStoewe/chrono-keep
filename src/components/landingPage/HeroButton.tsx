import { Link } from "react-router-dom";

type HeroButtonProps = {
  text: string;
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
};

/**
 * HeroButton component
 *
 * Renders a styled button that can either be a link, an anchor, or a regular button based on the provided props.
 * The button style changes based on the variant prop (either "primary" or "secondary").
 *
 * @param {HeroButtonProps} props - The properties for the HeroButton component.
 * @param {string} props.text - The text displayed inside the button.
 * @param {string} [props.to] - The destination URL for the button (used with `Link`).
 * @param {string} [props.href] - The external URL for the button (used with `a` tag).
 * @param {() => void} [props.onClick] - A function to call when the button is clicked (used with `button` tag).
 * @param {("primary" | "secondary")} [props.variant] - The style variant of the button. Default is "primary".
 *
 * @returns {JSX.Element} The rendered HeroButton component.
 */
const HeroButton = ({
  text,
  to,
  href,
  onClick,
  variant = "primary"
}: HeroButtonProps) => {
  const buttonClass =
    variant === "primary"
      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-blue-400 transition duration-300 select-none"
      : "bg-white text-transparent px-6 py-3 rounded-lg shadow-lg border border-gray-300 transition duration-300 hover:shadow-gray-400 select-none";

  const textClass =
    variant === "primary"
      ? "text-white"
      : "bg-gradient-to-r from-blue-500 to-purple-700 bg-clip-text text-transparent";

  if (variant === "primary" && to) {
    return (
      <Link to={to} className={buttonClass}>
        <span className={textClass}>{text}</span>
      </Link>
    );
  }

  if (variant === "secondary" && href) {
    return (
      <a href={href} className={buttonClass}>
        <span className={textClass}>{text}</span>
      </a>
    );
  }

  return (
    <button onClick={onClick} className={buttonClass}>
      <span className={textClass}>{text}</span>
    </button>
  );
};

export default HeroButton;
