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
  const user = await User.findOne ({$or: [{name},{ email}]});

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
    console.log('User has been created')
    const verificationLink = `${process.env.SITE_URL}/verify?token=${token}`;
              
              const accountCreatedMessage = `
                                            <!DOCTYPE html>
<html lang="pt-BR">
   <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Conta Criada</title>
      <style>
         /* Estilos básicos */
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
            <h1>Conta Criada</h1>
         </center>
          <center>
            <p>Obrigado por criar uma conta conosco. Estamos empolgados em tê-lo a bordo.</p>
          <center>
      </div>
   </body>
</html>`;

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
                "Conta Nova Criada",
                "Conta Criada",
                accountCreatedMessage
              );

              await SendMail(
                email,
                "Verifique sua conta",
                `Verifique sua conta: ${verificationLink}`,
                verifyAccountMessage
              );

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