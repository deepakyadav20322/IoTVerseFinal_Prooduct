import { NextRequest, NextResponse } from "next/server";
import prisma from "@/helper/prisma"

import { v2 as cloudinary } from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: process.env.CLODINARY_CLOUD_NAME, 
  api_key:process.env.CLODINARY_api_key , 
  api_secret:  process.env.CLODINARY_api_secret
});

// cloudinary.config({ 
//   cloud_name: 'dtylrk1zj', 
//   api_key: '818812673898723', 
//   api_secret: 'J9amCEkbsyniSwoPvmcU9e3AKyY' 
// });



export async function POST(req:NextRequest){
    
    try {
      const reqbody = await req.json();
      const imageUploadData  = reqbody;
     
      if(!imageUploadData){
        console.log("image upload run")
        console.log(imageUploadData);
        return NextResponse.json({message:"Not get image "},{status:400});
      }
    
      const newImg = await prisma.gallery.create({
        data: {
          galleryImg: imageUploadData,
        },
      });
   
      return NextResponse.json({message:"Image uploaded successfully ",success: true,},{status:200})
  } catch (error) {
    return NextResponse.json({error:error},{status:500})
  }
}

export async function GET(req:NextRequest){
  try {
    const allImages = await prisma.gallery.findMany();
    return NextResponse.json({message:"Image successfully retrive ",images:allImages,success: true,},{status:200})
  } catch (error) {
     return NextResponse.json({error:error},{status:500})
  }

}

export async function DELETE(req:NextRequest){
  try {
    const reqbody = await req.json()
    console.log(reqbody,"==================================================")
    const {publicId,imgId} = reqbody;

    console.log(publicId);
    console.log(imgId);
    const imgData = await prisma.gallery.delete({
      where: {
        id: imgId,
      },
    });

    console.log ("next step")
    cloudinary.uploader
    .destroy(publicId)
    .then((result) => {
      console.log(result)
    })
    .catch((error) => {
      return NextResponse.json({error:error},{status:500})
    });
     return NextResponse.json({message:"Image deleted successfully ",success: true,},{status:200})
  } catch (error) {
    console.log(error)
    return NextResponse.json({error:error},{status:500})
  }

}