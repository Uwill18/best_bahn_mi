import { useState } from "react";
import { PaymentElement, useStripe, useElements} from "@stripe/react-stripe-js";


export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!stripe || !elements){
      return; //returns await
    }
    setIsProcessing(true);

    const {error} = await stripe.confirmPayment({
      elements,
      confirmParams:{
        return_url:`${window.location.origin}/completion`,
      },
    });

    if(error){
      setMessage(error.message);
    }
    setIsProcessing(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement/>
      <button disabled={isProcessing} id="submit">
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Pay now"}
        </span>
      </button>

      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
