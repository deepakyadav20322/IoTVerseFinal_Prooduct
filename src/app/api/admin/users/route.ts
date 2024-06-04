import { NextRequest, NextResponse } from "next/server";
import prisma from '@/helper/prisma'

export async function GET( req:NextRequest){
    try {
        const allUser =await prisma.user.findMany();
        return NextResponse.json({message:"users fetched successfully",allUser,success:true},{status:200});
    } catch (error) {
        return NextResponse.json({message:"Server error",success:false},{status:500});
    }
}