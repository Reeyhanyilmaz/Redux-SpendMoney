import {useEffect} from 'react';
import { useDispatch , useSelector} from 'react-redux';
import { fetchProducts, handleChange } from '../../redux/products/productsSlice';
import "./style.css";

function Items(){

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  },[dispatch]);

  const items = useSelector((state) => state.products.items);
  
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
              <button className='btn' 
              disabled={product.count === "0"} 
              onClick={(e) => dispatch(handleChange({id: product.id, count: Number(product.count), newCount: Number(product.count - 1)}))}>
              Sell</button>
               <input type='number' min="0" className='count-span' value={product.count} 
               onChange={(e)=>dispatch(handleChange({id: product.id, count: Number(product.count), newCount: Number(e.target.value)}))} />
              <button className='btn' 
              // disabled={buyable} 
              onClick={(e) => dispatch(handleChange({id: product.id, count: Number(product.count), newCount: Number(product.count + 1)}))}
              style={{backgroundColor: "green", color: "white"}}>Buy</button>
              </div>        
          </div>
        ))
      }
    </div>
  );
}


export default Items;