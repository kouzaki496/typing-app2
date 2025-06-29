'use client';

import Link from 'next/link'
import { ThemeSwitch } from "@/components/theme-switch"

export default function Header() {
  return (
    <header className="w-full p-4 bg-background border-b border-border">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          Clyper
        </Link>
        <nav className="flex gap-4">
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
          <ThemeSwitch />
        </nav>
      </div>
    </header>
  );
}
