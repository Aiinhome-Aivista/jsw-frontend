import React from "react";
import AODNoResults from "../../assets/AOD noresults.svg";

const AODCard: React.FC = () => {
  return (
    <div className="eaf-card-content relative">
      {/* 1. Slip Buttons: Alignment and Color Fix */}
      <div className="flex justify-end gap-2 p-4">
        <button className="px-5 py-2 rounded-lg border border-[#D97706] text-[#D97706] font-semibold text-sm hover:bg-orange-50 transition-all shadow-sm">
         Slag Intimation Slip
        </button>
        <button className="px-5 py-2 rounded-lg border border-[#D97706] text-[#D97706] font-semibold text-sm hover:bg-orange-50 transition-all shadow-sm">
          Material Requirement Slip
        </button>
        <button className="px-5 py-2 rounded-lg border border-[#D97706] text-[#D97706] font-semibold text-sm hover:bg-orange-50 transition-all shadow-sm">
          Analysis Requisition Slip
        </button>
         <button className="px-5 py-2 rounded-lg border border-[#D97706] text-[#D97706] font-semibold text-sm hover:bg-orange-50 transition-all shadow-sm">
          ADD Calculator
        </button>

      </div>

      {/* 2. Empty State: Centering Fix */}
      <div className="flex flex-col items-center justify-center py-24">
        <div className="relative mb-6">
          <img 
            src={AODNoResults} 
            alt="No Results" 
            className="w-30 h-28 object-contain"
          />
          <span className="absolute -top-4 -right-4 text-[#D97706] text-xl">✦</span>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-2">Choose a heat to view details</h2>
        <p className="text-gray-500 text-sm">Select a heat from top to see the detailed report</p>
      </div>
    </div>
  );
};

export default AODCard;

