"use client";
import { Button } from "@/components/ui/index";
import { SignInButton } from "@/components/SignInButton";
import { useState } from "react";
import LanguageSelectModal from "@/components/LanguageSelectModal";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">CodeTapper</h1>
      <p className="mb-6 text-gray-500">エンジニア向けタイピング練習アプリ</p>

      <div className="flex gap-4">
        <Button onClick={() => setShowModal(true)}>言語を選ぶ</Button>
        <Button variant="secondary">練習を始める</Button>
      </div>

      <LanguageSelectModal open={showModal} onOpenChange={setShowModal} />
    </main>
  )
}