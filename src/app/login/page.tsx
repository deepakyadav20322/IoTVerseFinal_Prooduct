   
   'use client'
         import { useRouter } from 'next/navigation';
         import { signIn } from 'next-auth/react';
         import { useSession } from 'next-auth/react';
         import { useState } from 'react';
          
          const Login = () => {
   
          const [loading, setLoading] = useState(false);
           const { data: session, status } = useSession();
            const router = useRouter(); 
            const [data, setData] = useState({
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
              if(!data.email || !data.password) return alert("All fields are required");
                setLoading(true);
              const login = await signIn("credentials",{...data, redirect: false,},);
              if(login?.ok){
                router.push('/admin/dashboard',);
                setLoading(false);
              }else{
                console.log("login error-> ",login?.error);
                setLoading(false);
              }
             setLoading(false);
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
                      <button disabled={loading} type='submit' className='w-full px-3 py-2 disabled:bg-blue-300 disabled:text-gray-400 disabled:cursor-not-allowed bg-blue-500 text-white rounded-md'>{loading?'processing...':'login'}</button>
                      </form>
                  </div>
                  <div>
                  </div>
              </div>
            )
          }
          
          export default Login;