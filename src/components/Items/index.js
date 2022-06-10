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
            <span>{product.productPrice}$</span>         
          </div>
        ))
      }
    </div>
  )
}

export default Items;