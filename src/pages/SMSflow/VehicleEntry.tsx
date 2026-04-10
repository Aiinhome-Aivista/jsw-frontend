import { useAppContext } from "../../context/AppContext";
import Header from "./Header";
import AddVehicleModal from "../../components/modals/AddVehicleModal";
import VehicleTable from "../SMSflow/VehicleTable";
// MUI
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import RefreshIcon from "../../assets/refresh.png";

const VehicleEntry = () => {
    const { setShowModal } = useAppContext();

    return (
        <div className="bg-[#f5f6f8] min-h-screen">
            <Header />
            <AddVehicleModal />

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

                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-lg text-sm text-white"
                    >
                        Add Vehicle
                    </button>
                </Box>

                {/*TABLE COMPONENT */}
                <VehicleTable />
            </div>
        </div>
    );
};

export default VehicleEntry;