import { NextRequest, NextResponse } from "next/server";
import prisma from "@/helper/prisma";



export async function GET(req:NextRequest){
    console.log(req.nextUrl.searchParams.get('id')  )
 try {
    const allEvents = await prisma.event.findMany();
    return NextResponse.json({message:"Event fetched successfully",allEvents,totalNumber:allEvents.length},{status:200});
 } catch (error) {
    return NextResponse.json({message:"Error during fetching events",error,success:false},{status:500});
}

}