import React from "react";
import { Box, Container, Stack, Typography, Divider, IconButton, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";
import { alpha } from "@mui/material/styles";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

export default function Footer() {
  const authMember = null; // useGlobals orqali bog'lanadi

  // Linklar uchun umumiy hover stili
  const linkHoverStyle = {
    color: "#457B9D",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: 500,
    transition: "0.3s",
    "&:hover": {
      color: "#A8DADC",
      transform: "translateX(4px)",
    },
  };

  return (
    <Box 
      component="footer" 
      sx={{ 
        width: "100%", 
        bgcolor: "#FFFFFF", 
        borderTop: "1px solid #F1FAEE", 
        pt: 10, pb: 4 
      }}
    >
      <Container maxWidth="lg">
        <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" spacing={8}>
          
          {/* Brand Section */}
          <Stack spacing={3} sx={{ flex: 1, maxWidth: "320px" }}>
            <Typography variant="h5" sx={{ fontWeight: 900, color: "#1D3557", letterSpacing: "-0.5px" }}>
              ALPHA<span style={{ color: "#A8DADC" }}>ZONE</span>
            </Typography>
            <Typography sx={{ color: "#7A7A9A", fontSize: "14px", lineHeight: 1.8 }}>
              Premium supplements and professional gym equipment for those who strive for greatness. Elevate your workout today.
            </Typography>
            <Stack direction="row" spacing={1}>
              {[<FacebookIcon />, <TwitterIcon />, <InstagramIcon />, <YouTubeIcon />].map((icon, i) => (
                <IconButton 
                  key={i} 
                  size="small"
                  sx={{ 
                    color: "#457B9D", 
                    bgcolor: "#F8FAF9",
                    "&:hover": { bgcolor: alpha("#A8DADC", 0.2), color: "#1D3557" } 
                  }}
                >
                  {React.cloneElement(icon as React.ReactElement, )}
                </IconButton>
              ))}
            </Stack>
          </Stack>

          {/* Navigation & Info */}
          <Stack direction="row" spacing={{ xs: 4, sm: 10 }}>
            
            {/* Sections */}
            <Stack spacing={2.5}>
              <Typography sx={{ fontWeight: 700, color: "#1D3557", fontSize: "14px", textTransform: "uppercase" }}>
                Explore
              </Typography>
              <Stack spacing={1.5}>
                <MuiLink component={Link} to="/" sx={linkHoverStyle}>Home</MuiLink>
                <MuiLink component={Link} to="/products" sx={linkHoverStyle}>Products</MuiLink>
                {authMember && <MuiLink component={Link} to="/orders" sx={linkHoverStyle}>Orders</MuiLink>}
                <MuiLink component={Link} to="/help" sx={linkHoverStyle}>Support</MuiLink>
              </Stack>
            </Stack>

            {/* Contact */}
            <Stack spacing={2.5}>
              <Typography sx={{ fontWeight: 700, color: "#1D3557", fontSize: "14px", textTransform: "uppercase" }}>
                Contact
              </Typography>
              <Stack spacing={2}>
                <Box>
                  <Typography sx={{ fontSize: "12px", color: "#A8DADC", fontWeight: 700 }}>LOCATION</Typography>
                  <Typography sx={{ fontSize: "14px", color: "#457B9D" }}>Seoul, South Korea</Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: "12px", color: "#A8DADC", fontWeight: 700 }}>EMAIL</Typography>
                  <Typography sx={{ fontSize: "14px", color: "#457B9D" }}>info@alphazone.com</Typography>
                </Box>
              </Stack>
            </Stack>

          </Stack>
        </Stack>

        <Divider sx={{ mt: 8, mb: 4, opacity: 0.5 }} />

        <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems="center" spacing={2}>
          <Typography sx={{ color: "#7A7A9A", fontSize: "12px" }}>
            © {new Date().getFullYear()} AlphaZone. Minimalism at its best.
          </Typography>
          <Stack direction="row" spacing={3}>
            <MuiLink component={Link} to="/terms" sx={{ fontSize: "12px", color: "#7A7A9A", textDecoration: "none" }}>Privacy</MuiLink>
            <MuiLink component={Link} to="/terms" sx={{ fontSize: "12px", color: "#7A7A9A", textDecoration: "none" }}>Terms</MuiLink>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}