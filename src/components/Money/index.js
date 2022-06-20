import React from 'react';
import { useSelector } from 'react-redux';
import "./style.css"
import CountUp from 'react-countup';

function Money() {
  const value = useSelector(state => state.products.value);
  const money = useSelector(state => state.products.money);
  return (
    
    <div className='money-div'>
    <CountUp 
    start={money}
    end={value}
    duration={1} 
    prefix="$ " 
    separator=","/>
    </div>
  )
}

export default Money;