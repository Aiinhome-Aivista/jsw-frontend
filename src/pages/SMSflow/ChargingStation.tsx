/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "../../css/ChargingStation.css";
import IntimationSlipModal from "../../components/modals/IntimationSlipModal";
import EAFCard from "../../components/process/EAFCard";
import AODCard from "../../components/process/AODCard";
import SlabCard from "../../components/process/SlabCard";
import ProcessHeader from "../../components/process/ProcessHeader";
import ConfirmationModal from "../../components/modals/ConfirmationModal";
import HeatSubmissionModal from "../../components/modals/HeatSubmissionModal";
import AODSubmitModal from "../../components/modals/AODSubmitModal";
import TrolleySelectionComponent, {
  TrolleySelectionModal,
} from "../../components/process/TrolleySelectionComponent";
import RMReceiptsDrawer from "../../components/process/RMReceiptsDrawer";

// Image imports from assets
import NoResultsIcon from "../../assets/No Results@3x.png";
import GroupBackIcon from "../../assets/Group 427321721.png";
import GroupCalendarIcon from "../../assets/Group.png";
import ButtonExportIcon from "../../assets/Button.png";
import SortIcon from "../../assets/sort.png";
import VectorIcon from "../../assets/Vector.png";

import ChargePlanPage from "./ChargePlanPage";
import ChargingStationReport from "./ChargingStationReport";
import RMIntimationSlipModal from "@/components/modals/RMIntimationSlipModal";
import RMSupplySlipSummaryModal from "@/components/modals/RMSupplySlipSummaryModal";
import EAFdashboard from "./EAFDashboard";
import AODdashboard from "./AODdashboard";
import LRFDashboard from "./LRFDashboard";

// --- Types ---
interface InfoChipProps {
  label: string;
  value: string;
  highlight?: boolean;
}

interface FormData {
  grade: string;
  orderNumber: string;
  series: string;
  heatNumber: string;
  totalChargeweight: string;
}

interface Step {
  id: string;
  label: string;
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

const InfoChip: React.FC<InfoChipProps> = ({ label, value, highlight }) => (
  <div className={`info-chip-container ${highlight ? "is-highlighted" : ""}`}>
    <span className="info-chip-label">{label}</span>
    <span className="info-chip-value">{value}</span>
  </div>
);

const ChargingStation: React.FC = () => {
  const [view, setView] = useState<string>("basic");
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isSlipOpen, setIsSlipOpen] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<string>("01");
  const [capturedBuckets, setCapturedBuckets] = useState<Bucket[]>([]);
  const [selectedHeat, setSelectedHeat] = useState<string | undefined>(undefined);
  const [showRMSlip, setShowRMSlip] = useState<boolean>(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);
  const [showHeatSubmissionModal, setShowHeatSubmissionModal] = useState<boolean>(false);
  const [showAODSubmitModal, setShowAODSubmitModal] = useState<boolean>(false);
  const [showTrolleyModal, setShowTrolleyModal] = useState<boolean>(false);
  const [isTrolleySelected, setIsTrolleySelected] = useState<boolean>(false);
  const [showRMIntimationSlipModal, setShowRMIntimationSlipModal] = useState<boolean>(false);
  const [showRMSupplySlipSummaryModal, setShowRMSupplySlipSummaryModal] = useState<boolean>(false);

  const initialData: FormData = {
    grade: "SS 304",
    orderNumber: "#45678",
    series: "1",
    heatNumber: "1211J2001",
    totalChargeweight: "50",
  };

  const [formData, setFormData] = useState<FormData>(initialData);

  const steps: Step[] = [
    { id: "01", label: "Charging Station" },
    { id: "02", label: "EAF" },
    { id: "03", label: "AOD" },
    { id: "04", label: "LRF" },
    { id: "05", label: "Slab Casting" },
    { id: "06", label: "Grinding" },
  ];

  useEffect(() => {
    document.body.style.overflow = showRMSlip ? "hidden" : "unset";
  }, [showRMSlip]);

  const handleSave = () => {
    setIsSaved(true);
    alert("Basic Details Saved! You can now access the Charge Calculator.");
  };

  const handleTabChange = (target: string) => {
    if (target === "calculator" && !isSaved) {
      alert("Please save basic details first.");
      return;
    }
    setView(target);
  };

  const handleCancel = () => {
    setFormData(initialData);
    setIsSaved(false);
  };

  const handleFinalSubmit = () => {
    if (view === "calculator") {
      setView("report");
    } else if (view === "report") {
      handleStepChange(2);
    }
  };

  const handleStepChange = (id: number) => {
    const stepId = id < 10 ? `0${id}` : `${id}`;
    setActiveStep(stepId);
    if (stepId !== "01") {
      setView("process_view");
    } else {
      setView("basic");
    }
    if (stepId === "02" || stepId === "03" || stepId === "04") {
      setSelectedHeat(undefined);
    }
  };

  const renderContent = () => {
    if (activeStep === "01") {
      if (view === "report") {
        return (
        <ChargingStationReport
            formData={formData}
            buckets={capturedBuckets}
            onBack={() => setView("calculator")}
            onViewChange={(target) => setView(target)}
            onToggleSlip={(isOpen) => setIsSlipOpen(isOpen)}
          />
        );
      }

      return (
        <div className="cs-card-content">
          {view !== "calculator" && (
            <div className="cs-section-header">
              <h3>Stockers Weight Report</h3>
              <div className="cs-tab-actions">
                <button
                  className={`cs-tab-btn ${isSlipOpen ? "active-tab" : ""}`}
                  onClick={() => setIsSlipOpen(true)}
                >
                  Intimation Slip
                </button>
                <button
                  className={`cs-tab-btn ${view === "calculator" ? "active-tab" : ""}`}
                  onClick={() => handleTabChange("calculator")}
                >
                  Charge Calculator
                </button>
              </div>
            </div>
          )}

          {view === "basic" && (
            <div className="cs-form-grid">
              <div className="cs-form-col">
                <div className="cs-details-head">
                  <span className="cs-step-badge">1</span> Basic Details
                </div>
                <div className="cs-input-group">
                  <label>
                    Grade <span className="text-red-500">*</span>
                  </label>
                  <div className="cs-select-container is-locked">
                    <select
                      className="cs-form-input cs-dropdown"
                      value={formData.grade}
                      onChange={(e) =>
                        setFormData({ ...formData, grade: e.target.value })
                      }
                    >
                      <option value="SS 304">SS 304</option>
                      <option value="SS 316">SS 316</option>
                    </select>
                    <img
                      src={VectorIcon}
                      className="cs-dropdown-icon"
                      alt="dropdown"
                    />
                  </div>
                </div>
                <div className="cs-input-group">
                  <label>
                    Order Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="cs-form-input"
                    value={formData.orderNumber}
                    readOnly
                  />
                </div>
                <div className="cs-input-group">
                  <label>
                    Series <span className="text-red-500">*</span>
                  </label>
                  <div className="cs-select-container">
                    <select
                      className="cs-form-input cs-dropdown"
                      value={formData.series}
                      onChange={(e) =>
                        setFormData({ ...formData, series: e.target.value })
                      }
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>
                    <img
                      src={VectorIcon}
                      className="cs-dropdown-icon"
                      alt="dropdown"
                    />
                  </div>
                </div>
                <div className="cs-input-group">
                  <label>
                    Heat Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="cs-form-input"
                    value={formData.heatNumber}
                    readOnly
                  />
                </div>
                <div className="cs-input-group">
                  <label>
                    Proposed Weight (T) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="cs-form-input"
                    value={formData.totalChargeweight}
                    readOnly
                  />
                </div>
                <div className="cs-button-group">
                  <button
                    className="cs-btn cs-btn-cancel cs-btn-cancel:hover"
                    onClick={handleCancel}
                  >
                    Reset
                  </button>
                  <button
                    className="cs-btn cs-btn-confirm cs-btn-confirm:hover"
                    onClick={handleSave}
                  >
                    Confirm
                  </button>
                </div>
              </div>
              <div className="cs-calc-placeholder">
                <img src={NoResultsIcon} alt="calc" />
                <h4>Click Charge Calculator for Composition</h4>
                <p>Add Material Composition after adding Heat Information</p>
              </div>
            </div>
          )}

          {view === "calculator" && (
            <ChargePlanPage
              data={formData}
              onBack={() => setView("basic")}
              onUpdateBuckets={setCapturedBuckets}
              onOpenRMReceipts={() => setShowRMSlip(true)}
            />
          )}
        </div>
      );
    }

    if (activeStep === "02") {
      return selectedHeat ? (
        <EAFdashboard heatId={selectedHeat} />
      ) : (
        <EAFCard />
      );
    }

    if (activeStep === "03") {
      return selectedHeat ? (
        <AODdashboard heatId={selectedHeat} />
      ) : (
        <AODCard />
      );
    }

    if (activeStep === "04") {
      return isTrolleySelected && selectedHeat ? (
        <LRFDashboard
          heatId={selectedHeat}
          onOpenTrolleyModal={() => setShowTrolleyModal(true)}
          onSubmitLRFIntimation={() => handleStepChange(5)}
        />
      ) : (
        <TrolleySelectionComponent
          onTrolleySelect={() => setIsTrolleySelected(true)}
        />
      );
    }

    if (activeStep === "05") {
      return selectedHeat ? <SlabCard heatId={selectedHeat} /> : <SlabCard />;
    }

    return (
      <TrolleySelectionComponent
        onTrolleySelect={() => setIsTrolleySelected(true)}
      />
    );
  };

  return (
    <div className="cs-layout">
      <div className="cs-dark-banner">
        <div className="cs-banner-content">
          <div className="cs-banner-waves">
            <svg
              viewBox="0 0 1440 250"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  id="waveGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#D48625" stopOpacity={0} />
                  <stop offset="50%" stopColor="#D48625" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#D48625" stopOpacity={0} />
                </linearGradient>
              </defs>

              {/* 6 Layered Paths for "More Waves" */}
              <path
                d="M-100,120 C200,280 400,0 720,120 C1040,240 1240,40 1540,150"
                stroke="url(#waveGradient)"
                strokeWidth="3"
                fill="none"
              />
              <path
                d="M-100,100 C250,220 500,20 800,140 C1100,260 1300,60 1540,120"
                stroke="url(#waveGradient)"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M-100,150 C300,50 600,250 900,100 C1200,-50 1400,200 1540,100"
                stroke="url(#waveGradient)"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M-100,80 C150,180 450,30 750,130 C1050,230 1250,50 1540,160"
                stroke="url(#waveGradient)"
                strokeWidth="2.5"
                fill="none"
              />
              <path
                d="M-100,130 C350,250 650,50 950,150 C1250,250 1450,100 1540,180"
                stroke="url(#waveGradient)"
                strokeWidth="1"
                fill="none"
              />
              <path
                d="M-100,110 C200,40 500,280 800,120 C1100,-40 1300,220 1540,140"
                stroke="url(#waveGradient)"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>
          <div className="cs-header-left">
            {activeStep === "02" ? (
              <ProcessHeader
                type="eaf"
                onSelectCard={(id) => setSelectedHeat(id)}
                selectedHeatId={selectedHeat}
                isHeatSelected={!!selectedHeat}
                onOpenModal={() => setShowHeatSubmissionModal(true)}
                onBack={() => handleStepChange(1)}
              />
            ) : activeStep === "03" ? (
              <ProcessHeader
                type="aod"
                onSelectCard={(id) => setSelectedHeat(id)}
                selectedHeatId={selectedHeat}
                isHeatSelected={!!selectedHeat}
                onOpenModal={() => setShowAODSubmitModal(true)}
                onBack={() => handleStepChange(2)}
              />
            ) : activeStep === "04" ? (
              <ProcessHeader
                type="lrf"
                onSelectCard={(id) => isTrolleySelected && setSelectedHeat(id)}
                selectedHeatId={selectedHeat}
                isHeatSelected={!!selectedHeat}
                onOpenModal={() => {}}
                onBack={() => handleStepChange(3)}
              />
            ) : activeStep === "05" ? (
              <ProcessHeader
                type="slab"
                onSelectCard={(id) => setSelectedHeat(id)}
                selectedHeatId={selectedHeat}
                isHeatSelected={!!selectedHeat}
                onOpenModal={() => {}}
                onBack={() => handleStepChange(4)}
              />
            ) : (
              <>
                {(activeStep !== "01" ||
                  view === "calculator" ||
                  view === "report") && (
                  <img
                    src={GroupBackIcon}
                    alt="back"
                    className="cs-back-icon cursor-pointer"
                    style={{
                      height:"22px",width:"22px"
                    }}
                    onClick={() => {
                      if (view === "report") setView("calculator");
                      else if (activeStep !== "01") handleStepChange(1);
                      else setView("basic");
                    }}
                  />
                )}
                <div className="cs-title-stack">
                  <div className="flex items-center gap-4">
                    <h2 className="cs-plan-title" style={{ fontSize: "16px" }}>
                      {view === "calculator"
                        ? `Charge Calculator`
                        : steps.find((s) => s.id === activeStep)?.label}
                    </h2>
                    {view === "calculator" && activeStep === "01" && (
                      <div className="cs-inline-chips flex gap-2">
                        <InfoChip label="Heat Number" value={formData.heatNumber} />
                        <InfoChip
                          label="Order Number"
                          value={formData.orderNumber}
                        />
                        <InfoChip
                          label="Grade"
                          value={formData.grade}
                          highlight
                        />
                        
                        <InfoChip label="Total Charge Weight(T)" value={String(formData.totalChargeweight)} />
                      </div>
                    )}
                  </div>
                  {view !== "calculator" && (
                    <div className="cs-meta-row">
                      <img
                        src={GroupCalendarIcon}
                        alt="calendar"
                        className="cs-calendar-icon"
                      />
                      <p className="text-[10px] text-white/80">
                        Date: 23rd Dec, 2023 | Shift: 3rd Shift (9PM - 5AM)
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          <div className="cs-header-right">
            {activeStep === "01" && (
              <>
                <button className="cs-export-btn">
                  <img src={ButtonExportIcon} alt="export" />
                </button>
                <button
                  className={`cs-submit-btn ${view === "basic" ? "is-disabled" : ""}`}
                  onClick={handleFinalSubmit}
                  disabled={view === "basic"}
                >
                  Submit
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="cs-content-container">
        <div
          className={`cs-card ${view === "calculator" && activeStep === "01" ? "cs-calculator-overlay" : ""}`}
        >
          <div className="content-area min-h-[500px]">{renderContent()}</div>
        </div>
      </div>

      {view !== "calculator" && activeStep === "01" && (
        <div
          className={`fixed top-[220px] z-[9999] transition-all duration-300 ease-in-out flex items-center ${
            showRMSlip ? "right-[280px]" : "right-0"
          }`}
          onClick={() => setShowRMSlip(!showRMSlip)}
        >
          {/* Wrap the tab in a relative container so the badge can be positioned absolutely */}
          <div className="relative">
            {/* The 03 Badge - Positioned to overlap the top left corner */}
            <div className="absolute -top-4 -left-3 w-10 h-10 bg-[#E34E4E] rounded-full flex items-center justify-center text-white font-bold text-[16px] shadow-md z-[10000] border-2 border-white/10">
              03
            </div>

            <div className="bg-[#D48625] text-white w-[36px] py-6 rounded-l-[10px] flex flex-col items-center gap-3 shadow-[-4px_0_10px_rgba(0,0,0,0.1)] cursor-pointer hover:bg-[#D48625]">
              <img
                src={SortIcon}
                alt="sort"
                className="bg-[#D48625] w-5 h-5 rounded-sm flex items-center justify-center"
              />
              <div className="[writing-mode:vertical-lr] rotate-180 font-[500] text-[14px] tracking-widest ">
                RM Receipts
              </div>
            </div>
          </div>
        </div>
      )}
      {/* PORTALS */}
      {ReactDOM.createPortal(
        <RMReceiptsDrawer
          isOpen={showRMSlip}
          onClose={() => setShowRMSlip(false)}
          onViewDetails={(type) => {
            if (type === "Intimation Slip") {
              setShowRMIntimationSlipModal(true);
            } else if (type === "Issue Slip") {
              setShowRMSupplySlipSummaryModal(true);
            }
          }}
        />,
        document.body,
      )}

      {showRMIntimationSlipModal &&
        ReactDOM.createPortal(
          <RMIntimationSlipModal
            onClose={() => setShowRMIntimationSlipModal(false)}
          />,
          document.body,
        )}

      {showRMSupplySlipSummaryModal &&
        ReactDOM.createPortal(
          <RMSupplySlipSummaryModal
            onClose={() => setShowRMSupplySlipSummaryModal(false)}
          />,
          document.body,
        )}

      {isSlipOpen && (
          <IntimationSlipModal
            onBack={() => setIsSlipOpen(false)}
            onSubmit={() => setIsSlipOpen(false)}
          />
      )}

      {showConfirmationModal &&
        ReactDOM.createPortal(
          <ConfirmationModal
            isOpen={showConfirmationModal}
            onClose={() => setShowConfirmationModal(false)}
            onConfirm={() => setShowConfirmationModal(false)}
            heatNumber={selectedHeat || undefined}
          />,
          document.body,
        )}

      {showHeatSubmissionModal &&
        ReactDOM.createPortal(
          <HeatSubmissionModal
            isOpen={showHeatSubmissionModal}
            onClose={() => setShowHeatSubmissionModal(false)}
            onSubmit={() => {
              setShowHeatSubmissionModal(false);
              handleStepChange(3);
            }}
            heatNumber={selectedHeat || "1211J0001"}
            showTrolley={false}
          />,
          document.body,
        )}

      {showAODSubmitModal &&
        ReactDOM.createPortal(
          <AODSubmitModal
            isOpen={showAODSubmitModal}
            onClose={() => setShowAODSubmitModal(false)}
            onSubmit={() => {
              setShowAODSubmitModal(false);
              handleStepChange(4);
            }}
            heatNumber={selectedHeat || "1211J0001"}
          />,
          document.body,
        )}

      {showTrolleyModal &&
        ReactDOM.createPortal(
          <TrolleySelectionModal
            onClose={() => setShowTrolleyModal(false)}
            onConfirmSubmit={() => setShowTrolleyModal(false)}
          />,
          document.body,
        )}
    </div>
  );
};

export default ChargingStation;

