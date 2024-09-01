import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import NextTopLoader from "nextjs-toploader";

import { auth } from "./auth";
import { SessionProvider } from "next-auth/react";
import { SITE_NAME } from "@/lib/consts";

const inter = Inter({ subsets: ["latin"] });

export const experimental_ppr = true;

export const viewport: Viewport = {
  colorScheme: "light dark",
};

export const metadata: Metadata = {
  authors: [
    {
      name: "KR Shanto",
    },
  ],
  creator: "KR Shanto",
  publisher: "KR Shanto",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || ""),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
          enableSystem
        >
          {/* <NextTopLoader showSpinner={false} /> */}
          <Navbar />
          <div className="flex min-h-screen flex-col bg-background text-foreground">
            {children}
          </div>
          <Toaster />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
