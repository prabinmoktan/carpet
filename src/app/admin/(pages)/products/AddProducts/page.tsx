import React from 'react'
import ProductForm from '../components/ProductForm'

const page = () => {
  return (
   <>
   <section className='px-5 py-3'>

   <ProductForm mode={"create"} productId={undefined} defaultValues={undefined} />
   </section>
   </>
  )
}

export default page