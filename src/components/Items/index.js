import {useEffect} from 'react';
import { useDispatch , useSelector} from 'react-redux';
import { fetchProducts } from '../../redux/products/productsSlice';
import "./style.css"

function Items() {
  const dispatch = useDispatch();
  const products= useSelector(state => state.products.items);

  useEffect(() => {
    dispatch(fetchProducts());
  })

  return (
    <div className='items-div'>
      {
        products.map((product) => (
          <div key={product.id} className="items">
            <img src={product.image} className="itemsImage" />
            <span>{product.productName}</span>
            <br />
            <span style={{color: "green"}}>${product.productPrice}</span> 
            <br />
            <div>
              <button className='btn'>Sell</button>
              <span className='count-span'>0</span>
              <button className='btn' style={{backgroundColor: "green", color: "white"}}>Buy</button>
              </div>        
          </div>
        ))
      }
    </div>
  )
}

export default Items;