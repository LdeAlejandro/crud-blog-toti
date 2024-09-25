import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Post from "@/models/Post";

// Aleksandr

//get all the posts
export const GET = async (request) => {

    
    try{
       await connect()
      
       const url = new URL(request.url);
       const user = url.searchParams.get("user");
       const page = url.searchParams.get("page");
       const searchTerm = url.searchParams.get("search");
       console.log('backend per page: ', url.searchParams.get("per_page"));
       const per_page = url.searchParams.get("per_page")< 11 ? url.searchParams.get("per_page") : 5;
       const limit =  parseInt(per_page); 
       const skip = (page - 1 ) * per_page;
    
       // if we need to get all the posts with username === user
       if (!user && searchTerm ==="" || !searchTerm) {
        
        const posts = await Post.find({})
        .sort({createdAt: -1})
        .skip(skip)
        .limit(limit);
        
        const totalPosts = await Post.countDocuments();

        return new NextResponse(JSON.stringify({posts, totalPosts}), {status: 200});
       } else if (!user && searchTerm && searchTerm !=="") {
        
        const posts = await Post.find({
            //$option: i para ignorar mayusculas e minusculas
            title:{$regex: searchTerm, $options:"i"},
            content:{$regex: searchTerm, $options:"i"}
        })
        .sort({createdAt: -1})
        .skip(skip)
        .limit(limit);

        if(posts ==null){
            return new NextResponse(JSON.stringify("No matching posts",{ totalPosts: 0}), {status: 404});
        }
        
        const totalPosts = await Post.countDocuments();

        return new NextResponse(JSON.stringify({posts, totalPosts}), {status: 200});
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