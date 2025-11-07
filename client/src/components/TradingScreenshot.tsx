import { forwardRef } from "react";

export type TemplateType = "daily-pl" | "account-summary" | "gain-loss" | "realized-pl" | "position-details";

export interface TradingScreenshotProps {
  template: TemplateType;
  data: {
    profit?: string;
    percentage?: string;
    accountType?: string;
    totalValue?: string;
    sharesOwned?: string;
    averageCost?: string;
    totalGain?: string;
    todayGain?: string;
    date?: string;
    proceeds?: string;
    costBasis?: string;
    symbol?: string;
    quantity?: string;
  };
}

export const TradingScreenshot = forwardRef<HTMLDivElement, TradingScreenshotProps>(
  ({ template, data }, ref) => {
    const renderTemplate = () => {
      switch (template) {
        case "daily-pl":
          return (
            <div className="bg-[#1a1a1a] w-[600px] min-h-[400px] p-8 font-sans">
              <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md mx-auto">
                <h1 className="text-[#2F7D5E] text-4xl font-semibold mb-12 text-center">
                  Daily P&L
                </h1>
                <div className="text-[#2F7D5E] text-6xl font-bold text-center tracking-tight">
                  {data.profit || "11,415"}
                </div>
              </div>
            </div>
          );

        case "account-summary":
          return (
            <div className="bg-black w-[600px] min-h-[400px] p-6 font-sans">
              <div className="bg-[#1a1a1a] rounded-xl p-6">
                <h2 className="text-white text-2xl font-bold mb-6">{data.accountType || "ROTH IRA"}</h2>
                <div className="space-y-4">
                  <div className="text-[#888888] text-base">Details</div>
                  <div className="flex justify-between items-center py-3 border-b border-[#2a2a2a]">
                    <span className="text-[#cccccc] text-lg">Total value</span>
                    <span className="text-white text-lg font-semibold">${data.totalValue || "46,316.19"}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-[#2a2a2a]">
                    <span className="text-[#cccccc] text-lg">Shares owned</span>
                    <span className="text-white text-lg font-semibold">{data.sharesOwned || "1,504.261"}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-[#2a2a2a]">
                    <span className="text-[#cccccc] text-lg">Average cost</span>
                    <span className="text-white text-lg font-semibold">${data.averageCost || "8.19"}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-[#2a2a2a]">
                    <span className="text-[#cccccc] text-lg">Total gain/loss</span>
                    <span className="text-[#22c55e] text-lg font-semibold">
                      +${data.totalGain || "34,002.50"} (+{data.percentage || "276.13"}%)
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-[#cccccc] text-lg">Today's gain/loss</span>
                    <span className="text-[#22c55e] text-lg font-semibold">
                      +${data.todayGain || "1,188.36"} (+2.63%)
                    </span>
                  </div>
                </div>
                <div className="text-[#666666] text-sm mt-6">
                  As of {data.date || "Oct-28-2025 1:56 p.m. ET"}
                </div>
              </div>
            </div>
          );

        case "gain-loss":
          return (
            <div className="bg-white w-[600px] min-h-[500px] p-6 font-sans">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">Gain/Loss Summary</h2>
                <button className="text-gray-500">▲</button>
              </div>
              <div className="space-y-6">
                <div>
                  <div className="text-sm font-semibold text-gray-700 mb-2">Reporting Period</div>
                  <div className="text-2xl font-bold text-gray-900">{data.date || "11/06/2025 to 11/06/2025"}</div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Total Proceeds</div>
                    <div className="text-xl font-semibold text-gray-900">${data.proceeds || "21,055.01"}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Total Cost Basis</div>
                    <div className="text-xl font-semibold text-gray-900">${data.costBasis || "14,592.49"}</div>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="text-lg font-bold text-gray-900 mb-4">Gain/Loss</div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Long Term</span>
                      <span className="text-gray-900 font-semibold">$0.00 (N/A)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Short Term</span>
                      <span className="text-green-600 font-bold">
                        +${data.profit || "6,462.52"} (+{data.percentage || "30.69"}%)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Net Gain</span>
                    <span className="text-green-600 text-xl font-bold">
                      +${data.profit || "6,462.52"} (+{data.percentage || "30.69"}%)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );

        case "realized-pl":
          return (
            <div className="bg-black w-[600px] min-h-[200px] p-6 font-sans">
              <div className="flex items-center gap-2 mb-4">
                <button className="text-white">←</button>
                <h2 className="text-white text-xl font-semibold">Realized P&L</h2>
              </div>
              <div className="mb-2">
                <div className="text-gray-400 text-sm mb-1">{data.date || "11/01/2025 - 11/05/2025"} Realized P&L ↑</div>
                <div className="text-green-500 text-4xl font-bold">+${data.profit || "51,985.83"}</div>
                <div className="text-gray-400 text-sm">Range: {data.date || "11/01/2025 - 11/05/2025"}</div>
              </div>
            </div>
          );

        case "position-details":
          return (
            <div className="bg-[#0a0a0a] w-[600px] min-h-[400px] p-6 font-sans">
              <div className="bg-[#1a1a1a] rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-br from-purple-500 to-blue-500 w-12 h-12 rounded-lg"></div>
                    <div className="text-white text-xl font-bold">Today</div>
                  </div>
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                  <div className="text-green-400 text-2xl">▲</div>
                  <div className="text-green-400 text-4xl font-bold">${data.profit || "8,928.80"}</div>
                </div>
                <div className="text-gray-400 text-sm mb-6">
                  {data.accountType || "Investing"} / {data.accountType || "Roth IRA"} / Credit Card
                </div>
              </div>
            </div>
          );

        default:
          return null;
      }
    };

    return <div ref={ref}>{renderTemplate()}</div>;
  }
);

TradingScreenshot.displayName = "TradingScreenshot";
