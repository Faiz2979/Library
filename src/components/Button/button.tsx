


import Link from 'next/link';
import { MouseEventHandler, ReactNode } from 'react';

const PrimaryButton = ({children, onClick}: {children: ReactNode, onClick: MouseEventHandler<HTMLButtonElement>}) => {
    return (
        <button 
            onClick={onClick} 
            className="px-4 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600"
        >
            {children}
        </button>
    )
}

const RefPrimaryButton = ({children, href}: {children: ReactNode, href: any}) => {
    return (
        <Link 
            href={href} 
            className="px-4 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600"
        >
            {children}
        </Link>
    )
}



export { PrimaryButton, RefPrimaryButton };

