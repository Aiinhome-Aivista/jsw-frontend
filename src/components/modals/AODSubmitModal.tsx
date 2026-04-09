import React, { useState } from 'react';
import Modal from '../../HOC/Modal/Modal';

interface AODSubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (destination: string) => void;
  heatNumber?: string;
}

const AODSubmitModal: React.FC<AODSubmitModalProps> = ({ isOpen, onClose, onSubmit, heatNumber }) => {
  const [selectedDestination, setSelectedDestination] = useState('LRF 1');

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(selectedDestination);
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
      destinations={['LRF 1', 'LRF 2', 'VOD']}
      selectedDestination={selectedDestination}
      onDestinationChange={setSelectedDestination}
      onSubmit={handleSubmit}
      submitText="Submit"
      cancelText="Cancel"
      zIndex={10000}
    />
  );
};

export default AODSubmitModal;

