import React from "react";
import { AppBar, Toolbar, Box, Typography, Avatar, Menu, MenuItem } from "@mui/material";
import { ChevronDown, LogOut } from "lucide-react";
import JSLLogo from "../../assets/JSL-Black-1 1.png";
import vectorHeaderImage from "../../assets/VectorHader.png";
import RefreshIcon from "../../assets/refresh.png";
import { useAppContext } from "../../context/AppContext";
import AddVehicleModal from "../../components/modals/RM/AddVehicleModal";
import Button from '@mui/material/Button';
import UnloadingSlipModal from "@/components/modals/RM/UnloadingSlipModal";


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
    const [showUnloadingModal, setShowUnloadingModal] = React.useState(false);


    return (
        <div
            style={{
                backgroundImage: `url(${vectorHeaderImage}), linear-gradient(180deg, #1D1D1D 0%, #2A2A2A 100%)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
            className="h-[165px]"
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


                </Toolbar>
                <Box sx={{ display: "flex", justifyContent: "space-between", px: 3, py: 0.5 }}>
                    <div className="flex items-center gap-3">
                        <Typography sx={{ color: "#fff", fontWeight: 600 }}>
                            Vehicle Entry (Gate 2-Window 1)
                        </Typography>

                        {/* Refresh Button */}
                        <img
                            src={RefreshIcon}
                            alt="refresh"
                            className="w-5 h-5 cursor-pointer hover:rotate-180 transition-transform duration-300"
                            onClick={() => window.location.reload()}
                        />
                    </div>
                     <UnloadingSlipModal
                open={showUnloadingModal}
                onClose={() => setShowUnloadingModal(false)}
            />
                    <Button
                        variant="contained"
                        onClick={() => setShowUnloadingModal(true)}
                        className="!bg-[#D48625] hover:!bg-[#D48625]/80 !px-5 !py-2 !rounded-lg !text-sm !text-white !normal-case !shadow-none"
                    >
                        Fill Slip
                    </Button>

                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-lg text-sm text-white"
                    >
                        Add Vehicle
                    </button>
                </Box>
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