import React from "react";
import { useSelector } from "react-redux";
import "./style.css";
import CountUp from "react-countup";

function Money() {
  const oldMoney = useSelector((state) => state.products.oldMoney);
  const newMoney = useSelector((state) => state.products.newMoney);

  return (
    <div className="money-div">
      <CountUp
        start={oldMoney}
        end={newMoney}
        duration={1}
        prefix="$ "
        separator=","
      />
    </div>
  );
}

export default Money;
