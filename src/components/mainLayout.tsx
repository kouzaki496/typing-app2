import { ReactNode } from "react";
import { Header } from "@/components/index";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 p-4">{children}</main>
      <footer className="bg-gray-100 dark:bg-gray-900 p-4 text-center text-sm">
        © 2025 Code Type
      </footer>
    </div>
  );
}