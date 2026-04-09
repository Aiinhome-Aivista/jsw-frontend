import React from 'react';
import { ChevronDown, X } from 'lucide-react';

interface FormField {
  label: string;
  type: string;
  value: string;
  placeholder: string;
}

interface LRFAnalysisRequisitionSlipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LRFAnalysisRequisitionSlipModal: React.FC<LRFAnalysisRequisitionSlipModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const formFields: FormField[] = [
    { label: "Date", type: "text", value: "25th jan, 2025", placeholder: "" },
    { label: "Heat no.", type: "select", value: "2602J0001", placeholder: "" },
    { label: "Series", type: "text", value: "", placeholder: "Enter series no." },
    { label: "Grade", type: "text", value: "SS304", placeholder: "" },
    { label: "Sample time", type: "text", value: "9:30 PM", placeholder: "" },
    { label: "Sample location", type: "text", value: "Station 1", placeholder: "" },
    { label: "Sample type", type: "text", value: "", placeholder: "Enter sample type" },
    { label: "Shift in-charge", type: "select", value: "Ajay Deshpande", placeholder: "" },
    { label: "Chemist name", type: "text", value: "", placeholder: "Enter chemist name" },
    { label: "Sample ID", type: "text", value: "#123", placeholder: "" },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4" style={{ zIndex: 9999 }}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden font-sans border border-gray-100">
        
        {/* Header Section */}
        <div className="px-8 pt-8 pb-4 flex justify-between items-start">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Analysis Requisition Slip</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Form Body */}
        <div className="px-8 pb-8">
          <div className="grid grid-cols-3 gap-x-6 gap-y-5">
            {formFields.map((field, index) => (
              <div key={index} className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-500">{field.label}</label>
                <div className="relative">
                  {field.type === "select" ? (
                    <>
                      <select className="w-full bg-[#F3F6F9] border border-gray-200 rounded-lg p-3 appearance-none text-gray-700 focus:outline-none focus:ring-1 focus:ring-orange-400">
                        <option>{field.value}</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" size={18} />
                    </>
                  ) : (
                    <input 
                      type="text" 
                      defaultValue={field.value}
                      placeholder={field.placeholder}
                      className="w-full bg-[#F3F6F9] border border-gray-200 rounded-lg p-3 text-gray-700 placeholder:text-gray-400 placeholder:italic focus:outline-none focus:ring-1 focus:ring-orange-400"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-8 py-6 flex justify-end gap-4 border-t border-gray-50">
          <button
            onClick={onClose}
            className="px-10 py-2.5 rounded-lg bg-[#EFF3F8] text-[#4A5568] font-semibold"
          >
            Cancel
          </button>
          <button className="px-10 py-2.5 rounded-lg bg-[#D98E2B] text-white font-semibold shadow-sm">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default LRFAnalysisRequisitionSlipModal;

