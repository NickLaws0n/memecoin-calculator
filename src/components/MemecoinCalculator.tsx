"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { useSolanaPrice } from "@/lib/use-solana-price"
import { SlippageInput } from "./SlippageInput"
import { ArrowUpCircle } from "lucide-react"

type Currency = "USD" | "SOL"

export default function MemecoinCalculator() {
  const [displayCurrency, setDisplayCurrency] = useState<Currency>("USD")
  const [investmentSol, setInvestmentSol] = useState(1)
  const [targetProfit, setTargetProfit] = useState(25)
  const [fees, setFees] = useState({
    priority: 0.001,
    bribery: 0.001,
  })
  const [slippage, setSlippage] = useState(0)
  const [displayInvestmentValue, setDisplayInvestmentValue] = useState(investmentSol.toString())
  const { price: solPrice, loading, error } = useSolanaPrice()

  useEffect(() => {
    if (solPrice) {
      const formattedValue =
        displayCurrency === "USD" ? (investmentSol * solPrice).toFixed(2) : investmentSol.toFixed(4)
      setDisplayInvestmentValue(formattedValue)
    }
  }, [displayCurrency, investmentSol, solPrice])

  const handleInvestmentChange = (value: string) => {
    setDisplayInvestmentValue(value)

    const numericValue = Number.parseFloat(value)
    if (!isNaN(numericValue)) {
      if (displayCurrency === "USD" && solPrice) {
        setInvestmentSol(numericValue / solPrice)
      } else {
        setInvestmentSol(numericValue)
      }
    } else if (value === "") {
      setInvestmentSol(0)
    }
  }

  const calculateProfit = () => {
    if (!solPrice) return null

    const platformFeePercentage = 1
    const platformFeeInSol = (investmentSol * platformFeePercentage) / 100
    const totalFeesInSol = platformFeeInSol + fees.priority + fees.bribery
    const targetAmountInSol = investmentSol * (1 + targetProfit / 100)
    const requiredSellPriceInSol = targetAmountInSol + totalFeesInSol
    const requiredIncrease = ((requiredSellPriceInSol - investmentSol) / investmentSol) * 100
    const actualSellPriceInSol = requiredSellPriceInSol * (1 + slippage / 100)
    const actualProfitInSol = actualSellPriceInSol - investmentSol - totalFeesInSol

    return {
      requiredIncrease: requiredIncrease.toFixed(2),
      expectedSellPrice: requiredSellPriceInSol,
      actualSellPrice: actualSellPriceInSol,
      actualProfit: actualProfitInSol,
      totalFees: totalFeesInSol,
      feeBreakdown: {
        platform: platformFeeInSol,
        priority: fees.priority,
        bribery: fees.bribery,
      },
      slippageImpact: actualSellPriceInSol - requiredSellPriceInSol,
    }
  }

  const results = calculateProfit()

  if (loading) {
    return <div className="text-white">Loading Solana price data...</div>
  }

  if (error || !results) {
    return <div className="text-white">Error loading calculator. Please try again later.</div>
  }

  const formatValue = (value: number) => {
    if (displayCurrency === "USD") {
      return `$${(value * solPrice).toFixed(2)}`
    } else {
      return `◎${value.toFixed(4)}`
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <Card className="bg-card text-card-foreground border-border">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">SET YOUR TARGET PROFIT</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4 mb-4">
            {[25, 50, 75, 100].map((percent) => (
              <Button
                key={percent}
                variant={targetProfit === percent ? "default" : "secondary"}
                onClick={() => setTargetProfit(percent)}
                className={`w-full ${
                  targetProfit === percent
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {percent}%
              </Button>
            ))}
          </div>
          <div className="bg-secondary p-4 rounded-lg">
            <div className="text-4xl font-bold flex items-center justify-center">
              <ArrowUpCircle className="w-10 h-10 mr-2 text-primary" />
              <span className="text-primary">+{results.requiredIncrease}%</span>
            </div>
            <div className="text-center mt-2 text-secondary-foreground">
              Required price increase for {targetProfit}% profit
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card text-card-foreground border-border">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">CALCULATOR SETTINGS</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="investment" className="text-xl">
              Initial Investment
            </Label>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setDisplayCurrency((prev) => (prev === "USD" ? "SOL" : "USD"))}
              className="w-8 h-8 bg-secondary text-secondary-foreground hover:bg-secondary/80"
            >
              {displayCurrency === "USD" ? "$" : "◎"}
            </Button>
          </div>
          <Input
            id="investment"
            type="text"
            inputMode="decimal"
            value={displayInvestmentValue}
            onChange={(e) => handleInvestmentChange(e.target.value)}
            className="bg-secondary text-secondary-foreground"
          />
          <div>
            <Label htmlFor="targetProfit" className="text-xl">
              Target Profit (%)
            </Label>
            <Input
              id="targetProfit"
              type="number"
              value={targetProfit}
              onChange={(e) => setTargetProfit(Number(e.target.value))}
              className="bg-secondary text-secondary-foreground mt-2"
            />
          </div>
          <div>
            <Label className="text-xl">Priority Fee (SOL) - Optional, starts at 0.000</Label>
            <div className="flex items-center space-x-2 mt-2">
              <Slider
                value={[fees.priority]}
                onValueChange={(value) => setFees({ ...fees, priority: value[0] })}
                min={0}
                max={0.1}
                step={0.001}
                className="flex-grow"
              />
              <span className="w-20 text-right text-primary">{fees.priority.toFixed(3)} SOL</span>
            </div>
          </div>
          <div>
            <Label className="text-xl">Bribery Fee (SOL) - Optional incentive</Label>
            <div className="flex items-center space-x-2 mt-2">
              <Slider
                value={[fees.bribery]}
                onValueChange={(value) => setFees({ ...fees, bribery: value[0] })}
                min={0}
                max={0.1}
                step={0.001}
                className="flex-grow"
              />
              <span className="w-20 text-right text-primary">{fees.bribery.toFixed(3)} SOL</span>
            </div>
          </div>
          <SlippageInput slippage={slippage} setSlippage={setSlippage} />
        </CardContent>
      </Card>

      <Card className="bg-card text-card-foreground border-border">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">TRADE DETAILS</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-bold text-xl mb-4">Overview</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>Invested</div>
              <div className="text-right font-bold">{formatValue(investmentSol)}</div>
              <div>Expected Sell Price</div>
              <div className="text-right font-bold text-blue-400">{formatValue(results.expectedSellPrice)}</div>
              <div>Actual Sell Price</div>
              <div className="text-right font-bold text-green-400">{formatValue(results.actualSellPrice)}</div>
              <div>Total Fees</div>
              <div className="text-right font-bold text-red-400">{formatValue(results.totalFees)}</div>
              <div>Slippage Impact</div>
              <div className="text-right font-bold text-yellow-400">{formatValue(results.slippageImpact)}</div>
              <div>Actual Profit</div>
              <div className="text-right font-bold text-green-400">{formatValue(results.actualProfit)}</div>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-xl mb-4">Fee Breakdown</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>Platform Fee (1%)</div>
              <div className="text-right text-red-400">{formatValue(results.feeBreakdown.platform)}</div>
              <div>Priority Fee</div>
              <div className="text-right text-red-400">{formatValue(results.feeBreakdown.priority)}</div>
              <div>Bribery Fee</div>
              <div className="text-right text-red-400">{formatValue(results.feeBreakdown.bribery)}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

