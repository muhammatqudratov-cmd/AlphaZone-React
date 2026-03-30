import React, { useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import LoginIcon from "@mui/icons-material/Login";
import PhoneIphoneRoundedIcon from "@mui/icons-material/PhoneIphoneRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { T } from "../../../lib/types/common";
import { Messages } from "../../../lib/config";
import { LoginInput, MemberInput } from "../../../lib/types/member";
import MemberService from "../../services/MemberService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { useGlobals } from "../../hooks/useGlobals";
import { alphaZoneColors } from "../../../lib/alphaZone";

const authInputSx = {
  "& .MuiInputLabel-root": {
    color: alpha(alphaZoneColors.ink, 0.56),
    fontWeight: 600,
  },
  "& .MuiInput-root": {
    color: alphaZoneColors.ink,
    pt: 0.5,
    "&::before": {
      borderBottomColor: alpha(alphaZoneColors.slate, 0.18),
    },
    "&::after": {
      borderBottomColor: alphaZoneColors.mint,
    },
    "&:hover:not(.Mui-disabled, .Mui-error)::before": {
      borderBottomColor: alpha(alphaZoneColors.slate, 0.3),
    },
  },
  "& .MuiInputBase-input": {
    py: 1.25,
  },
};

interface AuthenticationModalProps {
  signupOpen: boolean;
  loginOpen: boolean;
  handleSignupClose: () => void;
  handleLoginClose: () => void;
}

export default function AuthenticationModal(props: AuthenticationModalProps) {
  const { signupOpen, loginOpen, handleSignupClose, handleLoginClose } = props;
  const [memberNick, setMemberNick] = useState<string>("");
  const [memberPhone, setMemberPhone] = useState<string>("");
  const [memberPassword, setMemberPassword] = useState<string>("");
  const { setAuthMember } = useGlobals();

  const handleUsername = (e: T) => {
    setMemberNick(e.target.value);
  };

  const handlePhone = (e: T) => {
    setMemberPhone(e.target.value);
  };

  const handlePassword = (e: T) => {
    setMemberPassword(e.target.value);
  };

  const handlePasswordKeyDown = (e: T) => {
    if (e.key === "Enter" && signupOpen) {
      handleSignupRequest().then();
    } else if (e.key === "Enter" && loginOpen) {
      handleLoginRequest().then();
    }
  };

  const handleSignupRequest = async () => {
    try {
      const isFulfill =
        memberNick !== "" && memberPhone !== "" && memberPassword !== "";
      if (!isFulfill) throw new Error(Messages.erorr3);

      const signupInput: MemberInput = {
        memberNick,
        memberPhone,
        memberPassword,
      };

      const member = new MemberService();
      const result = await member.signup(signupInput);

      setAuthMember(result);
      handleSignupClose();
    } catch (err) {
      console.log(err);
      handleSignupClose();
      sweetErrorHandling(err).then();
    }
  };

  const handleLoginRequest = async () => {
    try {
      const isFulfill = memberNick !== "" && memberPassword !== "";
      if (!isFulfill) throw new Error(Messages.erorr3);

      const loginInput: LoginInput = {
        memberNick,
        memberPassword,
      };

      const member = new MemberService();
      const result = await member.login(loginInput);

      setAuthMember(result);
      handleLoginClose();
    } catch (err) {
      console.log(err);
      handleLoginClose();
      sweetErrorHandling(err).then();
    }
  };

  const renderAuthModal = ({
    open,
    onClose,
    title,
    description,
    buttonText,
    onSubmit,
    showPhone,
  }: {
    open: boolean;
    onClose: () => void;
    title: string;
    description: string;
    buttonText: string;
    onSubmit: () => void;
    showPhone?: boolean;
  }) => (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 350,
          sx: {
            backgroundColor: "rgba(24,54,66,0.18)",
            backdropFilter: "blur(8px)",
          },
        },
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            minHeight: "100vh",
            display: "grid",
            placeItems: "center",
            p: 2,
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            sx={{
              width: "min(92vw, 940px)",
              borderRadius: "32px",
              overflow: "hidden",
              backgroundColor: alpha("#FFFFFF", 0.95),
              border: `1px solid ${alpha(alphaZoneColors.slate, 0.14)}`,
              backdropFilter: "blur(24px)",
              boxShadow: "0 32px 80px rgba(69,123,157,0.18)",
            }}
          >
            <Box
              sx={{
                position: "relative",
                flex: { md: 1.1 },
                minHeight: { xs: 250, md: 620 },
                backgroundColor: alpha(alphaZoneColors.mint, 0.18),
              }}
            >
              <Box
                component="img"
                src="/img/auth.webp"
                alt="Alpha Zone training"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(24,54,66,0.18) 0%, rgba(24,54,66,0.76) 100%)",
                }}
              />
              <Stack
                spacing={1.5}
                sx={{
                  position: "absolute",
                  left: { xs: 24, md: 32 },
                  right: { xs: 24, md: 32 },
                  bottom: { xs: 24, md: 32 },
                }}
              >
                <Typography
                  sx={{
                    color: alpha(alphaZoneColors.white, 0.82),
                    fontSize: "0.82rem",
                    fontWeight: 800,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                  }}
                >
                  Alpha Zone Membership
                </Typography>
                <Typography
                  sx={{
                    color: "#FFFFFF",
                    fontSize: { xs: "1.8rem", md: "2.8rem" },
                    fontWeight: 700,
                    lineHeight: 1.02,
                    letterSpacing: "-0.05em",
                  }}
                >
                  Beyond limits starts with your next session.
                </Typography>
              </Stack>
            </Box>

            <Stack
              spacing={3.2}
              justifyContent="center"
              sx={{
                width: { xs: "100%", md: 420 },
                px: { xs: 3, md: 5 },
                py: { xs: 3.5, md: 5 },
              }}
            >
              <Stack spacing={1}>
                <Typography
                  sx={{
                    color: alpha(alphaZoneColors.slate, 0.7),
                    fontSize: "0.8rem",
                    fontWeight: 800,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                  }}
                >
                  Member Access
                </Typography>
                <Typography
                  sx={{
                    color: alphaZoneColors.ink,
                    fontSize: { xs: "2rem", md: "2.5rem" },
                    fontWeight: 700,
                    letterSpacing: "-0.05em",
                  }}
                >
                  {title}
                </Typography>
                <Typography
                  sx={{
                    color: alpha(alphaZoneColors.ink, 0.66),
                    lineHeight: 1.8,
                  }}
                >
                  {description}
                </Typography>
              </Stack>

              <Stack spacing={2.25}>
                <TextField
                  fullWidth
                  variant="standard"
                  label="Username"
                  onChange={handleUsername}
                  InputProps={{
                    startAdornment: (
                      <PersonOutlineRoundedIcon
                        sx={{
                          mr: 1.25,
                          color: alpha(alphaZoneColors.slate, 0.72),
                          fontSize: 20,
                        }}
                      />
                    ),
                  }}
                  sx={authInputSx}
                />

                {showPhone ? (
                  <TextField
                    fullWidth
                    variant="standard"
                    label="Phone number"
                    onChange={handlePhone}
                    InputProps={{
                      startAdornment: (
                        <PhoneIphoneRoundedIcon
                          sx={{
                            mr: 1.25,
                            color: alpha(alphaZoneColors.slate, 0.72),
                            fontSize: 20,
                          }}
                        />
                      ),
                    }}
                    sx={authInputSx}
                  />
                ) : null}

                <TextField
                  fullWidth
                  variant="standard"
                  label="Password"
                  type="password"
                  onChange={handlePassword}
                  onKeyDown={handlePasswordKeyDown}
                  InputProps={{
                    startAdornment: (
                      <LockOutlinedIcon
                        sx={{
                          mr: 1.25,
                          color: alpha(alphaZoneColors.slate, 0.72),
                          fontSize: 20,
                        }}
                      />
                    ),
                  }}
                  sx={authInputSx}
                />
              </Stack>

              <Button
                variant="contained"
                size="large"
                onClick={onSubmit}
                startIcon={<LoginIcon />}
                sx={{
                  alignSelf: "flex-start",
                  px: 3.5,
                  py: 1.2,
                  color: alphaZoneColors.ink,
                  backgroundColor: alphaZoneColors.mint,
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: alphaZoneColors.mintStrong,
                    boxShadow: "none",
                  },
                }}
              >
                {buttonText}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );

  return (
    <>
      {renderAuthModal({
        open: signupOpen,
        onClose: handleSignupClose,
        title: "Create your Alpha Zone account",
        description:
          "Set up a clean profile for supplements, orders, and member updates.",
        buttonText: "Signup",
        onSubmit: handleSignupRequest,
        showPhone: true,
      })}

      {renderAuthModal({
        open: loginOpen,
        onClose: handleLoginClose,
        title: "Welcome back",
        description:
          "Log in to continue your orders, dashboard, and Alpha Zone stack.",
        buttonText: "Login",
        onSubmit: handleLoginRequest,
      })}
    </>
  );
}
