'use client'
import { useMeQuery } from '@/app/(public)/(pages)/(auth)/auth.api'
import CompanyLogo from '@/app/(public)/ui/CompanyLogo/CompanyLogo'
import React from 'react'

const AdminHeader = () => {
 const {data: user} = useMeQuery();
 console.log(user);
 console.log(user?.user?.firstName)
//  console.log(user?.email)

  return (
    <header className='border-b border-[#E6DED3] px-2 flex justify-between'>
        <CompanyLogo/>
        <div>
          <h1>{`hi? ${user?.user.firstName}`} </h1>
        </div>
        
    </header>
  )
}

export default AdminHeader