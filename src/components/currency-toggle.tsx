import { Button } from "@/components/ui/button"
import { RefreshCcw } from "lucide-react"

interface CurrencyToggleProps {
  currency: "USD" | "SOL"
  onToggle: () => void
  onRefresh?: () => void
}

export function CurrencyToggle({ currency, onToggle, onRefresh }: CurrencyToggleProps) {
  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm" onClick={onToggle} className="text-white hover:text-white hover:bg-gray-700">
        {currency}
      </Button>
      {onRefresh && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onRefresh}
          className="text-white hover:text-white hover:bg-gray-700"
        >
          <RefreshCcw className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}

