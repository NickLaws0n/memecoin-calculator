import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { InfoIcon } from "lucide-react"

interface SlippageInputProps {
  slippage: number
  setSlippage: (value: number) => void
}

export function SlippageInput({ slippage, setSlippage }: SlippageInputProps) {
  const presetValues = [-50, -10, 0, 10, 50]

  const getSlippageImpact = (value: number) => {
    const absValue = Math.abs(value)
    if (absValue <= 10) return { color: "text-green-500", text: "LOW" }
    if (absValue <= 50) return { color: "text-yellow-500", text: "MEDIUM" }
    return { color: "text-red-500", text: "HIGH" }
  }

  const impact = getSlippageImpact(slippage)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="flex items-center text-xl">
          SLIPPAGE (%)
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="h-4 w-4 ml-2 cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent className="bg-secondary text-secondary-foreground p-2 max-w-xs">
                <p>
                  Slippage is the difference between the expected price of a trade and the price at which the trade is
                  executed. It can range from -100% (complete loss) to +100% (double the expected price). Positive
                  slippage is favorable, negative is unfavorable.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Label>
        <span className={`font-bold ${impact.color}`}>{impact.text} IMPACT</span>
      </div>
      <div className="flex items-center space-x-2">
        <Slider
          value={[slippage]}
          onValueChange={(value) => setSlippage(value[0])}
          min={-100}
          max={100}
          step={1}
          className="flex-grow"
        />
        <span className={`w-16 text-right font-bold ${slippage >= 0 ? "text-green-500" : "text-red-500"}`}>
          {slippage >= 0 ? "+" : ""}
          {slippage.toFixed(1)}%
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {presetValues.map((value) => (
          <Button
            key={value}
            variant="outline"
            size="sm"
            onClick={() => setSlippage(value)}
            className={`
              ${slippage === value ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}
              border-border hover:bg-primary/80
              ${value < 0 ? "text-red-500" : value > 0 ? "text-green-500" : "text-secondary-foreground"}
            `}
          >
            {value >= 0 ? "+" : ""}
            {value}%
          </Button>
        ))}
      </div>
    </div>
  )
}

