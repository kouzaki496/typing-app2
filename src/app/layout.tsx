import "@/app/globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import Layout from "@/components/mainLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Code Type",
  description: "Code Type",
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