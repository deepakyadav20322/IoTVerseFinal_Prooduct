'use client'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { getEventStatus } from "@/helper/statusByDateAndTime";
import axios from "axios";
import { useEffect, useState } from "react";
  
const page:React.FC = () => {

  const [loading,setLoading] = useState<boolean>(false);
  const [allEvents,setAllEvents] = useState<any[]>([]);

   useEffect(()=>{  
    async function getAllEvents(){
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_baseURL}/api/eventForUsers`);
        if(response.status===200){
          console.log("all events client",response.data);
          setAllEvents(response.data.allEvents);
        }
      } catch (error) {
        console.log(error);
     
      }finally{
        setLoading(false);
      
      }
    }
    getAllEvents(); 
    }
    ,[]);

  return (
    
    <div className="flex flex-col min-h-[100dvh] max-w-7xl w-full mx-auto">
     
    <section className="w-full py-12 md:py-14 lg:py-16">
      <div className="container px-4 md:px-6">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-blue-600 border-b-4 w-full border-blue-600 ">Event Schedule-</h2>
            <p className="text-black md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Check out the full schedule of events and plan of IoTVerse.
            </p>
          </div>
          <div className="border-2 rounded-md border-gray-300 min-h-[70vh] p-4">
          {loading?<EventLoader/>:
          <div className="grid gap-6 md:grid-cols-2">
            {allEvents && allEvents.map((event,ind)=>(
            <Card className="hover:border-blue-700 border-black transition-colors duration-150 bg-slate-50" key={ind}>
              <CardHeader>
                <CardTitle className="">{event.name}</CardTitle>
                <CardDescription className=" italic pt-2">
                   <span className=" text-gray-600 flex flex-row justify-between"><span>Time:{" "}{event.startTime} - {event.endTime}</span><span className="bg-slate-300 font-semibold rounded-md p-2 shadow-sm">{getEventStatus(event.startDate,event.endDate)}</span></span>
                   <span className="block text-gray-600">Event Start:{" "} {event.startDate}  </span>
                   <span className="block text-gray-600">Event End:{" "} {event.endDate}</span>

                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-black dark:text-gray-300">
                 {event.description}
                </p>
              </CardContent>
            </Card>
            ))}
            
          </div>
        }
        </div>
      </div>
      </div>
    </section>
         
  </div>
  )
}

export default page;




// it is an event loader skelton component-----------------------
export const EventLoader: React.FC = (props: any) => {
    return(
      <div className="grid gap-6 md:grid-cols-2 ">
            {Array.from({length:6}).map((x,ind)=>(
<Card key={ind} className="border-gray-400 hover:border-black transition-colors duration-150 bg-slate-50 py-2">
      <div className="animate-pulse p-4">
        <div className="space-y-4">
          <div className="h-6 bg-slate-200 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-slate-200 rounded w-1/2"></div>
            <div className="h-4 bg-slate-200 rounded w-1/3"></div>
            <div className="h-4 bg-slate-200 rounded w-1/4"></div>
          </div>
          <div className="h-8 bg-slate-200 rounded w-[90%]"></div>
        </div>
      </div>
    </Card>
            ))}
            
          </div>
    )
}