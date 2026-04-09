import React, { useEffect, useState, useMemo } from "react";
import CompositionPanel from "../../components/process/CompositionPanel";
import IntimationSlipModal from "../../components/modals/IntimationSlipModal";
import Icon2 from "../../assets/Icon (2).png";
import Button2 from "../../assets/Button (2).png";
import SortIcon from "../../assets/sort.png";
import InfoIcon from "../../assets/Group 1171290823 (1).png";

interface Material {
  id: string;
  name: string;
  batch: string;
  weight: string;
  date: string;
  vehicle: string;
}

interface BucketItem {
  name: string;
  qty: number;
  max: number;
}

interface Bucket {
  id: number;
  items: BucketItem[];
  totalWeight: number;
}

interface KgDataItem {
  el: string;
  aim: number;
  expected: number;
}

interface PercentDataItem {
  el: string;
  aim: number;
  expected: number;
}

interface ChargePlanPageProps {
  data?: {
    grade: string;
    orderNumber: string;
    series: string;
    heatNumber: string;
    totalChargeweight: string;
  };
  onBack?: () => void;
  onUpdateBuckets?: (buckets: Bucket[]) => void;
  onOpenRMReceipts?: () => void;
}

const materials: Material[] = [
  {
    id: "m1",
    name: "SAF Metal",
    batch: "#123456",
    weight: "150 Kg",
    date: "14-02-2025",
    vehicle: "DL19AB38494",
  },
  {
    id: "m2",
    name: "304 r",
    batch: "#123456",
    weight: "120 Kg",
    date: "14-02-2025",
    vehicle: "DL19AB38494",
  },
  {
    id: "m3",
    name: "Hot Coiler",
    batch: "#123456",
    weight: "50 Kg",
    date: "14-02-2025",
    vehicle: "DL19AB38494",
  },
  {
    id: "m4",
    name: "2205 Pipe",
    batch: "#123456",
    weight: "20 Kg",
    date: "14-02-2025",
    vehicle: "DL19AB38494",
  },
  {
    id: "m5",
    name: "2205 Plate",
    batch: "#123456",
    weight: "50 Kg",
    date: "14-02-2025",
    vehicle: "DL19AB38494",
  },
  {
    id: "m6",
    name: "Revert JBS",
    batch: "#123456",
    weight: "120 Kg",
    date: "14-02-2025",
    vehicle: "DL19AB38494",
  },
  {
    id: "m7",
    name: "305 ingot",
    batch: "#123456",
    weight: "50 Kg",
    date: "14-02-2025",
    vehicle: "DL19AB38494",
  },
  {
    id: "m8",
    name: "317 Plate",
    batch: "#123456",
    weight: "50 Kg",
    date: "14-02-2025",
    vehicle: "DL19AB38494",
  },
  {
    id: "m9",
    name: "400 Revert",
    batch: "#123456",
    weight: "50 Kg",
    date: "14-02-2025",
    vehicle: "DL19AB38494",
  },
  {
    id: "m10",
    name: "HCFeCr(HP)",
    batch: "#123456",
    weight: "50 Kg",
    date: "14-02-2025",
    vehicle: "DL19AB38494",
  },
];

const ChargePlanPage: React.FC<ChargePlanPageProps> = ({ onUpdateBuckets, onOpenRMReceipts }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isIntimationSlipOpen, setIsIntimationSlipOpen] = useState<boolean>(false);

  // --- Tooltip State ---
  const [hoveredMaterial, setHoveredMaterial] = useState<Material | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Initial State matching Figma items
  const [buckets, setBuckets] = useState<Bucket[]>([
    {
      id: 1,
      items: [
        { name: "SAF Metal", qty: 100, max: 150 },
        { name: "304 r", qty: 80, max: 120 },
      ],
      totalWeight: 12453,
    },
    { id: 2, items: [], totalWeight: 0 },
    { id: 3, items: [], totalWeight: 0 },
    { id: 4, items: [], totalWeight: 0 },
  ]);

  useEffect(() => {
    if (onUpdateBuckets) {
      onUpdateBuckets(buckets);
    }
  }, [buckets, onUpdateBuckets]);

  const kgData: KgDataItem[] = [
    { el: "C", aim: 50, expected: 49 },
    { el: "Mn", aim: 40, expected: 39 },
    { el: "S", aim: 30, expected: 28 },
    { el: "P", aim: 25, expected: 26 },
    { el: "Si", aim: 40, expected: 39 },
    { el: "Ni", aim: 15, expected: 13 },
  ];

  const percentData: PercentDataItem[] = [
    { el: "C", aim: 1.3, expected: 1.2 },
    { el: "Mn", aim: 3.4, expected: 3.2 },
    { el: "S", aim: 2.5, expected: 2.4 },
    { el: "P", aim: 5.6, expected: 5.4 },
    { el: "Si", aim: 5.6, expected: 5.5 },
    { el: "Ni", aim: 5.6, expected: 5.2 },
  ];

  const filteredMaterials = useMemo(() => {
    return materials.filter((m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm]);

  // --- Tooltip Logic ---
  const handleMouseEnter = (e: React.MouseEvent, material: Material) => {
    setHoveredMaterial(material);
    setMousePos({ x: e.clientX + 15, y: e.clientY - 20 });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX + 15, y: e.clientY - 20 });
  };

  const handleMouseLeave = () => {
    setHoveredMaterial(null);
  };

  const onDragStart = (e: React.DragEvent, material: Material) => {
    e.dataTransfer.setData("material", JSON.stringify(material));
  };

  const onDrop = (e: React.DragEvent, bucketId: number) => {
    e.preventDefault();
    const material = JSON.parse(e.dataTransfer.getData("material"));
    setBuckets((prev) =>
      prev.map((b) => {
        if (b.id === bucketId) {
          if (b.items.length >= 4) return b;
          const newItem = {
            name: material.name,
            qty: 100,
            max: parseInt(material.weight),
          };
          return {
            ...b,
            items: [...b.items, newItem],
            totalWeight: b.totalWeight + 100,
          };
        }
        return b;
      }),
    );
  };

  const removeBucket = (id: number) => {
    setBuckets((prev) =>
      prev.map((b) => (b.id === id ? { ...b, items: [], totalWeight: 0 } : b)),
    );
  };

  // Update item quantity in a bucket
  const updateItemQty = (bucketId: number, itemIndex: number, newQty: string) => {
    setBuckets((prev) =>
      prev.map((b) => {
        if (b.id === bucketId) {
          const updatedItems = b.items.map((item, i) => {
            if (i === itemIndex) {
              return { ...item, qty: parseInt(newQty) || 0 };
            }
            return item;
          });
          const newWeight = updatedItems.reduce(
            (acc, curr) => acc + curr.qty,
            0,
          );
          return { ...b, items: updatedItems, totalWeight: newWeight };
        }
        return b;
      }),
    );
  };

  return (
    <div className="rounded-[20px] bg-slate-50 flex gap-0 p-2 text-slate-900 h-screen relative overflow-hidden">
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* --- RM RECEIPTS BUTTON --- */}
      {onOpenRMReceipts && (
        <div
          className="fixed top-[320px] right-0 z-[9999] transition-all duration-300 ease-in-out flex items-center cursor-pointer"
          onClick={onOpenRMReceipts}
        >
          <div className="relative">
            {/* The 03 Badge - Positioned to overlap the top left corner */}
            <div className="absolute -top-4 -left-3 w-10 h-10 bg-[#E34E4E] rounded-full flex items-center justify-center text-white font-bold text-[16px] shadow-md z-[10000] border-2 border-white/10">
              03
            </div>

            <div className="bg-[#D48625] text-white w-[32px] py-4 rounded-l-[10px] flex flex-col items-center gap-3 shadow-[-4px_0_10px_rgba(0,0,0,0.1)] hover:bg-[#c07820]">
              <img src={SortIcon} alt="sort" className="w-5 h-5" />
              <div className="[writing-mode:vertical-lr] rotate-180 font-[500] text-[14px] tracking-widest">
                RM Receipts
              </div>
            </div>
          </div>
        </div>
      )}

      {hoveredMaterial && (
        <div
          className="fixed z-[9999] pointer-events-none"
          style={{ left: mousePos.x, top: mousePos.y }}
        >
          <div className="bg-[#5E656F] text-white p-3 rounded-lg shadow-2xl w-[280px] border border-white/10">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[11px] font-[500] text-gray-400">
                Compositions
              </span>
              <div className="flex gap-1">
                <div className="bg-[#ECECEC] px-1.5 py-0.5 rounded text-[8px] text-[#64748B] flex items-center gap-1">
                  <span className="opacity-40">Date</span>{" "}
                  {hoveredMaterial.date}
                </div>
                <div className="bg-[#ECECEC] px-1.5 py-0.5 rounded text-[8px]  text-[#64748B] flex items-center gap-1">
                  <span className="opacity-40">Vehicle</span>{" "}
                  {hoveredMaterial.vehicle}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-y-3 gap-x-1 border-t border-white/5 pt-3">
              {[
                { label: "C", val: "1.1%" },
                { label: "Cr", val: "1.1%" },
                { label: "Ni", val: "1.1%" },
                { label: "Si", val: "1.1%" },
                { label: "Mn", val: "1.1%" },
                { label: "Cu", val: "1.1%" },
                { label: "Si", val: "1.1%" },
                { label: "P", val: "1.1%" },
              ].map((comp, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 overflow-hidden"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-500/40 flex-shrink-0" />
                  <div className="flex flex-col leading-none">
                    <span className="text-[8px] text-gray-500 font-bold uppercase mb-0.5">
                      {comp.label}
                    </span>
                    <span className="text-[11px] font-bold">{comp.val}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* LEFT SIDEBAR */}
      <div className="w-[260px] bg-white flex flex-col h-full rounded-l-[20px] border-r border-gray-100">
        <div className="pt-2 px-4 pb-2">
          <h3 className="text-[#202020] text-[20px] font-bold">
            List of Materials
          </h3>
        </div>

        <div className="flex-1 overflow-y-auto pl-2 pr-4">
          <div className="flex items-center justify-between bg-[#F8FAFC] p-2 px-3 rounded-lg mb-2 mt-2 cursor-pointer">
            <span className="text-[#202020] text-[11px] font-bold">
              Raw Material Inventory at Shop
            </span>
            <div className="bg-[#E28A2B] rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
              <svg
                width="8"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                className="rotate-180"
              >
                <path
                  d="M1 1L5 5L9 1"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Search Bar 1 */}
          <div className="relative mb-3">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search"
              className="w-full p-2 pl-9 outline-none border-none text-[13px] bg-[#F1F5F9] rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Grid 1 */}
          <div className="grid grid-cols-2 gap-2 mb-8">
            {filteredMaterials.map((m) => (
              <div
                key={m.id}
                draggable
                onDragStart={(e) => onDragStart(e, m)}
                onMouseEnter={(e) => handleMouseEnter(e, m)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="bg-[#AB42FF] p-2.5 rounded-xl text-white shadow-sm cursor-grab active:cursor-grabbing hover:bg-[#9b36eb] transition-colors"
              >
                <div className="flex justify-between items-start mb-1">
                  <p className="font-bold text-[11px] leading-tight">
                    {m.name}
                  </p>
                  <div className="opacity-70">
                    <img
                      src={Icon2}
                      alt="icon"
                      style={{ width: "16px", height: "12px" }}
                    />
                  </div>
                </div>
                <p className="text-[9px] opacity-80 leading-none">
                  Batch ID: {m.batch}
                </p>
                <p className="font-bold text-[12px] mt-1">{m.weight}</p>
              </div>
            ))}
          </div>

          {/* SECTION 2: Ferro Alloy / Buffer */}
          <div className="flex items-center justify-between bg-[#F8FAFC] p-2 px-3 rounded-lg mb-3 cursor-pointer">
            <span className="text-[#202020] text-[12px] font-bold">
              Ferro Alloy Inventory at Shop
            </span>
            <div className="bg-[#E28A2B] rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
              <svg width="8" height="6" viewBox="0 0 10 6" fill="none">
                <path
                  d="M1 1L5 5L9 1"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Search Bar 2 */}
          <div className="relative mb-3">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search"
              className="w-full p-2 pl-9 outline-none border-none text-[13px] bg-[#F1F5F9] rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Grid 2 */}
          <div className="grid grid-cols-2 gap-2 mb-8">
            {filteredMaterials.map((m) => (
              <div
                key={m.id}
                draggable
                onDragStart={(e) => onDragStart(e, m)}
                onMouseEnter={(e) => handleMouseEnter(e, m)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="bg-[#6342FF] p-2.5 rounded-xl text-white shadow-sm cursor-grab active:cursor-grabbing hover:bg-[#9b36eb] transition-colors hover:bg-[#6342FF]"
              >
                <div className="flex justify-between items-start mb-1">
                  <p className="font-bold text-[11px] leading-tight">
                    {m.name}
                  </p>
                  <div className="opacity-70">
                    <img
                      src={Icon2}
                      alt="icon"
                      style={{ width: "16px", height: "12px" }}
                    />
                  </div>
                </div>
                <p className="text-[9px] opacity-80 leading-none">
                  Batch ID: {m.batch}
                </p>
                <p className="font-bold text-[12px] mt-1">{m.weight}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MIDDLE: Buckets Grid */}
      <div className="flex-[6] grid grid-cols-2 gap-2 auto-rows-min overflow-y-auto h-[85vh] pr-2 pt-6 no-scrollbar">
        {buckets.map((bucket, index) => {
          const isActive = index === 0 || buckets[index - 1].items.length > 0;
          const hasItems = bucket.items.length > 0;
          const isNextAvailable = !hasItems && isActive;
          const isFirstTwoBuckets = index < 2;

          const deleteItem = (bucketId: number, itemIndex: number) => {
            setBuckets((prev) =>
              prev.map((b) => {
                if (b.id === bucketId) {
                  const newItems = b.items.filter((_, i) => i !== itemIndex);
                  const newWeight = newItems.reduce(
                    (acc, curr) => acc + curr.qty,
                    0,
                  );
                  return { ...b, items: newItems, totalWeight: newWeight };
                }
                return b;
              }),
            );
          };

          // Determine border style based on bucket state
          const getBorderClass = () => {
            if (hasItems) {
              // Buckets with items - solid border (first 2 get slightly darker)
              return isFirstTwoBuckets
                ? "border border-gray-300"
                : "border border-gray-300";
            } else if (isNextAvailable) {
              // Next available bucket (can receive items) - dashed border
              return "border-2 border-dashed border-gray-300";
            } else {
              // Add Bucket placeholder - dashed border
              return "border-2 border-dashed border-gray-400";
            }
          };

          return (
            <div
              key={bucket.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => isActive && onDrop(e, bucket.id)}
              className={`rounded-xl p-3 bg-white shadow-sm min-h-[300px] flex flex-col relative transition-all ${getBorderClass()} ${!isActive && !hasItems ? "opacity-50" : "opacity-100"}`}
            >
              {(hasItems || isNextAvailable) && (
                <div className="flex justify-between items-center mb-4 bg-red">
                  <h4 className="text-[15px] font-[600] text-[#101828]">
                    Bucket {bucket.id}
                  </h4>
                  <div className="flex items-center gap-2">
                    <div className="bg-[#FFFAEB] px-2 py-1 rounded-lg border border-[#FEF3C7] flex items-center h-7">
                      <span className="text-[9px] text-[#101828]] mr-2">
                        TW
                      </span>
                      <span className="text-[12px] font-[600] text-[#020202]">
                        {hasItems
                          ? `${bucket.totalWeight.toLocaleString()} kg`
                          : "--"}
                      </span>
                    </div>
                    <button
                      onClick={() => removeBucket(bucket.id)}
                      className="p-1 hover:bg-red-50 rounded transition-colors"
                    >
                      <img src={Button2} alt="delete" className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              )}

              {hasItems ? (
                <div className="flex flex-1 overflow-hidden rounded-xl border border-slate-100">
                  <div className="flex-[1.8] bg-[#F8FAFC] p-3 flex flex-col min-w-0 overflow-y-auto">
                    <p className="text-[10px]  font-[600] text-[#101828] mb-3">
                      Add Materials
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {bucket.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-1.5 h-5 bg-[#AB42FF] rounded-r-full flex-shrink-0" />
                          <span className="text-[10px] text-[#000000] font-[500] whitespace-nowrap">
                            {item.name}{" "}
                            <img
                              src={InfoIcon}
                              alt="info"
                              className="inline-block w-2 h-2 ml-1"
                            />
                          </span>
                          <input
                            type="number"
                            value={item.qty}
                            className="w-10 h-5 border border-slate-200 text-center text-[9px] font-bold bg-white rounded flex-shrink-0"
                            onChange={(e) =>
                              updateItemQty(bucket.id, i, e.target.value)
                            }
                          />
                          <span className="text-[9px] font-bold text-[#64748B] min-w-[35px]">
                            /{item.max}Kg
                          </span>
                          <button
                            onClick={() => deleteItem(bucket.id, i)}
                            className="p-0.5 hover:bg-red-100 rounded flex-shrink-0"
                          >
                            <img src={Button2} alt="del" className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                      <button className="w-full py-2 border border-dashed border-[#CBD5E1] rounded-lg text-[10px] font-bold text-[#94A3B8] bg-white">
                        + Material
                      </button>
                    </div>
                  </div>
                  <div className="w-[105px] bg-white p-3 flex flex-col flex-shrink-0 border-l border-slate-100">
                    <p className="text-[10px]  font-[600] text-[#101828] mb-3">
                      Quantity (Kg)
                    </p>
                    <div className="space-y-4">
                      {[
                        { l: "C", v: 100 },
                        { l: "Cr", v: 200 },
                        { l: "Ni", v: 120 },
                        { l: "Si", v: 130 },
                        { l: "Mn", v: 140 },
                      ].map((el, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center"
                        >
                          <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 bg-[#CBD5E1] rounded-full" />
                            <span className="text-[10px] font-bold text-[#64748B]">
                              {el.l}
                            </span>
                          </div>
                          <span className="text-[12px] font-black text-[#334155]">
                            {el.v}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : isNextAvailable ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-[#F8FAFC] ">
                  <div className="text-4xl text-[#CBD5E1] mb-2 font-light">
                    +
                  </div>
                  <div className="text-[14px]  text-[#94A3B8] mb-2  flex flex-col leading-tight">
                    <span>Drag & Drop</span>
                    <span>Elements Here</span>
                  </div>
                  <div className="text-[10px]  text-[#94A3B8] flex flex-col leading-tight">
                    <span>Build your charge mix </span>
                    <span>composition</span>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6 group cursor-pointer">
                  <div className="text-4xl text-[#D48625] mb-2">+</div>
                  <p className="text-[14px] font-bold text-[#D48625]">
                    Add Bucket
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <CompositionPanel
        kgData={kgData}
        percentData={percentData}
        kgTotal={{ aim: 50000, expected: 48000 }}
        onOpenIntimationSlip={() => setIsIntimationSlipOpen(true)}
      />

      {isIntimationSlipOpen && (
        <IntimationSlipModal
          onBack={() => setIsIntimationSlipOpen(false)}
          onSubmit={() => {
            setIsIntimationSlipOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default ChargePlanPage;

