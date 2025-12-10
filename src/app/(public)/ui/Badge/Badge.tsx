import React from 'react'
import { clsx } from 'clsx';

interface Badge{
    title: number;
    variant: 'primary' | 'secondary' | 'default';
    className?: string;
}


const badgeVariants = {
    primary: 'bg-blue-500 text-white border border-blue-600',
    secondary: 'bg-gray-100 text-gray-800 border border-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700',
    default: 'bg-neutral-100 text-neutral-800 border border-neutral-200 dark:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-700'
  }
const Badge: React.FC<Badge> = ({title, variant= 'default', className }) => {
  return (
    <>
    <div className={clsx(
      'inline-block px-3 py-1 text-xs font-medium rounded-full',
      badgeVariants[variant],
      className
    )}>
        {title}
    </div>
    </>
  )
}

export default Badge