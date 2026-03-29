//@ts-nocheck
import React, { Component } from "react";

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: "Ford",
      model: "Mustang",
      color: "red",
      year: 1964,
    };
  }
  changeDetail = () => {
    this.setState({ color: "blue", brand: "Porse", model: "911", year: 2025 });
  };


  componentDidMount() {
    console.log("componentDidMount");
    // Component birinchi marta DOM ga qo‘shilganda ishlaydi => Retrive data from backend
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");
    // Component yangilanganda ishlaydi.
  }

  compnentWillUnmount() {
    console.log("compnentWillUnmount");
    // Component DOM dan o‘chirilganda ishlaydi.
  }
  render() {
    return (
      <div>
        <h1>My {this.state.brand}</h1>
        <p>
          Color: {this.state.color} - Model: {this.state.model} from{" "}
          {this.state.year}.
        </p>

        <button type="button" onClick={this.changeDetail}>
          Change Detail
        </button>
      </div>
    );
  }
}

export default Test;
