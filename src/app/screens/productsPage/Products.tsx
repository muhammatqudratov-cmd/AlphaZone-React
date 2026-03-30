import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Pagination,
  PaginationItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { motion } from "framer-motion";
import { setProducts } from "./slice";
import { useDispatch, useSelector } from "react-redux";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { createSelector } from "reselect";
import { retrieveProducts } from "./selector";
import ProductService from "../../services/ProductSevice";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
import {
  alphaZoneColors,
  alphaZoneInputSx,
  alphaZoneSoftShadow,
  alphaZoneSurface,
} from "../../../lib/alphaZone";

const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

const collectionOptions = [
  ProductCollection.DRINK,
  ProductCollection.SNACK,
  ProductCollection.CAPSULE,
  ProductCollection.VITAMIN,
  ProductCollection.POWDER,
];

const sortOptions = [
  { label: "New", value: "createdAt" },
  { label: "Price", value: "productPrice" },
  { label: "Views", value: "productViews" },
];

export default function Products(props: ProductsProps) {
  const { onAdd } = props;
  const dispatch = useDispatch();
  const { products } = useSelector(productsRetriever);
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    productCollection: ProductCollection.POWDER,
    search: "",
  });
  const [searchText, setSearchText] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data: Product[]) => dispatch(setProducts(data)))
      .catch((err) => console.log(err));
  }, [dispatch, productSearch]);

  useEffect(() => {
    if (searchText === "") {
      setProductSearch((prev) => ({
        ...prev,
        search: "",
      }));
    }
  }, [searchText]);

  const searchCollectionHandler = (collection: ProductCollection) => {
    setProductSearch((prev) => ({
      ...prev,
      page: 1,
      productCollection: collection,
    }));
  };

  const searchOrderHandler = (order: string) => {
    setProductSearch((prev) => ({
      ...prev,
      page: 1,
      order,
    }));
  };

  const searchProductHandler = () => {
    setProductSearch((prev) => ({
      ...prev,
      search: searchText,
      page: 1,
    }));
  };

  const paginationHandler = (e: ChangeEvent<unknown>, value: number) => {
    setProductSearch((prev) => ({
      ...prev,
      page: value,
    }));
  };

  const chooseDishHandler = (id: string) => {
    history.push(`/products/${id}`);
  };

  const totalPages =
    products.length !== 0 ? productSearch.page + 1 : productSearch.page;

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
        <Stack spacing={4.5} alignItems="center">
          <Stack spacing={1.5} alignItems="center" textAlign="center">
            <Typography
              sx={{
                color: alpha(alphaZoneColors.ink, 0.56),
                fontSize: "0.8rem",
                fontWeight: 800,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Alpha Zone Storefront
            </Typography>
            <Typography
              sx={{
                color: alphaZoneColors.ink,
                fontSize: { xs: "2.4rem", md: "4rem" },
                fontWeight: 700,
                letterSpacing: "-0.06em",
              }}
            >
              Supplements
            </Typography>
            <Typography
              sx={{
                maxWidth: 620,
                color: alpha(alphaZoneColors.ink, 0.68),
                lineHeight: 1.8,
              }}
            >
              Cleaner search, tighter filters, and a product grid with discreet
              add-to-cart actions that appear only when needed.
            </Typography>
          </Stack>

          <Box
            sx={{
              width: "min(100%, 760px)",
              borderRadius: "32px",
              p: { xs: 1.2, md: 1.5 },
              ...alphaZoneSurface(0.88),
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.2}
              alignItems="stretch"
            >
              <TextField
                fullWidth
                placeholder="Search protein, vitamins, recovery essentials..."
                value={searchText}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchText(e.target.value)
                }
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === "Enter") searchProductHandler();
                }}
                sx={alphaZoneInputSx}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon
                        sx={{ color: alpha(alphaZoneColors.slate, 0.72) }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                onClick={searchProductHandler}
                endIcon={<SearchIcon />}
                sx={{
                  minWidth: { xs: "100%", sm: 150 },
                  px: 3,
                  color: alphaZoneColors.ink,
                  backgroundColor: alphaZoneColors.mint,
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: alphaZoneColors.mintStrong,
                    boxShadow: "none",
                  },
                }}
              >
                Search
              </Button>
            </Stack>
          </Box>

          <Stack spacing={2} sx={{ width: "100%" }}>
            <Stack
              direction="row"
              spacing={1.2}
              useFlexGap
              flexWrap="wrap"
              justifyContent="center"
            >
              {sortOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={
                    productSearch.order === option.value
                      ? "contained"
                      : "outlined"
                  }
                  onClick={() => searchOrderHandler(option.value)}
                  sx={{
                    px: 2.2,
                    color:
                      productSearch.order === option.value
                        ? alphaZoneColors.ink
                        : alphaZoneColors.slate,
                    borderColor: alpha(alphaZoneColors.slate, 0.16),
                    backgroundColor:
                      productSearch.order === option.value
                        ? alpha(alphaZoneColors.mint, 0.9)
                        : alpha("#FFFFFF", 0.72),
                    "&:hover": {
                      borderColor: alpha(alphaZoneColors.slate, 0.26),
                      backgroundColor:
                        productSearch.order === option.value
                          ? alphaZoneColors.mintStrong
                          : alpha(alphaZoneColors.mint, 0.08),
                    },
                  }}
                >
                  {option.label}
                </Button>
              ))}
            </Stack>

            <Stack
              direction="row"
              spacing={1.2}
              useFlexGap
              flexWrap="wrap"
              justifyContent="center"
            >
              {collectionOptions.map((collection) => (
                <Button
                  key={collection}
                  variant={
                    productSearch.productCollection === collection
                      ? "contained"
                      : "text"
                  }
                  onClick={() => searchCollectionHandler(collection)}
                  sx={{
                    px: 2.2,
                    color:
                      productSearch.productCollection === collection
                        ? alphaZoneColors.ink
                        : alpha(alphaZoneColors.ink, 0.7),
                    backgroundColor:
                      productSearch.productCollection === collection
                        ? alpha(alphaZoneColors.mint, 0.88)
                        : "transparent",
                    "&:hover": {
                      backgroundColor: alpha(alphaZoneColors.mint, 0.12),
                    },
                  }}
                >
                  {collection}
                </Button>
              ))}
            </Stack>
          </Stack>

          <Grid container spacing={3} sx={{ width: "100%" }}>
            {products.length !== 0 ? (
              products.map((product: Product, index: number) => {
                const imagePath = product.productImages?.[0]
                  ? `${serverApi}/${product.productImages[0]}`
                  : "/icons/noimage-list.svg";
                const sizeVolume =
                  product.productCollection === ProductCollection.DRINK
                    ? `${product.productWeight ?? "-"} g`
                    : product.productCollection === ProductCollection.POWDER
                      ? `${product.productVolume ?? "-"} ml`
                      : `${product.productSize ?? "-"} size`;

                return (
                  <Grid key={product._id} size={{ xs: 12, sm: 6, xl: 3 }}>
                    <motion.div
                      initial={{ opacity: 0, y: 26 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -10 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{
                        duration: 0.45,
                        delay: index * 0.05,
                        ease: "easeOut",
                      }}
                      style={{ height: "100%" }}
                    >
                      <Box
                        onClick={() => chooseDishHandler(product._id)}
                        sx={{
                          height: "100%",
                          cursor: "pointer",
                          borderRadius: "32px",
                          overflow: "hidden",
                          border: `1px solid ${alpha(alphaZoneColors.slate, 0.12)}`,
                          background:
                            "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(241,250,238,0.78) 100%)",
                          boxShadow: alphaZoneSoftShadow,
                          "&:hover .product-image": {
                            transform: "scale(1.06)",
                          },
                          "&:hover .product-cart-button": {
                            opacity: 1,
                            transform: "translateY(0)",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            position: "relative",
                            p: 2,
                            pb: 0,
                          }}
                        >
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{
                              position: "absolute",
                              top: 18,
                              left: 18,
                              right: 18,
                              zIndex: 2,
                            }}
                          >
                            <Box
                              sx={{
                                px: 1.3,
                                py: 0.7,
                                borderRadius: "999px",
                                backgroundColor: alpha("#FFFFFF", 0.88),
                                color: alphaZoneColors.ink,
                                fontSize: "0.8rem",
                                fontWeight: 700,
                              }}
                            >
                              {sizeVolume}
                            </Box>

                            <IconButton
                              className="product-cart-button"
                              onClick={(
                                e: React.MouseEvent<HTMLButtonElement>,
                              ) => {
                                onAdd({
                                  _id: product._id,
                                  quantity: 1,
                                  name: product.productName,
                                  price: product.productPrice,
                                  image: product.productImages[0],
                                });
                                e.stopPropagation();
                              }}
                              sx={{
                                width: 46,
                                height: 46,
                                opacity: { xs: 1, md: 0 },
                                transform: "translateY(10px)",
                                transition: "all 0.28s ease",
                                backgroundColor: alpha(
                                  alphaZoneColors.mint,
                                  0.94,
                                ),
                                color: alphaZoneColors.ink,
                                "&:hover": {
                                  backgroundColor: alphaZoneColors.mintStrong,
                                },
                              }}
                            >
                              <ShoppingBagOutlinedIcon fontSize="small" />
                            </IconButton>
                          </Stack>

                          <Box
                            sx={{
                              borderRadius: "26px",
                              overflow: "hidden",
                              ...alphaZoneSurface(0.72),
                            }}
                          >
                            <Box
                              component="img"
                              src={imagePath}
                              alt={product.productName}
                              className="product-image"
                              sx={{
                                width: "100%",
                                height: 300,
                                objectFit: "cover",
                                transition: "transform 0.75s ease",
                              }}
                            />
                          </Box>
                        </Box>

                        <Stack spacing={1.35} sx={{ p: 2.5 }}>
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            spacing={1.5}
                            alignItems="flex-start"
                          >
                            <Typography
                              sx={{
                                color: alphaZoneColors.ink,
                                fontSize: "1.1rem",
                                fontWeight: 700,
                                letterSpacing: "-0.03em",
                              }}
                            >
                              {product.productName}
                            </Typography>
                            <Typography
                              sx={{
                                color: alphaZoneColors.slate,
                                fontWeight: 800,
                                whiteSpace: "nowrap",
                              }}
                            >
                              ${product.productPrice}
                            </Typography>
                          </Stack>

                          <Typography
                            sx={{
                              color: alpha(alphaZoneColors.ink, 0.66),
                              lineHeight: 1.75,
                              minHeight: 52,
                              display: "-webkit-box",
                              overflow: "hidden",
                              WebkitBoxOrient: "vertical",
                              WebkitLineClamp: 2,
                            }}
                          >
                            {product.productDesc ??
                              "A clean Alpha Zone essential built for daily performance."}
                          </Typography>

                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Typography
                              sx={{
                                color: alpha(alphaZoneColors.ink, 0.62),
                                fontSize: "0.86rem",
                                fontWeight: 700,
                                textTransform: "capitalize",
                              }}
                            >
                              {product.productCollection.toLowerCase()}
                            </Typography>

                            <Stack
                              direction="row"
                              spacing={0.7}
                              alignItems="center"
                            >
                              <VisibilityOutlinedIcon
                                sx={{
                                  color: alphaZoneColors.slate,
                                  fontSize: 18,
                                }}
                              />
                              <Typography
                                sx={{
                                  color: alphaZoneColors.ink,
                                  fontWeight: 700,
                                  fontSize: "0.88rem",
                                }}
                              >
                                {product.productViews}
                              </Typography>
                            </Stack>
                          </Stack>
                        </Stack>
                      </Box>
                    </motion.div>
                  </Grid>
                );
              })
            ) : (
              <Grid size={12}>
                <Box
                  sx={{
                    py: 8,
                    borderRadius: "32px",
                    textAlign: "center",
                    ...alphaZoneSurface(0.82),
                  }}
                >
                  <Typography
                    sx={{ color: alphaZoneColors.ink, fontWeight: 600 }}
                  >
                    Products are not available
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>

          <Pagination
            count={totalPages}
            page={productSearch.page}
            onChange={paginationHandler}
            renderItem={(item) => (
              <PaginationItem
                slots={{
                  previous: ArrowBackRoundedIcon,
                  next: ArrowForwardRoundedIcon,
                }}
                {...item}
              />
            )}
            sx={{
              "& .MuiPaginationItem-root": {
                borderRadius: "999px",
                color: alphaZoneColors.ink,
                backgroundColor: alpha("#FFFFFF", 0.72),
                border: `1px solid ${alpha(alphaZoneColors.slate, 0.1)}`,
              },
              "& .Mui-selected": {
                backgroundColor: `${alpha(alphaZoneColors.mint, 0.88)} !important`,
                color: alphaZoneColors.ink,
              },
            }}
          />
          <div className={"address"}>
            <Container>
              <Stack className={"address-area"} alignItems="center">
                <Box className={"title"}><b>Our address</b></Box>

                <Box
                  sx={{
                    width: "800%",
                    maxWidth: "1000px",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "60px",
                  }}
                >
                  <iframe
                    style={{ border: 0, width: "100%", height: "400px" }}
                    src="https://www.google.com/maps?q=SpoAny+Fitness+Seoul&output=embed"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </Box>

                <Box className="map-overlay" textAlign="center">
                  <h3>Alpha Zone</h3>
                  <p>
                    <i>
                      <b>Open Daily • 06:00 AM - 11:00 PM</b>
                    </i>
                  </p>
                </Box>
              </Stack>
            </Container>
          </div>
        </Stack>
      </Container>
    </Box>
  );
}
