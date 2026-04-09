import React from 'react';
import Modal from '../../HOC/Modal/Modal';

interface AnalysisRequisitionSlipProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
}

const AnalysisRequisitionSlip: React.FC<AnalysisRequisitionSlipProps> = ({ isOpen, onClose, onSubmit }) => {
  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Analysis Requisition Slip"
      width="680px"
      modalClassName="large"
      onSubmit={handleSubmit}
      submitText="Submit"
      cancelText="Cancel"
      zIndex={100}
      showHeatNumber={false}
      showDestination={false}
      showButtons={true}
    >
      {/* Form Grid: 3 columns with specific spacing */}
      <div className="grid grid-cols-3 gap-x-5 gap-y-5">
        
        {/* Row 1 */}
        <div className="space-y-1.5">
          <label className="text-[13px] font-medium text-[#64748B]">Date</label>
          <input type="text" value="25th jan, 2025" disabled 
            className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#64748B] text-sm" />
        </div>

        <div className="space-y-1.5">
          <label className="text-[13px] font-medium text-[#64748B]">Heat no.</label>
          <div className="relative">
            <select className="w-full px-3 py-2 bg-white border border-[#CBD5E0] rounded-lg text-[#1E293B] text-sm appearance-none cursor-pointer">
              <option>2601J23456</option>
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-[#64748B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="Stack9 5 7 7-7-7" /></svg>
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[13px] font-medium text-[#64748B]">Series</label>
          <input type="text" placeholder="Enter series no." 
            className="w-full px-3 py-2 border border-[#CBD5E0] rounded-lg text-sm placeholder:text-[#94A3B8] focus:outline-none focus:ring-1 focus:ring-[#D18B2C]" />
        </div>

        {/* Row 2 */}
        <div className="space-y-1.5">
          <label className="text-[13px] font-medium text-[#64748B]">Grade</label>
          <input type="text" value="SS304" disabled
            className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#1E293B] text-sm" />
        </div>

        <div className="space-y-1.5">
          <label className="text-[13px] font-medium text-[#64748B]">Sample time</label>
          <input type="text" value="9:30 PM" disabled
            className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#64748B] text-sm" />
        </div>

        <div className="space-y-1.5">
          <label className="text-[13px] font-medium text-[#64748B]">Sample location</label>
          <input type="text" placeholder="Station 1" 
            className="w-full px-3 py-2 border border-[#CBD5E0] rounded-lg text-sm placeholder:text-[#94A3B8]" />
        </div>

        {/* Row 3 */}
        <div className="space-y-1.5">
          <label className="text-[13px] font-medium text-[#64748B]">Sample type</label>
          <input type="text" placeholder="Enter sample type" 
            className="w-full px-3 py-2 border border-[#CBD5E0] rounded-lg text-sm placeholder:text-[#94A3B8]" />
        </div>

        <div className="space-y-1.5">
          <label className="text-[13px] font-medium text-[#64748B]">Shift in-charge</label>
          <div className="relative">
            <select className="w-full px-3 py-2 bg-white border border-[#CBD5E0] rounded-lg text-[#1E293B] text-sm appearance-none cursor-pointer">
              <option>Ajay Deshpande</option>
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-[#64748B]">▼</div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[13px] font-medium text-[#64748B]">Chemist name</label>
          <input type="text" placeholder="Enter chemist name" 
            className="w-full px-3 py-2 border border-[#CBD5E0] rounded-lg text-sm placeholder:text-[#94A3B8]" />
        </div>

        {/* Row 4 */}
        <div className="space-y-1.5">
          <label className="text-[13px] font-medium text-[#64748B]">Sample ID</label>
          <input type="text" value="#123" disabled
            className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#1E293B] text-sm" />
        </div>
      </div>
    </Modal>
  );
};

export default AnalysisRequisitionSlip;

