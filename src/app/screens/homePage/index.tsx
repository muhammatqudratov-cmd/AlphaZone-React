import React, { useEffect } from "react";
import ActiveUsers from "./ActiveUsers";
import Advertisement from "./Advertisement";
import PopularSupplements from "./PopularSupplements";
import Statistics from "./Statistics";
import Events from "./Events";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setNewSupplements, setPopularSupplements, setTopUsers } from "./slice";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductSevice";
import { ProductCollection } from "../../../lib/enums/product.enum";
import "../../../css/home.css";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";
import NewSupplements from "./NewSupplements";

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularSupplements: (data: Product[]) => dispatch(setPopularSupplements(data)),
  setNewSupplements: (data: Product[]) => dispatch(setNewSupplements(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});

export default function HomePage() {
  const { setPopularSupplements, setNewSupplements: setNewSupplements, setTopUsers } =
    actionDispatch(useDispatch());
  // Selecrtor: Store => Data

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "productViews",
        productCollection: ProductCollection.CAPSULE,
      })
      .then((data) => {
        setPopularSupplements(data);
      })
      .catch((err) => console.log(err));

    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "createdAt",
        productCollection: ProductCollection.DRINK,
      })
      .then((data) => {
        setNewSupplements(data);
      })
      .catch((err) => console.log(err));

       product
      .getProducts({
        page: 1,
        limit: 4,
        order: "createdAt",
        productCollection: ProductCollection.POWDER,
      })
      .then((data) => {
        setNewSupplements(data);
      })
      .catch((err) => console.log(err));

       product
      .getProducts({
        page: 1,
        limit: 4,
        order: "createdAt",
        productCollection: ProductCollection.SNACK,
      })
      .then((data) => {
        setNewSupplements(data);
      })
      .catch((err) => console.log(err));

       product
      .getProducts({
        page: 1,
        limit: 4,
        order: "createdAt",
        productCollection: ProductCollection.VITAMIN,
      })
      .then((data) => {
        setNewSupplements(data);
      })
      .catch((err) => console.log(err));

    const member = new MemberService();
    member
      .getTopUsers()
      .then((data) => setTopUsers(data))
      .catch((err) => console.log(err));
  }, [setNewSupplements, setPopularSupplements, setTopUsers]);

  return (
    <div className={"homepage"}>
      <Statistics />
      <PopularSupplements />
      <NewSupplements />
      <Advertisement />
      <ActiveUsers />
      <Events />
    </div>
  );
}
