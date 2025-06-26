import { Geist } from "next/font/google";
import { TRPCReactProvider } from "@/trpc/react";
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import ThemeRegistry from './theme-registry';

export const metadata = {
  title: 'Secret Share',
  description: 'Share Secrets with ease and security',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://secret-sharing-delta.vercel.app/',
    images: ['https://secret-sharing-delta.vercel.app/opengraph-image.png'],
    site_name: 'Secret Share',
    title: 'Secret Share',
    description: 'Share Secrets with ease and security',
  },
};

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
            <ThemeRegistry>
              {children}
            </ThemeRegistry>
          </TRPCReactProvider>
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
