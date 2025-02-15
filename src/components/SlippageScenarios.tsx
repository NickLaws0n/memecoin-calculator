interface SlippageScenariosProps {
  bestCase: number
  expected: number
  worstCase: number
  currency: string
}

export function SlippageScenarios({ bestCase, expected, worstCase, currency }: SlippageScenariosProps) {
  return (
    <div className="space-y-2">
      <h4 className="font-semibold">Slippage Scenarios</h4>
      <div className="grid grid-cols-3 gap-2 text-sm">
        <div>
          <div className="font-medium">Best Case</div>
          <div className="text-green-600">
            {currency}
            {bestCase.toFixed(2)}
          </div>
        </div>
        <div>
          <div className="font-medium">Expected</div>
          <div className="text-blue-600">
            {currency}
            {expected.toFixed(2)}
          </div>
        </div>
        <div>
          <div className="font-medium">Worst Case</div>
          <div className="text-red-600">
            {currency}
            {worstCase.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  )
}

