import Header from "./Header";
import AddVehicleModal from "../../components/modals/RM/AddVehicleModal";
import VehicleTable from "./VehicleTable";
import { Box, Typography } from "@mui/material";
import RefreshIcon from "../../assets/refresh.png";
import { useAppContext } from "../../context/AppContext";


const VehicleEntry = () => {
    const { setShowModal } = useAppContext();

    return (
        <div className="bg-[#f5f6f8] min-h-screen">
            <Header />
            <AddVehicleModal />
            <div className="px-6 -mt-[6.5rem]">
                <Box sx={{ display: "flex", justifyContent: "space-between", px: 3, py: 1.5 }}>
                    <div className="flex items-center gap-3">
                        <Typography sx={{ color: "rgba(255, 255, 255, 1)", fontWeight: 700, fontSize: "25px" }}>
                            Vehicle Entry (Gate 2-Window 1)
                        </Typography>

                        {/* Refresh Button */}
                        <img
                            src={RefreshIcon}
                            alt="refresh"
                            className="w-6 h-6 cursor-pointer hover:rotate-180 transition-transform duration-300"
                            onClick={() => window.location.reload()}
                        />
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="!bg-[#D48625] hover:!bg-[#D48625]/80 !px-5 !py-2 !rounded-lg !text-sm !text-white !normal-case !shadow-none"
                        style={{
                            backgroundColor: "rgba(212, 134, 37, 1)",
                            color: "rgba(255, 255, 255, 1)",
                            fontWeight: 500,
                            fontSize: "15px",
                        }}
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