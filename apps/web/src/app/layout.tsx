import Header from "@/components/header";
import Providers from "@/components/providers";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { extractRouterConfig } from "uploadthing/server";
import "../index.css";
import { PostHogProvider } from "./_analytics/provider";
import { ourFileRouter } from "./api/uploadthing/core";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FirstProject",
  description: "FirstProject",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
      <body
        className={` ${geistSans.variable} ${geistMono.variable}  antialiased`}
      >
        <Providers>
          <PostHogProvider>
            <div className="grid bg-background h-screen grid-rows-[auto_1fr]">
              <Header />
              <main className="overflow-y-scroll">{children}</main>
            </div>
            {modal}
            <div id="modal-root" />
          </PostHogProvider>
        </Providers>
      </body>
    </html>
  );
}
