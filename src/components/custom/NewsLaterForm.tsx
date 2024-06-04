
    "use client"
import  { useState } from 'react'
import toast from 'react-hot-toast';

const NewsLaterForm = () => {
    const [formData, setFormData] = useState({ newsEmail:"" });
  const handelChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prv) => ({
      ...prv,
      [name]: value,
    }));
  };
  const handelSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
   e.preventDefault();
   if(!formData.newsEmail){
    alert('Email is required');
    return;
   }
   toast.success('Subscribed successfully');
   console.log(formData);
  }

  return (
   <>
  <form onSubmit={handelSubmit} className='flex gap-x-5'>
    <input type="email" name="newsEmail" id="" className='text-black py-2 px-4 rounded border-0 focus:outline-none' placeholder='Enter your email' autoComplete='off' onChange={handelChange} />
    
    <button type='submit'  className="inline-flex font-semibold text-[#020856] bg-[#c9fe43] border-0 py-2 px-6 focus:outline-none hover:bg-[#c9fe43e6] rounded text-lg">Subscribe</button>
    </form> 
   </>
  )
}

export default NewsLaterForm