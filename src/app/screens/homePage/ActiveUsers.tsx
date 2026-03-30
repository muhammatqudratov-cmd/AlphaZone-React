import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveTopUsers } from "./selector";
import { serverApi } from "../../../lib/config";
import { Member } from "../../../lib/types/member";
import { alphaZoneMutedSurface } from "../../../lib/alphaZone";

/** REDUX SLICE & SELECTOR **/
const topUsersRetriever = createSelector(retrieveTopUsers, (topUsers) => ({
  topUsers,
}));

export default function ActiveUsers() {
  const { topUsers } = useSelector(topUsersRetriever);

  return (
    <Box component="section" sx={{ px: { xs: 2, md: 4 }, py: { xs: 6, md: 8 } }}>
      <Container maxWidth="xl">
        <Stack spacing={4}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", md: "flex-end" }}
            spacing={2}
          >
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
                Community spotlight
              </Typography>
              <Typography
                sx={{
                  color: "#183642",
                  fontSize: { xs: "2rem", md: "3rem" },
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                }}
              >
                Active Users
              </Typography>
            </Box>

            <Typography
              sx={{
                maxWidth: 460,
                color: alpha("#183642", 0.7),
                lineHeight: 1.8,
                fontSize: "0.98rem",
              }}
            >
            </Typography>
          </Stack>

          {topUsers.length !== 0 ? (
            <Grid container spacing={3}>
              {topUsers.map((member: Member) => {
                const imagePath = member.memberImage
                  ? `${serverApi}/${member.memberImage}`
                  : "/icons/default-user.svg";

                return (
                  <Grid key={member._id} size={{ xs: 6, md: 3 }}>
                    <Card
                      sx={{
                        height: "100%",
                        borderRadius: "28px",
                        overflow: "hidden",
                        ...alphaZoneMutedSurface(0.92),
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={imagePath}
                        alt={member.memberNick}
                        sx={{ height: { xs: 220, md: 280 }, objectFit: "cover" }}
                      />

                      <CardContent sx={{ p: 2.5 }}>
                        <Stack spacing={0.75}>
                          <Typography
                            sx={{
                              color: "#183642",
                              fontSize: "1.05rem",
                              fontWeight: 700,
                              letterSpacing: "-0.02em",
                            }}
                          >
                            {member.memberNick}
                          </Typography>
                          <Typography
                            sx={{
                              color: alpha("#183642", 0.64),
                              fontSize: "0.88rem",
                            }}
                          >
                            {member.memberPoints.toLocaleString()} points
                          </Typography>
                        </Stack>
                      </CardContent>
                    </Card>
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
                ...alphaZoneMutedSurface(0.76),
              }}
            >
              <Typography sx={{ color: "#183642", fontWeight: 600 }}>
                No Active Users
              </Typography>
            </Box>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
