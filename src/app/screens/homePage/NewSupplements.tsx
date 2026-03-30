import { Box, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import CardOverflow from "@mui/joy/CardOverflow";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveNewSupplements } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { ProductCollection } from "../../../lib/enums/product.enum";

const newSupplementsRetriever = createSelector(
  retrieveNewSupplements,
  (newSupplements) => ({ newSupplements }),
);

export default function NewSupplements() {
  const { newSupplements } = useSelector(newSupplementsRetriever);

  return (
    <div className="new-products-frame">
      <Container>
        <Stack className="main">
          <Box className="category-title">New Arrivals</Box>
          <Stack className="cards-frame">
            <CssVarsProvider>
              {newSupplements.length !== 0 ? (
                newSupplements.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  console.log("imagePath:", imagePath);
                  const sizeVolume =
                    product.productCollection === ProductCollection.POWDER
                      ? product.productVolume + " ml"
                      : product.productCollection === ProductCollection.VITAMIN
                        ? product.productSize + " size"
                        : product.productWeight + " g";

                  return (
                    <Card
                      key={product._id}
                      variant="outlined"
                      className={"card"}
                    >
                      {/* IMAGE */}
                      <div style={{ position: "relative", overflow: "hidden" }}>
                        <div className="product-sale">{sizeVolume}</div>
                        <img
                          src={imagePath}
                          alt={product.productName}
                          style={{
                            width: "100%",
                            height: "220px",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                      </div>

                      {/* INFO */}
                      <CardOverflow variant="soft" className="product-detail">
                        <Stack className="info">
                          <Stack flexDirection={"row"}>
                            <Typography className={"title"}>
                              {product.productName}
                            </Typography>
                            <Typography className={"price"}>
                              ${product.productPrice}
                            </Typography>
                          </Stack>
                          <Stack>
                            <Typography className={"views"}>
                              {product.productViews}
                              <VisibilityIcon
                                sx={{ fontSize: 20, marginLeft: "5px" }}
                              />
                            </Typography>
                          </Stack>
                        </Stack>
                      </CardOverflow>
                    </Card>
                  );
                })
              ) : (
                <Box className="no-data">New products are not available!</Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
