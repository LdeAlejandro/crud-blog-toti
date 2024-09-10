import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Post from "@/models/Post";

// Aleksandr

export const GET = async (request) => {
    //fetch

    const url = new URL(request.url);
        
    const username = url.searchParams.get("username");

    try{
       await connect();

       const posts = await Post.find(username && {username});
       return new NextResponse(JSON.stringify(posts), {status: 200});

    }catch(err){
        return new NextResponse("Database Error",{status: 500});
    }
    
}

export const POST = async (request) => {
    //fetch

    const body = await request.json()

    const newPost = new Post(body)
    try{
       await connect();

       await newPost.save();
       console.log("attention")

       return new NextResponse("Post has been created", {status: 201});

    }catch(err){
        console.log(err)
        return new NextResponse("Database Error",{status: 500});
    }
    
}