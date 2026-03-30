import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveFinishedOrders } from "./selector";
import { Order } from "../../../lib/types/order";
import OrderCard from "./OrderCard";
import { alphaZoneColors, alphaZoneSurface } from "../../../lib/alphaZone";

const finishedOrdersRetriever = createSelector(
  retrieveFinishedOrders,
  (finishedOrders) => ({ finishedOrders }),
);

export default function FinishedOrders() {
  const { finishedOrders } = useSelector(finishedOrdersRetriever);

  return (
    <TabPanel value={"3"} sx={{ p: 0 }}>
      <Stack spacing={2}>
        {finishedOrders?.map((order: Order) => (
          <OrderCard key={order._id} order={order} />
        ))}

        {!finishedOrders ||
          (finishedOrders.length === 0 && (
            <Box
              sx={{
                py: 8,
                borderRadius: "32px",
                textAlign: "center",
                ...alphaZoneSurface(0.82),
              }}
            >
              <Typography sx={{ color: alphaZoneColors.ink, fontWeight: 600 }}>
                No completed orders yet.
              </Typography>
            </Box>
          ))}
      </Stack>
    </TabPanel>
  );
}
