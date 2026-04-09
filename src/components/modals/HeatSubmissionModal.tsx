import React, { useState } from 'react';
import Modal from '../../HOC/Modal/Modal';
import { ChevronDown } from 'lucide-react';

interface HeatSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  heatNumber?: string;
  showTrolley?: boolean;
}

const HeatSubmissionModal: React.FC<HeatSubmissionModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  heatNumber = "1211J0001", 
  showTrolley = false 
}) => {
  const [selectedAOD, setSelectedAOD] = useState('AOD 2');
  const [trolley, setTrolley] = useState('Trolley #123');

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirm before submitting"
      description="Proceed with the current option or choose the alternative"
      width="480px"
      showHeatNumber={true}
      heatNumber={heatNumber}
      showDestination={true}
      destinations={['AOD 1', 'AOD 2']}
      selectedDestination={selectedAOD}
      onDestinationChange={setSelectedAOD}
      onSubmit={handleSubmit}
      submitText="Submit"
      cancelText="Cancel"
      zIndex={400}
    >
      {/* Transfer Trolley Dropdown - Custom children */}
      {showTrolley && (
        <div className="destination-selection" style={{ marginTop: '24px', marginBottom: '0' }}>
          <label className="destination-label">Transfer Trolley</label>
          <div className="relative">
            <select
              value={trolley}
              onChange={(e) => setTrolley(e.target.value)}
              className="w-full p-3.5 text-lg border border-slate-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-orange-100 transition-all text-slate-800 bg-white"
              style={{
                paddingRight: '40px',
                fontSize: '16px',
                borderRadius: '12px',
              }}
            >
              <option>Trolley #123</option>
              <option>Trolley #124</option>
              <option>Trolley #125</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <ChevronDown className="text-slate-400" size={20} />
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default HeatSubmissionModal;

