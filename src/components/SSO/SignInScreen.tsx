import React from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Button, 
  Divider, 
  Link, 
} from '@mui/material';
import JSLLogo from '../../assets/JSL-Black-1 1.png';
import BackgroundImage from '../../assets/Image 1.png';

const SignInScreen: React.FC = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${BackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      {/* Top Left Logo */}
      <Box sx={{ position: 'absolute', top: 20, left: 20 }}>
        <img src={JSLLogo} alt="JSL Logo" style={{ height: '40px' }} />
      </Box>

      {/* Main Sign-In Modal */}
      <Paper
        elevation={3}
        sx={{
          padding: '40px',
          width: '100%',
          maxWidth: '450px',
          borderRadius: '16px',
          textAlign: 'left',
          backgroundColor: '#ffffff',
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 500, mb: 1, color: '#1a1a1a' }}>
          Sign In
        </Typography>
        <Typography variant="body1" sx={{ color: '#666', mb: 4 }}>
          Enter your credentials to access your dashboard
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* SSO Login Button */}
          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: '#d48625',
              '&:hover': { backgroundColor: '#b57220' },
              textTransform: 'none',
              padding: '12px',
              fontSize: '16px',
            }}
          >
            Login with SSO
          </Button>

          {/* OR Divider */}
          <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
            <Divider sx={{ flex: 1 }} />
            <Typography variant="body2" sx={{ px: 2, color: '#999' }}>
              or
            </Typography>
            <Divider sx={{ flex: 1 }} />
          </Box>

          {/* Non-SSO Login Button */}
          <Button
            variant="outlined"
            fullWidth
            sx={{
              color: '#d48625',
              borderColor: '#d48625',
              '&:hover': { borderColor: '#b57220', backgroundColor: 'rgba(212, 134, 37, 0.04)' },
              textTransform: 'none',
              padding: '12px',
              fontSize: '16px',
            }}
          >
            Login with Non-SSO
          </Button>
        </Box>

        {/* Support Link */}
        <Typography variant="body2" sx={{ mt: 4, textAlign: 'center', color: '#666' }}>
          Need help? <Link href="#" sx={{ color: '#d48625', textDecoration: 'none', fontWeight: 500 }}>Contact Support</Link>
        </Typography>
      </Paper>

      {/* Footer Copyright */}
      <Typography
        variant="caption"
        sx={{
          position: 'absolute',
          bottom: 20,
          color: 'rgba(255, 255, 255, 0.7)',
        }}
      >
        © 2026 Jindal Stainless Limited. All rights reserved.
      </Typography>
    </Box>
  );
};

export default SignInScreen;