import { Button } from "@/components/ui/index"
import { SignInButton } from "@/components/SignInButton"

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-500">Hello Tailwind!</h1>
      <Button className="text-white p-3 rounded-md cursor-pointer">
        Gradient Button
      </Button>
      <Button>
        default Button
      </Button>
      <Button variant="gradient">
        Gradient Button
      </Button>
      <SignInButton />
    </main>
  )
}