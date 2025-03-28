import { usePasswordToggle } from "../../hooks/UsePasswordToggle";

/**
 * A password input field with the ability to toggle visibility of the password.
 * It accepts the password value, placeholder, and an `onChange` handler function to update the password state.
 * A button allows toggling between the password visibility and hiding it.
 *
 * @component
 * @param {Object} props - The props for the component.
 * @param {string} props.value - The current value of the password input.
 * @param {string} [props.placeholder] - An optional placeholder text for the input field.
 * @param {function} props.onChange - A function that is called when the password input value changes.
 *
 * @returns {JSX.Element} A password input field with a toggle button for visibility.
 */
export function ProfileDeleteAccountPasswordInputField({
  value,
  placeholder,
  onChange
}: {
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const [showPassword, togglePassword, passwordRef] = usePasswordToggle();

  return (
    <div className="relative group">
      <input
        ref={passwordRef}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={35}
        className="w-90 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none transition duration-300 transform group-hover:scale-103 focus:gradient-border"
      />
      <button
        type="button"
        onClick={togglePassword}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 p-1.5 rounded-full select-none"
      >
        <img
          src={
            showPassword ? "/icons/visibility.svg" : "/icons/visibility-off.svg"
          }
          alt="Toggle password"
          className="w-5 h-5"
        />
      </button>
    </div>
  );
}
