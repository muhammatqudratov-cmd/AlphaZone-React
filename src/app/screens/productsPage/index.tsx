import React from "react";
import { Container } from "@mui/material";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ChosenProduct from "./ChosenProduct";
import Products from "./Products";
import "../../../css/products.css";
import { CartItem } from "../../../lib/types/search";

interface ProductsPageProps {
  onAdd: (item: CartItem) => void;
}

export default function ProductsPage(props: ProductsPageProps) {
  const { onAdd } = props;
  const products = useRouteMatch();
  console.log("products:", products);

  return (
    <div className={"products-page"}>
      <Switch>
        <Route path={`${products.path}/:productId`}>
          {" "}
          {/**Route 1 */}
          <ChosenProduct onAdd={onAdd} />
        </Route>

        <Route path={`${products.path}`}>
          {" "}
          {/**Route 2 */}
          <Products onAdd={onAdd} />
        </Route>
      </Switch>
    </div>
  );
}
