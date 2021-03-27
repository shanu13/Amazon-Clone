/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import CheckoutProduct from "./CheckoutProduct";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getCartTotal } from "./reducer";
import axios from "axios";
import instance from "./axios";
import { db } from "./firebase";

function Payment() {
  const [state, dispatch] = useStateValue();
    const history = useHistory()
  const [error, setError] = useState();
  const [disabled, setDisabled] = useState();
  const [processing , setProcessing] = useState("");
  const [succeeded,setSucceeded] = useState(false)
  const [clientSecret, setClientSecret] = useState(true)

  useEffect(() => {
      const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // stripe expects the total
                url : `https://us-central1-clone-4d3fd.cloudfunctions.net/api/payments/create?total=${getCartTotal(state.cart)*100}`
            });
            setClientSecret(response.data.clientSecret)
      }
      getClientSecret()
  },[state.cart])

  

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    // do all of stripes...
    e.preventDefault();
    setProcessing(true)
    const payload = await stripe.confirmCardPayment(clientSecret,{
        payment_method : {
            card : elements.getElement(CardElement)
        }
    }).then(({paymentIntent}) => {
        // payment intent = paymnet confirmation
        db.collection('users')
          .doc(state.user?.uid)
          .collection('orders')
          .doc(paymentIntent.id)
          .set({
            cart : state.cart,
            amount : paymentIntent.amount,
            created : paymentIntent.created 
          })

        setSucceeded(true);
        setError(null) 
        dispatch({
          type : 'EMPTY_CART'
        })
        history.replace('/orders')
    })
   
  };

  const handleChange = (e) => {
    // listen changes in card element
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment_container">
        <h1>
          Checkout (<Link to="/checkout">{state.cart?.length} items</Link> )
        </h1>

        <div className="payment_section">
          <div className="payment_title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment_address">
            <p>{state.user?.email}</p>
            <p>IIIT Guwahati, Guwahati</p>
            <p>Assam, India</p>
          </div>
          {/* delivery - item */}
        </div>

        <div className="payment_section">
          <div className="payment_title">
            <h2>Review Items and Delivery</h2>
          </div>
          <div className="payment_items">
            {state.cart.map((item) => {
              return (
                <CheckoutProduct
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
                />
              );
            })}
          </div>
        </div>

        <div className="payment_section">
          {/* payment method */}
          <div className="payment_title">
            <h3>Payment Method</h3>
          </div>

          <div className="payment_detail">
            {/* strips magic */}
            <form onSubmit={ handleSubmit}>
              <CardElement onChange={ handleChange} />
              <div className="payment_priceContainer">
                <CurrencyFormat
                  renderText={(value) => {
                    return (
                      <>
                        <h3>
                          Order Total : {value} 
                          
                        </h3>
                      </>
                    );
                  }}
                  decimalScale={2}
                  value={getCartTotal(state.cart)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"Rs "}
                />
                <button disabled={processing || disabled || succeeded}>
                    <span>{processing ? <p> Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {/* error */}
               {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
