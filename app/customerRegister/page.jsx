'use client'
import CustomerRegister from '@/components/Customer/register'
import React, { useEffect, useState } from 'react'

const RegisterCustomer = () => {
  const [isMounted,setIsMounted]=useState(false)
  useEffect(()=>{
setIsMounted(true)
  },[])
  if(!isMounted) return null;
  return (
    <div><CustomerRegister/></div>
  )
}

export default RegisterCustomer