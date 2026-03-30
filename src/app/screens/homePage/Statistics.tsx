import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Divider from "../../components/divider";

export default function Statistics() {
  const stats = [
    { num: "12+", txt: "Gym Branches", icon: "🏋️" },
    { num: "8", txt: "Years Experience", icon: "⚡" },
    { num: "500+", txt: "Supplements", icon: "💪" },
    { num: "10K+", txt: "Athletes", icon: "🏆" },
  ];

  return (
    <div className={"static-frame"} style={{
      background: "linear-gradient(135deg, #0A0A0F 0%, #13131A 100%)",
      borderBottom: "1px solid rgba(255,107,0,0.15)",
      borderTop: "1px solid rgba(255,107,0,0.15)",
    }}>
      <Container>
        <Stack className={"info"}>
          {stats.map((stat, index) => (
            <React.Fragment key={index}>
              <Stack className={"static-box"} style={{ alignItems: "center" }}>
                <Box style={{
                  fontSize: "28px",
                  marginBottom: "4px",
                }}>
                  {stat.icon}
                </Box>
                <Box className={"static-num"} style={{
                  fontFamily: "'Bebas Neue', Impact, sans-serif",
                  fontSize: "52px",
                  fontWeight: 900,
                  lineHeight: 1,
                  background: "linear-gradient(90deg, #FF6B00, #E94560)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>
                  {stat.num}
                </Box>
                <Box className={"static-txt"} style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "#7A7A9A",
                  marginTop: "4px",
                }}>
                  {stat.txt}
                </Box>
              </Stack>

              {index < stats.length - 1 && (
                <Divider height="64" width="1" bg="rgba(255,107,0,0.3)" />
              )}
            </React.Fragment>
          ))}
        </Stack>
      </Container>
    </div>
  );
}