import React, { useEffect } from "react";
import { Box } from "@mui/material";
import ActiveUsers from "./ActiveUsers";
import Advertisement from "./Advertisement";
import PopularSupplements from "./PopularSupplements";
import Statistics from "./Statistics";
import Events from "./Events";
import { useDispatch } from "react-redux";
import { setNewSupplements, setPopularSupplements, setTopUsers } from "./slice";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductSevice";
import { ProductCollection } from "../../../lib/enums/product.enum";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";
import NewSupplements from "./NewSupplements";

export default function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    const product = new ProductService();

    // Popular — CAPSULE
    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "productViews",
        productCollection: ProductCollection.CAPSULE,
      })
      .then((data: Product[]) => dispatch(setPopularSupplements(data)))
      .catch((err) => console.log(err));

    // New Arrivals — POWDER (sening bazangda bor)
    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "createdAt",
        productCollection: ProductCollection.POWDER,
      })
      .then((data: Product[]) => dispatch(setNewSupplements(data)))
      .catch((err) => console.log(err));

    const member = new MemberService();
    member
      .getTopUsers()
      .then((data: Member[]) => dispatch(setTopUsers(data)))
      .catch((err) => console.log(err));
  }, [dispatch]);

  return (
    <Box component="main" sx={{ backgroundColor: "#F8FAF9" }}>
      <Advertisement />
      <Statistics />
      <PopularSupplements />
      <NewSupplements />
      <ActiveUsers />
      <Events />
    </Box>
  );
}
