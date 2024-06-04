import { NextRequest, NextResponse } from "next/server";
import prisma from "@/helper/prisma";



export async function GET(req:NextRequest,ctx: any){

 try {
    console.log('it running')
    const event = await prisma.event.findUnique(
      {
         where:{id:ctx.params.id}
      }
    );
    if(!event){
      return NextResponse.json({message:"No any event found",success:false},{status:400});
    }
    return NextResponse.json({message:"Event fetched successfully",eventData:event},{status:200});
 } catch (error) {
    return NextResponse.json({message:"Error during fetching single event",error,success:false},{status:500});
}

}



export async function PUT(req:NextRequest,ctx:any){
    const reqbody = await req.json();
    const { name, slogan, description, startDate, endDate, startTime, endTime } = reqbody;
    if(!name || !slogan || !description || !startDate || !endDate || !startTime || !endTime){
        return NextResponse.json({message:"All fields are required in event updation"},{status:400})
    }
    // return NextResponse.json({message:"Event created successfully",EventData:reqbody,success:true},{status:200})
 
     if(!ctx.params?.id)
        return NextResponse.json({message:"Please provide event id params",success:false},{status:400});

    try {
        const updatedEvent = await prisma.event.update({
              where: { id:ctx.params.id },
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
        return NextResponse.json({message:"Event updated successfully",EventData:updatedEvent,success:true},{status:200})
    } catch (error) {
        return NextResponse.json({message:"Error during event updation, server error",error,success:false},{status:500});
    }

   
}


export async function DELETE(req:NextRequest,ctx:any){
    const {id} = ctx.params;
    if(!id){
        return NextResponse.json({message:"Please provide event id"},{status:400})
    }
    try {
        const deleteEvent = await prisma.event.delete({
            where:{
                id
            }
        });
        if(!deleteEvent){
            return NextResponse.json({message:"Error in deleting event",success:false},{status:400});
        }
        
        return NextResponse.json({message:"Event deleted successfully",deleteEvent,success:true},{status:200})
    } catch (error) {
        return NextResponse.json({message:"Error during event deletion, server error",error,success:false},{status:500});
    }
}




