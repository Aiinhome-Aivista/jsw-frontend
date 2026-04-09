import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { FileText, FileDown } from "lucide-react";
import BackIcon from "../../assets/Group 427321721.png";
import CalendarIcon from "../../assets/Group.png";

interface HeatCard {
  id: string;
  time: string;
  active?: boolean;
  isNew?: boolean;
}

interface HeaderConfig {
  title: string;
  cards: HeatCard[];
  showCards: boolean;
  showToggle: boolean;
  gap: string;
  pb: string;
  pt: string;
  ptZero?: string;
  minWidth?: string;
}

// Configuration for each header type
const headerConfig: Record<string, HeaderConfig> = {
  eaf: {
    title: "EAF - Electric Arc Furnace",
    cards: [
      { id: "1211J2001", time: "2 mins ago", active: true, isNew: true },
      { id: "1211J0001", time: "12 mins ago", active: false },
      { id: "1211J0001", time: "20 mins ago", active: false },
      { id: "1211J0001", time: "22 mins ago", active: false },
      { id: "1211J0001", time: "26 mins ago", active: false },
    ],
    showCards: true,
    showToggle: false,
    gap: "gap-4",
    pb: "pb-4",
    pt: "pt-1",
  },
  aod: {
    title: "AOD - Argon-Oxygen Decarburization",
    cards: [
      { id: "1211J0003", time: "2 mins ago", isNew: true },
      { id: "1211J0001", time: "2 mins ago" },
      { id: "1211J0022", time: "12 mins ago" },
      { id: "1211J0023", time: "22 mins ago" },
      { id: "1211J0024", time: "26 mins ago" },
      { id: "1211J0025", time: "28 mins ago" },
      { id: "1211J0026", time: "29 mins ago" },
      { id: "1211J2001", time: "30 mins ago" },
    ],
    showCards: true,
    showToggle: false,
    gap: "gap-2",
    pb: "pb-2",
    pt: "pt-4",
    ptZero: "pt-2",
    minWidth: "min-w-[130px]",
  },
  lrf: {
    title: "LRF - Ladle Refining Furnace",
    cards: [
      { id: "2602J0001", time: "2 mins ago", isNew: true },
      { id: "2602J0002", time: "2 mins ago" },
      { id: "2602J0003", time: "12 mins ago" },
      { id: "2602J0004", time: "22 mins ago" },
      { id: "2602J0005", time: "26 mins ago" },
      { id: "2602J0006", time: "28 mins ago" },
      { id: "2602J0007", time: "29 mins ago" },
      { id: "2602J0008", time: "30 mins ago" },
    ],
    showCards: true,
    showToggle: false,
    gap: "gap-4",
    pb: "pb-4",
    pt: "pt-1",
    minWidth: "min-w-[130px]",
  },
  slab: {
    title: "Slab Casting",
    cards: [],
    showCards: false,
    showToggle: true,
    gap: "gap-4",
    pb: "pb-4",
    pt: "pt-1",
  },
};

interface ProcessHeaderProps {
  type?: string;
  onSelectCard?: (cardId: string) => void;
  selectedHeatId?: string;
  isHeatSelected?: boolean;
  onOpenModal?: () => void;
  onBack?: () => void;
}

const ProcessHeader: React.FC<ProcessHeaderProps> = ({
  type = "eaf",
  onSelectCard,
  selectedHeatId,
  isHeatSelected = false,
  onOpenModal,
  onBack,
}) => {
  const config = headerConfig[type] || headerConfig.eaf;

  return (
    <div className="w-full text-white font-sans relative z-[300] pr-6">
      {/* Header Section */}
      <div className="flex items-start justify-between mb-2 w-full">
        <div className="flex items-center">
          {/* Back Button with specific margin to define the alignment line */}
          <Box
            component="img"
            src={BackIcon}
            alt="back"
            onClick={onBack}
            className="cs-back-icon cursor-pointer mr-2"
            sx={{ cursor: "pointer" }}
          />

          {/* Vertical stack for Title and Date */}
          <div className="flex flex-col">
            <div className="cs-calculator-inline-header">
              <h2 className="cs-plan-title leading-tight" style={{ margin: 0, fontSize: 21, fontWeight: 600 }}>
                {config.title}
              </h2>
            </div>

            <div className="cs-meta-row flex items-center gap-1">
              <Box
                component="img"
                src={CalendarIcon}
                alt="calendar"
                className="cs-calendar-icon w-3 h-3"
                sx={{ width: 12, height: 12 }}
              />
              <p className="text-[12px] text-white/80 leading-tight" style={{ margin: 0, fontSize: 12 }}>
                Date: 23rd Dec, 2023 | Shift: 3rd Shift (9PM - 5AM)
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Slab/Bloom Toggle - Only show for slab type */}
          {config.showToggle && (
            <div className="flex bg-white p-[3px] rounded-[10px] items-center">
              <Button
                sx={{
                  px: 3,
                  py: 0.75,
                  backgroundColor: "#D48625",
                  color: "white",
                  fontSize: 13,
                  fontWeight: 700,
                  borderRadius: "8px",
                  textTransform: "none",
                  "&:hover": { backgroundColor: "#D48625" },
                }}
              >
                Slab
              </Button>
              <Button
                sx={{
                  px: 3,
                  py: 0.75,
                  backgroundColor: "transparent",
                  color: "#1A1A1A",
                  fontSize: 13,
                  fontWeight: 700,
                  borderRadius: "8px",
                  textTransform: "none",
                  "&:hover": { backgroundColor: "#f5f5f5" },
                }}
              >
                Bloom
              </Button>
            </div>
          )}
          <Button
            sx={{
              p: 1,
              border: "1px solid #4b5563",
              borderRadius: "6px",
              backgroundColor: "#333333",
              minWidth: "auto",
              "&:hover": { backgroundColor: "#4b5563" },
            }}
          >
            <FileText size={18} style={{ color: "#d1d5db" }} />
          </Button>
          <Button
            sx={{
              p: 1,
              border: "1px solid #4b5563",
              borderRadius: "6px",
              backgroundColor: "#333333",
              minWidth: "auto",
              "&:hover": { backgroundColor: "#4b5563" },
            }}
          >
            <FileDown size={18} style={{ color: "#d1d5db" }} />
          </Button>

          <Button
            sx={{
              px: 3,
              py: 1,
              border: "1px solid #4b5563",
              borderRadius: "6px",
              fontWeight: 600,
              fontSize: 14,
              backgroundColor: "#333333",
              color: isHeatSelected ? "white" : "#9ca3af",
              opacity: isHeatSelected ? 1 : 0.4,
              cursor: isHeatSelected ? "pointer" : "not-allowed",
              textTransform: "none",
              "&:hover": { backgroundColor: isHeatSelected ? "#4b5563" : "#333333" },
            }}
          >
            Save As Draft
          </Button>

          <Button
            onClick={() => isHeatSelected && onOpenModal && onOpenModal()}
            sx={{
              px: 5,
              py: 1,
              backgroundColor: "#D48625",
              borderRadius: "6px",
              fontWeight: 700,
              fontSize: 14,
              color: "white",
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)",
              cursor: isHeatSelected ? "pointer" : "not-allowed",
              opacity: isHeatSelected ? 1 : 0.4,
              textTransform: "none",
              "&:hover": { backgroundColor: isHeatSelected ? "#D48625" : "#D48625" },
            }}
          >
            Submit
          </Button>
        </div>
      </div>

      {/* Cards Section - Only show if showCards is true */}
      {config.showCards && (
        <div className={`flex ${config.gap} overflow-x-auto ${config.pb} scrollbar-hide ${config.pt}`}>
          {config.cards.map((card, index) => {
            const isSelected = selectedHeatId === card.id;

            return (
              <Paper
                key={index}
                onClick={() => onSelectCard && onSelectCard(card.id)}
                className={`relative ${config.minWidth || "min-w-[150px]"} p-1 pt-2 rounded-lg border-2 transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#FFE9D1] border-[#D97706] ring-1 ring-[#D97706]"
                    : "bg-[#2b2b2b] border-gray-500 hover:border-gray-500"
                }`}
                elevation={0}
                sx={{
                  backgroundColor: isSelected ? "#FFE9D1" : "#2b2b2b",
                  borderColor: isSelected ? "#D97706" : "#6b7280",
                }}
              >
                {card.isNew && (
                  <span className="absolute -top-2 left-2 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-[3px] z-10">
                    New
                  </span>
                )}

                <Typography
                  sx={{
                    fontSize: 15,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    color: isSelected ? "black" : "white",
                    lineHeight: 1.2,
                    px: 0.5,
                  }}
                >
                  {card.id}
                </Typography>

                <Typography
                  sx={{
                    fontSize: 10,
                    color: isSelected ? "black" : "white",
                    mt: 0.5,
                    px: 0.5,
                  }}
                >
                  {card.time}
                </Typography>
              </Paper>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProcessHeader;

