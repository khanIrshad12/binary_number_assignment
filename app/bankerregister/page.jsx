'use client'
import BankerRegister from '@/components/Banker/register'
import React, { useEffect, useState } from 'react'

const RegisterBanker = () => {
  const [isMounted,setIsMounted]=useState(false)
  useEffect(()=>{
setIsMounted(true)
  },[])
  if(!isMounted) return null;
  return (
    <div><BankerRegister/></div>
  )
}

export default RegisterBanker