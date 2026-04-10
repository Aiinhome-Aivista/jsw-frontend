import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Box,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface UnloadingSlipModalProps {
  open: boolean;
  onClose: () => void;
}

const UnloadingSlipModal: React.FC<UnloadingSlipModalProps> = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "12px",
          p: 1,
          bgcolor: "#FFFFFF",
          "& .MuiTypography-root": { color: "#000" }, // Ensure headers are black
          maxHeight: "96vh", // Allow modal to grow taller and avoid scrolling
        }
      }}
    >
      <DialogTitle sx={{ m: 0, px: 3, pt: 2, pb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: "#000" }}>
          Unloading Slip
        </Typography>
      </DialogTitle>

      <DialogContent dividers sx={{ borderTop: "none", bgcolor: "#FFFFFF", px: 3, py: 2, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        {(() => {
          const inputStyle = {
            flex: 1, // Make textfields stretch in flex row
            "& .MuiInputBase-input": { color: "#000", fontSize: '0.875rem' },
            "& .MuiInputLabel-root": { color: "#666", fontSize: '0.875rem' },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#ccc" },
              "&:hover fieldset": { borderColor: "#999" },
              "&.Mui-focused fieldset": { borderColor: "#D48625" },
            }
          };

          const rowStyle = {
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2,
            width: '100%',
          };

          return (
            <>
              {/* Row 1 */}
              <Box sx={rowStyle}>
                <TextField fullWidth label="Date" defaultValue="12th Dec, 2026" variant="outlined" slotProps={{ inputLabel: { shrink: true } }} sx={inputStyle} />
                <TextField fullWidth label="Truck No." defaultValue="HR23456787" variant="outlined" slotProps={{ inputLabel: { shrink: true } }} sx={inputStyle} />
                <TextField fullWidth placeholder="Enter driver name" variant="outlined" sx={inputStyle} />
              </Box>

              {/* Row 2 */}
              <Box sx={rowStyle}>
                <TextField fullWidth placeholder="Enter address" variant="outlined" sx={inputStyle} />
              </Box>

              {/* Row 3 */}
              <Box sx={rowStyle}>
                <TextField fullWidth label="Reporting Time" defaultValue="12:00 PM" variant="outlined" slotProps={{ inputLabel: { shrink: true } }} sx={inputStyle} />
                <TextField fullWidth placeholder="Out Going Time" variant="outlined" sx={inputStyle} />
                <TextField fullWidth label="Security Supervisor" defaultValue="Rahul Kumar" variant="outlined" slotProps={{ inputLabel: { shrink: true } }} sx={inputStyle} />
              </Box>

              {/* Row 4 */}
              <Box sx={rowStyle}>
                <TextField fullWidth label="License" defaultValue="123455678" variant="outlined" slotProps={{ inputLabel: { shrink: true } }} sx={inputStyle} />
                <TextField fullWidth label="Card number" defaultValue="123455678" variant="outlined" slotProps={{ inputLabel: { shrink: true } }} sx={inputStyle} />
                <TextField fullWidth label="Chain number" defaultValue="123455678" variant="outlined" slotProps={{ inputLabel: { shrink: true } }} sx={inputStyle} />
              </Box>

              {/* Row 5 - Top Radios */}
              <Box sx={rowStyle}>
                {[
                  { label: "Jack", name: "jack" },
                  { label: "Tripal", name: "tripal" },
                  { label: "Rassa", name: "rassa" },
                ].map((item) => (
                  <Box key={item.name} sx={{ flex: 1 }}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend" sx={{ fontSize: "0.75rem", color: "#000", mb: 0 }}>
                        {item.label}
                      </FormLabel>
                      <RadioGroup row defaultValue="no" name={item.name}>
                        <FormControlLabel
                          value="yes"
                          control={<Radio sx={{ color: '#ccc', '&.Mui-checked': { color: '#D48625' } }} />}
                          label={<Typography sx={{ color: "#333", fontSize: '0.875rem' }}>Yes</Typography>}
                        />
                        <FormControlLabel
                          value="no"
                          control={<Radio sx={{ color: '#ccc', '&.Mui-checked': { color: '#D48625' } }} />}
                          label={<Typography sx={{ color: "#333", fontSize: '0.875rem' }}>No</Typography>}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                ))}
              </Box>

              {/* Row 6 - Bottom Radios */}
              <Box sx={rowStyle}>
                {[
                  { label: "Fatta + Batta", name: "fattaBatta" },
                  { label: "Bartan", name: "bartan" },
                ].map((item) => (
                  <Box key={item.name} sx={{ flex: 1 }}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend" sx={{ fontSize: "0.75rem", color: "#000", mb: 0 }}>
                        {item.label}
                      </FormLabel>
                      <RadioGroup row defaultValue="no" name={item.name}>
                        <FormControlLabel
                          value="yes"
                          control={<Radio sx={{ color: '#ccc', '&.Mui-checked': { color: '#D48625' } }} />}
                          label={<Typography sx={{ color: "#333", fontSize: '0.875rem' }}>Yes</Typography>}
                        />
                        <FormControlLabel
                          value="no"
                          control={<Radio sx={{ color: '#ccc', '&.Mui-checked': { color: '#D48625' } }} />}
                          label={<Typography sx={{ color: "#333", fontSize: '0.875rem' }}>No</Typography>}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                ))}
                {/* Empty box spacer to align with the 3-column layout */}
                <Box sx={{ flex: 1 }}></Box>
              </Box>

              {/* Row 7 - Others */}
              <Box sx={rowStyle}>
                <TextField
                  fullWidth
                  placeholder="Others"
                  variant="outlined"
                  sx={inputStyle}
                />
              </Box>
            </>
          );
        })()}
      </DialogContent>

      <DialogActions sx={{ p: 3, gap: 2 }}>
        <Button
          onClick={onClose}
          sx={{
            bgcolor: "#F0F4F8",
            color: "#4A5568",
            px: 4,
            py: 1,
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: 600,
            "&:hover": { bgcolor: "#E2E8F0" },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={onClose}
          sx={{
            bgcolor: "#D48625",
            color: "#ffffff",
            px: 4,
            py: 1,
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: 600,
            "&:hover": { bgcolor: "#B8731F" },
          }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UnloadingSlipModal;
