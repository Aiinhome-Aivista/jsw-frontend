import { useAppContext } from "../../context/AppContext";
import vehicleEntryData from "../../data/vehicleEntryData";

const VehicleTable = () => {
    const { vehicles } = useAppContext();

    // ✅ New data on top + dummy always below
    const tableData = [...vehicles, ...vehicleEntryData];

    return (
        <div className="bg-white rounded-t-2xl shadow-xl overflow-hidden">
            <table className="w-full text-sm text-gray-800">
                <thead className="bg-[#f1f3f5] text-gray-700 text-sm uppercase">
                    <tr>
                        <th className="px-6 py-4 text-left">Vehicle Number</th>
                        <th className="px-6 py-4 text-left">LECI Number</th>
                        <th className="px-6 py-4 text-left">Gate Entry No.</th>
                        <th className="px-6 py-4 text-left">PO Number</th>
                        <th className="px-6 py-4 text-left">Time</th>
                        <th className="px-6 py-4 text-left">Date</th>
                        <th className="px-6 py-4 text-center">Status</th>
                    </tr>
                </thead>

                <tbody>
                    {tableData.map((item, index) => (
                        <tr key={index} className="border-t hover:bg-gray-50">

                            {/* VEHICLE */}
                            <td className="px-6 py-4 font-medium">
                                <div className="flex items-center gap-2">
                                    {item.vehicleNumber}

                                    {/* ONLY NEW ROW */}
                                    {item.isNew && (
                                        <span className="px-2 py-0 rounded-md text-[9px] bg-red-500 text-white">
                                            NEW
                                        </span>
                                    )}
                                </div>
                            </td>

                            <td className="px-6 py-4">{item.leciNumber}</td>
                            <td className="px-6 py-4">{item.gateEntryNo}</td>
                            <td className="px-6 py-4">{item.poNumber}</td>
                            <td className="px-6 py-4">{item.time}</td>
                            <td className="px-6 py-4">{item.date}</td>

                            {/* STATUS */}
                            <td className="px-6 py-4 text-center">
                                <span
                                    className="px-3 py-1 rounded-md text-xs"
                                    style={{
                                        backgroundColor: item.isNew
                                            ? "rgba(255, 237, 213, 1)"
                                            : item.status === "Rejected"
                                                ? "rgba(254, 226, 226, 1)"
                                                : "rgba(209, 250, 229, 1)",

                                        color: item.isNew
                                            ? "rgba(194, 65, 12, 1)"
                                            : item.status === "Rejected"
                                                ? "rgba(185, 28, 28, 1)"
                                                : "rgba(4, 120, 87, 1)",
                                    }}
                                >
                                    {item.isNew ? "Unloading Slip Generated" : item.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default VehicleTable;