import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EIDL Clarity | SBA Loan Guidance",
  description:
    "EIDL Clarity helps small businesses understand SBA EIDL issues, next steps, and loan guidance with confidence.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Google global pixel goes here. */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=AW-1062041693"></Script> 
        <Script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-1062041693');
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col bg-[#f2f5f8] text-slate-900">
        {children}
      </body>
    </html>
  );
}
