import { NextRequest, NextResponse } from "next/server";
import prisma from "@/helper/prisma"
export async function POST(req:NextRequest) {

    try {
        const body = await req.json();
        const {name, email, password} = body;
     
       //check user exists
        const userExists = await prisma.user.findFirst({
            where: {
                email
            }
        });
        if(userExists){
            return NextResponse.json({
                status: 400,
                body: {
                    message: "User already exists"
                }
            });
        
        }

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password
            }
        });
        return NextResponse.json({
            status: 200,
            body: {
                message: "User created successfully",
                newUser
            }
        }); 


        
    } catch (error) {
        return NextResponse.json({
            status: 500,
            body: {
                message: "Internal server error"
            }
        });
    }
}

