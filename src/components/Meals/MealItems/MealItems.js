import classes from "./MealItems.module.css";
import MealItemForm from "./MealItemForm";
import { useContext } from 'react';
import CartContext from "../../../store/cart-context";
import { LazyLoadImage } from "react-lazy-load-image-component";

function MealItems(props) {

  const cartCtx = useContext(CartContext);

  // toFixed specifies decimal places.\
  const price = `$${props.price.toFixed(2)}`;

  function addToCartHandler(amount) {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price
    })
  }

  return (
    <li>
      <div className={classes.meal}>
        <div>
          <LazyLoadImage className={classes.pic} src={props.image} alt='Link broken'/>
          <h3>{props.name}</h3>
          <div className={classes.description}>{props.description}</div>
          <div className={classes.price}>{price}</div>
        </div>
        <div>
          <MealItemForm id={props.id} onAddToCart = {addToCartHandler}/>
        </div>
      </div>
    </li>
  );
}

export default MealItems;
