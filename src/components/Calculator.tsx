import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Info } from 'lucide-react';

const Calculator = () => {
  const [investment, setInvestment] = useState(100);
  const [targetProfit, setTargetProfit] = useState(50);
  const [fees, setFees] = useState({
    platform: 0.3,
    slippage: 5,
    priority: 0.0002,
    bribery: 0
  });

  // Calculate actual amounts
  const calculateAmounts = () => {
    const platformFeeAmount = investment * (fees.platform / 100);
    const slippageAmount = investment * (fees.slippage / 100);
    const priorityFeeAmount = investment * fees.priority;
    const briberyFeeAmount = investment * fees.bribery;
    const totalFees = platformFeeAmount + slippageAmount + priorityFeeAmount + briberyFeeAmount;
    
    const targetAmount = investment * (1 + targetProfit / 100);
    const requiredAmount = targetAmount + totalFees;
    const requiredIncrease = ((requiredAmount - investment) / investment) * 100;

    return {
      investment,
      platformFeeAmount,
      slippageAmount,
      priorityFeeAmount,
      briberyFeeAmount,
      totalFees,
      targetAmount,
      requiredAmount,
      requiredIncrease
    };
  };

  const amounts = calculateAmounts();

  return (
    <div className="w-full max-w-4xl p-4 space-y-6">
      <Card className="bg-gray-900 text-white">
        <CardHeader>
          <CardTitle>Set Your Limit Order</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4 mb-4">
            <button className="p-2 bg-gray-800 rounded text-center">25%</button>
            <button className="p-2 bg-gray-800 rounded text-center">50%</button>
            <button className="p-2 bg-gray-800 rounded text-center">75%</button>
            <button className="p-2 bg-gray-800 rounded text-center">100%</button>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="text-sm text-gray-400 mb-2">Required Price Increase</div>
            <div className="text-3xl font-bold text-green-400">+{amounts.requiredIncrease.toFixed(2)}%</div>
            <div className="text-sm text-gray-400 mt-2">To achieve {targetProfit}% profit after fees</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Trade Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="p-4 bg-gray-100 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Invested</div>
                    <div className="text-lg font-bold">${amounts.investment.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Target Sell</div>
                    <div className="text-lg font-bold text-green-600">${amounts.targetAmount.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Total Fees</div>
                    <div className="text-lg font-bold text-red-600">${amounts.totalFees.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Actual Profit</div>
                    <div className="text-lg font-bold text-green-600">
                      ${(amounts.targetAmount - amounts.investment - amounts.totalFees).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-semibold">Fee Breakdown</div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Platform Fee</span>
                  <span className="text-red-600">${amounts.platformFeeAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Slippage</span>
                  <span className="text-red-600">${amounts.slippageAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Priority Fee</span>
                  <span className="text-red-600">${amounts.priorityFeeAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Bribery Fee</span>
                  <span className="text-red-600">${amounts.briberyFeeAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Calculator Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              Initial Investment ($)
              <Info className="w-4 h-4 text-gray-400" />
            </label>
            <input 
              type="number" 
              className="w-full p-2 border rounded" 
              value={investment}
              onChange={(e) => setInvestment(Number(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2">
              Target Profit (%)
              <Info className="w-4 h-4 text-gray-400" />
            </label>
            <input 
              type="number" 
              className="w-full p-2 border rounded"
              value={targetProfit}
              onChange={(e) => setTargetProfit(Number(e.target.value))}
            />
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Fee Configuration</h3>
            {Object.entries(fees).map(([feeType, value]) => (
              <div key={feeType} className="space-y-1">
                <label className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    {feeType.charAt(0).toUpperCase() + feeType.slice(1)} Fee {feeType === 'platform' || feeType === 'slippage' ? '(%)' : ''}
                    <Info className="w-4 h-4 text-gray-400" />
                  </span>
                  <span className="text-sm text-gray-500">
                    {feeType === 'platform' && 'Typical: 0.1-1%'}
                    {feeType === 'slippage' && 'Typical: 1-30%'}
                  </span>
                </label>
                <input 
                  type="range" 
                  min={feeType === 'platform' ? 0.1 : feeType === 'slippage' ? 1 : 0}
                  max={feeType === 'platform' ? 1 : feeType === 'slippage' ? 30 : 0.001}
                  step={feeType === 'platform' ? 0.1 : feeType === 'slippage' ? 1 : 0.0001}
                  className="w-full"
                  value={value}
                  onChange={(e) => setFees({...fees, [feeType]: Number(e.target.value)})}
                />
                <div className="text-sm text-right">
                  {feeType === 'platform' || feeType === 'slippage' ? `${value}%` : value}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Calculator;
