import {
  Box,
  Button,
  Paper,
  Radio,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import {
  CalendarDays,
  ChevronRight,
  ClipboardList,
  ShieldCheck,
  Truck,
} from "lucide-react";
import Header from "./Header";
import vehicleEntryData from "@/data/vehicleEntryData";

type InspectionField = {
  label: string;
  options: string[];
  selected: string;
};

const initialInspectionFields: InspectionField[] = [
  { label: "Parking required", options: ["No", "Yes"], selected: "Yes" },
  { label: "Seal", options: ["Ok", "Not Ok"], selected: "Ok" },
  { label: "Tirpal", options: ["Ok", "Not Ok"], selected: "Ok" },
  { label: "Moisture", options: ["Yes", "No"], selected: "Yes" },
  { label: "Dust", options: ["Yes", "No"], selected: "Yes" },
  { label: "Mixing", options: ["Yes", "No"], selected: "Yes" },
  { label: "Malpractice", options: ["Yes", "No"], selected: "No" },
  { label: "Tripal Re-applied", options: ["Yes", "No"], selected: "No" },
];

const actionButtonSx = {
  borderRadius: "12px",
  px: 4,
  py: 1.6,
  textTransform: "none",
  fontWeight: 700,
  fontSize: "15px",
  boxShadow: "none",
};

const SecurityInspection = () => {
  const [activeVehicleNumber, setActiveVehicleNumber] = useState(
    vehicleEntryData[0]?.vehicleNumber ?? "",
  );

  const [inspectionFields, setInspectionFields] = useState<InspectionField[]>(
    initialInspectionFields,
  );

  const activeVehicle =
    vehicleEntryData.find(
      (vehicle) => vehicle.vehicleNumber === activeVehicleNumber,
    ) ?? vehicleEntryData[0];

  const handleOptionChange = (fieldIndex: number, option: string) => {
    setInspectionFields((prev) =>
      prev.map((field, i) =>
        i === fieldIndex ? { ...field, selected: option } : field,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-[#f6f7f9]">
      <Header />

      <div className="-mt-[92px] px-5 pb-8">
        <div className="mb-4 flex items-center justify-between">
          <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: "18px" }}>
            Security Inspection
          </Typography>
        </div>

        {/* Vehicle cards row */}
        <div className="mb-4 flex items-stretch gap-3 overflow-x-auto pb-2">
          {vehicleEntryData.map((vehicle) => {
            const isActive = vehicle.vehicleNumber === activeVehicle?.vehicleNumber;
            const isNew = "isNew" in vehicle && vehicle.isNew;
            return (
              <Paper
                key={vehicle.vehicleNumber}
                elevation={0}
                onClick={() => setActiveVehicleNumber(vehicle.vehicleNumber)}
                className="min-w-[136px] cursor-pointer rounded-xl border p-3 transition-colors"
                sx={{
                  backgroundColor: isActive ? "#fff4e7" : "#3E3D3B",
                  borderColor: isActive ? "#F0CFA4" : "rgba(255,255,255,0.16)",
                  color: isActive ? "#2F2F2F" : "#fff",
                  boxShadow: "none",
                }}
              >
                <div className="flex items-start justify-between gap-2">
                  <Typography
                    sx={{ fontSize: "14px", fontWeight: 700, lineHeight: 1.2 }}
                  >
                    {vehicle.vehicleNumber}
                  </Typography>

                  {isNew && (
                    <span className="rounded-md bg-[#FF4D4F] px-1.5 py-0.5 text-[9px] font-semibold text-white">
                      New
                    </span>
                  )}


                </div>
                <Typography
                  sx={{
                    mt: 0.8,
                    fontSize: "12px",
                    color: isActive ? "#565656" : "rgba(255,255,255,0.75)",
                  }}
                >
                  {isActive ? "Now" : vehicle.time}
                </Typography>
              </Paper>
            );
          })}

          <div className="flex items-center">
            <button className="flex h-11 w-11 items-center justify-center rounded-full bg-[#D88A28] text-white shadow-sm">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Main inspection card */}
        <Paper
          elevation={0}
          className="overflow-hidden rounded-[22px] border border-[#ececec] bg-white"
          sx={{
            backgroundColor: "#ffffff",
            borderColor: "#ececec",
            boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
          }}
        >
          {/* Card header */}
          <div className="border-b border-[#ececec] px-5 py-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <Typography
                  sx={{ fontWeight: 700, fontSize: "22px", color: "#1f1f1f" }}
                >
                  Vehicle inspection
                </Typography>

                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[#5c5c5c]">
                  <div className="flex items-center gap-1.5 text-[13px]">
                    <ClipboardList size={15} />
                    <span>LECI No: {activeVehicle?.leciNumber ?? "--"}</span>
                  </div>

                  <span className="text-[#d0d0d0] text-[13px]">•</span>

                  <div className="flex items-center gap-1.5 text-[13px]">
                    <Truck size={15} />
                    <span>Vehicle No: {activeVehicle?.vehicleNumber ?? "--"}</span>
                  </div>

                  <span className="text-[#d0d0d0] text-[13px]">•</span>

                  <div className="flex items-center gap-1.5 text-[13px]">
                    <CalendarDays size={15} />
                    <span>Date: {activeVehicle?.date ?? "--"}</span>
                  </div>
                </div>
              </div>

              <Stack direction="row" spacing={1.5} className="flex-wrap">
                <Button
                  variant="outlined"
                  sx={{
                    ...actionButtonSx,
                    borderColor: "#E6A54A",
                    color: "#D48725",
                    "&:hover": { borderColor: "#D48725", backgroundColor: "#fff9f0" },
                  }}
                >
                  Form 103
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    ...actionButtonSx,
                    backgroundColor: "#E4E4E4",
                    color: "#1E1E1E",
                    "&:hover": { backgroundColor: "#d8d8d8" },
                  }}
                >
                  Hold
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    ...actionButtonSx,
                    backgroundColor: "#09A95B",
                    color: "#fff",
                    "&:hover": { backgroundColor: "#099651" },
                  }}
                >
                  Approve
                </Button>
              </Stack>
            </div>
          </div>

          {/* Card body */}
          <div className="grid gap-5 px-5 py-4 xl:grid-cols-[minmax(0,1fr)_246px]">
            {/* Inspection fields */}
            <div className="rounded-[14px] bg-[#F5F5F5] p-6">
              {inspectionFields.map((field, index) => (
                <div
                  key={field.label}
                  className={`${
                    index !== inspectionFields.length - 1
                      ? "border-b border-dashed border-[#d7d7d7]"
                      : ""
                  }`}
                >
                  <div className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: 600,
                        color: "#242424",
                      }}
                    >
                      {field.label}
                    </Typography>

                    <div className="flex items-center gap-5">
                      {field.options.map((option) => {
                        const checked = field.selected === option;

                        return (
                          <label
                            key={option}
                            className="flex cursor-pointer items-center gap-1.5 text-[15px] text-[#4f4f4f]"
                          >
                            <Radio
                              checked={checked}
                              value={option}
                              onChange={() => handleOptionChange(index, option)}
                              disableRipple
                              sx={{
                                p: 0,
                                color: "#CDD8E6",
                                "&.Mui-checked": {
                                  color: "#D48725",
                                },
                              }}
                            />
                            <span>{option}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}

              {/* Remarks */}
              <div className="pt-8">
                <Typography
                  sx={{
                    mb: 1.5,
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#333",
                  }}
                >
                  Remarks
                </Typography>
                <Box
                  component="textarea"
                  rows={4}
                  defaultValue=""
                  placeholder="Add remarks..."
                  sx={{
                    width: "100%",
                    resize: "none",
                    borderRadius: "14px",
                    border: "1px solid #E1E1E1",
                    backgroundColor: "#fff",
                    px: 2,
                    py: 1.5,
                    fontSize: "14px",
                    color: "#333",
                    outline: "none",
                    fontFamily: "inherit",
                    "&:focus": {
                      borderColor: "#D48725",
                    },
                  }}
                />
              </div>
            </div>

            {/* Timeline panel */}
            <div className="rounded-[14px] border border-[#EEB66C] bg-[#FFFDF9] p-5">
              <div className="relative pl-8">
                {/* Vertical green line connecting both dots */}
                <div className="absolute left-[11px] top-3 h-[92px] w-[2px] bg-[#20B26C]" />

                {/* Gate Entry */}
                <div className="relative mb-8">
                  <div className="absolute left-[-32px] top-0 flex h-6 w-6 items-center justify-center rounded-full bg-[#20B26C] text-white">
                    <ShieldCheck size={15} />
                  </div>
                  <Typography
                    sx={{ fontSize: "18px", fontWeight: 700, color: "#404040" }}
                  >
                    Gate Entry
                  </Typography>
                  <div className="mt-1 flex items-center gap-2 text-[12px] text-[#8A8A8A]">
                    <CalendarDays size={13} />
                    <span>23rd Dec, 2026 | 10:30 AM</span>
                  </div>
                </div>

                {/* Security Inspection */}
                <div className="relative">
                  <div className="absolute left-[-28px] top-1 h-4 w-4 rounded-full border-[3px] border-white bg-[#D48725] shadow-[0_0_0_2px_#EEB66C]" />
                  <Typography
                    sx={{ fontSize: "18px", fontWeight: 700, color: "#404040" }}
                  >
                    Security Inspection
                  </Typography>
                </div>
              </div>

              <div className="mt-10 rounded-2xl bg-white/70 p-4" />
            </div>
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default SecurityInspection;
