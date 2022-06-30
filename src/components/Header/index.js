import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { changeSelectedUser } from "../../redux/products/productsSlice";
import User from "../User";

function Header() {
  const dispatch = useDispatch();
  const whoseSpend = useSelector((state) => state.products.whoseSpend);
  return (
    <>
      <div className="selectMenu-div">
        <p style={{ fontSize: "30px", fontWeigth: "400" }}> Whose money do you want to spend?</p>
        <select
          onChange={(e) => dispatch(changeSelectedUser(e.target.value))}
          className="selectMenu"
        >
          {whoseSpend.map((user) => (
            <option key={user.name} value={user.name}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
      <User />
    </>
  );
}

export default Header;
