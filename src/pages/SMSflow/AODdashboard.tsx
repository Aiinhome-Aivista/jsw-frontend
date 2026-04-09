import React, { useState } from "react";
import {
  RotateCcw,
  Plus,
  Info,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import AnalysisRequisitionSlip from "../../components/modals/AnalysisRequisitionSlip";
import SlagIntimationModal from "../../components/modals/SlagIntimationModal";

interface AODdashboardProps {
  heatId?: string;
}

const AODdashboard: React.FC<AODdashboardProps> = ({ heatId = "1211J0001" }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSlagIntimationOpen, setIsSlagIntimationOpen] = useState<boolean>(false);

  return (
    <div className="bg-[#F8F9FA] min-h-screen flex flex-col overflow-hidden font-sans">
      {/* --- TOP HEADER (Fixed) --- */}
      <header className="sticky top-0 z-10 flex justify-between items-center bg-white shrink-0 py-3 px-4">
        <h2 className="text-2xl font-[600] text-[#754304]">Heat - {heatId}</h2>
        <div className="flex gap-2">
            <HeaderButton label="Slag Intimation Slip" onClick={() => setIsSlagIntimationOpen(true)} />
          <HeaderButton label="Material Requirement Slip" />
          <HeaderButton
            label="Analysis Requisition Slip"
            onClick={() => setIsModalOpen(true)}
          />
          <HeaderButton label="AOD Calculator" />
        </div>
      </header>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex flex-1 overflow-hidden gap-6 py-2 px-0 max-h-[600px]">
        <div className="flex-1 max-w-5xl bg-white rounded-xl shadow-sm border border-gray-100 overflow-y-auto overflow-x-hidden custom-scrollbar p-4 pl-0 space-y-4">
          {/* 1. Basic Details */}
          <SectionHeader number={1} title="Basic Details" />
          <div className="flex gap-10 mb-10 relative">
            <div className="flex-[1.2] grid grid-cols-2 gap-x-6 gap-y-5">
              <SelectField label="Trial Remark" options={["Wash Heat"]} />
              <div>
                <label className="text-[12px] font-semibold text-[#4A5568] mb-1.5 block">
                  Remarks
                </label>
                <input
                  type="text"
                  placeholder="Enter additional remarks"
                  className="w-full p-3 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-[#D4A373] text-gray-400"
                />
              </div>

              {/* Row 2: Type of Product & AOD Slag Box No */}
              <SelectField label="Type of Product" options={["Slab/Bloom"]} />
              <InputField label="AOD Slag box No" value="123" />

              {/* Row 3: Total LM & Left Over Metal */}
              <InputField label="Total LM" value="123" />
              <InputField label="Left Over Metal" value="Dummy" />

              {/* Row 4: EAF Slag Condition & Opening Temp */}
              <SelectField label="EAF Slag condition" options={["Fluid"]} />
              <InputField label="Opening Temperature" value="--" />
            </div>

            {/* Vertical Dotted Divider */}
            <div className="border-l border-dotted border-gray-400 h-full self-stretch mx-2"></div>

            {/* Right Side - 2 Column Grid */}
            <div className="flex-1 grid grid-cols-2 gap-x-4 gap-y-5">
              <InputField label="Order No" value="#45678" />
              <InputField label="Series" value="SS 304" />
              <InputField label="Grade" value="304" />
              <InputField label="Slag Box Life" value="Dummy" />
              <div className="col-span-1">
                <InputField label="EAF Tap Temp" value="Dummy" />
              </div>
            </div>
          </div>
          <DashedDivider />

          {/* 2. AOD Details */}
          <SectionHeader number={2} title="AOD Details" />
          <div className="grid grid-cols-2 gap-12 mb-6">
            <InputField label="AOD Vessel No" value="#45678" />
            <InputField label="Refractory Supplier" value="SS 304" />
          </div>
          <InputField label="AOD Life" value="#Dummy" fullWidth />

          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-gray-700">Tuyere Length</h4>
              <button className="flex items-center gap-1 text-[#D4A373] border border-[#D4A373] px-3 py-1 rounded-md text-sm font-bold">
                <Plus size={16} /> Add
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-10">
              <InputField label="Tuyere Length (1)" value="Dummy" />
              <InputField label="Tuyere Length (2)" value="Dummy" />
              <InputField label="Tuyere Length (3)" value="Dummy" />
            </div>
          </div>

          <DashedDivider />

          {/* 3. Personnel */}
          <SectionHeader number={3} title="Personnel" />
          <div className="grid grid-cols-3 gap-6 mb-10">
            <SelectField label="Melter Name" options={["Asutosh"]} />
            <SelectField label="Operator Name" options={["PD Ghosh"]} />
            <SelectField label="Shift In charge Name" options={["AP Ghosh"]} />
          </div>

          <DashedDivider />

          {/* 4. Ladle Details */}
          <SectionHeader number={4} title="Laddle details" />
          <div className="grid grid-cols-2 gap-12 mb-6">
            <SelectField label="Teeming Ladle No" options={["#Dummy"]} />
            <div className="space-y-4">
              <div className="flex gap-4">
                <InputField
                  label="Transfer Ladle No"
                  value="#45678"
                  className="flex-1"
                />
                <div className="pt-6">
                  <RotateCcw className="text-gray-400 cursor-pointer" />
                </div>
                <InputField
                  label="Transfer Ladle life"
                  value="Dummy"
                  className="flex-1"
                />
              </div>
              <InputField label="Teeming Ladle Life" value="Dummy" />
            </div>
          </div>
          <DashedDivider />

          {/* 5. Weights */}
          <SectionHeader number={5} title="Weights" />
          <div className="grid grid-cols-3 gap-6 mb-4">
            <InputField
              label="Transfer Ladle Weight (Slag + LM)"
              value="12.3"
            />
            <InputField label="Transfer Ladle Weight (LM)" value="13.5" />
            <InputField label="Transfer Empty Ladle Weight" value="14.2" />
          </div>
          <div className="grid grid-cols-2 gap-12 mb-10">
            <InputField
              label="EAF Slag Wt"
              value="#123"
              icon={<Info size={14} />}
            />
            <InputField
              label="Transfer LM weight"
              value="Dummy"
              icon={<Info size={14} />}
            />
          </div>
          <DashedDivider />

          {/* 6. Back Pressure */}
          <SectionHeader number={6} title="Back pressure (Kg/cm2)" />
          <PressureGrid
            labels={["Inner", "Outer", "Shroud", "Top lance", "Tuyere"]}
          />
          <DashedDivider />

          {/* 7. Line Pressure */}
          <SectionHeader number={7} title="Line pressure" className="mt-10" />
          <PressureGrid
            labels={[
              "O2 Line pressure",
              "N2 Line pressure",
              "N2 Line pressure",
            ]}
          />
          <DashedDivider />

          {/* 8. Consumption */}
          <SectionHeader number={8} title="Consumption" className="mt-10" />
          <div className="grid grid-cols-3 gap-6 mb-6">
            <InputField label="Total O2 Tuyere(Nm3)" value="12.3" />
            <InputField label="Total O2 Top Lance(Nm3)" value="13.5" />
            <InputField label="Total O2(Nm3)" value="14.2" />
            <InputField label="Total Ar(Nm3)" value="12.3" />
            <InputField label="Total N2(Nm3)" value="13.5" />
          </div>
          <DashedDivider />

          {/* 9. Blow No & Additions */}
          <SectionHeader number={9} title="Blow No. & Additions" />
          <div className="bg-[#FEF3E2] py-2 px-4 rounded-full text-center font-bold text-gray-700 mb-6">
            Blow 1
          </div>
          <div className="grid grid-cols-4 gap-4 mb-8">
            <InputField label="Temperature °C" value="14.2" />
            <InputField label="Start Time" value="12.3" />
            <InputField label="End Time" value="13.5" />
            <InputField
              label="Total Time"
              value="14.2"
              icon={<Info size={14} />}
            />
          </div>
          {/* Add more Blow details logic here as per Figma */}
          <DashedDivider />

          <SectionHeader number={10} title="Timing" className="mt-10" />
          <div className="grid grid-cols-4 gap-4 mb-6">
            <InputField label="Pouring time" value="15 min" />
            <InputField label="Tap to Tap time" value="23 min" />
            <InputField label="Prev. Heat Tap Time" value="1:00 P.M" />
            <InputField label="Tapping time" value="2:00 P.M" />
          </div>
          <DashedDivider />

          <div className="flex flex-wrap justify-between items-center bg-gray-50 p-4 rounded-lg gap-4">
            <SectionHeader number={11} title="Delays" noMargin />
            <div className="text-gray-400 font-bold whitespace-nowrap">
              Total Delays <span className="ml-4">--</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: SIDEBAR TABLES */}
        <aside className="w-[340px] flex flex-col overflow-y-auto custom-scrollbar pr-2 shrink-0">
          <div className="space-y-6 p-2 flex-1">
            <SidebarCard title="Aim Chemistry">
              <div className="space-y-3">
                {["%Cr", "%Mn", "%Ni", "%Mo", "%Cu", "Δ Mn %", "Δ Cr %"].map(
                  (el, i) => (
                    <div
                      key={el}
                      className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0"
                    >
                      <span className="text-sm text-gray-500 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-gray-300"></span>{" "}
                        {el}
                      </span>
                      <span className="font-bold text-gray-800 text-sm">
                        {(1.3 + i * 0.5).toFixed(1)}%
                      </span>
                    </div>
                  ),
                )}
              </div>
            </SidebarCard>

            <SidebarCard title="Sample Analysis Report (Opening)">
              <div className="space-y-3">
                {["%C", "%Mn", "%S", "%P", "%Si", "%Ni", "%Cr"].map((el, i) => (
                  <div
                    key={el}
                    className="flex justify-between items-center py-1"
                  >
                    <span className="text-sm text-gray-500 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-gray-300"></span>{" "}
                      {el}
                    </span>
                    <span className="font-bold text-gray-800 text-sm">
                      {(1.3 + i * 0.4).toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </SidebarCard>

            <SidebarCard
              title="Stockers Weight Report"
              subTitle="Heat Analysis & Charge Composition"
            >
              <div className="grid grid-cols-2 gap-3 mb-4">
                <SmallStatBox label="Heat Number" value="#12456" />
                <SmallStatBox label="Order Number" value="#45678" />
                <SmallStatBox label="Grade" value="SS 304" />
                <SmallStatBox
                  label="Shift"
                  value="3rd Shift"
                  subValue="9 PM - 5 AM"
                />
              </div>
              <div className="bg-blue-50 p-2 rounded mb-4">
                <p className="text-[10px] text-gray-500 uppercase font-bold">
                  Date
                </p>
                <p className="text-sm font-bold text-blue-900">
                  23rd December 2023
                </p>
              </div>
              <h5 className="text-xs font-bold text-gray-700 mb-4 flex items-center gap-2 uppercase">
                <span className="p-1 bg-gray-100 rounded">📦</span> Charge Mix
                Composition
              </h5>
              <div className="space-y-4">
                <WeightProgress
                  label="Charge Cr(F)"
                  weight="20 kg"
                  percent="17.4%"
                />
                <WeightProgress
                  label="HC Fe Cr(LP)"
                  weight="30 kg"
                  percent="26.1%"
                />
                <WeightProgress
                  label="Alloy Steel"
                  weight="25 kg"
                  percent="21.7%"
                />
                <WeightProgress
                  label="Dolomite"
                  weight="40 kg"
                  percent="34.8%"
                />
                <div className="flex justify-between pt-2 border-t font-bold text-gray-800">
                  <span>Total Weight</span>
                  <span>115 kg</span>
                </div>
              </div>
            </SidebarCard>
          </div>
        </aside>
      </main>

      <AnalysisRequisitionSlip
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <SlagIntimationModal
        isOpen={isSlagIntimationOpen}
        onClose={() => setIsSlagIntimationOpen(false)}
      />
    </div>
  );
};

// --- HELPER COMPONENTS ---

interface HeaderButtonProps {
  label: string;
  onClick?: () => void;
}

const HeaderButton: React.FC<HeaderButtonProps> = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="px-5 py-2 border border-[#D48625] text-[#D48625] rounded-lg text-sm font-bold hover:bg-[#D48625] hover:text-white transition-all shadow-sm"
  >
    {label}
  </button>
);

interface SectionHeaderProps {
  number: number;
  title: string;
  className?: string;
  noMargin?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ number, title, className = "", noMargin = false }) => (
  <div
    className={`flex items-center gap-3 ${noMargin ? "" : "mb-6"} ${className}`}
  >
    <span className="bg-gray-300 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-black">
      {number}
    </span>
    <h3 className="text-lg font-black text-gray-700">{title}</h3>
  </div>
);

interface InputFieldProps {
  label: string;
  value?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, placeholder, icon, className = "" }) => (
  <div className={className}>
    <label className="text-[12px] font-semibold text-[#4A5568] mb-1.5 block">
      {label}
    </label>
    <div className="relative">
      <input
        type="text"
        defaultValue={value}
        placeholder={placeholder}
        className="w-full p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-md text-sm text-[#4A5568] outline-none focus:border-[#D4A373] focus:bg-white transition-all"
      />
      {icon && (
        <span className="absolute right-3 top-3 text-gray-400">{icon}</span>
      )}
    </div>
  </div>
);

interface SelectFieldProps {
  label: string;
  options: string[];
}

const SelectField: React.FC<SelectFieldProps> = ({ label, options }) => (
  <div>
    <label className="text-[11px] font-bold text-gray-400 mb-1 block">
      {label}
    </label>
    <div className="relative">
      <select className="w-full p-3 bg-gray-50 border border-gray-100 rounded-lg text-sm text-gray-700 outline-none appearance-none pr-8">
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-3 text-gray-400" size={16} />
    </div>
  </div>
);

interface PressureGridProps {
  labels: string[];
}

const PressureGrid: React.FC<PressureGridProps> = ({ labels }) => (
  <div className="space-y-4 w-full">
    {" "}
    {/* Added w-full */}
    <div className="flex gap-4">
      <div className="w-16 shrink-0"></div> {/* Added shrink-0 */}
      {labels.map((l) => (
        <div
          key={l}
          className="flex-1 min-w-0 text-[11px] text-gray-400 font-bold truncate"
        >
          {l}
        </div>
      ))}
    </div>
    {["Min", "Max"].map((type) => (
      <div key={type} className="flex items-center gap-4">
        <div
          className={`w-16 shrink-0 py-1 px-2 rounded text-xs font-bold text-center text-white ${type === "Min" ? "bg-orange-400" : "bg-orange-500"}`}
        >
          {type}
        </div>
        {labels.map((_, i) => (
          <input
            key={i}
            type="text"
            defaultValue="12.3"
            className="flex-1 min-w-0 p-3 bg-white border border-gray-100 rounded-lg text-sm outline-none"
          />
        ))}
      </div>
    ))}
  </div>
);

interface SidebarCardProps {
  title: string;
  subTitle?: string;
  children: React.ReactNode;
}

const SidebarCard: React.FC<SidebarCardProps> = ({ title, subTitle, children }) => (
  <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
    <div className="flex justify-between items-center mb-4">
      <div>
        <h4 className="font-black text-[#8B4513] text-sm uppercase">{title}</h4>
        {subTitle && (
          <p className="text-[10px] text-gray-400 uppercase tracking-tighter">
            {subTitle}
          </p>
        )}
      </div>
      <ChevronUp size={18} className="text-[#D4A373]" />
    </div>
    {children}
  </div>
);

interface SmallStatBoxProps {
  label: string;
  value: string;
  subValue?: string;
}

const SmallStatBox: React.FC<SmallStatBoxProps> = ({ label, value, subValue }) => (
  <div className="border border-orange-50 bg-[#FFFBF7] p-2 rounded">
    <p className="text-[9px] text-gray-400 uppercase font-bold">{label}</p>
    <p className="text-xs font-black text-gray-800">{value}</p>
    {subValue && <p className="text-[8px] text-gray-400">{subValue}</p>}
  </div>
);

interface WeightProgressProps {
  label: string;
  weight: string;
  percent: string;
}

const WeightProgress: React.FC<WeightProgressProps> = ({ label, weight, percent }) => (
  <div>
    <div className="flex justify-between text-[11px] font-bold mb-1">
      <span className="text-gray-500">{label}</span>
      <span className="text-gray-800">{weight}</span>
    </div>
    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
      <div className="h-full bg-[#D4A373]" style={{ width: percent }}></div>
    </div>
    <p className="text-right text-[9px] text-gray-400 mt-0.5">{percent}</p>
  </div>
);

const DashedDivider: React.FC = () => (
  <hr className="border-t border-dashed border-gray-200 my-8" />
);

export default AODdashboard;

