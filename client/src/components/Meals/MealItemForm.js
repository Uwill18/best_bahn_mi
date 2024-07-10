import classes from "../Meals/MealItem/MealItemForm.module.css";
import Input from "../UI/Input";
import { useRef, useState } from "react";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);

  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 0 ||
      enteredAmountNumber > 10
    ) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNumber);
    amountInputRef.current.value = "0";
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <button onClick={props.onRemove}>-</button>
      <Input
        ref={amountInputRef}
        label=""
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "10",
          step: "1",
          defaultValue: "0",
        }}
      />

      <button onClick={props.onAdd}>+</button>
      {!amountIsValid && <p>Please enter a valid amount (1-10).</p>}
    </form>
  );
};

export default MealItemForm;