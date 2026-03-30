import {
  Box,
  Chip,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Link } from "react-router-dom";
import { retrieveNewSupplements } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { ProductCollection } from "../../../lib/enums/product.enum";
import {
  alphaZoneColors,
  alphaZoneSoftShadow,
  alphaZoneSurface,
} from "../../../lib/alphaZone";

const newSupplementsRetriever = createSelector(
  retrieveNewSupplements,
  (newSupplements) => ({ newSupplements }),
);

export default function NewSupplements() {
  const { newSupplements } = useSelector(newSupplementsRetriever);

  return (
    <Box component="section" sx={{ px: { xs: 2, md: 4 }, py: { xs: 6, md: 9 } }}>
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
                Freshly stocked
              </Typography>
              <Typography
                sx={{
                  color: alphaZoneColors.ink,
                  fontSize: { xs: "2.2rem", md: "3.2rem" },
                  fontWeight: 700,
                  letterSpacing: "-0.05em",
                }}
              >
                New Arrivals
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
              A lighter masonry-inspired editorial grid with compact hover
              actions and clean product storytelling.
            </Typography>
          </Stack>

          {newSupplements.length !== 0 ? (
            <Box
              sx={{
                columnCount: { xs: 1, sm: 2, lg: 4 },
                columnGap: { xs: "0px", sm: "24px" },
              }}
            >
              {newSupplements.map((product: Product, index: number) => {
                const imagePath = product.productImages?.[0]
                  ? `${serverApi}/${product.productImages[0]}`
                  : "/icons/noimage-list.svg";
                const sizeVolume =
                  product.productCollection === ProductCollection.POWDER
                    ? `${product.productVolume ?? product.productWeight ?? "-"} ml`
                    : product.productCollection === ProductCollection.VITAMIN
                      ? `${product.productSize ?? "-"} size`
                      : `${product.productWeight ?? "-"} g`;
                const cardHeight =
                  index % 3 === 0 ? 320 : index % 3 === 1 ? 420 : 360;

                return (
                  <Box
                    key={product._id}
                    sx={{
                      breakInside: "avoid",
                      mb: 3,
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -10 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{
                        duration: 0.55,
                        delay: index * 0.08,
                        ease: "easeOut",
                      }}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          overflow: "hidden",
                          borderRadius: "32px",
                          border: `1px solid ${alpha(alphaZoneColors.slate, 0.14)}`,
                          background:
                            "linear-gradient(180deg, rgba(255,255,255,0.94) 0%, rgba(241,250,238,0.78) 100%)",
                          boxShadow: alphaZoneSoftShadow,
                          "&:hover .arrival-hover-action": {
                            opacity: 1,
                            transform: "translateY(0)",
                          },
                          "&:hover .arrival-image": {
                            transform: "scale(1.05)",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            position: "relative",
                            p: 2,
                            pb: 0,
                          }}
                        >
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{
                              position: "absolute",
                              top: 18,
                              left: 18,
                              right: 18,
                              zIndex: 2,
                            }}
                          >
                            <Chip
                              label={sizeVolume}
                              sx={{
                                borderRadius: "999px",
                                backgroundColor: alpha(alphaZoneColors.white, 0.88),
                                color: alphaZoneColors.ink,
                                fontWeight: 700,
                              }}
                            />

                            <IconButton
                              component={Link}
                              to={`/products/${product._id}`}
                              className="arrival-hover-action"
                              sx={{
                                width: 46,
                                height: 46,
                                opacity: { xs: 1, md: 0 },
                                transform: "translateY(12px)",
                                transition: "all 0.28s ease",
                                backgroundColor: alpha(alphaZoneColors.mint, 0.92),
                                color: alphaZoneColors.ink,
                                "&:hover": {
                                  backgroundColor: alphaZoneColors.mintStrong,
                                },
                              }}
                            >
                              <AddShoppingCartRoundedIcon fontSize="small" />
                            </IconButton>
                          </Stack>

                          <Box
                            sx={{
                              borderRadius: "26px",
                              overflow: "hidden",
                              minHeight: cardHeight,
                              ...alphaZoneSurface(0.72),
                            }}
                          >
                            <Box
                              component="img"
                              src={imagePath}
                              alt={product.productName}
                              className="arrival-image"
                              sx={{
                                width: "100%",
                                height: cardHeight,
                                objectFit: "cover",
                                transition: "transform 0.7s ease",
                              }}
                            />
                          </Box>
                        </Box>

                        <Stack spacing={1.4} sx={{ p: 2.5 }}>
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            spacing={1.5}
                            alignItems="flex-start"
                          >
                            <Typography
                              sx={{
                                color: alphaZoneColors.ink,
                                fontSize: "1.15rem",
                                fontWeight: 700,
                                letterSpacing: "-0.03em",
                              }}
                            >
                              {product.productName}
                            </Typography>
                            <Typography
                              sx={{
                                color: alphaZoneColors.slate,
                                fontWeight: 800,
                                whiteSpace: "nowrap",
                              }}
                            >
                              ${product.productPrice}
                            </Typography>
                          </Stack>

                          <Typography
                            sx={{
                              color: alpha(alphaZoneColors.ink, 0.68),
                              lineHeight: 1.75,
                              display: "-webkit-box",
                              overflow: "hidden",
                              WebkitBoxOrient: "vertical",
                              WebkitLineClamp: 2,
                            }}
                          >
                            {product.productDesc ??
                              "A clean performance staple shaped for stronger days and smoother recovery."}
                          </Typography>

                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Chip
                              label={product.productCollection.toLowerCase()}
                              sx={{
                                borderRadius: "999px",
                                textTransform: "capitalize",
                                backgroundColor: alpha(alphaZoneColors.mint, 0.18),
                                color: alphaZoneColors.slate,
                              }}
                            />

                            <Stack direction="row" spacing={0.7} alignItems="center">
                              <VisibilityOutlinedIcon
                                sx={{ color: alphaZoneColors.slate, fontSize: 18 }}
                              />
                              <Typography
                                sx={{
                                  color: alphaZoneColors.ink,
                                  fontWeight: 700,
                                  fontSize: "0.9rem",
                                }}
                              >
                                {product.productViews}
                              </Typography>
                            </Stack>
                          </Stack>
                        </Stack>
                      </Box>
                    </motion.div>
                  </Box>
                );
              })}
            </Box>
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
                New products are not available!
              </Typography>
            </Box>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
