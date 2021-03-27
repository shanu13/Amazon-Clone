/* eslint-disable no-unused-vars */
import React from 'react'
import logo from './img/logo.png'
import './Header.css'
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';


function Header() {
    const [state,dispatch] = useStateValue()

    const handleAuthentication = () => {
        if(state.user){
            auth.signOut();
        }
    }

    return (
        <div className="header">
            <Link to="/"> <img className="header__logo" src={logo} alt=""/> </Link>

             <div className="header__search">
                 <input className="header__searchInput" type="text"/>
                    <SearchIcon className="header__searchIcon"/>
             </div>
        
            <div className="header__nav">
                
            <Link to={!state.user && '/login'}>
                <div onClick={handleAuthentication} className="header__option">
                   <span className="header__optionLineOne"> Hello,{!state.user? 'Guest':state.user.email} </span>
                    <span className="header__optionLinetwo">{state.user ? 'Sign Out' : 'Sign In' }</span>
                </div>
            </Link>

           <Link to="/orders">
                <div className="header__option">
                <span className="header__optionLineOne"> Returns</span>
                   <span className="header__optionLinetwo"> & Orders</span>
                </div>
            </Link>

                <div className="header__option">
                <span className="header__optionLineOne"> Your</span>
                   <span className="header__optionLinetwo"> Prime</span>
                </div>

                <Link to="/checkout">
                   <div className="header__cart">
                       <ShoppingBasketIcon/>
                        <span className="header__optionLinetwo header__cartCount"> {state.cart?.length} </span>
                    </div>
                </Link> 
            </div>

        </div>
    )
}

export default Header
