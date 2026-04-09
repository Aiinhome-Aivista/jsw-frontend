import React from "react";
import {
  X,
  Calendar,
  Clock,
  User,
  Layers,
  Box,
  ShoppingBag,
  ChevronRight,
} from "lucide-react";
import {
  Box as MuiBox,
  Typography,
  FormControl,
  Select,
  MenuItem,
  IconButton,
  Paper,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// --- Types ---
interface Receipt {
  id: string;
  type: string;
  date: string;
  material: number;
  quantity: string;
}

interface FilterSelectProps {
  label: string;
  icon: React.ReactNode;
  value: string;
}

interface RMReceiptsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onViewDetails: (type: string) => void;
}

// --- Styled Components ---
const DrawerContainer = styled("div")({
  position: "fixed",
  top: 0,
  right: 0,
  height: "100vh",
  width: "280px",
  backgroundColor: "#fff",
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  zIndex: 9999,
  display: "flex",
  flexDirection: "column" as const,
  transform: "translateX(100%)",
  transition: "transform 300ms ease-in-out",
  overflow: "hidden",
  "&.open": {
    transform: "translateX(0)",
  },
  "&::-webkit-scrollbar": {
    display: "none",
  },
  msOverflowStyle: "none",
  scrollbarWidth: "none",
});

const Overlay = styled("div")({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.3)",
  zIndex: 9998,
  opacity: 0,
  pointerEvents: "none",
  transition: "opacity 300ms ease-in-out",
  "&.open": {
    opacity: 1,
    pointerEvents: "auto",
  },
});

const DrawerContent = styled("div")({
  flex: 1,
  overflow: "auto",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  msOverflowStyle: "none",
  scrollbarWidth: "none",
});

const FilterSelect: React.FC<FilterSelectProps> = ({ label, icon, value }) => (
  <MuiBox sx={{ display: "flex", flexDirection: "column" }}>
    <Typography
      variant="caption"
      sx={{
        fontSize: "8px",
        fontWeight: 700,
        color: "#9ca3af",
        display: "flex",
        alignItems: "center",
        gap: 0.5,
      }}
    >
      {icon} {label}
    </Typography>
    <FormControl size="small" sx={{ mt: 0.5 }}>
      <Select
        value={value}
        sx={{
          backgroundColor: "#f9fafb",
          border: "none",
          borderRadius: "8px",
          fontSize: "12px",
          fontWeight: 400,
          color: "#374151",
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
        }}
      >
        <MenuItem value={value}>{value}</MenuItem>
      </Select>
    </FormControl>
  </MuiBox>
);

// --- Main Component: RMReceiptsDrawer ---
const RMReceiptsDrawer: React.FC<RMReceiptsDrawerProps> = ({
  isOpen,
  onClose,
  onViewDetails,
}) => {
  const receipts: Receipt[] = [
    {
      id: "#123",
      type: "Intimation Slip",
      date: "March 15, 2024",
      material: 27,
      quantity: "270 Kg",
    },
    {
      id: "#124",
      type: "Issue Slip",
      date: "March 15, 2024",
      material: 27,
      quantity: "270 Kg",
    },
  ];

  return (
    <>
      <Overlay className={isOpen ? "open" : ""} onClick={onClose} />
      <DrawerContainer className={isOpen ? "open" : ""}>
        <MuiBox
          sx={{
            p: 2,
            borderBottom: "1px solid #f3f4f6",
            position: "relative",
          }}
        >
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "#9ca3af",
              "&:hover": {
                color: "#000",
              },
            }}
          >
            <X size={20} />
          </IconButton>
          <Typography
            sx={{
              fontWeight: 600,
              color: "#111827",
              fontSize: "14px",
            }}
          >
            Raw Material Receipts
          </Typography>
          <Typography
            sx={{
              fontSize: "10px",
              color: "#9ca3af",
            }}
          >
            Raw Material Receipts from RM Station
          </Typography>
        </MuiBox>

        <MuiBox
          sx={{
            p: 2,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 2,
          }}
        >
          <FilterSelect
            label="Date"
            icon={<Calendar size={12} />}
            value="All Dates"
          />
          <FilterSelect
            label="Shift"
            icon={<Layers size={12} />}
            value="All Shifts"
          />
          <FilterSelect
            label="Time"
            icon={<Clock size={12} />}
            value="All Times"
          />
          <FilterSelect
            label="Supervisor"
            icon={<User size={12} />}
            value="All Supervisors"
          />
        </MuiBox>

        <MuiBox
          sx={{
            borderTop: "1px dashed #9ca3af",
          }}
        />

        <DrawerContent>
          {receipts.map((item, idx) => (
            <Paper
              key={idx}
              sx={{
                m: 2,
                p: 2,
                backgroundColor: "#fff",
                border: "1px solid #f3f4f6",
                borderRadius: "8px",
                boxShadow: "none",
              }}
            >
              <MuiBox sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <MuiBox
                  sx={{
                    backgroundColor: "#FFF5ED",
                    p: 1,
                    borderRadius: "6px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Layers size={14} style={{ color: "#FF8A00" }} />
                </MuiBox>
                <Typography
                  sx={{
                    fontWeight: 500,
                    color: "#111827",
                    fontSize: "14px",
                  }}
                >
                  {item.type} {item.id}
                </Typography>
              </MuiBox>

              <MuiBox
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "#9ca3af",
                  fontSize: "10px",
                  gap: 0.5,
                  ml: 4.5,
                  mb: 1,
                }}
              >
                <Calendar size={10} /> {item.date}
              </MuiBox>

              <MuiBox
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 1,
                  mb: 2,
                }}
              >
                <MuiBox
                  sx={{
                    backgroundColor: "#f9fafb",
                    p: 1,
                    borderRadius: "6px",
                  }}
                >
                  <MuiBox
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      color: "#6b7280",
                      fontSize: "10px",
                      fontWeight: 500,
                    }}
                  >
                    <Box size={10} /> Total Material
                  </MuiBox>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      color: "#111827",
                      fontSize: "12px",
                    }}
                  >
                    {item.material}
                  </Typography>
                </MuiBox>
                <MuiBox
                  sx={{
                    backgroundColor: "#f9fafb",
                    p: 1,
                    borderRadius: "6px",
                  }}
                >
                  <MuiBox
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      color: "#6b7280",
                      fontSize: "10px",
                      fontWeight: 500,
                    }}
                  >
                    <ShoppingBag size={10} /> Total Quantity
                  </MuiBox>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      color: "#111827",
                      fontSize: "12px",
                    }}
                  >
                    {item.quantity}
                  </Typography>
                </MuiBox>
              </MuiBox>

              <Button
                onClick={() => onViewDetails(item.type)}
                variant="contained"
                disableElevation
                sx={{
                  width: "100%",
                  py: 1,
                  borderRadius: "8px",
                  backgroundColor: "#FFF9F2",
                  color: "#FF8A00",
                  fontWeight: 500,
                  fontSize: "12px",
                  textTransform: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 0.5,
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "#FFF5ED",
                    boxShadow: "none",
                  },
                }}
              >
                View Details <ChevronRight size={14} />
              </Button>
            </Paper>
          ))}
        </DrawerContent>
      </DrawerContainer>
    </>
  );
};

export default RMReceiptsDrawer;

