import Header from "./Header";
import AddVehicleModal from "../../components/modals/RM/AddVehicleModal";
import VehicleTable from "./VehicleTable";
// MUI

const VehicleEntry = () => {

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