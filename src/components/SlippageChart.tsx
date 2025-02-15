import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

interface SlippageChartProps {
  expectedPrice: number
  actualPrice: number
}

export function SlippageChart({ expectedPrice, actualPrice }: SlippageChartProps) {
  const data = [
    { name: "Expected", price: expectedPrice },
    { name: "Actual", price: actualPrice },
  ]

  return (
    <div className="h-40 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

