'use client'
import { prayerMats } from '@/app/constant'
import React from 'react'
import ProductCard from '../../components/ProductCard/ProductCard'
import AnimateParagraph from '../../ui/AnimateParagraph/AnimateParagraph'
import TitleHeader from '../../ui/TitleHeader/TitleHeader'
import { useRouter } from 'next/navigation'

const Page = () => {
    const router = useRouter()
  return (
   <>
     <section className=" space-y-6">
        <div className="">
          <TitleHeader title="Islamic Prayer Mats & Carpets" />
          <AnimateParagraph
            paragraph="Premium prayer mats and carpets crafted with reverence and traditional Islamic design principles"
            
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 sm:grid-cols-3 gap-4 px-3 md:px-10">
          {prayerMats?.map((product) => (
            <ProductCard
              key={product.id}
              id={""}
              name={product.name}
              category={'Prayer Mat'}
              price={product.price}
              image={product.image}
              isNew={!!product.isNew}
              onClick={()=>router.push(`/shop/${product.id}`)}
            />
          ))}
        </div>
      </section>

   </>
  )
}

export default Page