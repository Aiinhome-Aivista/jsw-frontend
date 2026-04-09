import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Edit3, RotateCcw, Info, Trash2, Plus, ChevronUp } from 'lucide-react';
import LadleLifeModal from '../../components/modals/LadleLifeModal';
import LRFIntimationModal from '../../components/modals/LRFIntimationModal';
import LRFAnalysisRequisitionSlipModal from '../../components/modals/LRFAnalysisRequisitionSlipModal';

interface LRFDashboardProps {
  heatId?: string;
  onOpenTrolleyModal?: () => void;
  onSubmitLRFIntimation?: () => void;
}

const LRFDashboard: React.FC<LRFDashboardProps> = ({ heatId, onOpenTrolleyModal, onSubmitLRFIntimation }) => {
  const [isLadleLifeModalOpen, setIsLadleLifeModalOpen] = useState<boolean>(false);
  const [isLRFIntimationModalOpen, setIsLRFIntimationModalOpen] = useState<boolean>(false);
  const [isLRFAnalysisRequisitionModalOpen, setIsLRFAnalysisRequisitionModalOpen] = useState<boolean>(false);

  const handleOpenLadleLifeModal = () => setIsLadleLifeModalOpen(true);
  const handleCloseLadleLifeModal = () => setIsLadleLifeModalOpen(false);

  const handleOpenLRFIntimationModal = () => setIsLRFIntimationModalOpen(true);
  const handleCloseLRFIntimationModal = () => setIsLRFIntimationModalOpen(false);

  const handleOpenLRFAnalysisRequisitionModal = () => setIsLRFAnalysisRequisitionModalOpen(true);
  const handleCloseLRFAnalysisRequisitionModal = () => setIsLRFAnalysisRequisitionModalOpen(false);

  return (
    <>
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-10 flex justify-between items-center bg-white border-b border-gray-200 shrink-0">
        <h1 className="text-2xl font-bold text-[#8B5E1E]">Heat - {heatId || '2602J0001'}</h1>
        <div className="flex gap-3">
          {['Material Requirement Slip', 'Analysis Requisition Slip', 'LRF Intimation Slip', 'Ladle Life Register', 'Trolley Selection'].map((tab) => (
            <button
              key={tab}
              className="px-4 py-2 border border-[#E68A2E] text-[#B45309] rounded-lg text-sm font-medium hover:bg-orange-50 transition-colors"
              onClick={tab === 'Trolley Selection' ? onOpenTrolleyModal : tab === 'Ladle Life Register' ? handleOpenLadleLifeModal : tab === 'LRF Intimation Slip' ? handleOpenLRFIntimationModal : tab === 'Analysis Requisition Slip' ? handleOpenLRFAnalysisRequisitionModal : undefined}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex flex-1 overflow-hidden gap-6 py-2 px-0 max-h-[600px]">
        {/* LEFT COLUMN: 6 Sections with Internal Scroller */}
        <div className="flex-1 max-w-5xl bg-white rounded-xl shadow-sm border border-gray-100 overflow-y-auto overflow-x-hidden custom-scrollbar p-4 pl-0 space-y-4">
            
            {/* 1. Basic Details */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-gray-200 text-gray-700 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                <h2 className="text-lg font-bold">Basic Details</h2>
              </div>
              <div className="flex gap-8 items-start">
                <div className="flex-1">
                  <label className="block text-sm text-gray-500 mb-2">Shift Incharge</label>
                  <select className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-1 focus:ring-orange-200 outline-none">
                    <option>Dummy</option>
                  </select>
                </div>
                <div className="w-[1px] h-32 bg-gray-200 border-l border-dashed self-center" />
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <DetailInput label="Order No" value="#45678" editable />
                  <DetailInput label="Series" value="SS 304" editable />
                  <DetailInput label="Grade" value="304" editable />
                  <DetailInput label="Trolley Selection" value="Trolley 1" readOnly />
                </div>
              </div>
              <hr className="mt-10 border-dashed border-gray-300" />
            </section>

            {/* 2. Ladle Details */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-gray-200 text-gray-700 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                <h2 className="text-lg font-bold">Ladle Details</h2>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <DetailInput label="Heat received at LRF" value="10:00 A.M" />
                <DetailInput label="Teeming Ladle No" value="L01" />
                <div className="relative">
                  <DetailInput label="Teeming Ladle Life" value="Dummy" />
                  <RotateCcw className="absolute right-3 bottom-3 w-5 h-5 text-gray-400 cursor-pointer" />
                </div>
              </div>
              <hr className="mt-10 border-dashed border-gray-300" />
            </section>

            {/* 3. Ladle Arcing */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="bg-gray-200 text-gray-700 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                  <h2 className="text-lg font-bold">Ladle Arcing</h2>
                </div>
                <div className="flex gap-4">
                  <Badge label="Total Arcing time" value="--" />
                  <Badge label="Total Addition" value="--" />
                </div>
              </div>

              <div className="bg-[#FEF3C7] py-2 px-4 rounded-md text-center font-bold text-sm mb-6 clip-path-chevron">
                Arcing 1
              </div>

              <div className="grid grid-cols-4 gap-4 mb-8">
                <DetailInput label="Temperature °C" value="1450" />
                <DetailInput label="Start Time" value="12.3" />
                <DetailInput label="End Time" value="13.5" />
                <div className="relative">
                  <DetailInput label="Total Time" value="14.2" />
                  <Info className="absolute right-3 bottom-3 w-4 h-4 text-gray-400" />
                </div>
              </div>

              <h3 className="font-bold mb-4">Material Details</h3>
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-1">
                  <label className="block text-sm text-gray-500 mb-2">Add more</label>
                  <div className="flex gap-2">
                    <select className="flex-1 p-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-400">
                      <option>Select multiple materials</option>
                    </select>
                    <button className="bg-white border border-[#E68A2E] text-[#E68A2E] px-4 rounded-xl font-bold flex items-center gap-1">
                      <Plus size={18} /> Add
                    </button>
                  </div>
                </div>
                <DetailInput label="Lime" value="12.3" />
                <DetailInput label="Dolomite" value="12.3" />
                <div className="relative">
                  <DetailInput label="Manganese" value="12.3" />
                  <Trash2 className="absolute -right-8 bottom-3 w-5 h-5 text-red-400 cursor-pointer" />
                </div>
                <div className="relative">
                  <DetailInput label="Chromium" value="12.3" />
                  <Trash2 className="absolute -right-8 bottom-3 w-5 h-5 text-red-400 cursor-pointer" />
                </div>
              </div>
              <hr className="mt-10 border-dashed border-gray-300" />
            </section>

            {/* 4. Timing & Duration */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-gray-200 text-gray-700 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                <h2 className="text-lg font-bold">Timing & Duration</h2>
              </div>
              <div className="grid grid-cols-4 gap-6">
                <DetailInput label="N2 Purging time" value="12.3" />
                <DetailInput label="Lifting Time" value="13.5" />
                <DetailInput label="Gentle purging time" value="14.2" />
                <div className="relative">
                  <DetailInput label="LRF Process Time" value="1430" />
                  <Info className="absolute right-3 bottom-3 w-4 h-4 text-gray-400" />
                </div>
              </div>
              <hr className="mt-10 border-dashed border-gray-300" />
            </section>

            {/* 5. LM Details */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-gray-200 text-gray-700 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">5</span>
                <h2 className="text-lg font-bold">LM Details</h2>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <DetailInput label="Lifting Temperature" value="Dummy" />
                <DetailInput label="Total LM(AOD)" value="Dummy" editable />
                <DetailInput label="Final LM ( LRF)" value="Dummy" editable />
              </div>
              <hr className="mt-10 border-dashed border-gray-300" />
            </section>

            {/* 6. Remarks */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-gray-200 text-gray-700 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">6</span>
                <h2 className="text-lg font-bold">Remarks</h2>
              </div>
              <textarea 
                className="w-full p-4 border border-gray-200 rounded-2xl h-24 outline-none focus:ring-1 focus:ring-orange-200 placeholder-gray-300"
                placeholder="Enter any additional remarks or observations..."
              />
            </section>

          </div>

        {/* RIGHT COLUMN: 2 Tables with Internal Global Scroller */}
        <aside className="w-[340px] flex flex-col overflow-y-auto custom-scrollbar pr-2 shrink-0">
          <div className="space-y-6 p-2 flex-1">
            
            {/* Table 1: Slag Off */}
            <div className="bg-[#FAF7F2] rounded-3xl p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[#8B5E1E] font-bold text-lg">Sample Analysis Report (Slag off)</h3>
                <ChevronUp className="text-[#E68A2E] bg-white rounded-md shadow-sm" size={24} />
              </div>
              <table className="w-full text-sm">
                <tbody>
                  <ReportRow label="%C" value="1.3%" />
                  <ReportRow label="% Mn" value="3.4%" />
                  <ReportRow label="% S" value="2.5%" />
                  <ReportRow label="%P" value="2.3%" />
                  <ReportRow label="%Si" value="5.6%" />
                  <ReportRow label="%Ni" value="5.6%" />
                  <ReportRow label="%Cr" value="5.6%" />
                  <ReportRow label="%Cu" value="5.6%" />
                  <ReportRow label="%Mo" value="5.6%" />
                  <ReportRow label="%V" value="5.6%" />
                </tbody>
              </table>
            </div>

            {/* Table 2: Comparative Report */}
            <div className="bg-[#FAF7F2] rounded-3xl p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[#8B5E1E] font-bold text-lg">Sample Analysis Report</h3>
                <ChevronUp className="text-[#E68A2E] bg-white rounded-md shadow-sm" size={24} />
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-500 font-medium">
                    <th className="text-left pb-4">Values</th>
                    <th className="pb-4">Final</th>
                    <th className="pb-4">Arc 3</th>
                    <th className="pb-4">Arc 2</th>
                  </tr>
                </thead>
                <tbody>
                  <ComparisonRow label="%C" v1="1.3%" v2="1.3%" v3="1.3%" highlight />
                  <ComparisonRow label="% Mn" v1="3.4%" v2="3.4%" v3="3.4%" highlight />
                  <ComparisonRow label="% S" v1="2.5%" v2="2.5%" v3="2.5%" highlight />
                  <ComparisonRow label="%P" v1="2.3%" v2="2.3%" v3="2.3%" highlight />
                  <ComparisonRow label="%Si" v1="5.6%" v2="5.6%" v3="5.6%" highlight />
                  <ComparisonRow label="%Ni" v1="5.6%" v2="5.6%" v3="5.6%" highlight />
                  <ComparisonRow label="%Cr" v1="5.6%" v2="5.6%" v3="5.6%" highlight />
                  <ComparisonRow label="%Cu" v1="5.6%" v2="5.6%" v3="5.6%" highlight />
                  <ComparisonRow label="%Mo" v1="5.6%" v2="5.6%" v3="5.6%" highlight />
                </tbody>
              </table>
              <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="w-1/3 h-full bg-gray-400 rounded-full"></div>
              </div>
            </div>

          </div>
        </aside>

      </main>

    </div>
    {isLadleLifeModalOpen && ReactDOM.createPortal(
      <LadleLifeModal isOpen={isLadleLifeModalOpen} onClose={handleCloseLadleLifeModal} />,
      document.body
    )}
    {isLRFIntimationModalOpen && ReactDOM.createPortal(
      <LRFIntimationModal isOpen={isLRFIntimationModalOpen} onClose={handleCloseLRFIntimationModal} onSubmit={() => { handleCloseLRFIntimationModal(); onSubmitLRFIntimation?.(); }} />,
      document.body
    )}
    {isLRFAnalysisRequisitionModalOpen && ReactDOM.createPortal(
      <LRFAnalysisRequisitionSlipModal isOpen={isLRFAnalysisRequisitionModalOpen} onClose={handleCloseLRFAnalysisRequisitionModal} />,
      document.body
    )}
    </>
  );
};

// --- Helper Components ---

interface DetailInputProps {
  label: string;
  value: string;
  editable?: boolean;
  readOnly?: boolean;
}

const DetailInput: React.FC<DetailInputProps> = ({ label, value, editable, readOnly }) => (
  <div className="flex-1">
    <label className="block text-sm text-gray-500 mb-2 truncate">{label}</label>
    <div className="relative">
      <input 
        type="text" 
        value={value} 
        readOnly={!editable}
        className={`w-full p-3 border border-gray-100 rounded-xl outline-none text-sm font-medium ${readOnly ? 'bg-gray-50 text-gray-400' : 'bg-[#F9FAFB] text-gray-700'}`}
      />
      {editable && <Edit3 className="absolute right-3 top-3 w-4 h-4 text-gray-400 cursor-pointer" />}
    </div>
  </div>
);

interface BadgeProps {
  label: string;
  value: string;
}

const Badge: React.FC<BadgeProps> = ({ label, value }) => (
  <div className="bg-[#FEF3C7] px-4 py-2 rounded-lg flex items-center gap-2">
    <span className="text-xs text-gray-600">{label}</span>
    <span className="font-bold text-gray-800">{value}</span>
  </div>
);

interface ReportRowProps {
  label: string;
  value: string;
}

const ReportRow: React.FC<ReportRowProps> = ({ label, value }) => (
  <tr className="border-b border-gray-200 last:border-0 group">
    <td className="py-3 flex items-center gap-2">
      <div className="w-2 h-2 rounded-full bg-gray-300" />
      <span className="text-gray-500 font-medium">{label}</span>
    </td>
    <td className="py-3 text-right font-bold">{value}</td>
  </tr>
);

interface ComparisonRowProps {
  label: string;
  v1: string;
  v2: string;
  v3: string;
  highlight?: boolean;
}

const ComparisonRow: React.FC<ComparisonRowProps> = ({ label, v1, v2, v3, highlight }) => (
  <tr className="border-b border-gray-200 last:border-0">
    <td className="py-3 text-gray-500 font-medium">{label}</td>
    <td className={`py-3 text-center font-bold ${highlight ? 'bg-[#E0F2FE] px-2' : ''}`}>{v1}</td>
    <td className="py-3 text-center font-bold text-gray-800">{v2}</td>
    <td className="py-3 text-center font-bold text-gray-800">{v3}</td>
  </tr>
);

export default LRFDashboard;

