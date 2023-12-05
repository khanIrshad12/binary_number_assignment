'use client'

import { useEffect, useState } from "react"
import Selectdepart from "./Selectdepartment"

const Ismounted = () => {
    const [isMounted, setIsMounted] = useState(false)
    useEffect(()=>{
     setIsMounted(true)
    },[])
    if(!isMounted) return null
  return (
    <div><Selectdepart/></div>
  )
}

export default Ismounted