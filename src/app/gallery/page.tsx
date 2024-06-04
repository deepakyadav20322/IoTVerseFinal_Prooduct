'use client'
import axios from 'axios';

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';




// Define a type for the image data.......

  interface GalleryImage {
    public_id: string;
    secure_url: string;
  }
  
  interface ImageData {
    id: string;
    galleryImg: GalleryImage;
    createdAt: string;
    updatedAt: string;
  }



 const Gallery:React.FC = () => {

 const [allImgData,setAllImgData] = useState<ImageData[]>([]);
 const [loading,setLoading] = useState(false);

 const dummyLoadArry = Array.from({length:12});

 useEffect(()=>{
  const fetchData = async () => {
    
      try {
        setLoading(true)
        const response = await axios.get(`${process.env.NEXT_PUBLIC_baseURL}/api/galleryForUsers`);
        if (response.status==200) {
          console.log(response)
          setAllImgData(response.data.images);
        }
       
      } catch (error) {
        console.log(error);
      toast.error("Server Error")
      }finally{
        setLoading(false);
      } 
    };

    fetchData();
 
},[]);

 if(loading){
  return(
    <section className=' max-w-7xl m-auto py-4'>
        <div className='overflow-hidden w-full flex flex-col gap-y-6'>
        <div className='gallery-top-view flex h-[5.5rem] justify-center items-center '>
                     
           <span className='text-3xl text-white font-semibold'>Gallery</span>
           </div>
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-3 p-6 sm:p-4 xl:p-0 place-items-center'>
    {dummyLoadArry?.map((item,ind)=>(
        <div key={ind} className={`animate-pulse w-[290px] sm:w-[330px] lg:w-[350px]  aspect-[3/2] bg-slate-200 rounded-xl  overflow-hidden`}> 

            </div>
        ))}
        </div>
        </div>
        </section>
  )
 } 

  return (
    <section className=' max-w-7xl m-auto py-4'>
        <div className='overflow-hidden w-full flex flex-col gap-y-6'>
        <div className='gallery-top-view flex h-[5.5rem] justify-center items-center '>
                     
           <span className='text-3xl text-white font-semibold'>Gallery</span>
           </div>

           <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-3 p-6 sm:p-4 xl:p-0 place-items-center'>

            {allImgData && allImgData?.map((item,ind)=>(
            <div key={ind} className={`${allImgData.length==0?'animate-pulse':""} hover:border-2 hover:border-blue-300
            w-[290px] sm:w-[330px] lg:w-[360px]  aspect-[3/2] bg-gray-50 rounded-xl  overflow-hidden`}> 

                   <Image src={item?.galleryImg?.secure_url} height={700} width={765} alt='galleryImg' className=' object-contain w-full h-full overflow-hidden rounded-xl ' />
                </div>
            ))}

         {/* <GalleryModel galleryImages={allImgData} /> */}
    
        </div>
        </div>
    </section>
  )
}

export default Gallery