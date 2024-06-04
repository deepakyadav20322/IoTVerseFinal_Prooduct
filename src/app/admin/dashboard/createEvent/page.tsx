
'use client'
       
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { IEvent } from '@/types/type_Interface'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const CreateEvent = () => {

const [eventData,setEventData]=useState<IEvent>({name:'',slogan:'',description:'',startDate:'',endDate:'',startTime:'',endTime:''});
const [loading,setLoading]=useState<boolean>(false);
const router = useRouter()
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
          const response = await axios.post('/api/admin/events',eventData,{headers:{'Content-Type':'application/json'}});

          if(response.status===200){
            console.log(response.data);
            toast.success('Event created successfully');
            setLoading(false);
            // redirect on dashboard page
            router.push('/admin/dashboard/allEvents');

          }
         } catch (error) {
          toast.error('Server error');
          console.log(error);
         }finally{
          console.log("finally")
         }
    }

  return (
    <div className="flex justify-center my-6">
      <Card className="w-full max-w-2xl p-6 md:p-8">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Create an Event</CardTitle>
          <CardDescription className="text-muted-foreground">Fill out the form to create a new event.</CardDescription>
        </CardHeader>
     
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name">Event Name</label>
              <Input onChange={handleOnChange} name='name' id="name" placeholder="Enter event name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slogan">Event Slogan</Label>
              <Input onChange={handleOnChange} name='slogan' id="slogan" placeholder="Enter event slogan" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Event Description</Label>
            <Textarea name='description'onChange={handleOnChange} id="description" placeholder="Enter event description" className="min-h-[100px]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="start-date">Start Date</Label>
              <Input onChange={handleOnChange} name='startDate' id="start-date" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-date">End Date</Label>
              <Input onChange={handleOnChange} name='endDate' id="end-date" type="date" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="start-time">Start Time</Label>
              <Input onChange={handleOnChange} name="startTime" id="start-time" type="time" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-time">End Time</Label>
              <Input onChange={handleOnChange} name='endTime' id="end-time" type="time" />
            </div>
          </div>
        </CardContent>
       
        <CardFooter className="flex justify-end">
          <Button disabled={loading} className=' disabled:bg-slate-400'>{loading?'processing...':'Create Event'}</Button>
        </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default CreateEvent