/* eslint-disable no-unused-vars */
import React,{ useState,useEffect } from 'react'
import { db } from './firebase'
import Order from './Order'
import { useStateValue } from './StateProvider'
import './Orders.css'

function Orders() {
    const[{ cart,user },dispatch] = useStateValue()
    const [orders,setOrders] = useState([])

    useEffect(() => {
        if(user){
            db.collection('users')
              .doc(user?.uid)
              .collection('orders')
              .orderBy('created','desc')
              .onSnapshot(snapshot => {
                  setOrders(snapshot.docs.map(doc => ({ 
                      id: doc.id,
                      data : doc.data()
                  })))
              })
        } 
          else{
              setOrders([]);
              
          }
        
    },[])
  
    return (
        <div className="orders">
            <h1>Your Orders</h1>
            <div className="ordesr_order">
                {orders.map(order => {
                    return <Order order={order} />
                })}
            </div>
        </div>
    )
}

export default Orders
