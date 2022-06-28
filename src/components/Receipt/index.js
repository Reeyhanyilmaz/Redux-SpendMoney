import React from "react";
import { useSelector } from "react-redux";

function Receipt({newCount}) {
  const receiptItems = useSelector((state) => state.products.receiptItems);
  const receiptMoney = useSelector((state) => state.products.receiptMoney);
  return (
    <div>
      <div className="receipt-div" style={{textAlign: "center", width: "300px"}}>
        <h1>Your Receipt</h1>
        {receiptItems.map((item, i) => (
          <div
            key={i}
            className="receipt-items"
            style={{
              display: "flex",
              flexDirection: "row"}}
          >
            <span style={{padding: "5px"}}>{item.productName}</span>        
            <span style={{padding: "5px"}}>x {item.count}</span>
            <span style={{ color: "green", padding: "5px" }}>${item.productPrice}</span>
          </div>
        ))}
        <hr />
        <div className="receipt-total">
          <span>Total: </span>
          <span style={{ color: "green" }}>${receiptMoney}</span>
              
        </div>
      </div>
    </div>
  );
}

export default Receipt;
