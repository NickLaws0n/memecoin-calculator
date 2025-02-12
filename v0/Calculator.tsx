import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Info } from 'lucide-react';

export default function Calculator() {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      <Card className="bg-gray-900 text-white">
        <CardHeader>
          <CardTitle>Required Price Increase</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-green-400">+65.3%</div>
            <div className="text-sm text-gray-400 mt-2">To achieve 50% profit after fees</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Investment Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-100 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600">Investment</div>
                  <div className="text-lg font-bold">$100.00</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Target</div>
                  <div className="text-lg font-bold text-green-600">$150.00</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Fees</div>
                  <div className="text-lg font-bold text-red-600">$15.30</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Net Profit</div>
                  <div className="text-lg font-bold text-green-600">$34.70</div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-semibold">Fee Breakdown</div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Platform Fee (0.3%)</span>
                  <span className="text-red-600">$0.30</span>
                </div>
                <div className="flex justify-between">
                  <span>Slippage (5%)</span>
                  <span className="text-red-600">$15.00</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
