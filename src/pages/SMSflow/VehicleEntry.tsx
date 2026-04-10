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

            <div className="px-6 -mt-12">

                {/*TABLE COMPONENT */}
                <VehicleTable />
            </div>
        </div>
    );
};

export default VehicleEntry;