import React from 'react'

interface stampTypes{
    description: string;
    header: string;
}

const Stamp: React.FC<stampTypes> = ({header, description}) => {
  return (
   <>
   <div className='space-y-2'>
    <p className='text-amber-700 text-2xl md:text-4xl font-light font-serif'>

    {header}
    </p>
    <p className='text-gray-500 font-light text-sm'>{description}</p>
   </div>
   </>
  )
}

export default Stamp