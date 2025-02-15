import MemecoinCalculator from "@/components/MemecoinCalculator"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-background text-foreground">
      <h1 className="text-4xl font-bold mb-8">MEMECOIN TRADING CALCULATOR</h1>
      <MemecoinCalculator />
    </main>
  )
}

