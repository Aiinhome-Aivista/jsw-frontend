import React from "react";
import { AppBar, Toolbar, Box, Typography, Avatar, Menu, MenuItem } from "@mui/material";
import { ChevronDown, LogOut } from "lucide-react";
import JSLLogo from "../../assets/JSL-Black-1 1.png";
import VectorHader from "../../assets/VectorHader.png";
import { useAppContext } from "../../context/AppContext";
import AddVehicleModal from "../../components/modals/AddVehicleModal";

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { setShowModal } = useAppContext();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(29,29,29,0.9), rgba(42,42,42,0.9)),
          url(${VectorHader})
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="h-[200px]"
    >
      <AppBar position="static" sx={{ background: "transparent", boxShadow: "none" }}>
        <Toolbar
          sx={{
            flexDirection: "column",
            alignItems: "stretch",
            padding: "0 !important",
          }}
        >
          {/* ===== TOP ROW ===== */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              px: 3,
              py: 1.5,
            }}
          >
            {/* Left */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box component="img" src={JSLLogo} sx={{ height: "32px" }} />

              <Box
                sx={{
                  width: "1px",
                  height: "32px",
                  backgroundColor: "#ffffff",
                  margin: "0 20px",
                  opacity: 0.4,
                }}
              />

              <Typography sx={{ color: "#fff", fontSize: "18px" }}>
                <span style={{ fontWeight: 700 }}>SMART </span>
                <span style={{ fontWeight: 300 }}>FACTORY</span>
              </Typography>
            </Box>

            {/* Right */}
            <Box
              onClick={handleClick}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
              }}
            >
              <Avatar
                sx={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: "#ffffff",
                  color: "#A8722C",
                  fontWeight: 700,
                  fontSize: "12px",
                }}
              >
                RK
              </Avatar>

              <Typography sx={{ color: "#fff", fontSize: "14px" }}>
                Rahul Kulkarni
              </Typography>

              <ChevronDown size={20} color="#ffffff" />
            </Box>
          </Box>

          {/* Divider */}
          <Box
            sx={{
              height: "1px",
              backgroundColor: "rgba(255,255,255,0.3)",
            }}
          />

          {/* Bottom Row */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              px: 3,
              py: 1.5,
            }}
          >
            <Typography sx={{ color: "#fff", fontWeight: 600 }}>
              Vehicle Entry (Gate 2-Window 1)
            </Typography>

            <button
              onClick={() => setShowModal(true)}
              className="bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-lg text-sm font-medium shadow text-white">
              Add Vehicle
            </button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Dropdown */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleClose}>
          <LogOut size={18} style={{ marginRight: "8px" }} />
          Logout
        </MenuItem>
      </Menu>
      <AddVehicleModal />
    </div>
  );
};

export default Header;