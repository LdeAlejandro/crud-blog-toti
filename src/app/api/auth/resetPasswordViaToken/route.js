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
      SendMail(user.email, 'Senha resetada', 'Sua senha foi resetada')
      return new NextResponse("Senha resetada", { status: 401 });

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
      SendMail(user.email, 'Resetar senha', `${process.env.SITE_URL}/resetpassword?token=${token}`)
      return new NextResponse("Reset password token generated", { status: 401 });

    } else if (user.verifiedAccount !== true) {
      return new NextResponse("Account not verified", { status: 409 });
    }
  } catch (err) {
    console.error("Error verifying account:", err);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
