import React from "react";
import { Box, Chip, Divider, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import moment from "moment";
import { Order, OrderItem } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import {
  alphaZoneColors,
  alphaZoneMutedSurface,
  alphaZoneStatus,
} from "../../../lib/alphaZone";

interface OrderCardProps {
  order: Order;
  actions?: React.ReactNode;
  extraInfo?: string;
}

export default function OrderCard(props: OrderCardProps) {
  const { order, actions, extraInfo } = props;
  const statusMeta = alphaZoneStatus[order.orderStatus];

  return (
    <Box
      sx={{
        p: { xs: 2.2, md: 2.8 },
        borderRadius: "32px",
        ...alphaZoneMutedSurface(0.92),
      }}
    >
      <Stack spacing={2.2}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          spacing={1.5}
        >
          <Stack spacing={0.45}>
            <Typography
              sx={{
                color: alphaZoneColors.ink,
                fontSize: { xs: "1.05rem", md: "1.2rem" },
                fontWeight: 700,
                letterSpacing: "-0.03em",
              }}
            >
              Order #{order._id.slice(-6).toUpperCase()}
            </Typography>
            <Typography
              sx={{
                color: alpha(alphaZoneColors.ink, 0.58),
                fontSize: "0.88rem",
              }}
            >
              {moment(order.createdAt).format("DD MMM YYYY • HH:mm")}
            </Typography>
          </Stack>

          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            flexWrap="wrap"
            useFlexGap
          >
            {extraInfo ? (
              <Typography
                sx={{
                  color: alpha(alphaZoneColors.ink, 0.58),
                  fontSize: "0.84rem",
                  fontWeight: 600,
                }}
              >
                {extraInfo}
              </Typography>
            ) : null}

            <Chip
              label={statusMeta.label}
              sx={{
                borderRadius: "999px",
                fontWeight: 700,
                color: statusMeta.color,
                backgroundColor: statusMeta.backgroundColor,
              }}
            />
          </Stack>
        </Stack>

        <Stack spacing={1.4}>
          {order.orderItems?.map((item: OrderItem) => {
            const product: Product | undefined = order.productData.find(
              (ele: Product) => item.productId === ele._id,
            );
            const imagePath = product?.productImages?.[0]
              ? `${serverApi}/${product.productImages[0]}`
              : "/icons/noimage-list.svg";

            return (
              <Box
                key={item._id}
                sx={{
                  p: 1.4,
                  borderRadius: "24px",
                  backgroundColor: alpha("#FFFFFF", 0.84),
                  border: `1px solid ${alpha(alphaZoneColors.slate, 0.08)}`,
                }}
              >
                <Stack direction="row" spacing={1.35} alignItems="center">
                  <Box
                    component="img"
                    src={imagePath}
                    alt={product?.productName ?? "Product"}
                    sx={{
                      width: 76,
                      height: 76,
                      borderRadius: "20px",
                      objectFit: "cover",
                      flexShrink: 0,
                    }}
                  />

                  <Stack
                    direction={{ xs: "column", md: "row" }}
                    justifyContent="space-between"
                    spacing={1.2}
                    sx={{ flex: 1, minWidth: 0 }}
                  >
                    <Stack spacing={0.45} sx={{ minWidth: 0 }}>
                      <Typography
                        sx={{
                          color: alphaZoneColors.ink,
                          fontWeight: 700,
                          fontSize: "0.98rem",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {product?.productName ?? "Unknown product"}
                      </Typography>
                      <Typography
                        sx={{
                          color: alpha(alphaZoneColors.ink, 0.58),
                          fontSize: "0.84rem",
                        }}
                      >
                        ${item.itemPrice} x {item.itemQuantity}
                      </Typography>
                    </Stack>

                    <Typography
                      sx={{
                        color: alphaZoneColors.ink,
                        fontWeight: 800,
                        fontSize: "0.96rem",
                        whiteSpace: "nowrap",
                      }}
                    >
                      ${(item.itemQuantity * item.itemPrice).toFixed(1)}
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
            );
          })}
        </Stack>

        <Divider />

        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          spacing={2}
        >
          <Stack direction="row" spacing={2.2} flexWrap="wrap" useFlexGap>
            <Stack spacing={0.3}>
              <Typography sx={{ color: alpha(alphaZoneColors.ink, 0.58), fontSize: "0.82rem" }}>
                Products
              </Typography>
              <Typography sx={{ color: alphaZoneColors.ink, fontWeight: 700 }}>
                ${(order.orderTotal - order.orderDelivery).toFixed(1)}
              </Typography>
            </Stack>

            <Stack spacing={0.3}>
              <Typography sx={{ color: alpha(alphaZoneColors.ink, 0.58), fontSize: "0.82rem" }}>
                Delivery
              </Typography>
              <Typography sx={{ color: alphaZoneColors.ink, fontWeight: 700 }}>
                ${order.orderDelivery.toFixed(1)}
              </Typography>
            </Stack>

            <Stack spacing={0.3}>
              <Typography sx={{ color: alpha(alphaZoneColors.ink, 0.58), fontSize: "0.82rem" }}>
                Total
              </Typography>
              <Typography sx={{ color: alphaZoneColors.slate, fontWeight: 800 }}>
                ${order.orderTotal.toFixed(1)}
              </Typography>
            </Stack>
          </Stack>

          {actions ? (
            <Stack direction="row" spacing={1.2} flexWrap="wrap" useFlexGap>
              {actions}
            </Stack>
          ) : null}
        </Stack>
      </Stack>
    </Box>
  );
}
