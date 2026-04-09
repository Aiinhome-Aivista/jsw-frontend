import React from "react";
import { useAppContext } from "../../context/AppContext";

const AddVehicleModal = () => {
  const {
    showModal,
    setShowModal,
    vehicleNumber,
    setVehicleNumber,
  } = useAppContext();

  if (!showModal) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      onClick={() => setShowModal(false)}
    >
      {/* Modal */}
      <div
        className="bg-[#f8f9fb] w-[650px] rounded-2xl shadow-2xl px-10 py-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-6 right-6 text-gray-500 hover:text-black text-2xl"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-3xl font-semibold text-black mb-8">
          Add a Vehicle
        </h2>

        {/* Input Section */}
        <div className="mb-10">
          <label className="block text-sm text-gray-500 mb-2">
            Vehicle Number
          </label>

          <input
            type="text"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
            placeholder="HR34J3490"
            className="w-full h-[56px] px-4 text-lg text-gray-700 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Button */}
        <div className="flex justify-end">
          <button
            onClick={() => {
              console.log(vehicleNumber);
              setShowModal(false);
            }}
            className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-3 rounded-xl shadow"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddVehicleModal;