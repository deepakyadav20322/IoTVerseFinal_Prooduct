import { NextRequest, NextResponse } from "next/server";
import prisma from "@/helper/prisma";


export async function POST(req:NextRequest){
    const reqBody = await req.json();
    const { name, position, github, linkedin, twitter, status, imageUrl } = reqBody;

    if(!name||!position||!linkedin||!status||!imageUrl){
        return NextResponse.json( {success:false,
            message:"Please fill all required fields"},{status:400})
    };
    try {
        const newMember = await prisma.teamMember.create({
            data:{
                name,
                position,
                github,
                linkedin,
                twitter,
                status,
                imageUrl
            }
        });
        if(!newMember){
            return NextResponse.json({success:false,
                message:"error in adding member"},{status:400})
        };

        return NextResponse.json({success:true,
            message:"Member added successfully",
            newMember},{status:200})


    } catch (error) {
        return NextResponse.json({success:false,
            message:"Server Error",
            },{status:500})
    }
}


export async function GET(req:NextRequest){
    try{
   const res = await prisma.teamMember.findMany();
   return NextResponse.json({success:true,
    message:"Members fetched successfully",
    res},{status:200});
    }catch(error){
     return NextResponse.json({success:false,
        message:"Server Error",
        error
        },{status:500});

    }
}


