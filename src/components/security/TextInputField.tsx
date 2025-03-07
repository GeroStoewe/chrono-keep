interface TextInputFieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * A reusable text input component for text or password fields.
 * @param {Object} props - Component properties
 * @param {string} props.label - The label for the input field
 * @param {string} [props.type="text"] - The input type (e.g., text, password)
 * @param {string} props.value - The current value of the input field
 * @param {function} props.onChange - Handler for input changes
 */
export function TextInputField({
  label,
  type = "text",
  value,
  onChange
}: TextInputFieldProps) {
  return (
    <div>
      <label className="block text-gray-800 font-semibold mb-0.5 select-none">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required
        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-transparent transition duration-300 transform hover:scale-105 focus:gradient-border"
      />
    </div>
  );
}
