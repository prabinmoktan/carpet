

import AnimateParagraph from '@/app/(public)/ui/AnimateParagraph/AnimateParagraph';
import Badge from '@/app/(public)/ui/Badge/Badge';
import ClientButton from '@/app/(public)/ui/ClientButton/ClientButton';
import TitleHeader from '@/app/(public)/ui/TitleHeader/TitleHeader';
import { inspirationPosts } from '@/app/constant';
import { MoveLeft } from 'lucide-react';
import React from 'react'

const InspirationSlug = async({params}: {params: Promise<{slug: string}>}) => {
    const {slug} = await params;
    
   
    const post = inspirationPosts?.find((p)=> p.id === Number(slug)) ;
  return (
   <>
   <article className='mx-auto  w-2/3 space-y-10 pt-10 mt-10'>
   <ClientButton firstIcon={<MoveLeft />} title='Back to inspirations' variant={'primary'} />
   <div className='w-full h-[40vh] rounded-lg' style={{ 
      backgroundImage: post?.image 
    }}>
   </div>
   <div className='space-y-4'>
    <div className='flex gap-5 items-center'>

    <Badge title={post?.category} variant={'primary'}/>
    <p className='text-sm text-gray-600'>{post?.readTime}</p>
    </div>
    <TitleHeader title={post?.title as string}/>
    <span className='flex gap-2 text-sm'>
    By 
    <p className='font-bold'>{post?.author}</p>
    </span>
        <p className='text-sm text-gray-500'>{post?.date}</p>
    <div className='space-y-10'> 
    {post?.content?.split('\n').map((paragraph, index) => (
      <AnimateParagraph key={index} paragraph={paragraph} className='text-justify'/>
    ))}
        
     
    </div>
    <div>

    </div>
   </div>

   </article>
   </>
  )
}

export default InspirationSlug