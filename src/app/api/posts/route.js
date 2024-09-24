import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Post from "@/models/Post";

// Aleksandr

//get all the posts
export const GET = async (request) => {
console.log("*******************************************\nGET ALL POST")
    try{
       await connect()
        
       const url = new URL(request.url)
       const user = url.searchParams.get("user")
        
       // if we need to get all the posts with username === user
       if (!user) {
        const posts = await Post.find();
        return new NextResponse(JSON.stringify(posts), {status: 200});
       } else {
        // if we need to get all the posts for home page without any paraneters
        const posts = await Post.find({ name: user });
        return new NextResponse(JSON.stringify(posts), {status: 200});
       }
    }catch(err){
        return new NextResponse("Database Error",{status: 500});
    }
}

// export const GET = async (request) => {
//     //fetch

//     const url = new URL(request.url);
        
//     const username = url.searchParams.get("username");

//     try{
//        await connect();

//        const posts = await Post.find(username && {username});
//        return new NextResponse(JSON.stringify(posts), {status: 200});

//     }catch(err){
//         return new NextResponse("Database Error",{status: 500});
//     }
    
// }

//create New post
export const POST = async (request) => {

    const body = await request.json()
    try{
       await connect();
        
       //check if the post with the same title or content already exists
       const sameTitlePost = await Post.find({title: body.title})
       const sameContentPost = await Post.find({content: body.content})

       console.log(sameTitlePost.length)
       console.log(sameContentPost)

       if (sameTitlePost.length === 0 && sameContentPost.length === 0) {
        const newPost = new Post(body)
        await newPost.save();
        return new NextResponse("Post has been created", {status: 201});
       } else {
        return new NextResponse("The Post with this title or content is already exists", {status: 409});
       }

    }catch(err){
        console.log(err)
        return new NextResponse("Database Error",{status: 500});
    }
    
}