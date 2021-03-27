export const initialState = {
    cart : [],
    user : null
}

export const reducer = (state,action) => {
    console.log(action,state.cart)
    switch(action.type) {
        case "ADD_TO_CART" : 
      
                return {
                    ...state,
                    cart : [...state.cart,action.item] 
                }
            
        case 'REMOVE_FROM_CART' : 
            const index = state.cart.findIndex( (cartItem) => {
                return cartItem.id === action.id
              })

            let newCart = [...state.cart]
            if(index >=0) {
                newCart.splice(index,1); 
            }else{
                console.warn(`cat remove product with id ${action.id}`)
            }
                return {
                    ...state,
                    cart : newCart
                }

        case 'SET_USER' : return{
                ...state,
                user : action.user
        }

        case  'EMPTY_CART' : return {
            ...state,
            cart : []
        }
        
        default : 
            return state
    }
}

export const getCartTotal = (cart) => {
  return  cart?.reduce((amount,item) => {
        return amount + item.price 
    },0)
}