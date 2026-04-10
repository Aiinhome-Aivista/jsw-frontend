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

            <div className="px-6 -mt-12">

                {/*TABLE COMPONENT */}
                <VehicleTable />
            </div>
        </div>
    );
};

export default VehicleEntry;