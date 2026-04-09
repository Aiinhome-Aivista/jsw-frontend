import React, { createContext, useContext, useState } from "react";

interface AppContextType {
  showModal: boolean;
  setShowModal: (val: boolean) => void;
  vehicleNumber: string;
  setVehicleNumber: (val: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [showModal, setShowModal] = useState(false);
  const [vehicleNumber, setVehicleNumber] = useState("");

  return (
    <AppContext.Provider
      value={{
        showModal,
        setShowModal,
        vehicleNumber,
        setVehicleNumber,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};