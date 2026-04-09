import React, { useState, useRef } from "react";
import { Edit2, RotateCcw, ChevronDown, Plus, Info, Mic } from "lucide-react";
import AnalysisRequisitionSlip from "../../components/modals/AnalysisRequisitionSlip";

const EAFdashboard: React.FC<{ heatId?: string }> = ({ heatId: _heatId = "1211J0001" }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [remarksText, setRemarksText] = useState<string>("");
  const [charCount, setCharCount] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  const startRecording = () => {
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const SpeechRecognition =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    // settings
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "hi-IN";

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = async (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      console.log("Original Transcription (Hindi):", transcript);

      // Attempt translation
      const translated = await translateText(transcript);

      // Check if adding the translated text would exceed the limit
      const newText = remarksText + (remarksText ? " " : "") + translated;
      if (newText.length > 500) {
        setErrorMessage("Character limit exceeded. Cannot add more text.");
        return;
      }

      // Update state with translated text
      setRemarksText(newText);
      setCharCount(newText.length);
      setErrorMessage(""); // Clear any previous error
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error:", event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
    }
  };

  const translateText = async (text: string): Promise<string> => {
    try {
      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodeURIComponent(text)}`,
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      return data[0][0][0] || text;
    } catch (error) {
      console.error(
        "Translation failed, falling back to original text:",
        error,
      );
      // If translation fails, we return the original text so the user doesn't lose data
      return text;
    }
  };

  const handleMicClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen flex flex-col overflow-hidden">
      {/* Header Section */}
      <header className="sticky top-0 z-10 flex justify-between items-center bg-white shrink-0 py-3">
        <h2 className="text-2xl font-[600] text-[#754304]">Heat - 1211J0001</h2>
        <div className="flex gap-4">
          <button className="px-6 py-2 border-2 border-[#D48625] text-[#D48625] rounded-xl font-bold  transition-all text-sm">
            Material Requirement Slip
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2 border-2 border-[#D48625] text-[#D48625] rounded-xl font-bold transition-all text-sm"
          >
            Analysis Requisition Slip
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex flex-1 overflow-hidden gap-6 py-2 px-0 max-h-[600px]">
        {/* LEFT COLUMN: Main Form */}
        <div className="flex-1 max-w-6xl bg-white rounded-xl shadow-sm border border-gray-100 overflow-y-auto overflow-x-hidden custom-scrollbar p-4 pl-0 space-y-4">
          {/* Section 1: Basic Details */}
          <section id="section-1">
            <SectionHeader number={1} title="Basic Details" />
            <div className="grid grid-cols-2 gap-0">
              <div className="pr-12 space-y-4">
                <SelectField
                  label="Trial remark"
                  value="Wash Heat"
                  className="w-48"
                />
                <textarea
                  placeholder="Enter any additional remarks or observations..."
                  className="w-full p-4 bg-[#F8F9FA] border border-gray-200 rounded-xl h-28 resize-none focus:ring-1 focus:ring-[#D4A373] outline-none text-sm"
                />
              </div>
              <div className="space-y-4 border-l border-dashed border-gray-500 pl-12">
                <div className="grid grid-cols-2 gap-4">
                  <InputWithEdit label="Order No" value="#45678" />
                  <InputWithEdit label="Series" value="SS 304" />
                </div>
                <div className="grid grid-cols-1 gap-4 max-w-[200px]">
                  <InputWithEdit label="Grade" value="304" />
                </div>
              </div>
            </div>
          </section>

          <hr className="border-dashed border-gray-500" />

          {/* Section 2: Transfer Ladle Details */}
          <section id="section-2">
            <SectionHeader number={2} title="Transfer Ladle Details" />
            <div className="grid grid-cols-2 gap-0">
              <div className="pr-12">
                <SelectField label="Ladle No" value="L01" />
              </div>
              <div className="pl-12 border-l border-dashed">
                <InputWithRefresh
                  label="Tr. Ladle Life (heats)"
                  value="Dummy"
                />
              </div>
            </div>
          </section>

          <hr className="border-dashed border-gray-500" />

          {/* Section 3: Charge & Weight */}
          <section id="section-3">
            <SectionHeader number={3} title="Charge & Weight" />
            <div className="grid grid-cols-2 gap-0">
              <div className="pr-12">
                <InputField label="Spar (Kg)" value="123" />
              </div>
              <div className="pl-12 border-l border-dashed border-gray-500">
                <InputField
                  label="Total Charge Weight (Kg)"
                  value="212"
                  disabled
                />
              </div>
            </div>
          </section>

          <hr className="border-dashed border-gray-500" />

          {/* Section 4: Life Tracking */}
          <section id="section-4">
            <SectionHeader number={4} title="Life Tracking" />
            <div className="grid grid-cols-4 gap-4">
              <InputWithRefresh label="Wall Life" value="Dummy" />
              <InputWithRefresh label="Delta Life" value="Dummy" />
              <InputWithRefresh label="Roof Life" value="Dummy" />
              <InputWithRefresh label="Bottom Life" value="Dummy" />
            </div>
          </section>

          <hr className="border-dashed border-gray-500" />

          {/* Section 5: Electrode */}
          <section id="section-5">
            <SectionHeader number={5} title="Electrode" />
            <div className="grid grid-cols-4 gap-4">
              <InputWithRefresh label="E1 Life" value="Dummy" />
              <InputWithRefresh label="E2 Life" value="Dummy" />
              <InputWithRefresh label="E3 Life" value="Dummy" />
              <InputWithRefresh label="Electrode Supplier" value="Dummy" />
            </div>
          </section>

          <hr className="border-dashed border-gray-500" />

          {/* Section 6: Material Consumption */}
          <section id="section-6">
            <SectionHeader number={6} title="Material Consumption" />
            <div className="grid grid-cols-12 gap-0">
              <div className="col-span-4 space-y-4 pr-8">
                <InputField label="Lime (Kg)" value="304" />
                <InputField label="IMP Coke (Kg)" value="304" />
                <InputField label="Dolochips (Kg)" value="304" />
              </div>
              <div className="col-span-4 space-y-4 border-l border-dashed border-gray-300 px-8">
                <SelectField label="Almix Supplier" value="Dummy" />
                <InputField label="Reason Low Almix" value="Dummy" />
                <InputField label="FeSi (Bulk) (Kg)" value="#45678" />
              </div>
              <div className="col-span-4 space-y-4 border-l border-dashed border-gray-300 pl-8">
                <InputField label="FeSi (Inject) (Kg)" value="Dummy" />
                <InputField label="Total FeSi (Kg)" value="Dummy" hasInfo />
                <InputField label="Almix (Kg)" value="Dummy" />
              </div>
            </div>
          </section>

          <hr className="border-dashed border-gray-500" />

          {/* Section 7: Power & Consumption */}
          <section id="section-7">
            <SectionHeader number={7} title="Power & Consumption" />
            <div className="grid grid-cols-12 gap-0 mb-6">
              <div className="col-span-8 pr-12">
                <InputField label="Total LM (T)" value="" />
              </div>
              <div className="col-span-4 flex gap-4 border-l border-dashed border-gray-300 pl-12">
                <InputField label="Power Cons (Kwh)" value="#Dummy" />
                <InputField label="Total O2 Nm³" value="Dummy" />
              </div>
            </div>
            <div className="w-2/3">
              <label className="block text-xs font-[500] text-[#334155]  mb-1.5">
                Power Consumption Justification
              </label>
              <textarea
                placeholder="Enter any additional remarks or observations..."
                className="w-full p-4 bg-[#F8F9FA] border border-gray-200 rounded-xl h-24 resize-none outline-none text-sm focus:border-[#D4A373]"
              />
            </div>
          </section>

          <hr className="border-dashed border-gray-500" />

          {/* Section 8: Temperature & Condition */}
          <section id="section-8">
            <SectionHeader number={8} title="Temperature & Condition" />
            <div className="grid grid-cols-2 gap-0">
              <div className="pr-12">
                <InputField label="EAF Tap Temp °C" value="" />
              </div>
              <div className="pl-12 border-l border-dashed border-gray-300">
                <SelectField label="EAF Condition" value="Dummy" />
              </div>
            </div>
          </section>

          <hr className="border-dashed border-gray-500" />

          {/* Section 9: Timing */}
          <section id="section-9">
            <SectionHeader number={9} title="Timing" />
            <div className="grid grid-cols-3 gap-6 mb-6">
              <InputField label="Previous Heat Tapped At" value="12:00 AM" />
              <InputField label="1st Charge Start Time" value="12:00 AM" />
              <InputField label="Melting Start Time" value="12:00 AM" />
            </div>
            <div className="grid grid-cols-3 gap-6">
              <InputField label="Heat Tapping Time" value="12:00 AM" />
              <InputField label="Total Tap-to-tap time" value="60 mins" />
              <InputField label="Total Time" value="45 mins" />
            </div>
          </section>

          <hr className="border-dashed border-gray-500" />

          {/* Section 10: Delays */}
          <section id="section-10">
            <div className="flex justify-between items-center mb-8">
              <SectionHeader number={10} title="Delays" className="mb-0" />
              <div className="bg-[#FEF3E2] px-4 py-2 rounded-lg text-sm font-bold text-gray-700">
                Total Delays: <span className="ml-2">--</span>
              </div>
            </div>
            <div className="flex gap-4 items-end">
              <div className="flex-1 grid grid-cols-4 gap-4">
                <SelectField label="Agency" value="Dummy" />
                <InputField label="Start Time" value="-- : --" />
                <InputField label="End Time" value="-- : --" />
                <InputField label="Reason" value="" />
              </div>
              <button className="mb-0.5 h-[48px] px-8 border-2 border-[#D4A373] text-[#D4A373] rounded-xl font-bold flex items-center gap-2 hover:bg-[#D4A373] hover:text-white transition-all">
                <Plus size={18} /> Add
              </button>
            </div>
          </section>

          <hr className="border-dashed border-gray-500" />

          {/* Section 11: Personnel */}
          <section id="section-11">
            <SectionHeader number={11} title="Personnel" />
            <div className="grid grid-cols-4 gap-4">
              <SelectField label="Charge Supplier" value="Select" />
              <SelectField label="EAF Melter" value="Select" />
              <SelectField label="1st Hand" value="Select" />
              <SelectField label="2nd Hand" value="Select" />
            </div>
          </section>

          <hr className="border-dashed border-gray-500" />

          {/* Section 12: Remarks */}
          <section id="section-12">
            <SectionHeader number={12} title="Remarks" />
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={remarksText}
                onChange={(e) => {
                  setRemarksText(e.target.value);
                  setCharCount(e.target.value.length);
                  setErrorMessage("");
                }}
                placeholder="Enter any additional remarks or observations.."
                maxLength={500}
                className="w-full p-4 bg-[#F8F9FA] border border-gray-200 rounded-xl h-28 resize-none outline-none text-sm focus:border-[#D4A373] pr-12"
              />
              <button
                type="button"
                onClick={handleMicClick}
                className={`absolute right-4 top-4 p-2 rounded-full transition-all ${
                  isRecording
                    ? "bg-red-500 text-white animate-pulse shadow-lg scale-110"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
                title={isRecording ? "Stop Recording" : "Start Recording"}
              >
                <Mic size={16} />
              </button>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="text-xs text-gray-500">
                {charCount}/500 characters
              </div>
              {errorMessage && (
                <div className="text-xs text-red-600 font-medium">
                  {errorMessage}
                </div>
              )}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: Sidebar */}
        <aside className="w-[300px] flex flex-col overflow-y-auto custom-scrollbar pr-2 shrink-0">
          <div className="rounded-xl p-4 shadow-sm border border-gray-100">
            <h3 className="text-xl  text-[#754304] mb-1 font-[600] ">
              Stockers Weight Report
            </h3>
            <p className="text-[10px] text-[#6A7282] mb-6">
              Heat Analysis & Charge Composition
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <StatCard label="Heat Number" value="1211J2001" />
              <StatCard label="Order Number" value="#45678" />
              <StatCard label="Grade" value="SS 304" />
              <StatCard label="Shift" value="3rd Shift" sub="9 PM - 5 AM" />
            </div>

            <div className="bg-[#F4F7FA] p-4 rounded-xl border-gray-500 mb-8">
              <p className="text-[10px] font-bold text-gray-500">Date</p>
              <p className="text-sm font-bold text-[#101828]">
                23rd December 2023
              </p>
            </div>

            <h4 className="font-[600] text-[#754304] mb-5 text-[15px]">
              Charge Mix Composition
            </h4>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="space-y-6">
                <FigmaProgress
                  label="Charge Cr(F)"
                  weight="20 kg"
                  percent="17.4"
                />
                <FigmaProgress
                  label="HC Fe Cr(LP)"
                  weight="30 kg"
                  percent="26.1"
                />
                <FigmaProgress
                  label="Alloy Steel"
                  weight="25 kg"
                  percent="21.7"
                />
                <FigmaProgress label="Dolomite" weight="40 kg" percent="34.8" />

                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <span className="font-black text-sm text-gray-800">
                    Total Weight
                  </span>
                  <span className="font-black text-sm text-gray-800">
                    115 kg
                  </span>
                </div>
              </div>
            </div>

            <h4 className="font-bold text-[#8B5E34] mt-10 mb-4 text-sm">
              Expected Element %
            </h4>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="space-y-1">
                <ElementItem label="C" value="1.3%" />
                <ElementItem label="Cr" value="3.4%" />
                <ElementItem label="Ni" value="2.5%" />
                <ElementItem label="Si" value="2.3%" />
                <ElementItem label="Mn" value="5.6%" />
                <ElementItem label="Cu" value="1.2%" />
              </div>
            </div>
          </div>
        </aside>
      </main>

      <AnalysisRequisitionSlip
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

// --- Sub-components (Unchanged logic, just keeping the file complete) ---

interface SectionHeaderProps {
  number: number;
  title: string;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ number, title, className = "mb-8" }) => (
  <div className={`flex items-center gap-4 ${className}`}>
    <div className="w-7 h-7 bg-[#D4D4D4] text-[#000000] rounded-full flex items-center justify-center text-sm font-bold">
      {number}
    </div>
    <h3 className="text-lg font-semibold text-[#0C0C0C]">{title}</h3>
  </div>
);

interface InputFieldProps {
  label: string;
  value: string;
  disabled?: boolean;
  hasInfo?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, disabled, hasInfo }) => (
  <div className="w-full">
    <label className="block text-xs font-[500] text-[#334155] mb-1.5 tracking-tight">
      {label}
      {hasInfo && <Info size={12} className="inline text-gray-600 mb-0.5" />}
    </label>
    <input
      type="text"
      defaultValue={value}
      disabled={disabled}
      className={`w-full p-3.5 bg-[#F8F9FA] border border-gray-200 rounded-xl text-sm outline-none focus:border-[#D4A373] transition-colors ${disabled ? "text-gray-400" : "text-gray-800"}`}
    />
  </div>
);

interface SelectFieldProps {
  label: string;
  value: string;
  labelClass?: string;
  className?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  value,
  labelClass = "block text-xs font-[500] text-[#334155] mb-1.5 tracking-tight",
  className = "w-full",
}) => (
  <div className={className}>
    <label className={labelClass}>{label}</label>
    <div className="relative">
      <select className="w-full p-3.5 bg-[#F8F9FA] border border-gray-200 rounded-xl text-sm appearance-none outline-none focus:border-[#D4A373]">
        <option>{value}</option>
      </select>
      <ChevronDown
        className="absolute right-4 top-4 text-gray-400 pointer-events-none"
        size={18}
      />
    </div>
  </div>
);

interface InputWithEditProps {
  label: string;
  value: string;
}

const InputWithEdit: React.FC<InputWithEditProps> = ({ label, value }) => (
  <div className="w-full">
    <label className="block text-xs font-[500] text-[#334155] mb-1.5 tracking-tight">
      {label}
    </label>
    <div className="flex items-center bg-[#F8F9FA] border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#D4A373] transition-colors">
      <input
        type="text"
        defaultValue={value}
        className="flex-1 p-3.5 bg-transparent text-sm outline-none"
      />
      <div className="p-3.5 border-l border-gray-200 hover:bg-gray-100 cursor-pointer flex items-center justify-center">
        <Edit2 size={18} className="text-[#D48625] font-bold" />
      </div>
    </div>
  </div>
);

interface InputWithRefreshProps {
  label: string;
  value: string;
}

const InputWithRefresh: React.FC<InputWithRefreshProps> = ({ label, value }) => (
  <div className="w-full">
    <label className="block text-xs font-[500] text-[#334155] mb-1.5 tracking-tight">
      {label}
    </label>
    <div className="flex items-center bg-[#F8F9FA] border border-gray-200 rounded-xl overflow-hidden">
      <input
        type="text"
        defaultValue={value}
        readOnly
        className="flex-1 p-3.5 bg-transparent text-sm text-gray-500 outline-none"
      />
      <div className="h-6 w-px bg-gray-300" />
      <div className="p-3 hover:bg-gray-100 cursor-pointer flex items-center justify-center w-10">
        <RotateCcw size={18} className="text-gray-600" />
      </div>
    </div>
  </div>
);

interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, sub }) => (
  <div className="bg-[#FFFBF5] border border-[#FFD6A7] p-4 rounded-xl">
    <p className="text-[10px] font-bold text-gray-400 mb-1">{label}</p>
    <p className="text-sm font-black text-gray-800">{value}</p>
    {sub && <p className="text-[9px] text-gray-400 font-bold mt-0.5">{sub}</p>}
  </div>
);

interface FigmaProgressProps {
  label: string;
  weight: string;
  percent: string;
}

const FigmaProgress: React.FC<FigmaProgressProps> = ({ label, weight, percent }) => (
  <div className="space-y-1">
    <div className="flex justify-between items-center text-[11px] font-bold">
      <span className="text-gray-500">{label}</span>
      <span className="text-gray-800">{weight}</span>
    </div>
    <div className="h-2 w-full bg-gray-100 rounded-full">
      <div
        className="bg-[#E67E22] h-full rounded-full"
        style={{ width: `${percent}%` }}
      />
    </div>
    <p className="text-[9px] text-right text-gray-400 font-bold">{percent}%</p>
  </div>
);

interface ElementItemProps {
  label: string;
  value: string;
}

const ElementItem: React.FC<ElementItemProps> = ({ label, value }) => (
  <div className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0">
    <div className="flex items-center gap-3">
      <div className="w-2 h-2 rounded-full bg-gray-300" />
      <span className="text-xs font-bold text-gray-600">{label}</span>
    </div>
    <span className="text-xs font-black text-gray-800">{value}</span>
  </div>
);

export default EAFdashboard;

