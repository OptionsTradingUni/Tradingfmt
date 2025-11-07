import { forwardRef } from "react";

export type TemplateType = 
  | "daily-pl" 
  | "account-summary" 
  | "gain-loss" 
  | "realized-pl" 
  | "position-details"
  | "portfolio-value"
  | "profit-chart"
  | "stock-position"
  | "watchlist-item"
  | "options-position"
  | "day-pl-simple"
  | "brokerage-account"
  | "filled-order";

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
    currentPrice?: string;
    openPL?: string;
    dayRPL?: string;
    marketValue?: string;
    totalCost?: string;
    strikePrice?: string;
    expirationDate?: string;
    contractType?: string;
    filledPrice?: string;
    filledQuantity?: string;
    orderType?: string;
    timePeriod?: string;
  };
}

export const TradingScreenshot = forwardRef<HTMLDivElement, TradingScreenshotProps>(
  ({ template, data }, ref) => {
    const renderTemplate = () => {
      switch (template) {
        case "daily-pl":
          return (
            <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md mx-auto" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
              <h1 className="text-[#2F7D5E] font-semibold mb-12 text-center" style={{ fontSize: '36px', letterSpacing: '-0.01em' }}>
                Daily P&L
              </h1>
              <div className="text-[#2F7D5E] font-bold text-center" style={{ fontSize: '60px', letterSpacing: '-0.03em', lineHeight: '1' }}>
                {data.profit || "11,415"}
              </div>
            </div>
          );

        case "account-summary":
          return (
            <div className="bg-[#1a1a1a] rounded-xl p-6">
              <h2 className="text-white text-lg font-semibold mb-6">{data.accountType || "Roth IRA"}</h2>
              <div className="space-y-4">
                <div className="text-[#888888] text-base">Details</div>
                <div className="flex justify-between items-center py-3 border-b border-[#2a2a2a]">
                  <span className="text-[#cccccc] text-sm">Total value</span>
                  <span className="text-white text-sm">${data.totalValue || "46,316.19"}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-[#2a2a2a]">
                  <span className="text-[#cccccc] text-sm">Shares owned</span>
                  <span className="text-white text-sm">{data.sharesOwned || "1,504.261"}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-[#2a2a2a]">
                  <span className="text-[#cccccc] text-sm">Average cost</span>
                  <span className="text-white text-sm">${data.averageCost || "8.19"}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-[#2a2a2a]">
                  <span className="text-[#cccccc] text-sm">Total gain/loss</span>
                  <span className="text-[#22c55e] text-sm">
                    +${data.totalGain || "34,002.50"} (+{data.percentage || "276.13"}%)
                  </span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-[#cccccc] text-sm">Today's gain/loss</span>
                  <span className="text-[#22c55e] text-sm">
                    +${data.todayGain || "1,188.36"} (+2.63%)
                  </span>
                </div>
              </div>
              <div className="text-[#666666] text-sm mt-6">
                As of {data.date || "Oct-28-2025 1:56 p.m. ET"}
              </div>
            </div>
          );

        case "gain-loss":
          return (
            <div className="bg-white p-6 font-sans">
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
            <div className="bg-black p-6" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
              <div className="flex items-center gap-2 mb-4">
                <button className="text-white text-lg">←</button>
                <h2 className="text-white text-lg" style={{ letterSpacing: '-0.01em' }}>Realized P&L</h2>
              </div>
              <div className="mb-2">
                <div className="text-gray-400 text-xs mb-1" style={{ letterSpacing: '0.01em' }}>{data.date || "Oct-28-2025 1:56 p.m. ET"} Realized P&L ↑</div>
                <div className="text-green-500 font-bold" style={{ fontSize: '44px', letterSpacing: '-0.02em', lineHeight: '1.1' }}>+${data.profit || "11,415"}</div>
                <div className="text-gray-400 text-xs mt-1" style={{ letterSpacing: '0.01em' }}>Range: {data.date || "Oct-28-2025 1:56 p.m. ET"}</div>
              </div>
            </div>
          );

        case "position-details":
          return (
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
          );

        case "portfolio-value":
          return (
            <div className="bg-black p-8" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
              <div className="text-white font-bold mb-4" style={{ fontSize: '56px', letterSpacing: '-0.03em', lineHeight: '1' }}>
                ${data.totalValue || "51,231.80"}
              </div>
              <div className="flex items-center gap-2 text-green-500" style={{ fontSize: '28px', letterSpacing: '-0.01em' }}>
                <span>▲</span>
                <span>${data.todayGain || "30,697.16"} ({data.percentage || "149.49"}%)</span>
                <span className="text-gray-400 ml-2" style={{ fontSize: '24px' }}>{data.timePeriod || "Today"}</span>
              </div>
            </div>
          );

        case "profit-chart":
          return (
            <div className="bg-white p-6 font-sans">
              <div className="flex items-center justify-between mb-4">
                <button className="text-gray-900 text-2xl">←</button>
                <h2 className="text-gray-900 text-xl">Realized profit & loss</h2>
                <button className="text-gray-500 text-2xl">ⓘ</button>
              </div>
              <div className="text-center mb-6">
                <div className="text-gray-500 text-sm mb-1">All ⌄</div>
              </div>
              <div className="flex gap-4 mb-6 justify-center">
                <button className="px-4 py-2 rounded-full bg-gray-100 text-sm">1W</button>
                <button className="px-4 py-2 rounded-full bg-gray-100 text-sm">1M</button>
                <button className="px-4 py-2 rounded-full bg-gray-100 text-sm">3M</button>
                <button className="px-4 py-2 rounded-full bg-gray-900 text-white text-sm font-semibold">YTD</button>
                <button className="px-4 py-2 rounded-full bg-gray-100 text-sm">MAX</button>
                <button className="text-gray-500">☰</button>
              </div>
              <div className="mb-6">
                <div className="text-gray-900 text-4xl font-bold mb-2">
                  +${data.profit || "58,032.91"}
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <span>▲ {data.percentage || "17.72"}%</span>
                  <span className="text-gray-500">{data.timePeriod || "Year to date"}</span>
                </div>
              </div>
              <div className="relative h-64 flex items-end justify-between gap-1">
                {[60, 120, 40, 50, 35, 45, 55, 70, 180, 90, 100, 110, 80, 85, 90, 140].map((height, i) => (
                  <div key={i} className="flex-1 flex items-end">
                    <div 
                      className={height > 50 ? "bg-green-500 w-full" : "bg-red-500 w-full"} 
                      style={{ height: `${height}px` }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          );

        case "stock-position":
          return (
            <div className="bg-black p-6 font-sans">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-bold">
                  {data.symbol ? data.symbol.charAt(0) : "S"}
                </div>
                <div>
                  <h2 className="text-white text-xl font-bold">{data.symbol || "STOCK"}</h2>
                  <p className="text-gray-400 text-xs">{data.accountType || "Company Name"}</p>
                </div>
              </div>
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-gray-400 text-sm">Open P&L(USD)</p>
                  <p className="text-green-400 text-xl font-bold">+${data.profit || "93,235.48"} +{data.percentage || "8.92"}%</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-xs">Market Value</p>
                    <p className="text-white text-base">${data.marketValue || "1,138,176.52"}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">Total Cost</p>
                    <p className="text-white text-base">${data.totalCost || "1,044,941.04"}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">Quantity</p>
                    <p className="text-white text-base">{data.quantity || "175,916"}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">Position Ratio ⓘ</p>
                    <p className="text-white text-base">{data.percentage || "100.00"}%</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">Last Price</p>
                    <p className="text-white text-base">${data.currentPrice || "6.47"}</p>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-800 pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-green-400">Bid</span>
                  <span className="text-white">100</span>
                  <span className="text-white">{data.currentPrice || "6.38"}</span>
                  <span className="text-red-400">{data.currentPrice || "6.47"}</span>
                  <span className="text-white">1,200</span>
                  <span className="text-red-400">Ask</span>
                </div>
                <div className="relative h-2 bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 rounded"></div>
              </div>
              <div className="mt-6">
                <h3 className="text-white mb-3">Filled Records</h3>
                <p className="text-gray-400 text-sm mb-2">Display only transaction records from the last 3 years.</p>
                <div className="border-t border-gray-800 pt-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-green-400 text-lg">Buy</p>
                      <p className="text-white">{data.quantity || "175,916"}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white text-lg">{data.averageCost || "5.94"}</p>
                      <p className="text-white">{data.totalCost || "1,044,941.04"}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white">{data.date || "11/05/2025"}</p>
                      <p className="text-gray-400">18:15:42 EST</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );

        case "watchlist-item":
          return (
            <div className="bg-black p-4 font-sans">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-white">
                    <div className="flex items-center gap-2">
                      <span className="text-white text-xl font-bold">{data.symbol || "STOCK"}</span>
                      <span className="bg-pink-600 text-white text-xs px-1.5 py-0.5 rounded">24</span>
                    </div>
                    <p className="text-gray-400 text-sm">{data.accountType || "COMPANY NAME..."}</p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-white text-xl">{data.currentPrice || "657.97"}</p>
                </div>
                <div className="text-right">
                  <p className="text-white text-xl">${data.openPL || "0.00"}</p>
                  <p className="text-green-500 text-lg">${data.dayRPL || "2,801.00"}</p>
                </div>
              </div>
            </div>
          );

        case "options-position":
          return (
            <div className="bg-white p-6 font-sans">
              <div className="border-b pb-4 mb-4">
                <p className="text-gray-500 text-sm mb-2">Your position</p>
                <h2 className="text-gray-900 text-2xl font-bold mb-4">{data.symbol || "STOCK"} ${data.strikePrice || "1,000"} Call {data.expirationDate || "11/21"}</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 mb-1">Contracts</p>
                    <p className="text-gray-900 text-xl">{data.quantity || "+40"}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Current price</p>
                    <p className="text-gray-900 text-xl">${data.currentPrice || "37.68"}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Average cost</p>
                    <p className="text-gray-900 text-xl">${data.averageCost || "10.11"}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Market value</p>
                    <p className="text-gray-900 text-xl">${data.marketValue || "150,720.00"}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Date bought</p>
                    <p className="text-gray-900">{data.date || "11/4"}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Expiration date</p>
                    <p className="text-gray-900">{data.expirationDate || "11/7"}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">{data.symbol || "STOCK"} breakeven price</p>
                    <p className="text-gray-900">${data.strikePrice || "930.15"}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Current {data.symbol || "STOCK"} price</p>
                    <p className="text-gray-900">${data.currentPrice || "952.14"}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-600 mb-2">Today's return</p>
                    <p className="text-green-600 text-2xl font-bold">+${data.todayGain || "94,120.00"} (+{data.percentage || "166.29"}%)</p>
                  </div>
                  <div className="col-span-2 border-t pt-4">
                    <p className="text-gray-600 mb-2">Total return</p>
                    <p className="text-green-600 text-2xl font-bold">+${data.profit || "110,270.00"} (+{data.percentage || "272.61"}%)</p>
                  </div>
                </div>
              </div>
              <button className="w-full flex items-center justify-between text-gray-900 py-3">
                <span className="flex items-center gap-2">
                  <span className="text-2xl">📈</span>
                  <span>Simulate my returns</span>
                </span>
                <span>›</span>
              </button>
            </div>
          );

        case "day-pl-simple":
          return (
            <div className="bg-white p-6 font-sans">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600 mb-1">Open PL</p>
                  <p className="text-gray-900 text-3xl font-bold">${data.openPL || "0.00"}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600 mb-1">Day RPL</p>
                  <p className="text-green-600 text-3xl font-bold">${data.dayRPL || "903.00"}</p>
                </div>
              </div>
            </div>
          );

        case "brokerage-account":
          return (
            <div className="bg-black p-6 font-sans">
              <div className="border-b border-gray-800 pb-4 mb-4">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-4">
                    <button className="text-white border-b-2 border-white pb-2">{data.accountType || "Bob"}</button>
                    <button className="text-gray-500 pb-2">Roth IRA</button>
                    <button className="text-gray-500 pb-2">Joint</button>
                    <button className="text-gray-500 pb-2">Strategies</button>
                    <button className="text-gray-500 pb-2">Add ⊕</button>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="text-white text-5xl font-bold mb-2">
                    ${data.totalValue || "8,001.98"}
                  </div>
                  <div className="flex items-center gap-2 text-green-500">
                    <span>▲ ${data.todayGain || "8,383.47"} ({data.percentage || "46,523.13"}%) Today</span>
                  </div>
                </div>
                <button className="bg-yellow-200 text-black px-6 py-2 rounded-full font-semibold">
                  Gold
                </button>
              </div>
              <div className="relative h-64 mb-6">
                <svg viewBox="0 0 400 200" className="w-full h-full">
                  <path
                    d="M 0 200 L 50 180 L 100 160 L 150 140 L 200 30 L 250 60 L 300 50 L 350 40 L 400 45"
                    stroke="#22c55e"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>
              <div className="flex gap-4 justify-center mb-6">
                <button className="bg-green-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold">1D</button>
                <button className="text-gray-400 px-4 py-1.5 text-sm">1W</button>
                <button className="text-gray-400 px-4 py-1.5 text-sm">1M</button>
                <button className="text-gray-400 px-4 py-1.5 text-sm">3M</button>
                <button className="text-gray-400 px-4 py-1.5 text-sm">YTD</button>
                <button className="text-gray-400 px-4 py-1.5 text-sm">1Y</button>
                <button className="text-gray-400 px-4 py-1.5 text-sm">ALL</button>
                <button className="text-gray-400">⚙</button>
              </div>
              <div className="border-t border-gray-800 pt-4">
                <button className="w-full flex items-center justify-between text-white py-3">
                  <span>Buying power</span>
                  <div className="flex items-center gap-2">
                    <span>${data.totalValue || "186.74"}</span>
                    <span>›</span>
                  </div>
                </button>
              </div>
            </div>
          );

        case "filled-order":
          return (
            <div className="bg-white p-6 font-sans">
              <div className="border-b pb-4 mb-4">
                <button className="text-gray-900 text-xl mb-4">‹</button>
                <h2 className="text-gray-900 text-xl font-bold mb-2">Filled order</h2>
                <h3 className="text-gray-900 text-2xl font-semibold mb-4">
                  {data.orderType || "Sell"} {data.symbol || "STOCK"} {data.strikePrice || "6765"} Call {data.expirationDate || "11/6"}
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Type</p>
                    <p className="text-gray-900 font-semibold">{data.contractType || "Limit sell"}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Position effect</p>
                    <p className="text-gray-900 font-semibold">Close</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Time in force</p>
                    <p className="text-gray-900 font-semibold">Good for day</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Submitted</p>
                    <p className="text-gray-900 font-semibold">{data.date || "11/6, 1:04 PM CST"}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Quantity</p>
                    <p className="text-gray-900 font-semibold">{data.quantity || "3"}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Filled quantity</p>
                    <p className="text-gray-900 font-semibold">{data.filledQuantity || "3 contracts at $1.85"}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Filled</p>
                    <p className="text-gray-900 font-semibold">{data.date || "11/6, 1:04 PM CST"}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Limit price</p>
                    <p className="text-gray-900 font-semibold">${data.filledPrice || "1.85"}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Est credit</p>
                    <p className="text-gray-900 font-semibold">${data.proceeds || "552.06"}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Est reg and exchange fees</p>
                    <p className="text-gray-900 font-semibold">${data.costBasis || "1.89"}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Contract fee</p>
                    <p className="text-gray-900 font-semibold">$1.05</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Realized profit</p>
                    <p className="text-green-600 font-bold text-lg">+${data.profit || "165.00"} ›</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Gold savings</p>
                    <p className="text-yellow-600 font-semibold">$0.45 🪙</p>
                  </div>
                </div>
              </div>
              <button className="w-full flex items-center justify-between text-gray-900 py-3 border-b">
                <span>View {data.symbol || "STOCK"} options</span>
                <span>›</span>
              </button>
              <button className="w-full flex items-center justify-between text-gray-900 py-3">
                <span>View {data.symbol || "STOCK"}</span>
                <span>›</span>
              </button>
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
