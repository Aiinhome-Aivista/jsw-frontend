import React, { useState } from 'react';
import ReactDOM from 'react-dom';

interface TrolleyCardProps {
  id: string;
  status: string;
  heatNo?: string;
  heatGrade?: string;
  isActive: boolean;
}

// --- Trolley Card Component ---
const TrolleyCard: React.FC<TrolleyCardProps> = ({ id, status, heatNo, heatGrade, isActive }) => {
  const isVacant = status === 'Vacant';
  const statusColor = isVacant ? 'bg-[#00875A]' : 'bg-[#8B5E1E]';
  
  return (
    <div className={`flex flex-col h-[520px] p-6 rounded-2xl border-2 transition-all bg-white ${
      isActive ? 'border-[#E68A2E] shadow-sm' : 'border-gray-200'
    }`}>
      <div className="flex justify-between items-center mb-10">
        <h3 className="text-2xl font-bold text-gray-800">Trolley {id}</h3>
        <span className={`${statusColor} text-white text-[12px] px-4 py-1 rounded-md font-semibold`}>
          {status}
        </span>
      </div>

      <div className="flex-grow space-y-6">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Heat Number</label>
          <div className="relative">
            <select className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-700 appearance-none focus:outline-none">
              <option>{heatNo || 'Select Heat No.'}</option>
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Heat Grade</label>
          <div className="relative">
            <select className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-700 appearance-none focus:outline-none">
              <option>{heatGrade || 'Select Heat Grade...'}</option>
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-8">
        <button className="flex-1 py-3 px-4 border border-[#E68A2E] text-[#E68A2E] rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-orange-50 transition-colors">
          Reset ↺
        </button>
        <button 
          disabled={!isVacant}
          className={`flex-1 py-3 px-4 rounded-lg font-bold text-white transition-all shadow-md ${
            isVacant ? 'bg-[#E68A2E] hover:bg-[#cf7a25]' : 'bg-[#F3C892] cursor-not-allowed'
          }`}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

interface RestingHeat {
  id: string;
  time: string;
}

interface TrolleySelectionModalProps {
  onClose: () => void;
  onConfirmSubmit: () => void;
}

// --- Main Modal Component ---
export const TrolleySelectionModal: React.FC<TrolleySelectionModalProps> = ({ onClose, onConfirmSubmit }) => {
  const restingHeats: RestingHeat[] = [
    { id: '2602J0001', time: '3 mins ago' },
    { id: '2602J0002', time: '2 mins ago' },
    { id: '2602J0003', time: '13 mins ago' },
    { id: '2602J0004', time: '14 mins ago' },
    { id: '2602J0005', time: '12 mins ago' },
  ];

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-y-auto border border-gray-100 animate-in fade-in zoom-in duration-200" onClick={(e) => e.stopPropagation()}>
        <div className="px-6 py-4 flex justify-between items-center border-b border-gray-50">
          <h2 className="text-2xl font-[600] text-gray-800">Trolley Selection</h2>
        </div>

        <div className="px-10 py-8 grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <TrolleyCard id="1" status="Vacant" isActive={true} />
          </div>
          <div className="md:col-span-4">
            <TrolleyCard id="2" status="Occupied" heatNo="2602J0001" heatGrade="200 Series" isActive={false} />
          </div>
          <div className="md:col-span-4 bg-[#F9FAFB] border border-gray-200 rounded-2xl p-6 flex flex-col h-[520px]">
            <h3 className="text-xl font-bold text-[#8B5E1E] mb-6">Resting Position Heats</h3>
            <div className="bg-white border border-gray-200 rounded-2xl flex-grow overflow-y-auto">
              {restingHeats.map((heat, index) => (
                <div key={heat.id}>
                  <div className="flex items-center justify-between p-5 hover:bg-gray-50 cursor-pointer group transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-2.5 h-2.5 rounded-full bg-gray-300 group-hover:bg-[#E68A2E]"></div>
                      <span className="font-bold text-gray-700 tracking-tight">{heat.id}</span>
                    </div>
                    <span className="text-[11px] text-gray-400 font-bold uppercase">{heat.time}</span>
                  </div>
                  {index !== restingHeats.length - 1 && <hr className="mx-5 border-gray-100" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white px-10 py-6 flex justify-end gap-5 border-t border-gray-100">
          <button onClick={onClose} className="px-10 py-3 bg-[#F8FAFC] text-gray-600 rounded-xl font-bold hover:bg-gray-100 transition-colors">
            Cancel
          </button>
          <button onClick={onConfirmSubmit} className="px-10 py-3 bg-[#E68A2E] text-white rounded-xl font-bold shadow-lg shadow-orange-200 hover:bg-[#cf7a25] transition-transform active:scale-95">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

interface TrolleySelectionComponentProps {
  onTrolleySelect?: () => void;
}

// --- Parent Container & Empty/Success State ---
const TrolleySelectionComponent: React.FC<TrolleySelectionComponentProps> = ({ onTrolleySelect }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasSelectedTrolley, setHasSelectedTrolley] = useState(false);

  const handleSubmitAction = () => {
    setHasSelectedTrolley(true);
    setIsModalOpen(false);
    if (onTrolleySelect) {
      onTrolleySelect();
    }
  };

  const tabs = ['Material Requirement Slip', 'Analysis Requisition Slip', 'LRF Intimation Slip', 'Ladle Life Register'];

  return (
    <div className="min-h-screen bg-white p-6 font-sans">
      {/* Top Navigation Buttons */}
      <div className="flex justify-end gap-3 mb-12">
        {tabs.map((tab) => (
          <button key={tab} className="px-4 py-2 border border-orange-400 text-orange-700 rounded-lg text-sm font-medium hover:bg-orange-50 transition-colors">
            {tab}
          </button>
        ))}
        <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-[#E68A2E] text-white rounded-lg text-sm font-medium shadow-md hover:bg-[#cf7a25]">
          Trolley Selection
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex max-w-6xl mx-auto mt-10">
        {/* Left Vertical Stepper */}
        <div className="w-1/3 flex flex-col items-start relative">
          <div className="flex items-start gap-4 mb-0 relative z-10">
            <div className="flex flex-col items-center">
              {hasSelectedTrolley ? (
                <div className="w-10 h-10 rounded-full bg-[#00875A] flex items-center justify-center shadow-lg shadow-green-100">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full border-4 border-orange-500 flex items-center justify-center bg-white">
                  <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                </div>
              )}
              {/* Connector Line */}
              <div className={`w-1 h-32 mt-2 transition-colors duration-500 ${hasSelectedTrolley ? 'bg-[#00875A]' : 'bg-gray-200'}`}></div>
            </div>
            <div className="py-2">
              <h3 className={`font-bold text-lg ${hasSelectedTrolley ? 'text-gray-800' : 'text-gray-800'}`}>Trolley Selection</h3>
              <p className="text-sm text-gray-500">Select a Trolley from Trolley Selection</p>
            </div>
          </div>

          <div className="flex items-start gap-4 relative z-10">
            <div className={`w-10 h-10 rounded-full border-4 flex items-center justify-center bg-white transition-colors duration-300 ${hasSelectedTrolley ? 'border-[#E68A2E]' : 'border-gray-300'}`}>
               <div className={`w-4 h-4 rounded-full transition-colors duration-300 ${hasSelectedTrolley ? 'bg-[#E68A2E]' : 'bg-gray-300'}`}></div>
            </div>
            <div className={`p-2 rounded-lg transition-all duration-300 ${hasSelectedTrolley ? 'bg-[#E68A2E] text-white px-4 w-72 shadow-lg shadow-orange-100' : ''}`}>
              <h3 className={`font-bold text-lg ${hasSelectedTrolley ? 'text-white' : 'text-gray-400'}`}>Heat Selection</h3>
              <p className={`text-sm ${hasSelectedTrolley ? 'text-white/90' : 'text-gray-400'}`}>Select a heat from top to see the report</p>
            </div>
          </div>
        </div>

        {/* Right Illustration/Table Area */}
        <div className="w-2/3 flex flex-col items-center justify-center py-20">
          <div className="relative mb-6">
            <div className="w-24 h-32 bg-orange-50/50 border-2 border-orange-200 rounded-lg relative flex flex-col gap-2 p-4">
              <div className="h-2 w-full bg-orange-100 rounded"></div>
              <div className="h-2 w-full bg-orange-100 rounded"></div>
              <div className="h-2 w-3/4 bg-orange-100 rounded"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                 <svg className="w-12 h-12 text-orange-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" /></svg>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 text-orange-400 text-xl">✦</div>
            <div className="absolute top-1/2 -left-8 text-orange-300 text-xl">✨</div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Choose a heat to view details</h2>
        </div>
      </div>

      {/* Modal Render */}
      {isModalOpen && ReactDOM.createPortal(
        <TrolleySelectionModal
          onClose={() => setIsModalOpen(false)}
          onConfirmSubmit={handleSubmitAction}
        />,
        document.body
      )}
    </div>
  );
};

export default TrolleySelectionComponent;

