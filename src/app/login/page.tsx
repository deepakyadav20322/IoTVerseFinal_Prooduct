   
   'use client'
         import React from 'react'
         import { useRouter } from 'next/navigation';
         import { signIn } from 'next-auth/react';
         import { useSession } from 'next-auth/react';
          
          const page = () => {
   
           const { data: session, status } = useSession();
            const router = useRouter(); 
            const [data, setData] = React.useState({
              email: '',
              password: '',
            });
      
             const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
              const { name, value } = e.target
              setData((prev) => ({
                ...prev,
                [name]: value,
              }));
              
            }
            const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault()
              console.log("data=> ",data)
              const login = await signIn("credentials",{...data, redirect: false,},);
              if(login?.ok){
                router.push('/admin/dashboard',);
              }else{
                console.log("login error-> ",login?.error);
              }
              console.log("login data=> ",login);
            }

        
              if(session && status === 'authenticated'){
                   router.push('/admin/dashboard');
              }
      
            return (
              <div className=' flex flex-col justify-center items-center min-h-[50vh]'>
                  <h1 className='text-xl font-semibold pb-2'>Login</h1>
                  <div className='w-[400px] border-2 border-black rounded-md p-10'>
                    <form onSubmit={handleSubmit} action="">
                      <input name='email' onChange={handleOnchange} type='email' placeholder='email' className='w-full p-2 border border-gray-300 rounded-md mb-2' />
                      <input name='password' onChange={handleOnchange} type='password' placeholder='password' className='w-full p-2 border border-gray-300 rounded-md mb-2' />
                      <button type='submit' className='w-full px-3 py-2 bg-blue-500 text-white rounded-md'>Login</button>
                      </form>
                  </div>
                  <div>
                  </div>
              </div>
            )
          }
          
          export default page;