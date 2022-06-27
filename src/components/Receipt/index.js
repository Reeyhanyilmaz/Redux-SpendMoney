import React from "react";
import { useSelector } from "react-redux";

function Receipt() {
  const receiptItems = useSelector((state) => state.products.receiptItems);
  return (
    <div>
      <h1>Your Receipt</h1>
        <div className="receipt-div">
            {receiptItems.map((item, i) => (
                <div key={i} className="receipt-items">
                    <span>{item.productName}</span>
                    <span style={{color: "green"}}>${item.productPrice}</span>
                    <span>{item.count}</span>
                </div>
            ))}
        </div>
    </div>
    );
}

export default Receipt;
