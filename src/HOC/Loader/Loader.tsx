import Backdrop from "@mui/material/Backdrop";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";

function Loader({ isOpen = true }: any) {
  const [animationData, setAnimationData] = useState<any>();

  useEffect(() => {
    import('./loader.json').then(setAnimationData);
  }, []);

  return (
    <Backdrop sx={{ color: "#fff", zIndex: (theme) => 99999 }} open={isOpen}>
      <Lottie
        loop
        animationData={animationData}
        style={{ width: 150, height: 150 }}
      />
    </Backdrop>
  );
}

export default Loader;
