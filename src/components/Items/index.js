import {useEffect, useState} from 'react';
import { useDispatch , useSelector} from 'react-redux';
import { fetchProducts, updateCount } from '../../redux/products/productsSlice';
import "./style.css";

function Items({id}) {

  const value = useSelector(state => state.products.value);
  const money = useSelector(state => state.products.money);
  const items = useSelector(state => state.products.items);
  console.log('items', items)
  const item = items.filter(item => item.id !== id); //item.id denk değilse id'ye filtre  icine eklenecek.
  const dispatch = useDispatch();
  console.log('item ', item);


  const [count, setCount] = useState(0);
  console.log("type of count", typeof count);
  const [buyable , setBuyable] = useState(false); 
  const [sellable, setSellable ] = useState(true);

  let maxBuy = Math.floor(value / item.productPrice);
  let max = Number(count) + Number(maxBuy); 
  // değeri ürün fiyatına bölüyoruz, ürün adedi ile topluyoruz ne kadar alınabilir onu hesaplıyoruz.

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(updateCount({id : item.id, count: count}));

    control();
  },[dispatch,count]);

  useEffect(() => {
    if(item.productPrice > value){ //ürün fiyatı paramızdan fazlaysa true yap.
      setBuyable(true);
    }

    if(item.productPrice <= value){
      setBuyable(false);
    }
  },[value]);

  //count(kaç adet) değerlerimiz için.
  const handleChange = (val) => {
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
  }

  const buy = () => {
   handleChange(Number(count) + 1);
    }
  

  const sell = () => {
    handleChange(Number(count) - 1);
  }

  const control =()=>{
    if(count > 0){
      setSellable(false);
    }
    if(count == 0){
      setSellable(true);
    }
  }

  return (
    <div className='items-div'>
      {
        items.map((product, i) => (
          <div key={i} className="items">
            <img src={product.image} className="itemsImage" />
            <span>{product.productName}</span>
            <br />
            <span style={{color: "green"}}>${product.productPrice}</span> 
            <br />
            <div>
              <button className='btn' onClick={() => sell()}>Sell</button>          
              <input type='number' className='count-span' value={count} onChange={(e)=>handleChange(e.target.value)} />

              <button className='btn'  onClick={() => buy()} style={{backgroundColor: "green", color: "white"}}>Buy</button>
              </div>        
          </div>
        ))
      }
    </div>
  );
}


export default Items;