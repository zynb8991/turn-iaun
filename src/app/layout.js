import "./globals.css";
import ToasterComponent from "@/components/toaster/ToasterComponent";
import authToken from '@/lib/authToken';
import Aside from "@/components/aside";
import Navbar from "@/components/navbar";
import { LoginProvider } from "@/context";
import {NextResponse} from "next/server"

export const metadata = {
  title: "سامانه نوبت دهی دانشگاه آزاد اسلامی"
};

export default async function RootLayout({ children }) {
  const isLoggedIn = await authToken();

  return (
    <html lang="fa">
      <body dir="rtl">
        <LoginProvider>
          <ToasterComponent />

          {(!isLoggedIn || isLoggedIn.role == "student") && children}

          {isLoggedIn && (isLoggedIn.role == "teacher" || isLoggedIn.role == "admin") && (
            <main className="flex min-h-screen">
              <Aside user={isLoggedIn} />
              <div className='flex flex-col w-full'>
                <Navbar />
                <div className='flex flex-col items-center w-full h-main overflow-y-auto'>
                  <div className="w-full h-[200px] bg-secondary"></div>
                  <div className="w-container relative top-[-80px]">{children}</div>
                </div>
              </div>
            </main>
          )}
        </LoginProvider>
      </body>
    </html>
  );
}
