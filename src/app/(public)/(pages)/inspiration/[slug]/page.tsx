import React from 'react'
import InspirationSlug from './InspirationSlug'

const page = async({params}: {params: Promise<{slug: string}>}) => {
  return (
    <>
    <InspirationSlug params={params} />
    </>
  )
}

export default page