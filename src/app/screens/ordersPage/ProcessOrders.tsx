import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import moment from "moment";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveProcessOrders } from "./selector";
import { Messages } from "../../../lib/config";
import { Order, OrderUpdateInput } from "../../../lib/types/order";
import { useGlobals } from "../../hooks/useGlobals";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { T } from "../../../lib/types/common";
import OrderCard from "./OrderCard";
import { alphaZoneColors, alphaZoneSurface } from "../../../lib/alphaZone";

const processOrdersRetriever = createSelector(
  retrieveProcessOrders,
  (processOrders) => ({ processOrders }),
);

interface ProcessOrdersProps {
  setValue: (value: string) => void;
}

export default function ProcessOrders(props: ProcessOrdersProps) {
  const { setValue } = props;
  const { authMember, setOrderBuilder } = useGlobals();
  const { processOrders } = useSelector(processOrdersRetriever);

  const finishOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);

      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId,
        orderStatus: OrderStatus.FINISH,
      };

      const confirmation = window.confirm("Have you received your order?");
      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);
        setValue("3");
        setOrderBuilder(new Date());
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <TabPanel value={"2"} sx={{ p: 0 }}>
      <Stack spacing={2}>
        {processOrders?.map((order: Order) => (
          <OrderCard
            key={order._id}
            order={order}
            extraInfo={`Updated ${moment(order.updatedAt).format("DD MMM • HH:mm")}`}
            actions={
              <Button
                value={order._id}
                variant="contained"
                onClick={finishOrderHandler}
                sx={{
                  color: "#FFFFFF",
                  backgroundColor: alphaZoneColors.slate,
                  "&:hover": {
                    backgroundColor: "#3e6f8e",
                  },
                }}
              >
                Verify to Fulfil
              </Button>
            }
          />
        ))}

        {!processOrders ||
          (processOrders.length === 0 && (
            <Box
              sx={{
                py: 8,
                borderRadius: "32px",
                textAlign: "center",
                ...alphaZoneSurface(0.82),
              }}
            >
              <Typography sx={{ color: alphaZoneColors.ink, fontWeight: 600 }}>
                No shipped orders in progress.
              </Typography>
            </Box>
          ))}
      </Stack>
    </TabPanel>
  );
}
