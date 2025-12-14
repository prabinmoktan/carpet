import React from 'react'
import { clsx } from 'clsx';

interface Badge{
    title: number | string;
    variant: 'primary' | 'secondary' | 'default' | 'cart';
    className?: string;
}


const badgeVariants = {
    cart: 'rounded-full px-1 border text-sm',
    primary: 'bg-amber-500 text-white  rounded-2xl  text-xs px-3 py-1',
    secondary: 'bg-gray-300 text-gray-800 border border-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 rounded-sm px-3 py-1',
    default: 'bg-neutral-100 text-neutral-800 border border-neutral-200 dark:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-700 rounded-sm px-3 py-1'
  }
const Badge: React.FC<Badge> = ({title, variant= 'default', className }) => {
  return (
    <>
    <div className={clsx(
      'inline-block   font-medium ',
      badgeVariants[variant],
      className
    )}>
        {title}
    </div>
    </>
  )
}

export default Badge