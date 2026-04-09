import React, { useState } from "react";
import { Truck } from "lucide-react";

interface SlagIntimationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SlagIntimationModal: React.FC<SlagIntimationModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<string>("AOD");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 ">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-[550px] overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-5">
          {/* Header Row */}
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Slag Intimation Slip
            </h2>

            <div className="flex items-center gap-2">
              {/* Segmented Control */}
              <div className="flex bg-[#F7F7F7] p-0.5 rounded-lg border border-slate-100">
                {["AOD", "EAF", "IF"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-7 py-1 text-xs font-[500] rounded-md transition-all ${
                      activeTab === tab
                        ? "bg-[#D98628] text-white shadow-md"
                        : "text-black hover:text-slate-500"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Truck Icon Icon */}
              <div className="relative border-2 border-[#D98628] p-1.5 rounded-lg cursor-pointer hover:bg-orange-50 transition-colors">
                <Truck size={18} className="text-[#D98628]" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-bold h-4 w-4 flex items-center justify-center rounded-full border-2 border-white">
                  1
                </span>
              </div>
            </div>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-3 gap-x-4 gap-y-4 mb-6">
            {/* Date */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-[500] text-[#334155]">Date</label>
              <input
                type="text"
                defaultValue="25th jan, 2025"
                className="w-full bg-[#F7F7F7] border border-[#CBD5E1] rounded-lg px-3 py-2 text-sm text-[#64748B] focus:bg-white focus:border-[#D98628] outline-none transition-all"
              />
            </div>

            {/* Heat No */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-[500] text-[#334155]">
                Heat no.
              </label>
              <input
                type="text"
                defaultValue="2602J0001"
                className="w-full bg-[#F7F7F7] border border-[#CBD5E1] rounded-lg px-3 py-2 text-sm text-sm text-[#64748B] focus:bg-white focus:border-[#D98628] outline-none transition-all"
              />
            </div>

            {/* Grade */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-[500] text-[#334155]">Grade</label>
              <input
                type="text"
                defaultValue="304"
                className="w-full bg-[#F7F7F7] border border-[#CBD5E1] rounded-lg px-3 py-2 text-sm text-sm text-sm text-[#64748B] focus:bg-white focus:border-[#D98628] outline-none transition-all"
              />
            </div>

            {/* Slag off time */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-[500] text-[#334155]">
                Slag off time
              </label>
              <input
                type="text"
                defaultValue="HH-MM"
                className="w-full bg-[#F7F7F7] border border-[#CBD5E1] rounded-lg px-3 py-2 text-sm text-sm text-[#64748B] focus:bg-white focus:border-[#D98628] outline-none transition-all"
              />
            </div>

            {/* Melter Name */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-[500] text-[#334155]">
                Melter Name
              </label>
              <input
                type="text"
                defaultValue="Dummy"
                className="w-full bg-[#F7F7F7] border border-[#CBD5E1] rounded-lg px-3 py-2 text-sm text-sm text-[#64748B] focus:bg-white focus:border-[#D98628] outline-none transition-all"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-lg bg-[#F1F5F9] text-slate-700 font-[500] text-sm"
            >
              Cancel
            </button>
            <button className="px-6 py-2 rounded-lg bg-[#D98628] text-white font-[500] text-sm shadow-lg shadow-orange-200">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlagIntimationModal;

