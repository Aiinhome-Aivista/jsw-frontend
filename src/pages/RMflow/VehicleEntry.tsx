import React from "react";
import { useAppContext } from "../../context/AppContext";
import Header from "./Header";
import AddVehicleModal from "../../components/modals/RM/AddVehicleModal";
import UnloadingSlipModal from "../../components/modals/RM/UnloadingSlipModal";
import VehicleTable from "./VehicleTable";
// MUI
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import RefreshIcon from "../../assets/refresh.png";
import Button from '@mui/material/Button';

const VehicleEntry = () => {
    const { setShowModal } = useAppContext();
    const [showUnloadingModal, setShowUnloadingModal] = React.useState(false);

    return (
        <div className="bg-[#f5f6f8] min-h-screen">
            <Header />
            <AddVehicleModal />
            <UnloadingSlipModal
                open={showUnloadingModal}
                onClose={() => setShowUnloadingModal(false)}
            />

            <div className="px-6 -mt-20">
                <Box sx={{ display: "flex", justifyContent: "space-between", px: 3, py: 1.5 }}>
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
                    <div className="flex gap-2">
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
                    </div>

                </Box>

                {/*TABLE COMPONENT */}
                <VehicleTable />
            </div>
        </div>
    );
};

export default VehicleEntry;