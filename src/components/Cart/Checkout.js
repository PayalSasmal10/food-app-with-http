import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChar = (value) => value.trim().length === 6;

const Checkout = (props) => {
  
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true
  });


  
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();


  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const isEnteredNameValid = !isEmpty(enteredName);
    const isEnteredStreetValid = !isEmpty(enteredStreet);
    const isEnteredCityValid = !isEmpty(enteredCity);
    const isEnteredPostValid = isFiveChar(enteredPostal);

    setFormInputValidity({
        name: isEnteredNameValid,
        street: isEnteredStreetValid,
        city: isEnteredCityValid,
        postal: isEnteredPostValid
    });

    const formValid =
      isEnteredNameValid &&
      isEnteredStreetValid &&
      isEnteredCityValid &&
      isEnteredPostValid;

    if(!formValid) {
      return;
    }
    // submit form 
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postal: enteredPostal
    });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      
      <div className={`${classes.control} && ${formInputValidity.name ? '' : classes.invalid}`}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValidity.name && <p>Please enter valid name!</p>}
      </div>

      <div className={`${classes.control} && ${formInputValidity.street ? '' : classes.invalid}`}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputValidity.name && <p>Please enter valid street!</p>}
      </div>

      <div className={`${classes.control} && ${formInputValidity.postal ? '' : classes.invalid}`}>
        <label htmlFor="postal">Postal Code</label>
        <input type="number" id="postal" ref={postalInputRef} />
        {!formInputValidity.name && <p>Please enter valid Postal code (6 characters long)!</p>}
      </div>

      <div className={`${classes.control} && ${formInputValidity.city ? '' : classes.invalid}`}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValidity.name && <p>Please enter valid City!</p>}
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
