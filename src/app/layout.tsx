"use client";
import "./globals.css";
import  Notification  from "@/components/ui/notification/notification";


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>

      <div>{children}</div>
      <Notification/>
     
      </body>
    </html>
  );
}
