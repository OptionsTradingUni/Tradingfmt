import { TradingScreenshot } from '../TradingScreenshot';

export default function TradingScreenshotExample() {
  return (
    <div className="space-y-4">
      <TradingScreenshot
        template="daily-pl"
        data={{ profit: "11,415" }}
      />
      <TradingScreenshot
        template="account-summary"
        data={{
          accountType: "ROTH IRA",
          totalValue: "46,316.19",
          sharesOwned: "1,504.261",
          averageCost: "8.19",
          totalGain: "34,002.50",
          percentage: "276.13",
          todayGain: "1,188.36"
        }}
      />
    </div>
  );
}
