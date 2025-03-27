import { usePasswordToggle } from "../../hooks/UsePasswordToggle";

/**
 * A component for rendering a password input field with a toggle button to show or hide the password.
 * It includes a label for the input, and allows the user to change the password value.
 *
 * @component
 * @param {Object} props - The props for the component.
 * @param {string} props.label - The label to display for the password input field.
 * @param {string} props.value - The current value of the password input field.
 * @param {string} [props.placeholder] - The placeholder text for the password input field.
 * @param {function} props.onChange - A function that handles changes to the password input field.
 *
 * @returns {JSX.Element} A password input field with a toggle button to show or hide the password.
 */
export function ProfilePasswordInputField({
  label,
  value,
  placeholder,
  onChange
}: {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const [showPassword, togglePassword, passwordRef] = usePasswordToggle();

  return (
    <div>
      <label className="block text-gray-700 font-semibold mb-0.5 select-none">
        {label}
      </label>
      <div className="relative group">
        <input
          ref={passwordRef}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={35}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none transition duration-300 transform group-hover:scale-103 focus:gradient-border"
        />
        <button
          type="button"
          onClick={togglePassword}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 p-1.5 rounded-full select-none"
        >
          <img
            src={
              showPassword
                ? "/icons/visibility.svg"
                : "/icons/visibility-off.svg"
            }
            alt="Toggle password"
            className="w-5 h-5"
          />
        </button>
      </div>
    </div>
  );
}
