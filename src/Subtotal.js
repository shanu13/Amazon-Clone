import React from 'react'
import CurrencyFormat from 'react-currency-format';
import { useHistory } from 'react-router-dom';
import { getCartTotal } from './reducer';
import { useStateValue } from './StateProvider';
import  './Subtotal.css';

function Subtotal() {
    const [state,dispatch] =  useStateValue()
    const history = useHistory();
    
    return (
        <div className="subtotal">
        <CurrencyFormat renderText= {(value) => {
            return (
            <>
             <p>
                    Subtotal ({state.cart?.length} items) : <strong>{value}</strong>
                </p>
                <small className="subtotal_gift">
                <input type="checkbox"/> This Order contains a gift
                </small>
            </>
            )
        }}
        decimalScale={2}
        value={getCartTotal(state.cart)}
        displayType = {"text"}
        thousandSeparator={true}
        prefix={'Rs '}/>

        <button  onClick={e=> history.push('/payment')}>Proceed to Checkout</button>
       
        </div>
    )
}

export default Subtotal
