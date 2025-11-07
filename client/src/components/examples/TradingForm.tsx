import { useState } from 'react';
import { TradingForm, type TradingFormData } from '../TradingForm';

export default function TradingFormExample() {
  const [data, setData] = useState<TradingFormData>({
    template: "daily-pl",
    profit: "11,415",
    percentage: "30.69",
    accountType: "ROTH IRA",
    totalValue: "46,316.19",
    sharesOwned: "1,504.261",
    averageCost: "8.19",
    totalGain: "34,002.50",
    todayGain: "1,188.36",
    date: "Oct-28-2025 1:56 p.m. ET",
    proceeds: "21,055.01",
    costBasis: "14,592.49"
  });

  return (
    <div className="max-w-md p-4">
      <TradingForm data={data} onChange={setData} />
    </div>
  );
}
