import classes from "./Checkout.module.css";
import { useRef, useState } from "react";

const isEmpty = (value) => value.trim() === "";

const Checkout = (props) => {
  // For posting in backend
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    address: true,
    city: true,
  });

  // Input check when form is submitted.
  const nameInputRef = useRef();
  const addressInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const nameIsValid = !isEmpty(enteredName);
    const addressIsValid = !isEmpty(enteredAddress);
    const cityIsValid = !isEmpty(enteredCity);

    setFormInputValidity({
      name: nameIsValid,
      address: addressIsValid,
      city: cityIsValid,
    });

    const formIsValid = nameIsValid && addressIsValid && cityIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      address: enteredAddress,
      city: enteredCity,
    });
  };

  const nameControlClasses = `${classes.control} ${
    formInputValidity.name ? "" : classes.invalid
  }`;

  const addressControlClasses = `${classes.control} ${
    formInputValidity.address ? "" : classes.invalid
  }`;

  const cityControlClasses = `${classes.control} ${
    formInputValidity.city ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValidity.name && <p style={{color:'red'}}>Please enter a valid name...</p>}
      </div>
      <div className={addressControlClasses}>
        <label htmlFor="address">Address</label>
        <input type="text" id="address" ref={addressInputRef} />
        {!formInputValidity.address && <p style={{color:'red'}}>Please enter a valid address...</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValidity.city && <p style={{color:'red'}}>Please enter a valid city...</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
