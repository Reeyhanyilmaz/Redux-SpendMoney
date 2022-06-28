import React from "react";
import { useSelector } from "react-redux";

function Receipt() {
  const receiptItems = useSelector((state) => state.products.receiptItems);
  const receiptMoney = useSelector((state) => state.products.receiptMoney);
  return (
    <>
      {receiptMoney > 0 ? (
        <div className="receipt-div">
          <h1>Your Receipt</h1>
          {receiptItems.map((item, i) => (
            <div key={i} className="receipt-items">
              <span style={{ padding: "5px" }}>{item.productName}</span>
              <span style={{ padding: "5px" }}>x {item.count}</span>
              <span style={{ color: "green", padding: "5px" }}>
                ${item.productPrice}
              </span>
            </div>
          ))}
          <hr style={{width: "300px"}}/>
          <div className="receipt-total">
            <span>Total: </span>
            <span style={{ color: "green" }}>${receiptMoney}</span>
          </div>
        </div>
      ) : (
        <h3>No items in your receipt</h3>
      )}
    </>
  );
}

export default Receipt;
