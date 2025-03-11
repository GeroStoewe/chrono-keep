import React from "react";
import { motion } from "framer-motion";

interface Feature {
  title: string;
  icon: string;
  text: string;
  index: number;
}

/**
 * FeatureItem component
 *
 * Displays a single feature with an icon, title, and description. The component uses `framer-motion`
 * to animate its appearance on screen with opacity and vertical movement.
 *
 * @param {Feature} props - The properties for the FeatureItem component.
 * @param {string} props.title - The title of the feature.
 * @param {string} props.icon - The icon representing the feature.
 * @param {string} props.text - A description of the feature.
 * @param {number} props.index - The index of the feature, used for animation delay.
 *
 * @returns {JSX.Element} The rendered FeatureItem component.
 */
const FeatureItem: React.FC<Feature> = ({ title, icon, text, index }) => {
  return (
    <motion.div
      className="bg-gradient-to-tl from-blue-400 to-purple-700 p-6 rounded-lg shadow-lg text-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
    >
      <div className="mb-6">
        <img src={icon} alt={title} className="w-12 h-12 mx-auto" />
      </div>
      <h3 className="text-2xl font-semibold mb-1 text-gray-100">{title}</h3>
      <p className="text-gray-200">{text}</p>
    </motion.div>
  );
};

export default FeatureItem;
