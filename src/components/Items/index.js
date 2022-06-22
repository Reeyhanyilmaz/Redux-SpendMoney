import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, updateCount } from '../../redux/products/productsSlice';
import "./style.css";

function Items({ id }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.products.items);
  const value = useSelector(state => state.products.value);
  const money = useSelector(state => state.products.money);
  console.log('items', items)
  console.log('value', value)
  console.log('money', money)

  useEffect(() => {
    dispatch(fetchProducts());
  }, [])

  // const [count, setCount] = useState(item.count);
  // const [buyable , setBuyable] = useState(false); 
  // const [sellable, setSellable ] = useState(true);

  // let maxBuy = Math.floor(value / item.productPrice);
  // let max = Number(count) + Number(maxBuy); 
  // değeri ürün fiyatına bölüyoruz, ürün adedi ile topluyoruz ne kadar alınabilir onu hesaplıyoruz.

  // useEffect(() => {
  //   dispatch(fetchProducts());
  //   control();
  // },[dispatch]);

  //sell butonu sıfır ve sıfırdan küçükse disable olması için.
  // const control =()=>{
  //   if(count > 0){
  //     setSellable(false);
  //   }
  //   if(count === 0){
  //     setSellable(true);
  //   }
  // }

  // useEffect(() => {
  //   if(item.productPrice > value){ //ürün fiyatı paramızdan fazlaysa true yap.
  //     setBuyable(true);
  //   }
  //   if(item.productPrice <= value){
  //     setBuyable(false);
  //   }
  // },[value]);

  //count(kaç adet) değerlerimiz için.
  // const handleChange = async (val, id, count) => {
  //   if(val > max && value > 0){
  //     setCount(max);
  //   }
  //   else if(val <0){
  //     setCount(0);
  //   }
  //   else if (value === 0 && val < count){
  //     setCount(val);
  //   }
  //   else {
  //     setCount(val);
  //   }    
  //   await dispatch(updateCount({id: item.id, count: count}))
  // }

  // const buy = () => {
  //   handleChange(Number(count) + 1);
  //    }

  //  const sell = () => {
  //    handleChange(Number(count) - 1);
  //  }


  return (
    <div className='items-div'>
      {items !== [] && items.map((product, i) => (
        <div key={i} className='items'>
          <img alt={product.productName} src={product.image} className='itemsImage' />
          <span>{product.productName}</span>
          <br />
          <span style={{ color: "green" }}>${product.productPrice}</span>
          <br />
          <div>
            <button className='btn'  >Sell</button>
            <input type='number' className='count-span' />
            <button className='btn'  style={{ backgroundColor: "green", color: "white" }}>Buy</button>
          </div>
        </div>
      ))}
    </div>
  );
}


export default Items;