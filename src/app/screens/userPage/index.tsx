import { Box, Chip, Container, Stack, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { alpha } from "@mui/material/styles";
import { Settings } from "./Settings";
import { useGlobals } from "../../hooks/useGlobals";
import { useHistory } from "react-router-dom";
import { serverApi } from "../../../lib/config";
import { MemberType } from "../../../lib/enums/member.enum";
import { alphaZoneColors, alphaZoneSurface } from "../../../lib/alphaZone";

const sidebarLinks = [
  "Profile overview",
  "Account settings",
  "Recovery notes",
];

export default function UserPage() {
  const history = useHistory();
  const { authMember } = useGlobals();

  if (!authMember) history.push("/");

  return (
    <Box
      sx={{
        py: { xs: 5, md: 8 },
        px: { xs: 2, md: 4 },
        background:
          "linear-gradient(180deg, rgba(247,251,248,0.96) 0%, rgba(241,250,238,1) 100%)",
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "280px minmax(0, 1fr)" },
            gap: 3,
            alignItems: "start",
          }}
        >
          <Stack
            spacing={3}
            sx={{
              p: 3,
              borderRadius: "32px",
              ...alphaZoneSurface(0.88),
            }}
          >
            <Stack spacing={2.2}>
              <Box
                component="img"
                src={
                  authMember?.memberImage
                    ? `${serverApi}/${authMember.memberImage}`
                    : "/icons/default-user.svg"
                }
                alt={authMember?.memberNick}
                sx={{
                  width: 110,
                  height: 110,
                  borderRadius: "28px",
                  objectFit: "cover",
                  boxShadow: "0 18px 38px rgba(69,123,157,0.14)",
                }}
              />

              <Stack spacing={0.5}>
                <Typography
                  sx={{
                    color: alphaZoneColors.ink,
                    fontSize: "1.35rem",
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {authMember?.memberNick}
                </Typography>
                <Typography
                  sx={{
                    color: alpha(alphaZoneColors.ink, 0.56),
                    fontSize: "0.92rem",
                    textTransform: "capitalize",
                  }}
                >
                  {authMember?.memberType}
                </Typography>
              </Stack>

              <Chip
                label={`${authMember?.memberPoints ?? 0} points`}
                sx={{
                  width: "fit-content",
                  borderRadius: "999px",
                  backgroundColor: alpha(alphaZoneColors.mint, 0.18),
                  color: alphaZoneColors.slate,
                  fontWeight: 700,
                }}
              />
            </Stack>

            <Stack spacing={1}>
              {sidebarLinks.map((item, index) => (
                <Box
                  key={item}
                  sx={{
                    px: 1.4,
                    py: 1.05,
                    borderRadius: "18px",
                    backgroundColor:
                      index === 1
                        ? alpha(alphaZoneColors.mint, 0.22)
                        : "transparent",
                    color:
                      index === 1
                        ? alphaZoneColors.ink
                        : alpha(alphaZoneColors.ink, 0.64),
                    fontWeight: index === 1 ? 700 : 600,
                  }}
                >
                  {item}
                </Box>
              ))}
            </Stack>
          </Stack>

          <Stack spacing={3}>
            <Box
              sx={{
                p: { xs: 2.4, md: 3.2 },
                borderRadius: "36px",
                ...alphaZoneSurface(0.9),
              }}
            >
              <Stack spacing={2.2}>
                <Box>
                  <Typography
                    sx={{
                      color: alpha(alphaZoneColors.ink, 0.58),
                      fontSize: "0.8rem",
                      fontWeight: 800,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                    }}
                  >
                    My Dashboard
                  </Typography>
                  <Typography
                    sx={{
                      color: alphaZoneColors.ink,
                      fontSize: { xs: "2rem", md: "2.8rem" },
                      fontWeight: 700,
                      letterSpacing: "-0.05em",
                    }}
                  >
                    Personal profile settings
                  </Typography>
                </Box>

                <Settings />
              </Stack>
            </Box>

            <Box
              sx={{
                p: 3,
                borderRadius: "32px",
                ...alphaZoneSurface(0.88),
              }}
            >
              <Stack spacing={1.6}>
                <Typography
                  sx={{
                    color: alphaZoneColors.ink,
                    fontSize: "1.05rem",
                    fontWeight: 700,
                  }}
                >
                  Member summary
                </Typography>
                <Typography
                  sx={{
                    color: alpha(alphaZoneColors.ink, 0.66),
                    lineHeight: 1.8,
                  }}
                >
                  {authMember?.memberDesc ?? "No description"}
                </Typography>

                <Typography
                  sx={{
                    color: alpha(alphaZoneColors.ink, 0.56),
                    fontSize: "0.9rem",
                  }}
                >
                  {authMember?.memberAddress ?? "no address"}
                </Typography>

                <Stack direction="row" spacing={1.2}>
                  {[FacebookIcon, InstagramIcon, TelegramIcon, YouTubeIcon].map(
                    (Icon, index) => (
                      <Box
                        key={index}
                        sx={{
                          width: 42,
                          height: 42,
                          borderRadius: "14px",
                          display: "grid",
                          placeItems: "center",
                          backgroundColor: alpha(alphaZoneColors.mint, 0.16),
                          color: alphaZoneColors.slate,
                        }}
                      >
                        <Icon fontSize="small" />
                      </Box>
                    ),
                  )}
                </Stack>

                <Chip
                  label={
                    authMember?.memberType === MemberType.GYM
                      ? "Gym Member"
                      : "Standard Member"
                  }
                  sx={{
                    width: "fit-content",
                    borderRadius: "999px",
                    backgroundColor: alpha(alphaZoneColors.slate, 0.1),
                    color: alphaZoneColors.slate,
                    fontWeight: 700,
                  }}
                />
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
