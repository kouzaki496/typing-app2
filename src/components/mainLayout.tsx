import { ReactNode } from "react";
import { Header } from "@/components/index";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex-1 p-4">{children}</main>
      <footer className="p-4 text-center text-sm bg-background border-t border-border">
        © 2025 KeyCoder
      </footer>
    </div>
  );
}