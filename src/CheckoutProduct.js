/* eslint-disable no-unused-vars */
import React from 'react'
import './CheckoutProduct.css'
import { useStateValue } from './StateProvider'

function CheckoutProduct(props) {

    const[{cart},dispatch] = useStateValue()

    const removeFromCart = () =>{
        dispatch({
            type: 'REMOVE_FROM_CART',
            id : props.id
        })
    } 

    return (
        <div className="checkoutProduct">
            <img className="checkoutProduct_image" src={props.image} alt=""/>
            <div className="checkoutProduct_info">
                <p className="checkoutProduct_title"> {props.title} </p>
                <p className="checkoutProduct_price"> <small>Rs</small>
                <strong>{props.price} </strong> </p>
                <div className="checkoutProduct_rating">
                    {Array(props.rating).fill()
                                        .map((_,i) => {
                                          return  <p>⭐</p>
                                        })}
                </div>
                 {!props.hideButton && (
                      <button  onClick={removeFromCart}>Delete Item</button>
                 )}
              
            </div>

        </div>
    )
}

export default CheckoutProduct
