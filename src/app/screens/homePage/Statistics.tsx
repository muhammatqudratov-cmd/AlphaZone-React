import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import AutoGraphRoundedIcon from "@mui/icons-material/AutoGraphRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import FitnessCenterRoundedIcon from "@mui/icons-material/FitnessCenterRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import { alphaZoneColors, alphaZoneMutedSurface } from "../../../lib/alphaZone";

const stats = [
  { num: "12+", txt: "Gym Branches", icon: <FitnessCenterRoundedIcon /> },
  { num: "8", txt: "Years Experience", icon: <AutoGraphRoundedIcon /> },
  { num: "500+", txt: "Supplements", icon: <Inventory2RoundedIcon /> },
  { num: "10K+", txt: "Athletes", icon: <EmojiEventsRoundedIcon /> },
];

export default function Statistics() {
  return (
    <Box component="section" sx={{ px: { xs: 2, md: 4 }, py: { xs: 4, md: 5 } }}>
      <Container maxWidth="xl">
        <Stack spacing={2.5}>
          <Box>
            <Typography
              sx={{
                color: alpha("#183642", 0.62),
                fontSize: "0.78rem",
                fontWeight: 800,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Alpha Zone at a glance
            </Typography>
          </Box>

          <Grid container spacing={2.5}>
            {stats.map((stat) => (
              <Grid key={stat.txt} size={{ xs: 6, md: 3 }}>
                <Box
                  sx={{
                    height: "100%",
                    borderRadius: "28px",
                    p: { xs: 2.5, md: 3 },
                    ...alphaZoneMutedSurface(0.86),
                  }}
                >
                  <Stack spacing={1.5}>
                    <Box
                      sx={{
                        width: 42,
                        height: 42,
                        borderRadius: "18px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: alphaZoneColors.slate,
                        backgroundColor: alpha(alphaZoneColors.mint, 0.2),
                      }}
                    >
                      {stat.icon}
                    </Box>

                    <Typography
                      sx={{
                        color: "#183642",
                        fontSize: { xs: "1.8rem", md: "2.2rem" },
                        fontWeight: 800,
                        letterSpacing: "-0.04em",
                      }}
                    >
                      {stat.num}
                    </Typography>

                    <Typography
                      sx={{
                        color: alpha("#183642", 0.68),
                        fontSize: "0.94rem",
                        fontWeight: 600,
                      }}
                    >
                      {stat.txt}
                    </Typography>
                  </Stack>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}
