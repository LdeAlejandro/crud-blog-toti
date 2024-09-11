import User from "@/models/User";
import connect from "@/utils/db";
import { NextResponse } from "next/server";
import { SendMail } from "../../../../utils/SendMail/SendMail";
import { TokenGenerator } from "@/utils/TokenGenerator/TokenGenerator";

//Alejandro
export const POST = async (request) => {
  const {email } = await request.json();

  await connect();

  //const user = await User.findOne ({$or: [{username},{ email}]});
  const user = await User.findOne({ email: email});
console.log(user.verifiedAccount)
  if(user && user.verifiedAccount !== true){
    console.log('start verificattion')
    const TokenExpiration = Date.now() + 3600000;

    let token = (TokenGenerator()).toString();
    let tokenAlreadyExist = await User.findOne({verificationToken: token});

    while (tokenAlreadyExist){
      token = TokenGenerator();
      tokenAlreadyExist = await User.findOne({verificationToken: token});
    }

    user.verificationToken= token.toString();
    user.verificationTokenExpiration= TokenExpiration;

  try {
    await user.save();
    console.log('Verification Email token generated')
    const verificationLink = `${process.env.SITE_URL}/verify?token=${token}`;
    console.log(verificationLink)

              const verifyAccountMessage = `<!DOCTYPE html>
              <html lang="pt-BR">
              <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Conta Criada</title>
                  <style>
                     
                      body {
                          font-family: Arial, sans-serif;
                          margin: 0;
                          padding: 0;
                          background-color: #f4f4f4;
                          color: #333;
                          text-align: center;
                      }
                      
                      .container {
                          width: 90%;
                          max-width: 600px;
                          margin: 20px auto;
                          background-color: #ffffff;
                          padding: 20px;
                          border-radius: 8px;
                      }
              
                      h1 {
                          color: #4CAF50;
                          font-size: 24px;
                          margin: 0;
                      }
              
                      p {
                          font-size: 16px;
                          color: #666;
                          margin: 20px 0;
                      }

                
                  </style>
              </head>
              
              <body>
                  <div class="container">
                      <center>
                          <h1>Verifique sua conta.</h1>
                      </center>
                      <center>
                          <p>Verifique sua conta criada.</p>
                                      <center> <a href="${verificationLink}"> 
                Verificar
            </a></center>
            </center>
                  </div>
              </body>
              </html>`;

              await SendMail(
                email,
                "Verifique sua conta",
                `Verifique sua conta: ${verificationLink}`,
                verifyAccountMessage
              );

    return new NextResponse("Verification Email sent", {
      status: 200,
    });
  } catch (err) {
    console.log('Verification email error')
    return new NextResponse("Verification email error", err.message, {
      status: 500,
    });
  }
}
else{
 console.log('User already verified or user does not exit')
  return new NextResponse("User already verified or user does not exit", {
    status: 409,
  });
  
}
};