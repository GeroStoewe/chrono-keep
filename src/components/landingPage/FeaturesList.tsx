import React from "react";
import FeatureItem from "./FeatureItem";

interface Feature {
  title: string;
  icon: string;
  text: string;
}

interface FeaturesListProps {
  features: Feature[];
}

/**
 * FeaturesList component
 *
 * Renders a list of features, where each feature consists of a title, icon, and description.
 * The component maps over the `features` prop and displays each feature using the FeatureItem component.
 *
 * @param {FeaturesListProps} props - The properties for the FeaturesList component.
 * @param {Feature[]} props.features - An array of features to display in the list.
 *
 * @returns {JSX.Element} The rendered FeaturesList component.
 */
const FeaturesList: React.FC<FeaturesListProps> = ({ features }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 select-none">
      {features.map((feature, index) => (
        <FeatureItem
          key={index}
          title={feature.title}
          icon={feature.icon}
          text={feature.text}
          index={index}
        />
      ))}
    </div>
  );
};

export default FeaturesList;
