import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Box, Avatar, Menu, MenuItem } from "@mui/material";
import { Home, ChevronDown, LogOut } from "lucide-react";
import JSLLogo from "../../assets/JSL-Black-1 1.png";

const navItems = ["Logbook", "RTP", "KPI", "CTQ", "Self Serve Analysis"];

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    onLogout();
  };

  return (
    <AppBar
      position="static"
      sx={{
        // height: "64px",
        backgroundColor: "#111111", 
        borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
        boxShadow: "none",
        zIndex: 100,
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          padding: "0 24px !important",
          // minHeight: "64px !important",
        }}
      >
        {/* Left Section - Logo and App Name */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            component="img"
            src={JSLLogo}
            alt="Jindal Stainless"
            sx={{ height: "32px", width: "auto", display: "block" }}
          />
          <Box
            sx={{
              width: "1px",
              height: "32px",
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              margin: "0 20px",
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontSize: "18px",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box component="span" sx={{ fontWeight: 700, marginRight: "6px" }}>
              SMART
            </Box>
            <Box component="span" sx={{ fontWeight: 300 }}>
              FACTORY
            </Box>
          </Typography>
        </Box>

        {/* Center Section - Navigation */}
        <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
          {navItems.map((item) => (
            <Box
              key={item}
              sx={{
                px: 3,
                height: "64px",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                transition: "0.2s",
                // Styling for the active "Logbook" state as seen in image
                backgroundColor: item === "Logbook" ? "#5C4017" : "transparent",
                "&:hover": {
                  backgroundColor:
                    item === "Logbook" ? "#5C4017" : "rgba(255,255,255,0.05)",
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#ffffff",
                }}
              >
                {item}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Right Section - Home & Profile */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Home size={24} style={{ color: "#ffffff", cursor: "pointer" }} />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
            }}
            onClick={handleClick}
            aria-controls={open ? "profile-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              sx={{
                width: "32px",
                height: "32px",
                backgroundColor: "#ffffff",
                color: "#A8722C", // Brownish text for initials
                fontWeight: 700,
                fontSize: "12px",
              }}
            >
              RK
            </Avatar>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 400,
                color: "#ffffff",
              }}
            >
              Rahul Kulkarni
            </Typography>
            <ChevronDown size={20} style={{ color: "#ffffff" }} />
          </Box>
          
          <Menu
            id="profile-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "profile-button",
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: "150px",
                backgroundColor: "#1a1a1a",
                border: "1px solid rgba(255, 255, 255, 0.12)",
              },
            }}
          >
            <MenuItem
              onClick={handleLogout}
              sx={{
                color: "#ffffff",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                },
              }}
            >
              <LogOut size={18} />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
