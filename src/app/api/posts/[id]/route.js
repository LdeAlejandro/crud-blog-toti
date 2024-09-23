import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Post from "@/models/Post";

// get the single Post 
export const GET = async (request, {params}) => {

    const {id} = params;

    try{
       await connect();

       const post = await Post.findById({_id: id});
       return new NextResponse(JSON.stringify(post), {status: 200});

    }catch(err){
        console.log(err)
        return new NextResponse("Database Error",{status: 500});
    }
    
}

// delete the Post 
export const DELETE = async (request, {params}) => {

    const {id} = params;

    try{
       await connect();

       const post = await Post.findByIdAndDelete(id);
       return new NextResponse("Post has been deleted", {status: 200});

    }catch(err){
        return new NextResponse("Database Error",{status: 500});
    }
    
}

// edit the Post
export const PUT = async (request, {params}) => {

    const {id} = params;
    const body = await request.json()

    try{
       await connect();
       const post = await Post.findByIdAndUpdate(id, 
        { title: body.newTitle, content: body.newContent , img: body.newImg}, 
        { new: true } )
        if (!post) {
            return new NextResponse("Post was not found", {status: 404});
        }
        return new NextResponse("Post was updated successfully", {status: 200});

    }catch(err){
        console.log(err)
        return new NextResponse("Database Error",{status: 500});
    }
    
}