"use client"
import BankerLogin from '@/components/Banker/login'
import React, { useEffect, useState } from 'react'

const LoginBanker = () => {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(()=>{
   setIsMounted(true)
  },[])
  if(!isMounted) return null
  return (
    <div><BankerLogin/></div>
  )
}

export default LoginBanker