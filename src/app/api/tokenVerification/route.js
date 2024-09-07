import User from "@/models/User";
import { NextResponse } from "next/server";

export const GET= async (req) =>{

  const  {searchParams} = new URL(req.url);
  const token = searchParams.get('token');

  if (!token) {
    return new NextResponse("Bad Request", {status: 400,});
  }

  try {
    const user = await User.findOne({ verificationToken: token });
    //console.log(user)
    if (!user) {
      return new NextResponse("Invalid token", {status: 404,});
      
    }

    if(user.verifiedAccount !== true){
    if (user.verificationTokenExpiration < Date.now()) {
      user.verificationToken = undefined;
      user.verificationTokenExpiration = undefined;
      await user.save();
      return new NextResponse("Verification expired", {status: 401,});
  
    }

    user.verifiedAccount = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiration = undefined;
    await user.save();

    return new NextResponse("Account verified", {status: 200,});
  }
  else if(user.verifiedAccount === true){
    return new NextResponse("Account already verified", {status: 409,});
  
  }

  } catch (err) {
    console.error('Error verifying account:', err);
    return new NextResponse("Internal server error", {status: 500,});

  }
}
