import {
  Box,
  Card,
  CardMedia,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePopularSupplements } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import {
  alphaZoneColors,
  alphaZoneSurface,
} from "../../../lib/alphaZone";

const popularSupplementsRetriever = createSelector(
  retrievePopularSupplements,
  (popularSupplements) => ({ popularSupplements }),
);

export default function PopularSupplements() {
  const { popularSupplements } = useSelector(popularSupplementsRetriever);

  return (
    <Box
      component="section"
      sx={{
        px: { xs: 2, md: 4 },
        py: { xs: 6, md: 9 },
        background:
          "linear-gradient(180deg, rgba(168,218,220,0.08) 0%, rgba(247,251,248,1) 52%, rgba(241,250,238,0.92) 100%)",
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={4.5}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", md: "flex-end" }}
            spacing={2}
          >
            <Box>
              <Typography
                sx={{
                  color: alpha(alphaZoneColors.ink, 0.58),
                  fontSize: "0.78rem",
                  fontWeight: 800,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                Most loved picks
              </Typography>
              <Typography
                sx={{
                  color: alphaZoneColors.ink,
                  fontSize: { xs: "2.2rem", md: "3.2rem" },
                  fontWeight: 700,
                  letterSpacing: "-0.05em",
                }}
              >
                Popular Supplements
              </Typography>
            </Box>

            <Typography
              sx={{
                maxWidth: 490,
                color: alpha(alphaZoneColors.ink, 0.7),
                lineHeight: 1.8,
                fontSize: "1rem",
              }}
            >
              Premium product cards with a glassmorphism shell, bold pricing,
              and layered motion for a more editorial Alpha Zone storefront.
            </Typography>
          </Stack>

          {popularSupplements?.length !== 0 ? (
            <Grid container spacing={3}>
              {popularSupplements.map((product: Product, index: number) => {
                const imagePath = product.productImages?.[0]
                  ? `${serverApi}/${product.productImages[0]}`
                  : "/icons/noimage-list.svg";

                return (
                  <Grid key={product._id} size={{ xs: 12, sm: 6, xl: 3 }}>
                    <motion.div
                      initial={{ opacity: 0, y: 38, scale: 0.97 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      whileHover={{ y: -14, scale: 1.025 }}
                      viewport={{ once: true, amount: 0.22 }}
                      transition={{
                        duration: 0.65,
                        delay: index * 0.1,
                        ease: "easeOut",
                      }}
                      style={{ height: "100%" }}
                    >
                      <Card
                        sx={{
                          position: "relative",
                          height: { xs: 390, md: 450 },
                          borderRadius: "32px",
                          overflow: "hidden",
                          border: "1px solid rgba(255,255,255,0.54)",
                          boxShadow: "0 30px 72px rgba(69,123,157,0.18)",
                          backgroundColor: alpha("#FFFFFF", 0.18),
                          backdropFilter: "blur(22px)",
                          "&:hover .popular-media": {
                            transform: "scale(1.08)",
                          },
                          "&:hover .popular-overlay": {
                            transform: "translateY(-10px)",
                          },
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={imagePath}
                          alt={product.productName}
                          className="popular-media"
                          sx={{
                            height: "100%",
                            objectFit: "cover",
                            transition: "transform 0.9s ease",
                          }}
                        />

                        <Box
                          sx={{
                            position: "absolute",
                            inset: 0,
                            background:
                              "linear-gradient(180deg, rgba(8,20,28,0.06) 0%, rgba(8,20,28,0.28) 44%, rgba(8,20,28,0.84) 100%)",
                          }}
                        />

                        <Box
                          sx={{
                            position: "absolute",
                            top: -40,
                            right: -30,
                            width: 180,
                            height: 180,
                            borderRadius: "50%",
                            background:
                              "radial-gradient(circle, rgba(168,218,220,0.44) 0%, rgba(168,218,220,0) 68%)",
                          }}
                        />

                        <Stack
                          sx={{
                            position: "absolute",
                            inset: 0,
                            p: 2.5,
                            justifyContent: "space-between",
                          }}
                        >
                          <Stack direction="row" justifyContent="space-between">
                            <Chip
                              label="Most Viewed"
                              sx={{
                                borderRadius: "999px",
                                backgroundColor: alpha(alphaZoneColors.mint, 0.24),
                                border: `1px solid ${alpha(alphaZoneColors.mint, 0.48)}`,
                                color: "#F8FAF9",
                                fontWeight: 700,
                              }}
                            />

                            <Chip
                              label={`$${product.productPrice}`}
                              sx={{
                                borderRadius: "999px",
                                backgroundColor: alpha("#FFFFFF", 0.18),
                                border: "1px solid rgba(255,255,255,0.24)",
                                color: "#F8FAF9",
                                fontWeight: 700,
                              }}
                            />
                          </Stack>

                          <Box
                            className="popular-overlay"
                            sx={{
                              p: 2.4,
                              borderRadius: "26px",
                              transition: "transform 0.38s ease",
                              ...alphaZoneSurface(0.16),
                              border: "1px solid rgba(255,255,255,0.18)",
                            }}
                          >
                            <Stack spacing={1.25}>
                              <Typography
                                sx={{
                                  color: "#F8FAF9",
                                  fontSize: "1.28rem",
                                  fontWeight: 700,
                                  letterSpacing: "-0.03em",
                                }}
                              >
                                {product.productName}
                              </Typography>

                              <Typography
                                sx={{
                                  color: alpha("#F8FAF9", 0.76),
                                  fontSize: "0.92rem",
                                  lineHeight: 1.7,
                                  minHeight: 46,
                                  display: "-webkit-box",
                                  overflow: "hidden",
                                  WebkitBoxOrient: "vertical",
                                  WebkitLineClamp: 2,
                                }}
                              >
                                {product.productDesc ??
                                  "Built for clean energy, stronger sessions, and recovery that keeps moving."}
                              </Typography>

                              <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                              >
                                <Chip
                                  label={product.productCollection.toLowerCase()}
                                  sx={{
                                    width: "fit-content",
                                    height: 30,
                                    borderRadius: "999px",
                                    backgroundColor: alpha("#FFFFFF", 0.12),
                                    color: alpha("#F8FAF9", 0.86),
                                    textTransform: "capitalize",
                                  }}
                                />

                                <Stack
                                  direction="row"
                                  spacing={0.75}
                                  alignItems="center"
                                >
                                  <VisibilityOutlinedIcon
                                    sx={{
                                      color: alpha(alphaZoneColors.mint, 0.98),
                                      fontSize: 18,
                                    }}
                                  />
                                  <Typography
                                    sx={{
                                      color: alpha("#F8FAF9", 0.88),
                                      fontWeight: 700,
                                      fontSize: "0.88rem",
                                    }}
                                  >
                                    {product.productViews.toLocaleString()}
                                  </Typography>
                                </Stack>
                              </Stack>
                            </Stack>
                          </Box>
                        </Stack>
                      </Card>
                    </motion.div>
                  </Grid>
                );
              })}
            </Grid>
          ) : (
            <Box
              sx={{
                py: 8,
                borderRadius: "32px",
                textAlign: "center",
                ...alphaZoneSurface(0.8),
              }}
            >
              <Typography sx={{ color: alphaZoneColors.ink, fontWeight: 600 }}>
                New product are not availabe!
              </Typography>
            </Box>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
