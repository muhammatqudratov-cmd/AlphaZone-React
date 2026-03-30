import React from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { Logout } from "@mui/icons-material";
import { Link, NavLink } from "react-router-dom";
import { serverApi } from "../../../lib/config";
import { CartItem } from "../../../lib/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import Basket from "./Basket";
import { alphaZoneColors } from "../../../lib/alphaZone";

interface HomeNavbarProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
  setSignupOpen: (isOpen: boolean) => void;
  setLoginOpen: (isOpen: boolean) => void;
  handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
  anchorEl: HTMLElement | null;
  handleCloseLogout: () => void;
  handleLogoutRequest: () => void;
}

const navLinks = [
  { to: "/", label: "Home", authOnly: false },
  { to: "/products", label: "Supplements", authOnly: false },
  { to: "/orders", label: "Orders", authOnly: true },
  { to: "/member-page", label: "My Page", authOnly: true },
  { to: "/help", label: "Help", authOnly: false },
];

const navLinkStyle: React.CSSProperties = {
  color: alphaZoneColors.ink,
  textDecoration: "none",
  fontSize: "0.95rem",
  fontWeight: 600,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  paddingBottom: "6px",
  borderBottom: "1px solid transparent",
  transition: "all 0.25s ease",
};

const navLinkActiveStyle: React.CSSProperties = {
  color: "#0f2431",
  borderBottomColor: alphaZoneColors.mint,
};

export default function HomeNavbar(props: HomeNavbarProps) {
  const {
    cartItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll,
    setSignupOpen,
    setLoginOpen,
    handleLogoutClick,
    anchorEl,
    handleCloseLogout,
    handleLogoutRequest,
  } = props;
  const { authMember } = useGlobals();

  return (
    <Box
      component="header"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 30,
        backgroundColor: alpha("#F8FAF9", 0.82),
        backdropFilter: "blur(24px)",
        borderBottom: `1px solid ${alpha("#457B9D", 0.12)}`,
      }}
    >
      <Container maxWidth="xl" sx={{ py: { xs: 1.5, md: 2 } }}>
        <Stack
          direction={{ xs: "column", lg: "row" }}
          spacing={{ xs: 2, lg: 4 }}
          alignItems={{ xs: "stretch", lg: "center" }}
          justifyContent="space-between"
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1.5, sm: 3 }}
            alignItems={{ xs: "flex-start", sm: "center" }}
            justifyContent="space-between"
          >
            <Link to="/" style={{ textDecoration: "none" }}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box
                  sx={{
                    width: 52,
                    height: 52,
                    borderRadius: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: `linear-gradient(135deg, ${alpha("#A8DADC", 0.62)} 0%, ${alpha("#FFFFFF", 0.95)} 100%)`,
                    border: `1px solid ${alpha("#457B9D", 0.14)}`,
                    boxShadow: "0 16px 32px rgba(69,123,157,0.12)",
                  }}
                >
                  <Box
                    component="img"
                    src="/icons/arm-muscle.png"
                    alt="Alpha Zone"
                    sx={{ width: 28, height: 28, objectFit: "contain" }}
                  />
                </Box>

                <Box>
                  <Typography
                    sx={{
                      color: "#183642",
                      fontSize: { xs: "1.1rem", md: "1.2rem" },
                      fontWeight: 800,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    Alpha Zone
                  </Typography>
                  <Typography
                    sx={{
                      color: alpha("#183642", 0.62),
                      fontSize: "0.78rem",
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                    }}
                  >
                  </Typography>
                </Box>
              </Stack>
            </Link>
          </Stack>

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={{ xs: 1.5, md: 2.5 }}
            alignItems={{ xs: "stretch", md: "center" }}
            justifyContent="space-between"
            sx={{ flex: 1 }}
          >
            <Stack
              direction="row"
              spacing={{ xs: 1.5, md: 2.5 }}
              useFlexGap
              flexWrap="wrap"
              alignItems="center"
            >
              {navLinks.map((link) =>
                link.authOnly && !authMember ? null : (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    exact={link.to === "/"}
                    style={navLinkStyle}
                    activeStyle={navLinkActiveStyle}
                  >
                    {link.label}
                  </NavLink>
                ),
              )}
            </Stack>

            <Stack
              direction="row"
              spacing={1.25}
              alignItems="center"
              justifyContent={{ xs: "space-between", md: "flex-end" }}
              useFlexGap
              flexWrap="wrap"
            >
              <Basket
                cartItems={cartItems}
                onAdd={onAdd}
                onRemove={onRemove}
                onDelete={onDelete}
                onDeleteAll={onDeleteAll}
              />

              {!authMember ? (
                <>
                  <Button
                    variant="text"
                    onClick={() => setLoginOpen(true)}
                    sx={{
                      color: "#183642",
                      fontWeight: 700,
                      textTransform: "none",
                      px: 1,
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => setSignupOpen(true)}
                    sx={{
                      borderRadius: "999px",
                      px: 2.5,
                      py: 1,
                      textTransform: "none",
                      fontWeight: 700,
                      color: "#183642",
                      backgroundColor: alphaZoneColors.mint,
                      boxShadow: "0 18px 36px rgba(168,218,220,0.28)",
                      "&:hover": {
                        backgroundColor: "#92d0d2",
                      },
                    }}
                  >
                    Join Alpha
                  </Button>
                </>
              ) : (
                <Avatar
                  src={
                    authMember?.memberImage
                      ? `${serverApi}/${authMember?.memberImage}`
                      : "/icons/default-user.svg"
                  }
                  aria-haspopup={"true"}
                  onClick={handleLogoutClick}
                  sx={{
                    width: 46,
                    height: 46,
                    cursor: "pointer",
                    border: `2px solid ${alpha("#A8DADC", 0.55)}`,
                    boxShadow: "0 12px 28px rgba(69,123,157,0.18)",
                  }}
                />
              )}

              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={Boolean(anchorEl)}
                onClose={handleCloseLogout}
                onClick={handleCloseLogout}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    mt: 1.5,
                    minWidth: 180,
                    borderRadius: 3,
                    border: `1px solid ${alpha("#457B9D", 0.16)}`,
                    backgroundColor: alpha("#FFFFFF", 0.96),
                    backdropFilter: "blur(18px)",
                    boxShadow: "0 24px 48px rgba(18, 44, 58, 0.16)",
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 18,
                      width: 12,
                      height: 12,
                      bgcolor: alpha("#FFFFFF", 0.96),
                      borderTop: `1px solid ${alpha("#457B9D", 0.16)}`,
                      borderLeft: `1px solid ${alpha("#457B9D", 0.16)}`,
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem
                  onClick={handleLogoutRequest}
                  sx={{
                    py: 1.25,
                    fontWeight: 600,
                    color: "#183642",
                    "&:hover": {
                      backgroundColor: alpha("#A8DADC", 0.16),
                    },
                  }}
                >
                  <ListItemIcon>
                    <Logout sx={{ color: "#457B9D" }} />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
