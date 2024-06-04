'use client'
       
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useEffect, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { IEvent } from '@/types/type_Interface'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import LoadingSpinner from '@/components/custom/LoadingSpinner'
import ButtonLoader from '@/components/custom/buttonLoader'


interface IParams{
    id:string
}

const page:React.FC<{params:IParams}> = ({params}) => {

const [eventData,setEventData]=useState<IEvent>({name:'',slogan:'',description:'',startDate:'',endDate:'',startTime:'',endTime:''});
const [loading,setLoading]=useState<boolean>(false);
const [initialLoading,setInitialLoading] = useState<boolean>(false)
const router = useRouter();

    const handleOnChange = (e:(React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>))=>{
          const {name,value}= e.target;
          setEventData((prev)=>{
               return({
                ...prev,
                [name]:value,
               })
            })

    }

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(eventData.name==='' || eventData.slogan==='' || eventData.description==='' || eventData.startDate==='' || eventData.endDate==='' || eventData.startTime==='' || eventData.endTime===''){
            toast.error('Please fill all the fields');
            return;
        }
         try {
          setLoading(true);
          const response = await axios.put(`${process.env.NEXT_PUBLIC_baseURL}/api/admin/events/${params.id}`,eventData,{headers:{'Content-Type':'application/json'}});

          if(response.status===200){
            console.log(response.data);
            toast.success('Event updated successfully',{duration:3500});
            setLoading(false);
            // redirect on dashboard page
            router.push('/admin/dashboard/allEvents');

          }
         } catch (error) {
          toast.error('Server error');
          console.log(error);
         }finally{
          setLoading(false);
         }
    }

    // Get the previous data before update ------------
    useEffect(()=>{
        async function getAllEventdataBeforeUpdate(){
         try {
          setInitialLoading(true)
             const response = await axios.get(`${process.env.NEXT_PUBLIC_baseURL}/api/admin/events/${params.id}`);
     
             if(response.status===200){
              const singleEventData = response.data.eventData;
               const getEventData = 
               {name:singleEventData.name,
               slogan:singleEventData.slogan,
               description:singleEventData.description,
               startDate:singleEventData.startDate,
               endDate:singleEventData.endDate,
               startTime:singleEventData.startTime,
               endTime:singleEventData.endTime
              };
              //  console.log("single data",getEventData);
               setEventData(getEventData);
               toast.success('Page Ready for updation',{duration:3500});
               setInitialLoading(false)
             }
             }catch(error){
              toast.error('Server error');
              console.log(error)
             }finally{
              setInitialLoading(false);
             }
        }
        getAllEventdataBeforeUpdate()
     
         },[]);
     

  return (
    <>
    {initialLoading?
     <div className='flex flex-row justify-center items-center w-full h-[80vh] '>
      <LoadingSpinner/>
      </div>:
   
    <div className="flex justify-center my-4">
      <Card className="w-full max-w-2xl p-6 md:p-8">
        
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-blue-800">Update Event</CardTitle>
          <CardDescription className="text-blue-600">Fill out the form to update event.</CardDescription>
        </CardHeader>
     
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name">Event Name</label>
              <Input onChange={handleOnChange} name='name' id="name" value={eventData.name} placeholder="Enter event name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slogan">Event Slogan</Label>
              <Input onChange={handleOnChange} name='slogan' id="slogan" value={eventData.slogan}  placeholder="Enter event slogan" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Event Description</Label>
            <Textarea name='description'onChange={handleOnChange} value={eventData.description} id="description" placeholder="Enter event description" className="min-h-[100px]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="start-date">Start Date</Label>
              <Input onChange={handleOnChange} name='startDate' value={eventData.startDate} id="start-date" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-date">End Date</Label>
              <Input onChange={handleOnChange} name='endDate' value={eventData.endDate} id="end-date" type="date" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="start-time">Start Time</Label>
              <Input onChange={handleOnChange} name="startTime" value={eventData.startTime} id="start-time" type="time" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-time">End Time</Label>
              <Input onChange={handleOnChange} name='endTime' value={eventData.endTime} id="end-time" type="time" />
            </div>
          </div>
        </CardContent>
       
        <CardFooter className="flex justify-end">
          <Button disabled={loading} className={`${loading?'cursor-not-allowed ':'cursor-pointer'}disabled:bg-slate-300 disabled:hover:bg-slate-300`}>{loading?<><ButtonLoader/><span className='ml-2'>Processing.....</span></> :'Upadte Event'}</Button>
        
        </CardFooter>
        </form>
      </Card>
    </div>
}
     </>

  )
}

export default page