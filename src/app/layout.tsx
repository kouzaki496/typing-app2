import "@/app/globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Layout } from "@/components/index";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Typing App",
  description: "Typing App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}