import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
const page = () => {
    return (
        <div className="flex flex-col items-center justify-center h-[80vh]">
            <h1 className="text-4xl font-bold mb-4 text-blue-500">Coming Soon</h1>
            <p className="text-lg text-gray-600">This page is under construction. Please check back later.</p>
           <Button className='destructive bg-green-500 hover:bg-green-600'><Link href={'/'} className="">Go To Home</Link></Button> 
        </div>
    );
};

export default page;