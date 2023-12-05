'use client'
import CustomerLogin from '@/components/Customer/login'
import React, { useEffect, useState } from 'react'

const LoginCustomer = () => {
  const [isMounted,setIsMounted]=useState(false)
  useEffect(()=>{
setIsMounted(true)
  },[])
  if(!isMounted) return null;
  return (
    <div><CustomerLogin /></div>
  )
}

export default LoginCustomer