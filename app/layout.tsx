import type { Metadata } from "next";
import "./globals.css";
import { LocationProvider } from "@/app/context/LocationContext";
export const metadata: Metadata = {
  title: "Local Weather",
  description: "Get your local forecast in real-time, fast and easy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <LocationProvider>{children}</LocationProvider>
      </body>
    </html>
  );
}
