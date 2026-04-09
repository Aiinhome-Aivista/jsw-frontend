import React, { useState } from "react";
import "../../css/ChargingStation.css";

interface BucketItem {
  name: string;
  qty: number;
}

interface Bucket {
  id: number;
  items: BucketItem[];
  totalWeight: number;
}

interface FormData {
  grade: string;
  orderNumber: string;
  series: string;
  heatNumber: string;
  totalChargeweight: string;
}

interface ChargingStationReportProps {
  formData: FormData;
  buckets: Bucket[];
  onBack?: () => void;
  onViewChange?: (view: string) => void;
  onToggleSlip?: (show: boolean) => void;
}

const ChargingStationReport: React.FC<ChargingStationReportProps> = ({ 
  formData, 
  buckets, 
  onBack, 
  onViewChange, 
  onToggleSlip 
}) => {
  const [activeTab, setActiveTab] = useState<string>("calculator");

  const kgData = [
    { el: "C", aim: 6392, expected: 3421 },
    { el: "Mn", aim: 3157, expected: 4582 },
    { el: "S", aim: 5729, expected: 6923 },
    { el: "P", aim: 4916, expected: 5291 },
    { el: "Si", aim: 6284, expected: 3857 },
    { el: "Ni", aim: 3549, expected: 4168 },
  ];

  const percentData = [
    { el: "C", aim: "1.3%", expected: "1.2%" },
    { el: "Mn", aim: "3.4%", expected: "3.2%" },
    { el: "S", aim: "2.5%", expected: "2.4%" },
    { el: "P", aim: "5.6%", expected: "5.4%" },
    { el: "Si", aim: "5.6%", expected: "5.5%" },
    { el: "Ni", aim: "5.6%", expected: "5.2%" },
  ];

  return (
    <div className="cs-card-content">
      {/* HEADER SECTION - UNTOUCHED */}
      <div className="cs-section-header" style={{ marginBottom: "16px" }}>
        <h3>Stockers Weight Report</h3>
        <div className="cs-tab-actions">
          <button 
            className={`cs-tab-btn ${activeTab === "intimation" ? "active-tab" : ""}`} 
            onClick={() => { setActiveTab("intimation"); onToggleSlip?.(true); }}
          >
            Intimation Slip
          </button>
          <button 
            className="cs-tab-btn active-tab" 
            onClick={() => { setActiveTab("calculator"); onViewChange?.("calculator"); }}
          >
            Charge Calculator
          </button>
        </div>
      </div>

      <div className="cs-form-grid">
        {/* LEFT COLUMN - UNTOUCHED */}
        <div className="cs-form-col">
          <div className="cs-details-head">
            <span className="cs-step-badge">1</span> Basic Details
          </div>
          
          <div className="cs-input-group">
            <label>Grade <span className="text-red-500">*</span></label>
            <div className="cs-select-container is-locked">
              <select className="cs-form-input cs-dropdown" value={formData.grade} disabled>
                <option value="SS 304">SS 304</option>
              </select>
            </div>
          </div>
          
          <div className="cs-input-group">
            <label>Order Number <span className="text-red-500">*</span></label>
            <input type="text" className="cs-form-input" value={formData.orderNumber} disabled />
          </div>

          <div className="cs-input-group">
            <label>Series <span className="text-red-500">*</span></label>
            <div className="cs-select-container is-locked">
              <select className="cs-form-input cs-dropdown" value={formData.series} disabled>
                <option value="1">1</option>
              </select>
            </div>
          </div>

          <div className="cs-input-group">
            <label>Heat Number <span className="text-red-500">*</span></label>
            <input type="text" className="cs-form-input" value={formData.heatNumber} disabled />
          </div>

          <div className="cs-input-group">
            <label>Proposed Weight (T) <span className="text-red-500">*</span></label>
            <input type="text" className="cs-form-input" value={formData.totalChargeweight} disabled />
          </div>

          <div className="cs-button-group">
            <button className="cs-btn cs-btn-cancel" onClick={onBack}>Cancel</button>
            <button className="cs-btn cs-btn-confirm">Confirm</button>
          </div>
        </div>

        {/* UPDATED RIGHT SECTION: FIXED VERTICAL SPACING */}
        <div className="flex-1 bg-[#F0F7FF] rounded-[12px] p-5 flex gap-8 h-fit min-h-[580px] border border-slate-100">
          
          {/* Buckets Grid - Using align-content-start to pull Bucket 3 & 4 up */}
          <div className="flex-[2.5] grid grid-cols-2 gap-x-4 gap-y-4 content-start">
            {buckets.map((b) => (
              <div key={b.id} className="bg-white rounded-lg p-3 shadow-sm border border-slate-50 flex flex-col h-[200px]">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-slate-800 text-[13px]">Bucket {b.id}</span>
                  <div className="flex gap-2">
                    <div className="bg-[#FEF3C7] px-2 py-0.5 rounded text-[10px] font-normal border border-[#FDE68A]">
                      <span className="text-[#D97706] opacity-70">TW</span> {b.totalWeight} Kg
                    </div>
                    <div className="bg-[#FEF3C7] px-2 py-0.5 rounded text-[10px] font-normal border border-[#FDE68A]">
                      <span className="text-[#D97706] opacity-70">TC</span> 28000 Kg
                    </div>
                  </div>
                </div>

                {/* Internal Scroll area */}
                <div className="grid grid-cols-2 gap-2 overflow-y-auto pr-1 custom-scrollbar">
                  {b.items.map((item, idx) => (
                    <div key={idx} className="bg-[#A855F7] p-2.5 rounded-lg text-white flex flex-col justify-center min-h-[45px]">
                      <span className="text-[9px] font-medium opacity-80 mb-0.5">{item.name}</span>
                      <span className="text-[12px] font-bold">{item.qty} Kg</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Composition Panel - Right Side */}
          <div className="flex-1 max-w-[220px] flex flex-col gap-3 shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-1.5 font-bold text-[10px] text-slate-800">Compositions (kg)</div>
              <table className="w-full text-[8px] border-collapse">
                <thead className="bg-[#FEF3C7] text-slate-600">
                  <tr>
                    <th className="p-1 text-left">Elements</th>
                    <th className="p-1 text-center bg-[#CCF1FF]">Aim</th>
                    <th className="p-1 text-center">Expected</th>
                  </tr>
                </thead>
                <tbody>
                  {kgData.map((d) => (
                    <tr key={d.el} className="border-b border-slate-200">
                      <td className="p-1 pl-2 font-bold text-slate-500">{d.el}</td>
                      <td className="p-1 text-center font-bold bg-[#CCF1FF] text-slate-800">{d.aim}</td>
                      <td className="p-1 text-center font-bold text-slate-800">{d.expected}</td>
                    </tr>
                  ))}
                  <tr className="bg-[#CCF1FF] font-bold text-slate-900 border-b border-slate-200">
                    <td className="p-1 pl-2">Total</td>
                    <td className="p-1 text-center">30,027</td>
                    <td className="p-1 text-center">28,242</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-1.5 font-bold text-[10px] text-slate-800">Compositions (%)</div>
              <table className="w-full text-[8px] border-collapse">
                <thead className="bg-[#FEF3C7] text-slate-600">
                  <tr>
                    <th className="p-1 text-left">Elements</th>
                    <th className="p-1 text-center bg-[#CCF1FF]">Aim</th>
                    <th className="p-1 text-center">Expected</th>
                  </tr>
                </thead>
                <tbody>
                  {percentData.map((d) => (
                    <tr key={d.el} className="border-b border-slate-200">
                      <td className="p-1 font-bold text-slate-500">{d.el}</td>
                      <td className="p-1 text-center font-bold bg-[#CCF1FF] text-slate-800">{d.aim}</td>
                      <td className="p-1 text-center font-bold text-slate-800">{d.expected}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChargingStationReport;

