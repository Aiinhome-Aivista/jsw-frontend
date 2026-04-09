import React from "react";

interface CompositionItem {
  el: string;
  aim: number;
  expected: number;
}

interface CompositionTotal {
  aim: number;
  expected: number;
}

interface CompositionTableProps {
  title: string;
  isPercent?: boolean;
  data: CompositionItem[];
  total?: CompositionTotal;
  onEdit?: () => void;
}

const CompositionTable: React.FC<CompositionTableProps> = ({ title, isPercent, data, total, onEdit }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden w-[200px]">
    <h3 className="font-bold text-[11px] px-3 py-2 text-[#2D3748] bg-gray-50 border-b border-gray-100 flex items-center justify-between">
      {title}
      {!isPercent && onEdit && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3 text-[#F6AD55] ml-2 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          onClick={onEdit}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      )}
    </h3>

    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-[#FFF9F1]">
          <th className="text-left py-1.5 px-2 font-[600] text-[#101828] text-[9px]  tracking-wide">
            Elements
          </th>
          <th className="text-right py-1.5 px-2 font-[600] text-[#101828] text-[9px]  tracking-wide">
            Aim
          </th>
          <th className="text-right py-1.5 px-2 font-[600] text-[#101828] text-[9px]  tracking-wide">
            Expected
          </th>
        </tr>
      </thead>
      <tbody className="text-[10px]">
        {data.map((item, idx) => (
          <tr
            key={item.el}
            className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} border-b border-gray-200`}
          >
            <td className="py-1.5 px-4 font-semibold text-[#4A5568]">
              {item.el}
            </td>
            <td className="py-1.5 px-3 text-right font-bold text-[#1A202C] bg-[#E0F7FA]">
              {item.aim.toLocaleString()}
              {isPercent ? "%" : ""}
            </td>
            <td className="py-1.5 px-4 text-right font-bold text-[#1A202C]">
              {item.expected.toLocaleString()}
              {isPercent ? "%" : ""}
            </td>
          </tr>
        ))}

        {!isPercent && (
          <tr className="bg-[#CCF1F5] border-t border-white border-b border-gray-200">
            <td className="py-1.5 px-2  text-black text-[10px]">Total</td>
            <td className="py-1.5 px-2 text-right font-black  bg-[#CCF1F5]">
              {total?.aim.toLocaleString()}
            </td>
            <td className="py-1.5 px-2 text-right font-black">
              {total?.expected.toLocaleString()}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

interface CompositionPanelProps {
  kgData: CompositionItem[];
  percentData: CompositionItem[];
  kgTotal: CompositionTotal;
  onOpenIntimationSlip?: () => void;
  showIntimationSlip?: boolean;
}

const CompositionPanel: React.FC<CompositionPanelProps> = ({
  kgData,
  percentData,
  kgTotal,
  onOpenIntimationSlip,
  showIntimationSlip = true,
}) => {
  return (
    <div className="flex flex-col gap-y-2 p-1 bg-transparent w-[210px] shrink-0">
      {showIntimationSlip && (
        <button
          onClick={onOpenIntimationSlip}
          className="px-3 py-1.5 border border-[#F6AD55] text-[#D97706] rounded-md font-bold text-[11px] bg-white shadow-sm self-end mb-2"
        >
          Intimation Slip
        </button>
      )}
      <CompositionTable
        title="Compositions (kg)"
        data={kgData}
        total={kgTotal}
        onEdit={() => {}}
      />
      <CompositionTable title="Compositions (%)" data={percentData} isPercent />
    </div>
  );
};

export default CompositionPanel;

