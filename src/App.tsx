import { Box } from "@mui/material";
import Header from "./components/layout/Header";
import SignInScreen from "./components/SSO/SignInScreen";
import "./css/App.css";
import ChargingStation from "./pages/SMSflow/ChargingStation";
import { useState } from "react";
import VehicleEntry from "./pages/RMflow/VehicleEntry";
import SecurityInspection from "./pages/RMflow/SecurityInspection";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <SignInScreen />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      {/* <Header onLogout={handleLogout} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ChargingStation />
      </Box> */}

       {/* <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <VehicleEntry />
      </Box> */}
      <SecurityInspection/>

    </Box>
  );
}

export default App;

