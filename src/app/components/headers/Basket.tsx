import React from "react";
import {
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  Stack,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
import { Messages, serverApi } from "../../../lib/config";
import { useGlobals } from "../../hooks/useGlobals";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import OrderService from "../../services/OrderService";
import {
  alphaZoneColors,
  alphaZoneSurface,
  alphaZoneSoftShadow,
} from "../../../lib/alphaZone";

interface BasketProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
}

function BasketGlyph() {
  return (
    <Box
      component="svg"
      viewBox="0 0 24 24"
      sx={{ width: 24, height: 24, color: alphaZoneColors.ink }}
    >
      <path
        d="M3.75 5.75H5.35C5.79 5.75 6.17 6.06 6.26 6.49L6.66 8.32M6.66 8.32H18.57C19.23 8.32 19.72 8.94 19.57 9.58L18.62 13.58C18.5 14.08 18.05 14.43 17.54 14.43H8.22C7.71 14.43 7.26 14.08 7.14 13.58L6.66 8.32Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.25 18.25C9.25 18.8023 8.80228 19.25 8.25 19.25C7.69772 19.25 7.25 18.8023 7.25 18.25C7.25 17.6977 7.69772 17.25 8.25 17.25C8.80228 17.25 9.25 17.6977 9.25 18.25Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M17.25 18.25C17.25 18.8023 16.8023 19.25 16.25 19.25C15.6977 19.25 15.25 18.8023 15.25 18.25C15.25 17.6977 15.6977 17.25 16.25 17.25C16.8023 17.25 17.25 17.6977 17.25 18.25Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </Box>
  );
}

export default function Basket(props: BasketProps) {
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = props;
  const { authMember, setOrderBuilder } = useGlobals();
  const history = useHistory();
  const itemsPrice: number = cartItems.reduce(
    (a: number, c: CartItem) => a + c.quantity * c.price,
    0,
  );
  const shippingCost: number = itemsPrice < 100 ? 5 : 0;
  const totalPrice = (itemsPrice + shippingCost).toFixed(1);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  /** HANDLERS **/
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const procceedOrderHandler = async () => {
    try {
      handleClose();
      if (!authMember) throw new Error(Messages.error2);

      const order = new OrderService();
      await order.createOrder(cartItems);

      onDeleteAll();

      setOrderBuilder(new Date());
      history.push("/orders");
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <IconButton
        aria-label={`cart, ${cartItems.length} items`}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          borderRadius: "999px",
          border: `1px solid ${alpha("#457B9D", 0.12)}`,
          backgroundColor: alpha("#FFFFFF", 0.65),
          px: 1.2,
          py: 0.9,
          "&:hover": {
            backgroundColor: alpha("#FFFFFF", 0.95),
          },
        }}
      >
        <Badge
          variant="dot"
          invisible={cartItems.length === 0}
          overlap="circular"
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          sx={{
            "& .MuiBadge-badge": {
              top: 8,
              right: 5,
              width: 10,
              height: 10,
              minWidth: 10,
              borderRadius: "999px",
              backgroundColor: alphaZoneColors.mint,
              border: "2px solid #F8FAF9",
              boxShadow: "0 0 0 6px rgba(168,218,220,0.12)",
              "&::after": {
                content: '""',
                position: "absolute",
                inset: -4,
                borderRadius: "inherit",
                border: "1px solid rgba(168,218,220,0.5)",
                animation: "alphaPulse 1.8s ease-out infinite",
              },
            },
            "@keyframes alphaPulse": {
              "0%": {
                transform: "scale(0.9)",
                opacity: 1,
              },
              "100%": {
                transform: "scale(2)",
                opacity: 0,
              },
            },
          }}
        >
          <BasketGlyph />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            mt: 1.5,
            width: "min(92vw, 440px)",
            borderRadius: "24px",
            ...alphaZoneSurface(0.94),
            overflow: "visible",
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 18,
              width: 12,
              height: 12,
              bgcolor: alpha("#FFFFFF", 0.94),
              borderTop: `1px solid ${alpha("#457B9D", 0.16)}`,
              borderLeft: `1px solid ${alpha("#457B9D", 0.16)}`,
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Stack sx={{ p: 2.25, gap: 2 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                sx={{
                  color: "#183642",
                  fontSize: "1rem",
                  fontWeight: 700,
                }}
              >
                Basket
              </Typography>
              <Typography
                sx={{
                  color: alpha("#183642", 0.64),
                  fontSize: "0.82rem",
                }}
              >
                {cartItems.length === 0
                  ? "Your stack is currently empty."
                  : `${cartItems.length} item${cartItems.length > 1 ? "s" : ""} ready`}
              </Typography>
            </Box>

            {cartItems.length !== 0 ? (
              <IconButton
                onClick={() => onDeleteAll()}
                size="small"
                sx={{
                  color: "#457B9D",
                  backgroundColor: alpha("#A8DADC", 0.16),
                  "&:hover": {
                    backgroundColor: alpha("#A8DADC", 0.28),
                  },
                }}
              >
                <DeleteOutlineRoundedIcon fontSize="small" />
              </IconButton>
            ) : null}
          </Stack>

          {cartItems.length === 0 ? (
            <Box
              sx={{
                px: 2,
                py: 5,
                borderRadius: "24px",
                backgroundColor: alpha("#A8DADC", 0.12),
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  color: "#183642",
                  fontWeight: 600,
                }}
              >
                Add supplements to start your order.
              </Typography>
            </Box>
          ) : (
            <>
              <Stack
                spacing={1.5}
                sx={{
                  maxHeight: 280,
                  overflowY: "auto",
                  pr: 0.75,
                  "&::-webkit-scrollbar": {
                    width: 8,
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: alpha("#457B9D", 0.26),
                    borderRadius: 999,
                  },
                }}
              >
                {cartItems.map((item: CartItem) => {
                  const imagePath = `${serverApi}/${item.image}`;

                  return (
                    <Box
                      key={item._id}
                      sx={{
                        p: 1.4,
                        borderRadius: "20px",
                        border: `1px solid ${alpha("#457B9D", 0.1)}`,
                        backgroundColor: alpha("#FFFFFF", 0.85),
                        boxShadow: alphaZoneSoftShadow,
                      }}
                    >
                      <Stack direction="row" spacing={1.25}>
                        <Box
                          component="img"
                          src={imagePath}
                          alt={item.name}
                          sx={{
                            width: 74,
                            height: 74,
                            borderRadius: "18px",
                            objectFit: "cover",
                            flexShrink: 0,
                          }}
                        />

                        <Stack
                          spacing={1}
                          justifyContent="space-between"
                          sx={{ flex: 1, minWidth: 0 }}
                        >
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            spacing={1}
                          >
                            <Box sx={{ minWidth: 0 }}>
                              <Typography
                                sx={{
                                  color: "#183642",
                                  fontWeight: 700,
                                  fontSize: "0.95rem",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {item.name}
                              </Typography>
                              <Typography
                                sx={{
                                  color: alpha("#183642", 0.62),
                                  fontSize: "0.8rem",
                                }}
                              >
                                ${item.price} each
                              </Typography>
                            </Box>

                            <IconButton
                              onClick={() => onDelete(item)}
                              size="small"
                              sx={{
                                alignSelf: "flex-start",
                                color: "#457B9D",
                              }}
                            >
                              <CloseRoundedIcon fontSize="small" />
                            </IconButton>
                          </Stack>

                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            spacing={1}
                          >
                            <Stack direction="row" spacing={0.75} alignItems="center">
                              <IconButton
                                onClick={() => onRemove(item)}
                                size="small"
                                sx={{
                                  width: 30,
                                  height: 30,
                                  border: `1px solid ${alpha("#457B9D", 0.12)}`,
                                }}
                              >
                                <RemoveRoundedIcon sx={{ fontSize: 16 }} />
                              </IconButton>
                              <Typography
                                sx={{
                                  width: 24,
                                  textAlign: "center",
                                  color: "#183642",
                                  fontWeight: 700,
                                }}
                              >
                                {item.quantity}
                              </Typography>
                              <IconButton
                                onClick={() => onAdd(item)}
                                size="small"
                                sx={{
                                  width: 30,
                                  height: 30,
                                  border: `1px solid ${alpha("#457B9D", 0.12)}`,
                                  backgroundColor: alpha("#A8DADC", 0.18),
                                }}
                              >
                                <AddRoundedIcon sx={{ fontSize: 16 }} />
                              </IconButton>
                            </Stack>

                            <Typography
                              sx={{
                                color: "#183642",
                                fontWeight: 700,
                                fontSize: "0.92rem",
                              }}
                            >
                              ${(item.price * item.quantity).toFixed(1)}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Stack>
                    </Box>
                  );
                })}
              </Stack>

              <Divider />

              <Stack spacing={1.4}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography sx={{ color: alpha("#183642", 0.68) }}>
                    Subtotal
                  </Typography>
                  <Typography sx={{ color: "#183642", fontWeight: 700 }}>
                    ${itemsPrice.toFixed(1)}
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography sx={{ color: alpha("#183642", 0.68) }}>
                    Delivery
                  </Typography>
                  <Typography sx={{ color: "#183642", fontWeight: 700 }}>
                    ${shippingCost.toFixed(1)}
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    sx={{
                      color: "#183642",
                      fontWeight: 800,
                      fontSize: "1rem",
                    }}
                  >
                    Total
                  </Typography>
                  <Typography
                    sx={{
                      color: "#183642",
                      fontWeight: 800,
                      fontSize: "1.08rem",
                    }}
                  >
                    ${totalPrice}
                  </Typography>
                </Stack>

                <Button
                  onClick={procceedOrderHandler}
                  endIcon={<EastRoundedIcon />}
                  variant={"contained"}
                  sx={{
                    mt: 0.5,
                    borderRadius: "999px",
                    py: 1.2,
                    textTransform: "none",
                    fontWeight: 700,
                    color: alphaZoneColors.ink,
                    backgroundColor: alphaZoneColors.mint,
                    boxShadow: "0 18px 36px rgba(168,218,220,0.26)",
                    "&:hover": {
                      backgroundColor: alphaZoneColors.mintStrong,
                    },
                  }}
                >
                  Checkout
                </Button>
              </Stack>
            </>
          )}
        </Stack>
      </Menu>
    </Box>
  );
}
