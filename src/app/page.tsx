import { Button } from "@/components/ui/index"
import { SignInButton } from "@/components/SignInButton"
import { backgroundImage } from "@/styles/themes"

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-500">Hello Tailwind!</h1>
      <Button className="bg-gradient-to-r from-[#1A2A3A] to-[#4C6A8A] text-white p-3 rounded-md shadow-metallic hover:bg-gradient-to-l">
        Gradient Button
      </Button>
      <Button variant="default">
        Gradient Button
      </Button>
      <Button variant="gradient" style={{ backgroundImage: 'var(--gradient-primary)' }}>
        Gradient Button
      </Button>
      <SignInButton />
    </main>
  )
}