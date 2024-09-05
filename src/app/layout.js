import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import AuthProvider from "@/components/AuthProvider/AuthProvider";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Blog Crud",
  description: "Site description Seo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
     
        <AuthProvider>
        <div className="container">
        <Navbar/>
        {children}
        <Footer/>
        
        </div>
        </AuthProvider>
  
        </body>
    </html>
  );
}
