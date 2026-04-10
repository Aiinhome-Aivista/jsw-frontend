import React, { createContext, useContext, useState } from "react";

type Vehicle = {
  vehicleNumber: string;
  leciNumber: string;
  gateEntryNo: string;
  poNumber: string;
  time: string;
  date: string;
  status: string;
  isNew?: boolean; // ✅ added
};

type AppContextType = {
  showModal: boolean;
  setShowModal: (val: boolean) => void;
  vehicleNumber: string;
  setVehicleNumber: (val: string) => void;
  vehicles: Vehicle[];
  addVehicle: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [showModal, setShowModal] = useState(false);
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const addVehicle = () => {
    if (!vehicleNumber.trim()) return;

    const newVehicle: Vehicle = {
      vehicleNumber,
      leciNumber: "--",
      gateEntryNo: "--",
      poNumber: "--",
      time: "--",
      date: "--",
      status: "--", // ✅ new row status
      isNew: true, // ✅ mark as new
    };

    setVehicles((prev) => [newVehicle, ...prev]);
    setVehicleNumber("");
    setShowModal(false);  
  };

  return (
    <AppContext.Provider
      value={{
        showModal,
        setShowModal,
        vehicleNumber,
        setVehicleNumber,
        vehicles,
        addVehicle,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("AppContext not found");
  return context;
};