import User from "/src/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { SendMail } from "@/utils/SendMail/SendMail";
import { TokenGenerator } from "@/utils/TokenGenerator/TokenGenerator";

export const PATCH = async (request) => {

    await connect();

  const { token, newPassword } = await request.json();

  const hashedPassword = await bcrypt.hash(newPassword, 5);

  if (!token) {
    return new NextResponse("Bad Request", { status: 400 });
  }

  try {
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return new NextResponse("Invalid token", { status: 404 });
    }

    if (user.verifiedAccount === true) {
      user.password = hashedPassword;
      user.verificationToken = undefined;
      user.verificationTokenExpiration = undefined;
      await user.save();
      const resetedPasswordMsg = `<!DOCTYPE html>
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
                  <h1>Reset de Senha completado</h1>
              </center>
              <center>
                  <p>Sua senha foi trocada.</p>
              </center>
          </div>
      </body>
      </html>`
await SendMail(user.email, "Senha resetada Crud", "Sua senha foi resetada com succeso", resetedPasswordMsg);
      return new NextResponse("Senha resetada", { status: 200  });

    } else if (user.verifiedAccount !== true) {
      return new NextResponse("Account not verified", { status: 409 });
    }
  } catch (err) {
    console.error("Error verifying account:", err);
    return new NextResponse("Internal server error", { status: 500 });
  }
};

export const POST = async (request) => {

    await connect();

  const { email} = await request.json();

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return new NextResponse("Invalid email", { status: 404 });
    }

    if (user.verifiedAccount === true) {
        const TokenExpiration = Date.now() + 3600000;

        let token = TokenGenerator();
        let tokenAlreadyExist = await User.findOne({verificationToken: token});
      
        while (tokenAlreadyExist){
          token = TokenGenerator();
          tokenAlreadyExist = await User.findOne({verificationToken: token});
        }

        user.verificationToken = token.toString(),
        user.verificationTokenExpiration = TokenExpiration,
   
      await user.save();

      const resetUrl = `${process.env.SITE_URL}/resetpassword?token=${token}`;
      const resetPasswordViaTokenMsg = `<!DOCTYPE html>
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
                          <h1>Reset de Senha Solicitada</h1>
                      </center>
                          <center> <p>Resete sua senha.</p> </center>
                                       <center><a href="${resetUrl}">
                Resetar minha senha.
            </a> </center>

                  </div>
                 
              </body>
              </html>`;
      
      SendMail(user.email, 'Resetar senha', `Resete sua senha.: ${resetUrl}`, resetPasswordViaTokenMsg)
      return new NextResponse("Reset password token generated", { status: 200 });

    } else if (user.verifiedAccount !== true) {
      return new NextResponse("Account not verified", { status: 409 });
    }
  } catch (err) {
    console.error("Error verifying account:", err);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
