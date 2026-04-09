import React from "react";
import vehicleEntryData from "../../data/vehicleEntryData";
import Header from "./Header";

const VehicleEntry = () => {
  

    return (
        <div className="bg-[#f5f6f8] min-h-screen">

            {/* ================= HEADER ================= */}
            <Header />

            {/* ================= FLOATING TABLE ================= */}
            <div className="px-6 -mt-20">
                <div className="bg-white rounded-t-2xl shadow-xl overflow-hidden">


                    <table className="w-full text-sm text-gray-800">

                        {/* Header */}
                        <thead className="bg-[#f1f3f5] text-gray-700 text-xs uppercase">
                            <tr>
                                <th className="px-6 py-4 text-left">Vehicle Number</th>
                                <th className="px-6 py-4 text-left">LECI Number</th>
                                <th className="px-6 py-4 text-left">Gate Entry No.</th>
                                <th className="px-6 py-4 text-left">PO Number</th>
                                <th className="px-6 py-4 text-left">Gate Entry Time</th>
                                <th className="px-6 py-4 text-left">Gate Entry Date</th>
                                <th className="px-6 py-4 text-left">Status</th>
                            </tr>
                        </thead>

                        {/* Body */}
                        <tbody className="text-gray-700">
                            {vehicleEntryData.map((item, index) => (
                                <tr
                                    key={index}
                                    className="border-t border-gray-200 hover:bg-gray-50 transition"
                                >
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        {item.vehicleNumber}
                                    </td>
                                    <td className="px-6 py-4 text-gray-700">{item.leciNumber}</td>
                                    <td className="px-6 py-4 text-gray-700">{item.gateEntryNo}</td>
                                    <td className="px-6 py-4 text-gray-700">{item.poNumber}</td>
                                    <td className="px-6 py-4 text-gray-700">{item.time}</td>
                                    <td className="px-6 py-4 text-gray-700">{item.date}</td>

                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${item.status === "Approved"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-600"
                                                }`}
                                        >
                                            {item.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default VehicleEntry;