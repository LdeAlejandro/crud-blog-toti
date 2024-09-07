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
        SendMail(email, 'Senha resetada Crud', 'Sua senha foi resetada com succeso');

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
    return new NextResponse("User or email already exist", {
      status: 409,
    });
  }
};
