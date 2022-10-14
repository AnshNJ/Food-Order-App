import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCart.module.css";
import CartContext from "../../store/cart-context";
import { useContext , useEffect , useState } from "react";

function HeaderCart(props) {

  const[btnHighlighted, setBtnHightlighted] = useState(false);

  const cartCtx = useContext(CartContext);

  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.headerCart} ${btnHighlighted ? classes.bump : ''}`

  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }
    setBtnHightlighted(true);

    const timer = setTimeout(() => {
      setBtnHightlighted(false)
    }, 300);

    return  () => {
      clearTimeout(timer);
    }
  },[cartCtx.items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span> Your Cart </span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
}

export default HeaderCart;
