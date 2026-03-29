import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Footers = styled.div`
  width: 100%;
  height: 590px;
  display: flex;
  background: #0A0A0F;
  border-top: 1px solid rgba(255, 107, 0, 0.15);
  background-size: cover;
`;

export default function Footer() {
  const authMember = null;

  return (
    <Footers>
      <Container>
        <Stack flexDirection={"row"} sx={{ mt: "94px" }}>
          <Stack flexDirection={"column"} style={{ width: "340px" }}>
            <Box>
              <span style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "32px",
                letterSpacing: "4px",
                background: "linear-gradient(90deg, #FF6B00, #E94560)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                ALPHAZONE
              </span>
            </Box>
            <Box className={"foot-desc-txt"} style={{
              color: "#7A7A9A",
              fontSize: "14px",
              lineHeight: "1.8",
              marginTop: "16px",
            }}>
              Premium gym supplements, apparel and nutrition for athletes who
              never settle. Train harder. Recover faster. Dominate.
            </Box>
            <Box className="sns-context" sx={{ mt: "24px", display: "flex", gap: "12px" }}>
              {["facebook", "twitter", "instagram", "youtube"].map((icon) => (
                <Box key={icon} sx={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  border: "1px solid rgba(255,107,0,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "border-color 0.2s, background 0.2s",
                  "&:hover": {
                    borderColor: "#FF6B00",
                    background: "rgba(255,107,0,0.1)",
                  }
                }}>
                  <img src={`/icons/${icon}.svg`} style={{ width: "18px", filter: "brightness(0.7)" }} />
                </Box>
              ))}
            </Box>
          </Stack>

          <Stack sx={{ ml: "288px" }} flexDirection={"row"}>
            <Stack>
              <Box>
                <Box className={"foot-category-title"} style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "18px",
                  letterSpacing: "3px",
                  color: "#FF6B00",
                  marginBottom: "20px",
                }}>
                  Bo'limlar
                </Box>
                <Box className={"foot-category-link"} style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}>
                  {[
                    { to: "/", label: "Home" },
                    { to: "/products", label: "Products" },
                    ...(authMember ? [{ to: "/orders", label: "Orders" }] : []),
                    { to: "/help", label: "Help" },
                  ].map((item) => (
                    <Link key={item.to} to={item.to} style={{
                      color: "#7A7A9A",
                      textDecoration: "none",
                      fontSize: "14px",
                      fontWeight: 500,
                      letterSpacing: "0.5px",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#FF6B00")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#7A7A9A")}
                    >
                      {item.label}
                    </Link>
                  ))}
                </Box>
              </Box>
            </Stack>

            <Stack sx={{ ml: "100px" }}>
              <Box>
                <Box className={"foot-category-title"} style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "18px",
                  letterSpacing: "3px",
                  color: "#FF6B00",
                  marginBottom: "20px",
                }}>
                  Find us
                </Box>
                <Box
                  flexDirection={"column"}
                  sx={{ mt: "20px" }}
                  className={"foot-category-link"}
                  justifyContent={"space-between"}
                >
                  {[
                    { label: "L.", value: "Downtown, South Korea" },
                    { label: "P.", value: "+82 010 5748 2425" },
                    { label: "E.", value: "alphagym@gmail.com" },
                    { label: "H.", value: "Visit 24 hours" },
                  ].map((item) => (
                    <Box key={item.label} className={"find-us"} sx={{
                      display: "flex",
                      gap: "10px",
                      mb: "12px",
                      alignItems: "flex-start",
                    }}>
                      <span style={{
                        color: "#FF6B00",
                        fontWeight: 700,
                        fontSize: "13px",
                        minWidth: "20px",
                      }}>{item.label}</span>
                      <div style={{ color: "#7A7A9A", fontSize: "14px" }}>{item.value}</div>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Stack>
          </Stack>
        </Stack>

        <Stack
          style={{
            border: "1px solid rgba(255,107,0,0.15)",
            width: "100%",
          }}
          sx={{ mt: "80px" }}
        />
        <Stack className={"copyright-txt"} style={{
          color: "#7A7A9A",
          fontSize: "13px",
          marginTop: "24px",
          textAlign: "center",
          letterSpacing: "0.5px",
        }}>
          © Copyright AlphaZone, All rights reserved.
        </Stack>
      </Container>
    </Footers>
  );
}