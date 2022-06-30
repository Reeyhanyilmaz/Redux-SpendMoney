import {useEffect} from 'react';
import { useDispatch , useSelector} from 'react-redux';
import { fetchProducts, handleChange } from '../../redux/products/productsSlice';
import "./style.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Items(){

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  },[dispatch]);

  const items = useSelector((state) => state.products.items);
  const noMoney = useSelector((state) => state.products.noMoney);

  const notify = () => toast('😔 You have not enough money!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });

  useEffect(() => {
    if(noMoney === true){
         notify();
    }
  },[noMoney])
   
  return (
    <div className='items-div'>
      {
        items.map((product, i) => (
          <div key={i} className="items">
            <img alt={product.productName} src={product.image} className="itemsImage" />
            <span>{product.productName}</span>
            <br />
            <span style={{color: "green"}}>${product.productPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</span> 
            <br />
            <div>
              <button className='btn' 
              disabled={product.count === "0"  || product.count === 0}
              onClick={(e) => dispatch(handleChange({id: product.id, count: Number(product.count), newCount: Number(product.count - 1)}))}>
              Sell</button>
               <input type='number' min="0" className='count-span' value={product.count} 
               onChange={(e)=>dispatch(handleChange({id: product.id, count: Number(product.count), newCount: Number(e.target.value)}))} />
              <button className='btn'
              onClick={(e) => dispatch(handleChange({id: product.id, count: Number(product.count), newCount: Number(product.count + 1)}))}
              style={{backgroundColor: "green", color: "white"}}>Buy</button>
               <ToastContainer />
              </div>        
          </div>
        ))
      }
    </div>
 
  );
}


export default Items;