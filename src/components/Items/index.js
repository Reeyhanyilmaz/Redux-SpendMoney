import {useEffect, useState, useCallback} from 'react';
import { useDispatch , useSelector} from 'react-redux';
import { fetchProducts, updateCount, handleChange } from '../../redux/products/productsSlice';
import "./style.css";

function Items({id}){
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  },[dispatch]);

  const items = useSelector((state) => state.products.items);
  const item = items !== [] || items !== undefined ? items.find((x) => x.id === id) : null;
  
  console.log('items', items)
  console.log('item ', item);

  const money = useSelector(state => state.products.money);

  const [count, setCount] = useState(items.count);
  const [buyable , setBuyable] = useState(false); 
  const [sellable, setSellable ] = useState(true);

  let maxBuy = Math.floor(money / items.productPrice);
  let max = Number(count) + Number(maxBuy); 
  // değeri ürün fiyatına bölüyoruz, ürün adedi ile topluyoruz ne kadar alınabilir onu hesaplıyoruz.

  //sell butonu sıfır ve sıfırdan küçükse disable olması için.
  //for callback error (returns a memoized callback function, caching a value so that it does not need to be recalculated)
  const control = useCallback(()=>{
    if(count > 0){
      setSellable(false);
    }
    if(count == 0){
      setSellable(true);
    }
  },[count]);

  useEffect(() => {
    control();
  },[control]);
  
  useEffect(() => {
    if(items.productPrice > money){ //ürün fiyatı paramızdan fazlaysa true yap.
      setBuyable(true);
    }
    if(items.productPrice <= money){
      setBuyable(false);
    }
  },[money, items.productPrice]);

  //count(kaç adet) değerlerimiz için.
  const handleChange = async (value) =>{
    if(value>max && money>0 ){
      setCount(max)
    }
    else if(value<0){
      setCount(0);
    }
    else if(money == 0 && value<count){
      setCount(value);
    }
    else{
      setCount(value);
    }
    await dispatch(updateCount({id: items.id, count: count}))
  }


  const buy = () => {
    handleChange(Number(count) + 1);
     }
 
   const sell = () => {
     handleChange(Number(count) - 1);
   }
  
  //  const handleClickBtn = (id, count) => {
  //   dispatch(handleChange({id: items.id, count: count}))
  //   dispatch(updateCount({id: items.id, count: count}));
  // }
  

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
              {/* <button className='btn' disabled={sellable} onClick={() => handleClickBtn(product.id, product.count)}>Sell</button>           */}
              {/* <input type='number' className='count-span' value={product.count} onChange={(e)=>dispatch(updateCount(e.target.value))} /> */}
              
              <button className='btn' disabled={sellable} onClick={() => sell()} style={{backgroundColor: "green", color: "white"}}>Buy</button>
               <input type='number' className='count-span' value={product.count} onChange={(e)=>handleChange(e.target.value)} />
              <button className='btn' disabled={buyable} onClick={() => buy()} style={{backgroundColor: "green", color: "white"}}>Buy</button>
              </div>        
          </div>
        ))
      }
    </div>
  );

}


export default Items;