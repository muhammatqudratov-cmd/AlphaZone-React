import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import TabPanel from "@mui/lab/TabPanel";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePausedOrders } from "./selector";
import { Messages } from "../../../lib/config";
import { Order, OrderUpdateInput } from "../../../lib/types/order";
import { T } from "../../../lib/types/common";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { useGlobals } from "../../hooks/useGlobals";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import OrderCard from "./OrderCard";
import { alphaZoneColors, alphaZoneSurface } from "../../../lib/alphaZone";

const pausedOrdersRetriever = createSelector(
  retrievePausedOrders,
  (pausedOrders) => ({ pausedOrders }),
);

interface PausedOrdersProps {
  setValue: (inout: string) => void;
}

export default function PausedOrders(props: PausedOrdersProps) {
  const { setValue } = props;
  const { authMember, setOrderBuilder } = useGlobals();
  const { pausedOrders } = useSelector(pausedOrdersRetriever);

  const deleteOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId,
        orderStatus: OrderStatus.DELETE,
      };

      const confirmation = window.confirm("Do you want to delete the order?");
      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);
        setOrderBuilder(new Date());
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  const processOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);

      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId,
        orderStatus: OrderStatus.PROCESS,
      };

      const confirmation = window.confirm(
        "Do you want to proceed with payment?",
      );
      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);
        setValue("2");
        setOrderBuilder(new Date());
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <TabPanel value={"1"} sx={{ p: 0 }}>
      <Stack spacing={2}>
        {pausedOrders?.map((order: Order) => (
          <OrderCard
            key={order._id}
            order={order}
            actions={
              <>
                <Button
                  value={order._id}
                  variant="outlined"
                  onClick={deleteOrderHandler}
                  sx={{
                    borderColor: alpha(alphaZoneColors.slate, 0.16),
                    color: alphaZoneColors.slate,
                    "&:hover": {
                      borderColor: alpha(alphaZoneColors.slate, 0.26),
                      backgroundColor: alpha(alphaZoneColors.slate, 0.06),
                    },
                  }}
                >
                  Cancel Order
                </Button>
                <Button
                  value={order._id}
                  variant="contained"
                  onClick={processOrderHandler}
                  sx={{
                    color: alphaZoneColors.ink,
                    backgroundColor: alphaZoneColors.mint,
                    "&:hover": {
                      backgroundColor: alphaZoneColors.mintStrong,
                    },
                  }}
                >
                  Payment
                </Button>
              </>
            }
          />
        ))}

        {!pausedOrders ||
          (pausedOrders.length === 0 && (
            <Box
              sx={{
                py: 8,
                borderRadius: "32px",
                textAlign: "center",
                ...alphaZoneSurface(0.82),
              }}
            >
              <Typography sx={{ color: alphaZoneColors.ink, fontWeight: 600 }}>
                No pending orders yet.
              </Typography>
            </Box>
          ))}
      </Stack>
    </TabPanel>
  );
}
