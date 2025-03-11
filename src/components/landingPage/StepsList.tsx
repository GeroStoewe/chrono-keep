import React from "react";
import StepCard from "./StepCard";
import Arrow from "../Arrow";

interface Step {
  step: string;
  title: string;
  text: string;
}

interface StepsListProps {
  steps: Step[];
}

/**
 * StepsList component
 *
 * Renders a list of steps, with each step represented by a `StepCard` component.
 * Between each step, an arrow is displayed, except for the last one.
 * The steps are displayed in a grid layout that adjusts based on the screen size.
 *
 * @param {Object} props - The properties for the StepsList component.
 * @param {Step[]} props.steps - An array of step objects, each containing a step number, title, and description.
 *
 * @returns {JSX.Element} The rendered list of steps with arrows between them.
 */
const StepsList: React.FC<StepsListProps> = ({ steps }) => {
  return (
    <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 select-none">
      {steps.map((step, index) => (
        <div key={index} className="relative">
          <StepCard
            step={step.step}
            title={step.title}
            text={step.text}
            index={index}
          />
          {/* Arrow nach jedem StepCard außer dem letzten */}
          {index < steps.length - 1 && (
            <Arrow
              leftPosition="calc(100% - 0px)"
              gradientId={`arrowGradient${index + 1}`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default StepsList;
