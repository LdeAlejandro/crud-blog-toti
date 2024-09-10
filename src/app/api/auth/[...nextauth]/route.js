import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { TokenGenerator } from "@/utils/TokenGenerator/TokenGenerator";
import { SendMail } from "@/utils/SendMail/SendMail";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials) {
       
        await connect();

        try {
          const user = await User.findOne({ email: credentials.email });

          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (isPasswordCorrect) {
              return user;
            } else {
              throw new Error("Wrong Credentials!");
            }
          } else {
            throw new Error("User not found!");
          }
        } catch (err) {
          throw new Error(err);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,

      async profile(profile) {
        // Ensure profile is defined and contains email
        if (!profile || !profile.email) {
          console.error('Profile is undefined or missing email:', profile);
          throw new Error('Profile information is missing.');
        }

        // Check if the user exists
        const registeredUser = await User.findOne({ email: profile.email });

        if (registeredUser) {
          registeredUser.GoogleAccount_id = profile.sub.toString();
          await registeredUser.save();
          return {
            id: registeredUser._id.toString(), 
            name: registeredUser.name,
            email: registeredUser.email,
          };

        } else {
          console.log('Creating new user:');
           const hashedPassword = await bcrypt.hash(TokenGenerator(), 5);
          //  let newUserName = (profile.name+(TokenGenerator().slice(5)));
          //  let checkUsername = await User.findOne({ username: newUserName});
          //  while (checkUsername){
          //   console.log('**************************************\n username already exist generating new username')
          //   checkUsername = await User.findOne({ username: newUserName});
          //   newUserName = (profile.name+(TokenGenerator().slice(5)));
          //   console.log(checkUsername, newUserName)
          //  }
           const TokenExpiration = Date.now() + 3600000;
           let token = (TokenGenerator()).toString();
           let tokenAlreadyExist = await User.findOne({verificationToken: token});
       
           while (tokenAlreadyExist){
             token = TokenGenerator();
             tokenAlreadyExist = await User.findOne({verificationToken: token});
           }

          const newUser = new User({
            GoogleAccount_id: profile.sub.toString(),
            name: profile.name,
            //username: newUserName,
            email: profile.email,
            password: hashedPassword,
            verificationToken: token.toString(),
            verificationTokenExpiration: TokenExpiration,
          });


          try {
            const res = await newUser.save();
            if (res) {
              console.log('User has been created');
              const newRegisteredUser = await User.findOne({ email: newUser.email });
   
             await SendMail(newRegisteredUser.email, 'Account Created', 'Your account has been created successfully.');

             const verificationLink = `${process.env.SITE_URL}/verify?token=${token}`;
             await SendMail(newRegisteredUser.email, 'Verifique sua conta', `${verificationLink}`);

              return {
                id: newRegisteredUser.id.toString(), 
                name: newRegisteredUser.name,
                //username: newRegisteredUser.username,
                email: newRegisteredUser.email,
              };
            }
          } catch (err) {
            console.error('Error creating user:', err.message);
            throw new Error('User not created');
          }
        }
      },
    }),
  ],

  callbacks: {
    async session({ session }) {
        const user = await User.findOne({ email: session.user.email });
      // Add custom attribute to session
      session.user.admin = user.IsAdmin; // Example: Adding a role attribute
      return session;
    },
    
  },
  pages: {
    error: "/login",
  },
});

export { handler as GET, handler as POST };
