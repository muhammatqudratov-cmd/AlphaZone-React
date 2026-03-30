import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ChosenProduct from "./ChosenProduct";
import Products from "./Products";
import { CartItem } from "../../../lib/types/search";

interface ProductsPageProps {
  onAdd: (item: CartItem) => void;
}

export default function ProductsPage(props: ProductsPageProps) {
  const { onAdd } = props;
  const products = useRouteMatch();

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
