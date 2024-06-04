
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/helper/prisma";


export async function GET(req:NextRequest){
 
    try {
      const allImages = await prisma.gallery.findMany()
      return NextResponse.json({message:"Image successfully retrive",images:allImages,success: true,},{status:200})
    } catch (error) {
       return NextResponse.json({error:error},{status:500})
    }
  
  }