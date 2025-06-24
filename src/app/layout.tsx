'use client';
import { Geist } from "next/font/google";
import { TRPCReactProvider } from "@/trpc/react";
import { SessionProvider } from 'next-auth/react';
import { LayoutWrapper } from './_comp/layout-wrapper';
import { Toaster } from 'react-hot-toast';


const geist = Geist({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  return (
    <html lang="en">
      <body className={geist.className}>
        <SessionProvider>
          <TRPCReactProvider>
            {/* <ThemeProvider theme={theme}> */}
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
            {/* </ThemeProvider> */}
          </TRPCReactProvider>
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
