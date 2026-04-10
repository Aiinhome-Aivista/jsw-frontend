import { useAppContext } from "../../context/AppContext";
import Header from "./Header";
import AddVehicleModal from "../../components/modals/AddVehicleModal";

// MUI
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const VehicleEntry = () => {
  const { setShowModal, vehicles } = useAppContext(); 

  return (
    <div className="bg-[#f5f6f8] min-h-screen">

      <Header />
      <AddVehicleModal />

      <div className="px-6 -mt-20">
        <Box sx={{ display: "flex", justifyContent: "space-between", px: 3, py: 1.5 }}>
          <Typography sx={{ color: "#fff", fontWeight: 600 }}>
            Vehicle Entry (Gate 2-Window 1)
          </Typography>

          <button
            onClick={() => setShowModal(true)}
            className="bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-lg text-sm text-white"
          >
            Add Vehicle
          </button>
        </Box>

        <div className="bg-white rounded-t-2xl shadow-xl overflow-hidden">
          <table className="w-full text-sm text-gray-800">
            <thead className="bg-[#f1f3f5] text-gray-700 text-xs uppercase">
              <tr>
                <th className="px-6 py-4 text-left">Vehicle Number</th>
                <th className="px-6 py-4 text-left">LECI Number</th>
                <th className="px-6 py-4 text-left">Gate Entry No.</th>
                <th className="px-6 py-4 text-left">PO Number</th>
                <th className="px-6 py-4 text-left">Time</th>
                <th className="px-6 py-4 text-left">Date</th>
                <th className="px-6 py-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {vehicles.map((item, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{item.vehicleNumber}</td>
                  <td className="px-6 py-4">{item.leciNumber}</td>
                  <td className="px-6 py-4">{item.gateEntryNo}</td>
                  <td className="px-6 py-4">{item.poNumber}</td>
                  <td className="px-6 py-4">{item.time}</td>
                  <td className="px-6 py-4">{item.date}</td>
                  <td className="px-6 py-4">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {vehicles.length === 0 && (
            <div className="text-center py-10 text-gray-400">
              No vehicles added yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VehicleEntry;