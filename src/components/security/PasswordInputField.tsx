import { usePasswordToggle } from "../../hooks/UsePasswordToggle";

/**
 * A password input field with a visibility toggle option.
 * @param {Object} props - Component properties
 * @param {string} props.value - The current password value
 * @param {function} props.onChange - Handler for input changes
 */
export function PasswordInput({
  value,
  onChange
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const [showPassword, togglePassword, passwordRef] = usePasswordToggle();

  return (
    <div>
      <label className="block text-gray-800 font-semibold mb-0.5 select-none">
        Password
      </label>
      <div className="relative group">
        <input
          ref={passwordRef}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          required
          maxLength={35}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none transition duration-300 transform group-hover:scale-105 focus:gradient-border"
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
