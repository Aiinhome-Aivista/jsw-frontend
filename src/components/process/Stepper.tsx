import React from "react";
import "../../css/Stepper.css";

interface StepperProps {
  currentStep: number;
  setActiveStep: (stepId: number) => void;
  completedSteps?: number[];
}

const Stepper: React.FC<StepperProps> = ({ currentStep, setActiveStep, completedSteps = [] }) => {
  const steps = [
    { id: 1, label: "Charging Station" },
    { id: 2, label: "EAF" },
    { id: 3, label: "AOD" },
    { id: 4, label: "LRF" },
    { id: 5, label: "Slab Casting" },
    { id: 6, label: "Grinding" },
  ];

  return (
    <div className="stepper-outer-container">
      <div className="stepper-track">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          const isActive = currentStep === step.id;
          const nextIsActive = steps[index + 1]?.id === currentStep;

          return (
            <React.Fragment key={step.id}>
              <div
                className={`step-item ${isActive ? "active" : ""} ${isCompleted ? "completed" : ""}`}
                onClick={() => setActiveStep(step.id)}
              >
                <div
                  className={`step-indicator ${isCompleted ? "completed" : ""}`}
                >
                  {isCompleted ? (
                    <span className="checkmark">✓</span>
                  ) : (
                    <span className="step-num">{`0${step.id}`}</span>
                  )}
                </div>
                <span className="step-label">{step.label}</span>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={`step_divider ${isActive || nextIsActive ? "hidden" : ""}`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;

