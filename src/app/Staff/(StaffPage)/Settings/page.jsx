"use client";

import Settings from '@/components/ui/Settings/settings'
import { useEffect, useState } from 'react'
 

const page = () => {
     const [staff, setStaff] = useState(null)
      useEffect(() => {
          const storedStaff = JSON.parse(localStorage.getItem("staff"))
          setStaff(storedStaff)
      },[])
  return (
    <div>
      {staff ? <Settings staff={staff}/> : <p>Loading...</p>}
    </div>
  )
}

export default page