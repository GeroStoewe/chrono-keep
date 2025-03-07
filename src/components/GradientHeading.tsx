/**
 * A reusable heading component with a gradient effect.
 * @param {Object} props - Component properties
 * @param {string} props.text - The text to display
 */
export default function GradientHeading({ text }: { text: string }) {
  return (
    <h2
      className="text-4xl font-extrabold text-center text-gradient mb-6 tracking-wide select-none bg-gradient-to-r from-blue-500 to-purple-700 bg-clip-text text-transparent"
      style={{
        fontFamily: "Bebas Neue, sans-serif",
        fontSize: "45px",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)"
      }}
    >
      {text}
    </h2>
  );
}
