/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import { useEffect } from "react"
import { auth } from "./firebase"
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import { loadStripe } from  '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js'
import Orders from "./Orders";

const stripePromise = loadStripe('********************************************************************************') // stripe key

function App() {

  const[state,dispatch] = useStateValue()

  useEffect(() => {
    auth.onAuthStateChanged(authUser => { // when any auth changes it listen, // listener on authentication
      console.log('authuser',authUser)
       if(authUser){
        // user is logged in
        dispatch({
          type: 'SET_USER',
          user : authUser
        })
        
       }else{ 
         // user is logged out
         dispatch({
           type: 'SET_USER',
           user : null
         })
       }
    }) 
  },[])

  return (
    <Router>
      <div className="App">

      

        <Switch>

          <Route path="/orders">
            <Header />
            <Orders/>
          </Route>

          <Route path="/login">
            <Login/>
          </Route>

          <Route path="/checkout"> 
             <Header />
            <Checkout />
          </Route>

          <Route path="/payment"> 
             <Header />
             <Elements stripe={stripePromise}>
             <Payment/>
             </Elements>

          </Route>

          <Route path="/">
            <Header />  
            <Home />
          </Route>

        </Switch>

       
      </div>
    </Router>
  );
}


export default App;
