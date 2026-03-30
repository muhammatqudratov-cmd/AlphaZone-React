import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { setProducts } from "./slice";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { createSelector } from "reselect";
import { retrieveProducts } from "./selector";
import ProductService from "../../services/ProductSevice";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});
const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

export default function Products(props: ProductsProps) {
  const { onAdd } = props;
  const { setProducts } = actionDispatch(useDispatch());
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
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, [productSearch]);

  useEffect(() => {
    if (searchText === "") {
      productSearch.search = "";
      setProductSearch({ ...productSearch });
    }
  }, [searchText]);

  /** HANDLERS **/
  const searchCollectionHandler = (collection: ProductCollection) => {
    productSearch.page = 1;
    productSearch.productCollection = collection;
    setProductSearch({ ...productSearch });
  };

  const searchOrderHandler = (order: string) => {
    productSearch.page = 1;
    productSearch.order = order;
    setProductSearch({ ...productSearch });
  };

  const searchProductHandler = () => {
    productSearch.search = searchText;
    setProductSearch({ ...productSearch });
  };

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({ ...productSearch });
  };

  const chooseDishHandler = (id: string) => {
    history.push(`/products/${id}`);
  };

  return (
    <div className={"products-page"}>
      <div className={"products"}>
        <Container>
          <Stack flexDirection={"column"} alignItems={"center"}>
            <Stack className={"avatar-big-box"}>
              <Box className="main-title">Products</Box>
              <div className="main-input">
                <input
                  type="text"
                  placeholder="Type here..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") searchProductHandler();
                  }}
                />
                <Button
                  className="main-input-button single-button-search"
                  variant="contained"
                  endIcon={<SearchIcon />}
                  onClick={searchProductHandler}
                >
                  Search
                </Button>
              </div>
            </Stack>

            <Stack className={"dishes-frame-section"}>
              <Stack className={"dishes-filter-box"}>
                <Button
                  variant={"contained"}
                  className={"order"}
                  color={
                    productSearch.order === "createdAt"
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() => searchOrderHandler("createdAt")}
                >
                  <b>New</b>
                </Button>
                <Button
                  variant={"contained"}
                  className={"order"}
                  color={
                    productSearch.order === "productPrice"
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() => searchOrderHandler("productPrice")}
                >
                  <b>Price</b>
                </Button>
                <Button
                  variant={"contained"}
                  className={"order"}
                  color={
                    productSearch.order === "productViews"
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() => searchOrderHandler("productViews")}
                >
                  <b>Views</b>
                </Button>
              </Stack>
            </Stack>

            <Stack className={"list-category-section"}>
              <Stack className={"product-category"}>
                <div className={"category-main"}>
                  <Button
                    variant={"contained"}
                    color={
                      productSearch.productCollection ===
                      ProductCollection.DRINK
                        ? "primary"
                        : "secondary"
                    }
                    onClick={() =>
                      searchCollectionHandler(ProductCollection.DRINK)
                    }
                  >
                    <b>DRINK</b>
                  </Button>
                  <Button
                    variant={"contained"}
                    color={
                      productSearch.productCollection ===
                      ProductCollection.SNACK
                        ? "primary"
                        : "secondary"
                    }
                    onClick={() =>
                      searchCollectionHandler(ProductCollection.SNACK)
                    }
                  >
                    <b>SNACK</b>
                  </Button>
                  <Button
                    variant={"contained"}
                    color={
                      productSearch.productCollection ===
                      ProductCollection.CAPSULE
                        ? "primary"
                        : "secondary"
                    }
                    onClick={() =>
                      searchCollectionHandler(ProductCollection.CAPSULE)
                    }
                  >
                    <b>CAPSULE</b>
                  </Button>
                  <Button
                    variant={"contained"}
                    color={
                      productSearch.productCollection ===
                      ProductCollection.VITAMIN
                        ? "primary"
                        : "secondary"
                    }
                    onClick={() =>
                      searchCollectionHandler(ProductCollection.VITAMIN)
                    }
                  >
                    <b>VITAMIN</b>
                  </Button>
                  <Button
                    variant={"contained"}
                    color={
                      productSearch.productCollection ===
                      ProductCollection.POWDER
                        ? "primary"
                        : "secondary"
                    }
                    onClick={() =>
                      searchCollectionHandler(ProductCollection.POWDER)
                    }
                  >
                    <b>POWDER</b>
                  </Button>
                </div>
              </Stack>

              <Stack className={"product-wrapper"}>
                {products.length !== 0 ? (
                  products.map((product: Product) => {
                    // TO'G'RI
                    const imagePath = `${serverApi}/${product.productImages[0]}`;
                    const sizeVolume =
                      product.productCollection === ProductCollection.DRINK
                        ? product.productWeight + " g"
                        : product.productSize + " size";
                    return (
                      <React.Fragment key={product._id}>
                        <Stack
                          className={"product-card"}
                          onClick={() => chooseDishHandler(product._id)}
                        >
                          <Stack
                            className={"product-img"}
                            sx={{
                              backgroundImage: `url(${imagePath})`,
                            }}
                          >
                            <div className="product-sale">{sizeVolume}</div>

                            <Button
                              className={"shop-btn"}
                              onClick={(e: any) => {
                                onAdd({
                                  _id: product._id,
                                  quantity: 1,
                                  name: product.productName,
                                  price: product.productPrice,
                                  image: product.productImages[0],
                                });
                                e.stopPropagation();
                              }}
                            >
                              <img src={"icons/shopping-cart.svg"} alt="" />
                            </Button>

                            <Button className={"review-btn"}>
                              <Badge
                                badgeContent={product.productViews}
                                color="secondary"
                              >
                                <RemoveRedEyeIcon
                                  sx={{
                                    color:
                                      product.productViews === 0
                                        ? "white"
                                        : "gray",
                                  }}
                                />
                              </Badge>
                            </Button>
                          </Stack>

                          <Box className={"product-desc"}>
                            <span className={"product-title"}>
                              {product.productName}
                            </span>

                            <div className={"product-price"}>
                              <MonetizationOnIcon />
                              {product.productPrice}
                            </div>
                          </Box>
                        </Stack>
                      </React.Fragment>
                    );
                  })
                ) : (
                  <Box className="no-data">Products are not available</Box>
                )}
              </Stack>
            </Stack>

            <Stack className={"pagination-section"}>
              <Pagination
                count={
                  products.length !== 0
                    ? productSearch.page + 1
                    : productSearch.page
                }
                page={productSearch.page}
                renderItem={(item) => (
                  <PaginationItem
                    components={{
                      previous: ArrowBackIcon,
                      next: ArrowForwardIcon,
                    }}
                    {...item}
                    color={"secondary"}
                  />
                )}
                onChange={paginationHandler}
              />
            </Stack>
          </Stack>
        </Container>

        <div className={"brands-logo"}>
          <Container className="family-brands">
            <Box className="category-title">Popular Brands</Box>
            <Stack className="brand-list">
              <Box className="review-box">
                <img src="/img/gurme.webp" />
              </Box>
              <Box className="review-box">
                <img src="/img/seafood.webp" />
              </Box>
              <Box className="review-box">
                <img src="/img/sweets.webp" />
              </Box>
              <Box className="review-box">
                <img src="/img/doner.webp" />
              </Box>
            </Stack>
          </Container>
        </div>

        <div className={"address"}>
          <Container>
            <Stack className={"address-area"}>
              <Box className={"title"}>Our address</Box>

              <iframe
                style={{ marginTop: "60px", border: 0 }}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3187.210666159875!2d28.253482575988368!3d36.98090435749227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bfbdda50386453%3A0xc3fea8dbda4c698!2sBurak%20GYM!5e0!3m2!1sru!2skr!4v1771497824188!5m2!1sru!2skr"
                width="100%"
                height="500"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              <Box className="map-overlay">
                <h3>Burak GYM</h3>
                <p>
                  <i>
                    <b>Open Daily • 10:00 AM - 11:00 PM</b>
                  </i>
                </p>
              </Box>
            </Stack>
          </Container>
        </div>
      </div>
    </div>
  );
}
