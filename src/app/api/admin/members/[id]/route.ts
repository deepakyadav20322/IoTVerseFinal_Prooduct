import { NextRequest, NextResponse } from "next/server";
import prisma from "@/helper/prisma";


export async function DELETE(req:NextRequest,ctx:any){
    
    const {id} = ctx.params;
    if(!id){
        return NextResponse.json({success:false,
            message:"Please provide id"},{status:400})
    }
    try {
        const deleteMember = await prisma.teamMember.delete({
            where:{
                id
            }
        });
        if(!deleteMember){
            return NextResponse.json({success:false,
                message:"Error in deleting member"},{status:400})
        }
        return NextResponse.json({success:true,
            message:"Member deleted successfully",
            deleteMember},{status:200})
    } catch (error) {
        return NextResponse.json({success:false,
            message:"Server Error",
            error},{status:500})
    }
} 