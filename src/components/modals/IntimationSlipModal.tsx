import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface SlipItem {
  id: number;
  code: string;
  description: string;
  qtyReq: string;
  qtyIssued: string;
}

interface IntimationSlipModalProps {
  onBack: () => void;
  onSubmit: () => void;
}

const IntimationSlipModal: React.FC<IntimationSlipModalProps> = ({ onBack, onSubmit }) => {
  const [activeTab, setActiveTab] = useState("yard");

  const [items, setItems] = useState<SlipItem[]>([
    {
      id: 1,
      code: "Code",
      description: "Description",
      qtyReq: "4330 kg",
      qtyIssued: "5440 kg",
    },
    {
      id: 2,
      code: "Code",
      description: "Description",
      qtyReq: "5440 kg",
      qtyIssued: "3240 kg",
    },
  ]);

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        id: Date.now(),
        code: "Code",
        description: "Description",
        qtyReq: "0 kg",
        qtyIssued: "0 kg",
      },
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-[620px] max-h-[90vh] bg-white rounded-xl shadow-2xl overflow-y-auto transition-all">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {activeTab === "yard" ? "Intimation Slip" : "Issue Slip"}
              </h1>
              <p className="text-[9px] text-gray-400 mt-0.5 font-bold tracking-tight">
                Date: <span className="text-gray-700">23rd Dec, 2023</span> |
                Shift:{" "}
                <span className="text-gray-700">3rd Shift (9PM - 5AM)</span>
              </p>
            </div>

            <div className="flex bg-gray-100 p-0.5 rounded-lg border border-gray-200">
              <button
                type="button"
                onClick={() => setActiveTab("yard")}
                className={`px-6 py-1.5 text-[11px] font-bold rounded-md transition-all ${
                  activeTab === "yard"
                    ? "bg-[#D48625] text-white shadow-sm"
                    : "text-gray-400"
                }`}
              >
                Yard
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("store")}
                className={`px-6 py-1.5 text-[11px] font-bold rounded-md transition-all ${
                  activeTab === "store"
                    ? "bg-[#D48625] text-white shadow-sm"
                    : "text-gray-400"
                }`}
              >
                Store
              </button>
            </div>
          </div>

          <div
            className={`grid gap-3 mb-4 ${activeTab === "yard" ? "grid-cols-3" : "grid-cols-4"}`}
          >
            <div>
              <label className="block text-[11px] font-[500] text-gray-500 mb-1">
                {activeTab === "yard" ? "Shop" : "Cost Center Name"}
              </label>
              <div className="relative">
                <select className="w-full h-8 px-2 text-xs border border-gray-200 bg-[#F7F7F7] rounded-md appearance-none outline-none text-gray-400">
                  <option>SMS 1</option>
                </select>
                <ChevronDown
                  className="absolute right-2 top-2 text-gray-400"
                  size={14}
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-[500] text-gray-500 mb-1">
                {activeTab === "yard" ? "Grade" : "Cost Center Code"}
              </label>
              <input
                type="text"
                placeholder={activeTab === "yard" ? "Enter grade" : "456789"}
                className={`w-full h-8 px-2 text-xs border border-gray-200 rounded-md outline-none text-black-500 ${activeTab === "store" ? "bg-[#F7F7F7]" : "bg-white"}`}
              />
            </div>

            <div>
              <label className="block text-[11px] font-[500] text-gray-500 mb-1">
                Slip ID
              </label>
              <input
                type="text"
                placeholder={activeTab === "yard" ? "#123" : "Enter ID"}
                className="w-full h-8 px-2 text-xs border border-gray-200 bg-[#F7F7F7] rounded-md outline-none placeholder:text-gray-400"
              />
            </div>

            {activeTab === "store" && (
              <div>
                <label className="block text-[11px] font-bold text-gray-500 mb-1">
                  Sub Store Location
                </label>
                <input
                  type="text"
                  placeholder="Enter"
                  className="w-full h-8 px-2 text-xs border border-gray-200 bg-[#F7F7F7] rounded-md outline-none placeholder:text-gray-400"
                />
              </div>
            )}
          </div>

          <div className="w-[140px] mb-4">
            <label className="block text-[11px] font-[500] text-gray-500 mb-1">
              Truck No.
            </label>
            <div className="relative">
              <select className="w-full h-8 px-2 text-xs border border-gray-200 rounded-md appearance-none outline-none bg-white text-gray-400">
                <option>HR432SJ32</option>
              </select>
              <ChevronDown
                className="absolute right-2 top-2 text-gray-400"
                size={14}
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-1.5">
              <h2 className="text-[11px] font-bold text-gray-800">Items</h2>
              <button
                onClick={handleAddItem}
                className="text-[#D48625] text-[10px] font-bold"
              >
                + Add Item
              </button>
            </div>
            <div className="border-t border-l border-gray-200 rounded-md overflow-hidden">
              <table className="w-full text-left border-separate border-spacing-0">
                <thead className="bg-[#E0F7F9]">
                  <tr>
                    <th className="px-2 py-1.5 text-[9px] font-bold text-gray-500 border-r border-b border-cyan-100 text-center w-10">
                      S.No.
                    </th>
                    <th className="px-2 py-1.5 text-[9px] font-bold text-gray-500 border-r border-b border-cyan-100">
                      Item Code
                    </th>
                    <th className="px-2 py-1.5 text-[9px] font-bold text-gray-500 border-r border-b border-cyan-100">
                      Description
                    </th>
                    <th className="px-2 py-1.5 text-[9px] font-bold text-gray-500 border-r border-b border-cyan-100 text-center">
                      Qty Required
                    </th>
                    <th className="px-2 py-1.5 text-[9px] font-bold text-gray-500 border-r border-b border-cyan-100 text-center">
                      Qty Issued
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={item.id} className="h-8">
                      <td className="px-2 text-[10px] text-gray-600 border-r border-b border-gray-200 text-center">
                        {index + 1}
                      </td>
                      <td className="px-2 border-r border-b border-gray-200">
                        {/* Using negative margin to maintain row height while adding gap */}
                        <div className="flex items-center text-[10px] text-gray-800">
                          <span className="mr-7">{item.code}</span>{" "}
                          <ChevronDown size={10} className="text-gray-400" />
                        </div>
                      </td>
                      <td className="px-2 text-[10px] text-[#AAB5C1] bg-[#F7F7F7] border-r border-b border-gray-200">
                        {item.description}
                      </td>
                      <td className="px-2 text-[10px] text-gray-800 border-r border-b border-gray-200 text-center">
                        {item.qtyReq}
                      </td>
                      <td className="px-2 text-[10px] text-gray-800 border-r border-b border-gray-200 text-center">
                        {item.qtyIssued}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex gap-3 mb-6">
            <div className="w-[180px]">
              <label className="block text-[11px] font-[500] text-gray-500 mb-1">
                SMS charging supervisor
              </label>
              <div className="relative">
                <select className="w-full h-8 px-2 text-xs border border-gray-200 rounded-md appearance-none text-gray-400 outline-none bg-white">
                  <option>Search & enter na...</option>
                </select>
                <ChevronDown
                  className="absolute right-2 top-2 text-gray-400"
                  size={14}
                />
              </div>
            </div>

            {activeTab === "store" && (
              <>
                <div className="w-[140px]">
                  <label className="block text-[11px] font-[500] text-gray-500 mb-1">
                    Issued By
                  </label>
                  <div className="relative">
                    <select className="w-full h-8 px-2 text-xs border border-gray-200 rounded-md appearance-none text-gray-500 outline-none bg-white">
                      <option>Dummy</option>
                    </select>
                    <ChevronDown
                      className="absolute right-2 top-2 text-gray-400"
                      size={14}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-[11px] font-[500] text-gray-500 mb-1">
                    Remarks
                  </label>
                  <input
                    type="text"
                    placeholder="Enter..."
                    className="w-full h-8 px-2 text-xs border border-gray-200 rounded-md outline-none placeholder:text-gray-400 bg-white"
                  />
                </div>
              </>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={onBack}
              className="px-6 py-2 bg-[#F1F5F9] text-[#475569] text-xs font-bold rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              className="px-6 py-2 text-xs font-bold text-white bg-[#D48625] rounded-md shadow-sm"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntimationSlipModal;

