interface ProfileTextInputFieldProps {
  label: string;
  type?: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * A reusable text input field component used for user profile forms.
 * This component can handle different input types and display labels, values, and placeholders.
 *
 * @component
 * @param {Object} props - The props for the component.
 * @param {string} props.label - The label to be displayed for the input field.
 * @param {string} [props.type="text"] - The type of the input (e.g., "text", "email", "password"). Defaults to "text".
 * @param {string} props.value - The current value of the input field.
 * @param {string} [props.placeholder] - The placeholder text to display in the input field.
 * @param {function} props.onChange - The function to handle changes to the input value.
 *
 * @returns {JSX.Element} A styled input field with a label and optional placeholder.
 */
export function ProfileTextInputField({
  label,
  type = "text",
  value,
  placeholder,
  onChange
}: ProfileTextInputFieldProps) {
  return (
    <div>
      <label className="block text-gray-700 font-semibold mb-0.5 select-none">
        {label}
      </label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-transparent transition duration-300 transform hover:scale-103 focus:gradient-border"
      />
    </div>
  );
}
