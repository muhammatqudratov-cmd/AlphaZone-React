import { useState, SyntheticEvent, useEffect } from "react";
import {
  Avatar,
  Box,
  Container,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import TabContext from "@mui/lab/TabContext";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import { useDispatch } from "react-redux";
import { setPausedOrders, setProcessOrders, setFinishedOrders } from "./slice";
import { Order, OrderInquiry } from "../../../lib/types/order";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { useGlobals } from "../../hooks/useGlobals";
import { useHistory } from "react-router-dom";
import { serverApi } from "../../../lib/config";
import { MemberType } from "../../../lib/enums/member.enum";
import {
  alphaZoneColors,
  alphaZoneInputSx,
  alphaZoneSurface,
} from "../../../lib/alphaZone";

export default function OrdersPage() {
  const dispatch = useDispatch();
  const { orderBuilder, authMember } = useGlobals();
  const history = useHistory();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const [value, setValue] = useState("1");
  const [orderInquery] = useState<OrderInquiry>({
    page: 1,
    limit: 5,
    orderStatus: OrderStatus.PAUSE,
  });

  useEffect(() => {
    const order = new OrderService();

    order
      .getMyOrders({ ...orderInquery, orderStatus: OrderStatus.PAUSE })
      .then((data: Order[]) => dispatch(setPausedOrders(data)))
      .catch((err) => console.log(err));

    order
      .getMyOrders({ ...orderInquery, orderStatus: OrderStatus.PROCESS })
      .then((data: Order[]) => dispatch(setProcessOrders(data)))
      .catch((err) => console.log(err));

    order
      .getMyOrders({ ...orderInquery, orderStatus: OrderStatus.FINISH })
      .then((data: Order[]) => dispatch(setFinishedOrders(data)))
      .catch((err) => console.log(err));
  }, [dispatch, orderInquery, orderBuilder]);

  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

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
        <TabContext value={value}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "320px minmax(0, 1fr)" },
              gap: 3,
              alignItems: "start",
            }}
          >
            <Stack spacing={3}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: "32px",
                  ...alphaZoneSurface(0.88),
                }}
              >
                <Stack spacing={2.2} alignItems="center">
                  <Box sx={{ position: "relative" }}>
                    <Avatar
                      src={
                        authMember?.memberImage
                          ? `${serverApi}/${authMember.memberImage}`
                          : "/icons/default-user.svg"
                      }
                      sx={{
                        width: 110,
                        height: 110,
                        borderRadius: "28px",
                        boxShadow: "0 18px 38px rgba(69,123,157,0.16)",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        right: -4,
                        bottom: -4,
                        width: 34,
                        height: 34,
                        borderRadius: "50%",
                        display: "grid",
                        placeItems: "center",
                        backgroundColor: alpha("#FFFFFF", 0.92),
                        border: `1px solid ${alpha(alphaZoneColors.slate, 0.14)}`,
                      }}
                    >
                      <Box
                        component="img"
                        src={
                          authMember?.memberType === MemberType.GYM
                            ? "/icons/arm-muscle.png"
                            : "/icons/user-badge.svg"
                        }
                        alt={authMember?.memberType}
                        sx={{ width: 18, height: 18, objectFit: "contain" }}
                      />
                    </Box>
                  </Box>

                  <Stack spacing={0.35} alignItems="center">
                    <Typography
                      sx={{
                        color: alphaZoneColors.ink,
                        fontSize: "1.3rem",
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

                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{
                      px: 1.25,
                      py: 0.9,
                      borderRadius: "999px",
                      backgroundColor: alpha(alphaZoneColors.mint, 0.18),
                    }}
                  >
                    <LocationOnRoundedIcon
                      sx={{ fontSize: 18, color: alphaZoneColors.slate }}
                    />
                    <Typography
                      sx={{
                        color: alphaZoneColors.ink,
                        fontWeight: 600,
                        fontSize: "0.84rem",
                        textAlign: "center",
                      }}
                    >
                      {authMember?.memberAddress ?? "Address not added yet"}
                    </Typography>
                  </Stack>
                </Stack>
              </Box>

              <Box
                sx={{
                  p: 1.2,
                  borderRadius: "32px",
                  ...alphaZoneSurface(0.88),
                }}
              >
                <Tabs
                  orientation={isDesktop ? "vertical" : "horizontal"}
                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  sx={{
                    minHeight: isDesktop ? 230 : "auto",
                    "& .MuiTabs-indicator": {
                      display: "none",
                    },
                    "& .MuiTab-root": {
                      alignItems: "flex-start",
                      textAlign: "left",
                      color: alpha(alphaZoneColors.ink, 0.62),
                    },
                    "& .Mui-selected": {
                      color: `${alphaZoneColors.ink} !important`,
                      backgroundColor: alpha(alphaZoneColors.mint, 0.26),
                    },
                  }}
                >
                  <Tab label="Pending" value={"1"} />
                  <Tab label="Shipped" value={"2"} />
                  <Tab label="Delivered" value={"3"} />
                </Tabs>
              </Box>

              <Box
                sx={{
                  p: 3,
                  borderRadius: "32px",
                  ...alphaZoneSurface(0.88),
                }}
              >
                <Stack spacing={1.8}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <CreditCardRoundedIcon sx={{ color: alphaZoneColors.slate }} />
                    <Typography
                      sx={{
                        color: alphaZoneColors.ink,
                        fontSize: "1rem",
                        fontWeight: 700,
                      }}
                    >
                      Payment Details
                    </Typography>
                  </Stack>

                  <TextField
                    placeholder="Card number : **** 4090 2002 7495"
                    fullWidth
                    sx={alphaZoneInputSx}
                  />
                  <Stack direction={{ xs: "column", sm: "row", lg: "column" }} spacing={1.3}>
                    <TextField placeholder="07 / 24" fullWidth sx={alphaZoneInputSx} />
                    <TextField placeholder="CVV : 010" fullWidth sx={alphaZoneInputSx} />
                  </Stack>
                  <TextField
                    placeholder="Justin Robertson"
                    fullWidth
                    sx={alphaZoneInputSx}
                  />

                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {["/icons/western-card.svg", "/icons/master-card.svg", "/icons/paypal-card.svg", "/icons/visa-card.svg"].map(
                      (card) => (
                        <Box
                          key={card}
                          component="img"
                          src={card}
                          alt="Card provider"
                          sx={{
                            width: 54,
                            height: 36,
                            objectFit: "contain",
                            borderRadius: "12px",
                            backgroundColor: alpha("#FFFFFF", 0.74),
                            p: 0.75,
                          }}
                        />
                      ),
                    )}
                  </Stack>
                </Stack>
              </Box>
            </Stack>

            <Stack spacing={2.5}>
              <Stack spacing={0.9}>
                <Typography
                  sx={{
                    color: alpha(alphaZoneColors.ink, 0.58),
                    fontSize: "0.8rem",
                    fontWeight: 800,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                  }}
                >
                  Order Dashboard
                </Typography>
                <Typography
                  sx={{
                    color: alphaZoneColors.ink,
                    fontSize: { xs: "2rem", md: "3rem" },
                    fontWeight: 700,
                    letterSpacing: "-0.05em",
                  }}
                >
                  Track every order cleanly
                </Typography>
                <Typography
                  sx={{
                    maxWidth: 620,
                    color: alpha(alphaZoneColors.ink, 0.68),
                    lineHeight: 1.8,
                  }}
                >
                  Pending, shipped, and completed orders now live inside a
                  calmer dashboard flow with clearer states and softer surfaces.
                </Typography>
              </Stack>

              <Box
                sx={{
                  p: { xs: 2, md: 2.5 },
                  borderRadius: "36px",
                  ...alphaZoneSurface(0.88),
                }}
              >
                <PausedOrders setValue={setValue} />
                <ProcessOrders setValue={setValue} />
                <FinishedOrders />
              </Box>
            </Stack>
          </Box>
        </TabContext>
      </Container>
    </Box>
  );
}
