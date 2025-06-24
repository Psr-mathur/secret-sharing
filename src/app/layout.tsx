import { Geist } from "next/font/google";
import { TRPCReactProvider } from "@/trpc/react";
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';

const geist = Geist({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  return (
    <html lang="en">
      <body className={geist.className} style={{ margin: 0, padding: 0 }}>
        <SessionProvider>
          <TRPCReactProvider>
            {/* <ThemeProvider theme={theme}> */}
            {children}
            {/* </ThemeProvider> */}
          </TRPCReactProvider>
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
