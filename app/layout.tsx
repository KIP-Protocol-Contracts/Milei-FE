import type { Metadata } from 'next';
import { Kode_Mono } from 'next/font/google';
import './globals.css';
import UpperRight from '@/public/images/upper-right.svg';
import BottomLeft from '@/public/images/bottom-left.svg';
import Image from 'next/image';

const kodeMono = Kode_Mono({
  variable: '--font-kode-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Yat's Loyal Companion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="mytheme">
      <body className={`${kodeMono.variable} antialiased`}>
        <div className="relative">
          <div className="absolute top-0 right-0 z-0">
            <Image src={UpperRight} alt="" />
          </div>
          <div className="absolute bottom-0 left-0 z-0">
            <Image src={BottomLeft} alt="" />
          </div>
          <div className="relative z-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
