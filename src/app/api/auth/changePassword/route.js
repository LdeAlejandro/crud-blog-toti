import User from "/src/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { SendMail } from "@/utils/SendMail/SendMail";

//Alejandro
export const PATCH = async (request) => {
  const { currentPassword, email, newPassword } = await request.json();

  await connect();

  const hashedPassword = await bcrypt.hash(newPassword, 5);

  const currentUser = await User.findOne({ email });

  if (currentUser) {
    console.log('validating  current password')
    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      currentUser.password
    );
    

    if (isPasswordCorrect) {
      try {
        await User.findOneAndUpdate(
          { email },
          { $set: { password: hashedPassword } }
        );
        console.log("New Password has been saved");

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
        await SendMail(email, "Senha resetada Crud", "Sua senha foi resetada com succeso", resetedPasswordMsg);


        return new NextResponse("Password updated", {
          status: 201,
        });
      } catch (err) {
        console.log("Password not updated");
        return new NextResponse("Password not updated", err.message, {
          status: 500,
        });
      }
    } else {
      return new NextResponse("Wrong credentials", {
        status: 401,
      })
    }
  } else {
    console.log("User or email does not exist");
    return new NextResponse("User or email does not exist", {
      status: 409,
    });
  }
};
