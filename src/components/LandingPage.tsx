import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  Button,
  Avatar,
  Container,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import JSLLogo from "../assets/JSL-Black-1 1.png"; // Use your local path

const stations = [
  "Charging Station",
  "EAF - Electric Arc Furnace",
  "AOD - Argon-Oxygen Decarburization",
  "LRF - Ladle Refining Furnace",
  "Casting",
  "Grinding",
];

const modules = [
  { title: "Logbook", icon: "📄" },
  { title: "Real Time Parameters", icon: "⏱️" },
  { title: "Key Performance Indicator", icon: "📊" },
  { title: "CTQ", icon: "📉" },
  { title: "Self Serve Analysis", icon: "📈" },
];

const LandingPage: React.FC = () => {
  const [selectedStation, setSelectedStation] = useState("Charging Station");
  const [selectedModule, setSelectedModule] = useState("Logbook");

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #3D2B1F 0%, #D48625 100%)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header Area */}
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box component="img" src={JSLLogo} alt="JSL Logo" sx={{ height: 40 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: '#fff', color: '#D48625', fontSize: 12, fontWeight: 700 }}>RK</Avatar>
          <Typography sx={{ color: '#fff', fontSize: 14 }}>Rahul Kulkarni</Typography>
          <KeyboardArrowDownIcon sx={{ color: '#fff' }} />
        </Box>
      </Box>

      <Container maxWidth="xl" sx={{ mt: 2, mb: 4, flex: 1 }}>
        <Card
          sx={{
            bgcolor: '#2B1B12',
            borderRadius: '24px',
            p: 4,
            minHeight: '70vh',
            display: 'flex',
            position: 'relative',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <Grid container spacing={4}>
            {/* Sidebar: Stations */}
            <Grid size={{ xs: 12, md: 3.5 }}>
              <Box sx={{ borderRight: '1px dashed rgba(255,255,255,0.2)', pr: 4, height: '100%' }}>
                <Typography variant="h5" sx={{ color: '#fff', mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 4, height: 24, bgcolor: '#D48625' }} /> Stations
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {stations.map((station) => (
                    <Button
                      key={station}
                      onClick={() => setSelectedStation(station)}
                      fullWidth
                      sx={{
                        justifyContent: 'flex-start',
                        textTransform: 'none',
                        borderRadius: '8px',
                        py: 1.5,
                        px: 2,
                        bgcolor: selectedStation === station ? '#D48625' : 'rgba(255,255,255,0.05)',
                        color: selectedStation === station ? '#fff' : 'rgba(255,255,255,0.6)',
                        '&:hover': { bgcolor: selectedStation === station ? '#D48625' : 'rgba(255,255,255,0.1)' },
                      }}
                    >
                      {station}
                    </Button>
                  ))}
                </Box>
              </Box>
            </Grid>

            {/* Main Grid: Modules */}
            <Grid size={{ xs: 12, md: 8.5 }}>
              <Typography variant="h5" sx={{ color: '#fff', mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 4, height: 24, bgcolor: '#D48625' }} /> Modules
              </Typography>
              <Grid container spacing={3}>
                {modules.map((mod) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={mod.title}>
                    <Card
                      onClick={() => setSelectedModule(mod.title)}
                      sx={{
                        p: 3,
                        height: '220px',
                        cursor: 'pointer',
                        borderRadius: '16px',
                        bgcolor: selectedModule === mod.title ? '#D48625' : '#3D2B1F',
                        border: selectedModule === mod.title ? '2px solid #fff' : '1px solid transparent',
                        transition: '0.3s',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                      }}
                    >
                      <Typography sx={{ fontSize: 32 }}>{mod.icon}</Typography>
                      <Typography sx={{ color: '#fff', fontWeight: 600, fontSize: '1.1rem' }}>{mod.title}</Typography>
                      <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                      </Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>

          {/* Next Button */}
          <Button
            variant="contained"
            sx={{
              position: 'absolute',
              bottom: 32,
              right: 32,
              bgcolor: '#D48625',
              px: 6,
              py: 1,
              borderRadius: '8px',
              fontWeight: 700,
              textTransform: 'none',
              '&:hover': { bgcolor: '#b57220' }
            }}
          >
            Next
          </Button>
        </Card>
      </Container>

      {/* Footer */}
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
          Terms of Use  |  Privacy Statements
        </Typography>
      </Box>
    </Box>
  );
};

export default LandingPage;
