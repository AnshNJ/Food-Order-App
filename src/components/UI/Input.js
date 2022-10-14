import classes from "./Input.module.css";
// for implementing ref in custom components
import React from "react";

const Input = React.forwardRef((props, ref) => {
  // Having spread in input makes it highly configurable.
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} id={props.input.id} {...props.input} />
    </div>
  );
});

export default Input;
