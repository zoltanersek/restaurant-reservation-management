import React from "react";
import { ReactComponent as Table } from "../../assets/table.svg";

import "./layout-element.styles.scss";

const LayoutElement = ({ table }) => (
  <div>
    <div className="table-container">
      <Table />
    </div>
    <div className="table-number-container">
      <h4>Table #{table.number}</h4>
      <span>{`${table.seats} seat${table.seats > 1 ? "s" : ""}`}</span>
    </div>
  </div>
);

export default LayoutElement;
