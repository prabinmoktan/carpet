import CompanyLogo from '@/app/(public)/ui/CompanyLogo/CompanyLogo'
import React from 'react'

const AdminHeader = () => {
  return (
    <header className='border-b border-[#E6DED3] px-2 flex justify-between'>
        <CompanyLogo/>
        <div>
            <div>user</div>
        </div>
    </header>
  )
}

export default AdminHeader