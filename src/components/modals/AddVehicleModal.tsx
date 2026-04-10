import { useAppContext } from "../../context/AppContext";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const AddVehicleModal = () => {
  const {
    showModal,
    setShowModal,
    vehicleNumber,
    setVehicleNumber,
    addVehicle,
  } = useAppContext();

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      
      <div className="bg-white w-[420px] rounded-xl shadow-xl p-5">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[16px] font-semibold text-gray-800">
            Add a Vehicle
          </h2>

          <IconButton size="small" onClick={() => setShowModal(false)}>
            {/*  Close Icon Color */}
            <CloseIcon
              fontSize="small"
              sx={{ color: "rgba(0, 0, 0, 0.23)" }}
            />
          </IconButton>
        </div>

        {/* INPUT */}
        <div className="mb-6">
          <TextField
            fullWidth
            label="Vehicle Number"
            variant="outlined"
            size="small"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
            sx={{
              //  LABEL COLOR
              "& .MuiInputLabel-root": {
                color: "rgba(0, 0, 0, 0.23)",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "rgba(0, 0, 0, 0.23)",
              },

              //  BORDER COLOR
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "rgba(0, 0, 0, 0.23)",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(0, 0, 0, 0.23)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "rgba(0, 0, 0, 0.23)",
                },
              },

              //  INPUT TEXT COLOR
              "& .MuiInputBase-input": {
                color: "#111", // keep text readable
              },
            }}
          />
        </div>

        {/* BUTTON */}
        <div className="flex justify-end">
          <button
            onClick={addVehicle}
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-md text-sm"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddVehicleModal;