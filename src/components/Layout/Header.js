import classes from "./Header.module.css";
import { Fragment } from "react";
import headerImg from '../../images/header_img.jpg';
import HeaderCart from "./HeaderCart";

function Header(props) {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>React Meals</h1>
        <HeaderCart onClick={props.showCart}/>
      </header>

      <div className={classes['main-image'] }>
        <img src={headerImg} alt="Burger_Image" />
      </div>
    </Fragment>
  );
}

export default Header;
