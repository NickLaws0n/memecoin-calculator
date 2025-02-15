"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export default function QuickCalculator() {
  const [investment, setInvestment] = useState(100)
  const [targetProfit, setTargetProfit] = useState(10)
  const [fees, setFees] = useState({
    platform: 0.3,
    slippage: 5,
    priority: 0.0002,
    bribery: 0,
  })

  const calculateProfit = () => {
    const totalFees = fees.platform + fees.slippage + fees.priority + fees.bribery
    const requiredIncrease = ((targetProfit + totalFees) / (100 - totalFees)) * 100
    const actualProfit = investment * (1 + requiredIncrease / 100) - investment * (1 + totalFees / 100)

    return {
      requiredIncrease: requiredIncrease.toFixed(2),
      actualProfit: actualProfit.toFixed(2),
      feeBreakdown: {
        platform: ((investment * fees.platform) / 100).toFixed(2),
        slippage: ((investment * fees.slippage) / 100).toFixed(2),
        priority: ((investment * fees.priority) / 100).toFixed(2),
        bribery: ((investment * fees.bribery) / 100).toFixed(2),
      },
    }
  }

  const results = calculateProfit()

  return (
    <Card className="w-full max-w-md bg-gray-800 text-white">
      <CardHeader>
        <CardTitle>Quick Profit Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="investment">Investment Amount</Label>
            <Input
              id="investment"
              type="number"
              value={investment}
              onChange={(e) => setInvestment(Number(e.target.value))}
              className="bg-gray-700 text-white"
            />
          </div>
          <div>
            <Label htmlFor="targetProfit">Target Profit (%)</Label>
            <Input
              id="targetProfit"
              type="number"
              value={targetProfit}
              onChange={(e) => setTargetProfit(Number(e.target.value))}
              className="bg-gray-700 text-white"
            />
          </div>
          <div>
            <Label>Platform Fee (%)</Label>
            <Slider
              value={[fees.platform]}
              onValueChange={(value) => setFees({ ...fees, platform: value[0] })}
              max={10}
              step={0.1}
              className="my-2"
            />
            <span>{fees.platform.toFixed(1)}%</span>
          </div>
          <div>
            <Label>Slippage (%)</Label>
            <Slider
              value={[fees.slippage]}
              onValueChange={(value) => setFees({ ...fees, slippage: value[0] })}
              max={20}
              step={0.1}
              className="my-2"
            />
            <span>{fees.slippage.toFixed(1)}%</span>
          </div>
          <div>
            <Label>Priority Fee (%)</Label>
            <Slider
              value={[fees.priority]}
              onValueChange={(value) => setFees({ ...fees, priority: value[0] })}
              max={1}
              step={0.0001}
              className="my-2"
            />
            <span>{fees.priority.toFixed(4)}%</span>
          </div>
          <div>
            <Label>Bribery Fee (%)</Label>
            <Slider
              value={[fees.bribery]}
              onValueChange={(value) => setFees({ ...fees, bribery: value[0] })}
              max={10}
              step={0.1}
              className="my-2"
            />
            <span>{fees.bribery.toFixed(1)}%</span>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Results</h3>
            <p>Required Price Increase: {results.requiredIncrease}%</p>
            <p>Actual Profit: ${results.actualProfit}</p>
            <h4 className="text-md font-semibold mt-2 mb-1">Fee Breakdown:</h4>
            <p>Platform Fee: ${results.feeBreakdown.platform}</p>
            <p>Slippage: ${results.feeBreakdown.slippage}</p>
            <p>Priority Fee: ${results.feeBreakdown.priority}</p>
            <p>Bribery Fee: ${results.feeBreakdown.bribery}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

