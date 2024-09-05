import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { SendMail } from "../../../../utils/SendMail/SendMail";

//Alejandro
export const POST = async (request) => {
  const { name, email, username, password } = await request.json();

  await connect();

  const hashedPassword = await bcrypt.hash(password, 5);

  const user = await User.findOne ({$or: [{username},{ email}]});

  if(!user){
  const newUser = new User({
    name,
    username,
    email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    console.log('User has been created')
    SendMail(email, 'Conta Criada Crud', 'Sua conta foi criada com sucesso');
    return new NextResponse("User has been created", {
      status: 201,
    });
  } catch (err) {
    console.log('User not created')
    return new NextResponse("User not created", err.message, {
      status: 500,
    });
  }
}
else{
 console.log(' User or email already exist')
  return new NextResponse("User or email already exist", {
    status: 409,
  });
  
}
};