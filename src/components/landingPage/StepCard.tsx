import React from "react";
import { motion } from "framer-motion";

interface StepCardProps {
  step: string;
  title: string;
  text: string;
  index: number;
}

/**
 * StepCard component
 *
 * Renders a single step as a card with animations. The card includes a step number,
 * title, and description, with an animated transition that fades in as the card enters
 * the viewport.
 *
 * @param {StepCardProps} props - The properties for the StepCard component.
 * @param {string} props.step - The step number (e.g., "1", "2", etc.).
 * @param {string} props.title - The title of the step.
 * @param {string} props.text - The description text for the step.
 * @param {number} props.index - The index of the step, used for animation delay.
 *
 * @returns {JSX.Element} The rendered StepCard with the corresponding animation.
 */
const StepCard: React.FC<StepCardProps> = ({ step, title, text, index }) => {
  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-lg text-center border border-gray-300"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
    >
      <div className="mb-4 text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-700 bg-clip-text text-transparent">
        {step}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{text}</p>
    </motion.div>
  );
};

export default StepCard;
