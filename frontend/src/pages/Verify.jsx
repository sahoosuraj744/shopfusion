import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
const Verify = () => {
  const {navigate,token,setCartItems,backend_url}=useContext(ShopContext)
  const [searchParams,setSearchParams]=useSearchParams()
  const success=searchParams.get('success');
  const orderId=searchParams.get('orderId');
  const verifyPayment=async()=>{
      try {
        if (!token) {
            return null;
        }
        const response=await axios.post(backend_url+"/api/order/verifyStripe",{success,orderId},{headers:{token}})
        if (response.data.success) {
            setCartItems({})
            navigate('/orders')
            toast.succcess("Payment Success and your order has been placed")
        } else {
            navigate('/cart')
        }
      } catch (error) {
        console.log(error);
      }
  }
  useEffect(()=>{
   verifyPayment();
  },[token])
  return (
    <div>

    </div>
  )
}

export default Verify