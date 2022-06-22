import {useEffect, useState} from 'react';
import { useDispatch , useSelector} from 'react-redux';
import { fetchProducts, updateCount } from '../../redux/products/productsSlice';
import "./style.css";

function Items({id}){

  const items = useSelector((state) => state.products.items);
  console.log('items', items)

  const value = useSelector(state => state.products.value);
  const money = useSelector(state => state.products.money);

  const item = items.find(x=> x.id === id);
  console.log('item ', item);

  const dispatch = useDispatch();

  const [count, setCount] = useState(item.count);
  const [buyable , setBuyable] = useState(false); 
  const [sellable, setSellable ] = useState(true);

  let maxBuy = Math.floor(value / item.productPrice);
  let max = Number(count) + Number(maxBuy); 
  // değeri ürün fiyatına bölüyoruz, ürün adedi ile topluyoruz ne kadar alınabilir onu hesaplıyoruz.

  useEffect(() => {
    dispatch(fetchProducts());
    control();
  },[dispatch]);

  //sell butonu sıfır ve sıfırdan küçükse disable olması için.
  const control =()=>{
    if(count > 0){
      setSellable(false);
    }
    if(count === 0){
      setSellable(true);
    }
  }
  
  useEffect(() => {
    if(item.productPrice > value){ //ürün fiyatı paramızdan fazlaysa true yap.
      setBuyable(true);
    }
    if(item.productPrice <= value){
      setBuyable(false);
    }
  },[value]);

  //count(kaç adet) değerlerimiz için.
  const handleChange = async (val, id, count) => {
    if(val > max && value > 0){
      setCount(max);
    }
    else if(val <0){
      setCount(0);
    }
    else if (value === 0 && val < count){
      setCount(val);
    }
    else {
      setCount(val);
    }    
    await dispatch(updateCount({id: item.id, count: count}))
  }

  const buy = () => {
    handleChange(Number(count) + 1);
     }
 
   const sell = () => {
     handleChange(Number(count) - 1);
   }
  

  return (
    <div className='items-div'>
      {
        items.map((product, i) => (
          <div key={i} className="items">
            <img alt={product.productName} src={product.image} className="itemsImage" />
            <span>{product.productName}</span>
            <br />
            <span style={{color: "green"}}>${product.productPrice}</span> 
            <br />
            <div>
              <button className='btn' disabled={sellable} onClick={() => sell()}>Sell</button>          
              <input type='number' className='count-span' value={count} onChange={(e)=>handleChange(e.target.value)} />
              <button className='btn' disabled={buyable} onClick={() => buy()} style={{backgroundColor: "green", color: "white"}}>Buy</button>
              </div>        
          </div>
        ))
      }
    </div>
  );
}


export default Items;