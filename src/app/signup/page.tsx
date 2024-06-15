'use client'

import axios from 'axios';
import {  useRouter } from 'next/navigation';
import React, { useState } from 'react'
    
const page:React.FC = () => {

  const router = useRouter();
  const [data, setData] =useState({
    name:"",
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

   const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
  }
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!data.email || !data.password || !data.name) return alert("All fields are required");
    if(data.password.length < 6) return alert("Password must be atleast 6 characters");
    setLoading(true);
    try{
     const res =  await axios.post("/api/signup", data);
     if(res.status === 200)
        
     router.push("/login");
    } catch(err: any){
        console.log('signup errro',err);
    }finally{
      setLoading(false);
    }

     
  
}

  return (
    <div className=' flex flex-col justify-center items-center min-h-[50vh]'>
        <h1 className='text-xl font-semibold pb-2'>SignUp</h1>
        <div className='w-[400px] border-2 border-black rounded-md p-10'>
          <form action="" onSubmit={handleSubmit}>
            <input onChange={handleOnchange} type='text' name='name' placeholder='username' className='w-full p-2 border border-gray-300 rounded-md mb-2' />
            <input onChange={handleOnchange}  type='email' name='email' placeholder='email' className='w-full p-2 border border-gray-300 rounded-md mb-2' />
            <input onChange={handleOnchange}  type='password' name='password' placeholder='password' className='w-full p-2 border border-gray-300 rounded-md mb-2' />
            <button disabled={loading} type='submit' className=' disabled:bg-slate-300 disabled:cursor-not-allowed disabled:text-gray-500 w-full px-3 py-2 bg-blue-500 text-white rounded-md'>{loading?'processing...':'SignUp'}</button>
            </form>
        </div>
    </div>
  )
}

export default page