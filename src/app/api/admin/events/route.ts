import { NextRequest, NextResponse } from "next/server";
import{IEvent} from '@/types/type_Interface'
import prisma from "@/helper/prisma"
import { url } from "inspector";


export async function POST(req:NextRequest){

    const reqbody = await req.json();
    const { name, slogan, description, startDate, endDate, startTime, endTime } = reqbody;
    if(!name || !slogan || !description || !startDate || !endDate || !startTime || !endTime){
        return NextResponse.json({message:"All fields are required in event creation"},{status:400})
    }
    // return NextResponse.json({message:"Event created successfully",EventData:reqbody,success:true},{status:200})
    try {
        const newEvent = await prisma.event.create({
            data:{
                name,
                slogan,
                description,
                startDate,
                endDate,
                startTime,
                endTime
            }
        });
        return NextResponse.json({message:"Event created successfully",EventData:newEvent,success:true},{status:200})
    } catch (error) {
        return NextResponse.json({message:"Error during event creation, server error",error,success:false},{status:500});
    }

   
}


export async function GET(req:NextRequest){
    console.log(req.nextUrl.searchParams.get('id')  )
 try {
    console.log('it running')
    const allEvents = await prisma.event.findMany();
    return NextResponse.json({message:"Event fetched successfully",allEvents,totalNumber:allEvents.length},{status:200});
 } catch (error) {
    return NextResponse.json({message:"Error during fetching events",error,success:false},{status:500});
}

}






