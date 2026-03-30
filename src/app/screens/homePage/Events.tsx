import React from "react";
import {
  Box,
  Chip,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination } from "swiper";
import { plans } from "../../../lib/data/plans";
import "swiper/css";
import "swiper/css/pagination";
import { alphaZoneColors } from "../../../lib/alphaZone";

SwiperCore.use([Autoplay, Pagination]);

export default function Events() {
  return (
    <Box
      id="alpha-events"
      sx={{
        py: { xs: 7, md: 10 },
        px: { xs: 2, md: 4 },
        background:
          "linear-gradient(180deg, rgba(247,251,248,1) 0%, rgba(241,250,238,0.94) 100%)",
        "& .swiper-pagination": {
          bottom: "8px !important",
        },
        "& .swiper-pagination-bullet": {
          width: 10,
          height: 10,
          background: alpha(alphaZoneColors.slate, 0.2),
          opacity: 1,
          transition: "all 0.25s ease",
        },
        "& .swiper-pagination-bullet-active": {
          width: 28,
          borderRadius: 999,
          background: alphaZoneColors.mint,
        },
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
                Club calendar
              </Typography>
              <Typography
                sx={{
                  color: alphaZoneColors.ink,
                  fontSize: { xs: "2.2rem", md: "3.2rem" },
                  fontWeight: 700,
                  letterSpacing: "-0.05em",
                }}
              >
                Gym Events
              </Typography>
            </Box>

            <Typography
              sx={{
                maxWidth: 500,
                color: alpha(alphaZoneColors.ink, 0.7),
                lineHeight: 1.8,
                fontSize: "1rem",
              }}
            >
            </Typography>
          </Stack>

          <Swiper
            spaceBetween={28}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1200: { slidesPerView: 3 },
            }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            style={{ paddingBottom: "44px" }}
          >
            {plans.map((value, index) => (
              <SwiperSlide key={index}>
                <Box
                  sx={{
                    height: "100%",
                    overflow: "hidden",
                    borderRadius: "32px",
                    border: `1px solid ${alpha(alphaZoneColors.slate, 0.12)}`,
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(241,250,238,0.78) 100%)",
                    boxShadow: "0 24px 64px rgba(69,123,157,0.12)",
                  }}
                >
                  <Box
                    component="img"
                    src={value.img}
                    alt={value.title}
                    sx={{
                      width: "100%",
                      height: 260,
                      objectFit: "cover",
                    }}
                  />

                  <Stack spacing={2} sx={{ p: 3 }}>
                    <Chip
                      label={value.author}
                      sx={{
                        width: "fit-content",
                        borderRadius: "999px",
                        backgroundColor: alpha(alphaZoneColors.mint, 0.16),
                        color: alphaZoneColors.slate,
                        fontWeight: 700,
                      }}
                    />

                    <Typography
                      sx={{
                        fontSize: "1.4rem",
                        fontWeight: 700,
                        color: alphaZoneColors.ink,
                        letterSpacing: "-0.04em",
                      }}
                    >
                      {value.title}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "0.95rem",
                        color: alpha(alphaZoneColors.ink, 0.7),
                        lineHeight: 1.8,
                      }}
                    >
                      {value.desc}
                    </Typography>

                    <Stack direction="row" spacing={1.2} flexWrap="wrap" useFlexGap>
                      <Stack
                        direction="row"
                        spacing={0.75}
                        alignItems="center"
                        sx={{
                          px: 1.25,
                          py: 0.85,
                          borderRadius: "999px",
                          backgroundColor: alpha(alphaZoneColors.slate, 0.08),
                        }}
                      >
                        <CalendarMonthRoundedIcon
                          sx={{ fontSize: 17, color: alphaZoneColors.slate }}
                        />
                        <Typography
                          sx={{
                            color: alphaZoneColors.ink,
                            fontWeight: 600,
                            fontSize: "0.83rem",
                          }}
                        >
                          {value.date}
                        </Typography>
                      </Stack>

                      <Stack
                        direction="row"
                        spacing={0.75}
                        alignItems="center"
                        sx={{
                          px: 1.25,
                          py: 0.85,
                          borderRadius: "999px",
                          backgroundColor: alpha(alphaZoneColors.mint, 0.16),
                        }}
                      >
                        <FmdGoodOutlinedIcon
                          sx={{ fontSize: 17, color: alphaZoneColors.slate }}
                        />
                        <Typography
                          sx={{
                            color: alphaZoneColors.ink,
                            fontWeight: 600,
                            fontSize: "0.83rem",
                          }}
                        >
                          {value.location}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Stack>
      </Container>
    </Box>
  );
}
