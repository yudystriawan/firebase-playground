import AuthButton from "@/components/auth-button";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/auth";
import { HomeIcon } from "lucide-react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <AuthProvider>
          <nav className="bg-sky-950 text-white p-5 h-24 flex items-center justify-between">
            <Link
              href="/"
              className="text-3xl tracking-widest flex gap-2 items-center uppercase"
            >
              <HomeIcon />
              <span>My App </span>
            </Link>
            <ul className="flex gap-6 items-center">
              <li>
                <Link
                  href="/propery-search"
                  className="uppercase tracking-widest hover:underline"
                >
                  Property search
                </Link>
              </li>
              <li>
                <AuthButton />
              </li>
            </ul>
          </nav>
          {children}
          <Toaster richColors closeButton />
        </AuthProvider>
      </body>
    </html>
  );
}
