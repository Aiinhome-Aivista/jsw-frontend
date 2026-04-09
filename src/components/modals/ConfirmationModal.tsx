import React, { useState } from 'react';
import Modal from '../../HOC/Modal/Modal';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: (destination: string) => void;
  heatNumber?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, heatNumber }) => {
  const [selectedDestination, setSelectedDestination] = useState('AOD 1');

  const handleSubmit = () => {
    if (onConfirm) {
      onConfirm(selectedDestination);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirm before submitting"
      description="Proceed with the current option or choose the alternative"
      width="380px"
      showHeatNumber={true}
      heatNumber={heatNumber}
      showDestination={true}
      destinations={['AOD 1', 'AOD 2']}
      selectedDestination={selectedDestination}
      onDestinationChange={setSelectedDestination}
      onSubmit={handleSubmit}
      submitText="Submit"
      cancelText="Cancel"
      zIndex={100}
    />
  );
};

export default ConfirmationModal;

