import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { SendMail } from "../../../../utils/SendMail/SendMail";
import { TokenGenerator } from "@/utils/TokenGenerator/TokenGenerator";

//Alejandro
export const POST = async (request) => {
  const { name, email, /*username,*/ password } = await request.json();

  await connect();

  const hashedPassword = await bcrypt.hash(password, 5);

  //const user = await User.findOne ({$or: [{username},{ email}]});
  const user = await User.findOne({ email: email});

  if(!user){
    const TokenExpiration = Date.now() + 3600000;

    let token = (TokenGenerator()).toString();
    let tokenAlreadyExist = await User.findOne({verificationToken: token});

    while (tokenAlreadyExist){
      token = TokenGenerator();
      tokenAlreadyExist = await User.findOne({verificationToken: token});
    }

  const newUser = new User({
    name,
    //username,
    email,
    password: hashedPassword,
    verificationToken: token.toString(),
    verificationTokenExpiration: TokenExpiration,
  });

 

  try {
    await newUser.save();
    const verificationLink = `${process.env.SITE_URL}/verify?token=${token}`;
    console.log('User has been created')
    SendMail(email, 'Conta Criada Crud', 'Sua conta foi criada com sucesso');
    SendMail(email, 'Verifique sua conta', `${verificationLink}`);
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