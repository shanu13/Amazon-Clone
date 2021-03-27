/* eslint-disable no-unused-vars */
import React from 'react'
import './Product.css'
import { useStateValue } from './StateProvider'



function Product(props) {
    const [{cart}, dispatch] = useStateValue()
    

    const addToCart = () => {
        
        dispatch({
            type : 'ADD_TO_CART',
            item : {
                id : props.id,
                title : props.title,
                image : props.image,
                price : props.price,
                rating : props.rating
            }
        })
    }


    return (
        <div className="product">
            <div className="product_info">
                <p>{props.title}</p>
                <p className="product_price"><small>Rs{props.price}</small></p>
                <div className="product_rating">
                    {Array(props.rating).fill()
                            .map((_,i) => {
                        return <p>⭐</p> 
                    })}
                </div>  
             </div>
             <img src={props.image} alt=""/>
             <button onClick={addToCart}>Add to Cart</button>
        </div>
    )
}

export default Product
