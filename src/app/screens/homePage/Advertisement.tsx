import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { alphaZoneColors } from "../../../lib/alphaZone";

const heroVideo =
  "video/alpha.mp4";

const highlightCards = [
  {
    index: "01",
    title: "Strength-first coaching",
  },
  {
    index: "02",
    title: "Supplement essentials",
  },
  {
    index: "03",
    title: "Weekly event drops",
  },
];

const kineticWords = ["Power", "Recovery", "Discipline"];

export default function Advertisement() {
  return (
    <Box component="section" sx={{ px: { xs: 2, md: 4 }, pt: { xs: 3, md: 4 } }}>
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          minHeight: { xs: 560, md: 760 },
          borderRadius: { xs: "32px", md: "40px" },
          boxShadow: "0 38px 92px rgba(20,42,54,0.16)",
          backgroundColor: alphaZoneColors.ink,
        }}
      >
        <Box
          component="video"
          autoPlay
          muted
          loop
          playsInline
          poster="/img/banner.jpg"
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          <source src={heroVideo} type="video/mp4" />
        </Box>

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(106deg, rgba(8,24,31,0.84) 0%, rgba(8,24,31,0.62) 38%, rgba(8,24,31,0.2) 100%)",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at top right, rgba(168,218,220,0.34) 0%, rgba(168,218,220,0) 34%)",
          }}
        />

        <Container
          maxWidth="xl"
          sx={{
            position: "relative",
            zIndex: 1,
            py: { xs: 6, md: 8 },
            height: "100%",
          }}
        >
          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="stretch">
            <Grid size={{ xs: 12, md: 7 }}>
              <Stack
                spacing={3}
                justifyContent="center"
                sx={{ minHeight: { md: 620 } }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  <Chip
                    label="Alpha Zone Performance Club"
                    sx={{
                      width: "fit-content",
                      borderRadius: "999px",
                      px: 1.1,
                      bgcolor: alpha(alphaZoneColors.mint, 0.18),
                      border: `1px solid ${alpha(alphaZoneColors.mint, 0.4)}`,
                      color: "#F8FAF9",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.08, ease: "easeOut" }}
                >
                  <Typography
                    sx={{
                      maxWidth: 760,
                      color: "#F8FAF9",
                      fontSize: { xs: "2.7rem", md: "5.2rem" },
                      lineHeight: { xs: 1.03, md: 0.95 },
                      fontWeight: 700,
                      letterSpacing: "-0.07em",
                    }}
                  >
                    Alpha Zone
                  </Typography>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.16, ease: "easeOut" }}
                >
                  <Typography
                    sx={{
                      maxWidth: 620,
                      color: alpha("#F8FAF9", 0.8),
                      fontSize: { xs: "1rem", md: "1.12rem" },
                      lineHeight: 1.85,
                    }}
                  >
                    A cleaner gym aesthetic with cinematic motion, curated
                    essentials, and a sharper performance rhythm from entry to
                    recovery.
                  </Typography>
                </motion.div>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  alignItems={{ xs: "stretch", sm: "center" }}
                >
                </Stack>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 5 }}>
              <Stack
                spacing={2}
                justifyContent="space-between"
                sx={{ minHeight: { md: 620 } }}
              >
                <Stack
                  direction={{ xs: "row", md: "column" }}
                  spacing={1.25}
                  sx={{ overflowX: { xs: "auto", md: "visible" } }}
                >
                  {kineticWords.map((word, index) => (
                    <motion.div
                      key={word}
                      initial={{ opacity: 0, x: 28 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.7,
                        delay: 0.16 + index * 0.08,
                        ease: "easeOut",
                      }}
                    >
                      <Typography
                        sx={{
                          color:
                            index === 0
                              ? alpha(alphaZoneColors.mint, 0.98)
                              : alpha("#F8FAF9", 0.34),
                          fontSize: { xs: "1.35rem", md: "3rem" },
                          fontWeight: 700,
                          letterSpacing: "-0.05em",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {word}
                      </Typography>
                    </motion.div>
                  ))}
                </Stack>

                <Stack spacing={2}>
                  {highlightCards.map((card, index) => (
                    <motion.div
                      key={card.index}
                      initial={{ opacity: 0, y: 26 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.7,
                        delay: 0.18 + index * 0.08,
                        ease: "easeOut",
                      }}
                    >
                      <Box
                        sx={{
                          p: 2.6,
                          borderRadius: "28px",
                          backgroundColor: alpha("#FFFFFF", 0.12),
                          border: `1px solid ${alpha("#FFFFFF", 0.16)}`,
                          backdropFilter: "blur(22px)",
                          boxShadow: "0 20px 45px rgba(11,29,39,0.16)",
                        }}
                      >
                        <Stack spacing={1.15}>
                          <Typography
                            sx={{
                              color: alpha(alphaZoneColors.mint, 0.96),
                              fontSize: "0.78rem",
                              fontWeight: 800,
                              letterSpacing: "0.18em",
                              textTransform: "uppercase",
                            }}
                          >
                            {card.index}
                          </Typography>
                          <Typography
                            sx={{
                              color: "#F8FAF9",
                              fontSize: "1.12rem",
                              fontWeight: 700,
                            }}
                          >
                            {card.title}
                          </Typography>
                          <Typography
                            sx={{
                              color: alpha("#F8FAF9", 0.74),
                              lineHeight: 1.75,
                              fontSize: "0.94rem",
                            }}
                          >
                          </Typography>
                        </Stack>
                      </Box>
                    </motion.div>
                  ))}
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
