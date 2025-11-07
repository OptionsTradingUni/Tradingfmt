import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import type { TemplateType } from "./TradingScreenshot";

export interface TradingFormData {
  template: TemplateType;
  profit: string;
  percentage: string;
  accountType: string;
  totalValue: string;
  sharesOwned: string;
  averageCost: string;
  totalGain: string;
  todayGain: string;
  date: string;
  proceeds: string;
  costBasis: string;
  symbol: string;
  quantity: string;
  currentPrice: string;
  openPL: string;
  dayRPL: string;
  marketValue: string;
  totalCost: string;
  strikePrice: string;
  expirationDate: string;
  contractType: string;
  filledPrice: string;
  filledQuantity: string;
  orderType: string;
  timePeriod: string;
}

interface TradingFormProps {
  data: TradingFormData;
  onChange: (data: TradingFormData) => void;
}

const TEMPLATE_OPTIONS = [
  { value: "daily-pl", label: "Daily P&L Card" },
  { value: "account-summary", label: "Account Summary" },
  { value: "gain-loss", label: "Gain/Loss Report" },
  { value: "realized-pl", label: "Realized P&L" },
  { value: "position-details", label: "Position Details" },
  { value: "portfolio-value", label: "Portfolio Value" },
  { value: "profit-chart", label: "Profit Chart" },
  { value: "stock-position", label: "Stock Position" },
  { value: "watchlist-item", label: "Watchlist Item" },
  { value: "options-position", label: "Options Position" },
  { value: "day-pl-simple", label: "Day P&L Simple" },
  { value: "brokerage-account", label: "Brokerage Account" },
  { value: "filled-order", label: "Filled Order" },
];

export function TradingForm({ data, onChange }: TradingFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const updateField = (field: keyof TradingFormData, value: string) => {
    const updatedData = { ...data, [field]: value };
    
    // Auto-calculate related fields based on what was updated
    const parseNum = (str: string) => parseFloat(str.replace(/,/g, "")) || 0;
    
    // Calculate profit and percentage from proceeds and cost basis
    if ((field === "proceeds" || field === "costBasis") && data.template === "gain-loss") {
      const proceeds = field === "proceeds" ? parseNum(value) : parseNum(data.proceeds);
      const costBasis = field === "costBasis" ? parseNum(value) : parseNum(data.costBasis);
      
      if (proceeds && costBasis) {
        const profit = proceeds - costBasis;
        const percentage = ((profit / costBasis) * 100).toFixed(2);
        updatedData.profit = profit.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        updatedData.percentage = percentage;
      }
    }
    
    // Calculate market value from quantity and current price
    if ((field === "quantity" || field === "currentPrice") && data.template === "stock-position") {
      const quantity = field === "quantity" ? parseNum(value) : parseNum(data.quantity);
      const currentPrice = field === "currentPrice" ? parseNum(value) : parseNum(data.currentPrice);
      
      if (quantity && currentPrice) {
        updatedData.marketValue = (quantity * currentPrice).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      }
    }
    
    // Calculate total cost from quantity and average cost
    if ((field === "quantity" || field === "averageCost") && (data.template === "stock-position" || data.template === "account-summary")) {
      const quantity = field === "quantity" ? parseNum(value) : parseNum(data.quantity);
      const averageCost = field === "averageCost" ? parseNum(value) : parseNum(data.averageCost);
      
      if (quantity && averageCost) {
        updatedData.totalCost = (quantity * averageCost).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      }
    }
    
    // Calculate profit from market value and total cost
    if ((field === "marketValue" || field === "totalCost") && data.template === "stock-position") {
      const marketValue = field === "marketValue" ? parseNum(value) : parseNum(data.marketValue);
      const totalCost = field === "totalCost" ? parseNum(value) : parseNum(data.totalCost);
      
      if (marketValue && totalCost) {
        const profit = marketValue - totalCost;
        const percentage = ((profit / totalCost) * 100).toFixed(2);
        updatedData.profit = profit.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        updatedData.percentage = percentage;
      }
    }
    
    // Calculate options position values
    if (data.template === "options-position") {
      const quantity = parseNum(field === "quantity" ? value : data.quantity);
      const currentPrice = parseNum(field === "currentPrice" ? value : data.currentPrice);
      const averageCost = parseNum(field === "averageCost" ? value : data.averageCost);
      
      if (quantity && currentPrice) {
        updatedData.marketValue = (quantity * currentPrice * 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      }
      
      if (quantity && averageCost && currentPrice) {
        const totalCost = quantity * averageCost * 100;
        const marketValue = quantity * currentPrice * 100;
        const profit = marketValue - totalCost;
        const percentage = ((profit / totalCost) * 100).toFixed(2);
        updatedData.profit = profit.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        updatedData.percentage = percentage;
      }
    }
    
    // Calculate filled order profit
    if (data.template === "filled-order") {
      const proceeds = parseNum(field === "proceeds" ? value : data.proceeds);
      const costBasis = parseNum(field === "costBasis" ? value : data.costBasis);
      
      if (proceeds && costBasis) {
        const profit = proceeds - costBasis;
        updatedData.profit = profit.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      }
    }
    
    onChange(updatedData);
  };

  const fetchStockPrice = async () => {
    if (!data.symbol) {
      toast({
        title: "Missing Symbol",
        description: "Please enter a stock symbol first",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/stock/${data.symbol}`);
      const stockData = await response.json();

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Symbol "${data.symbol.toUpperCase()}" not found. Please check the symbol and try again. Common symbols: AAPL, TSLA, SPY, META, GOOGL`);
        }
        throw new Error(stockData.error || "Failed to fetch stock data");
      }

      const price = parseFloat(stockData.currentPrice);
      const absPercentage = Math.abs(parseFloat(stockData.changePercent));
      
      // Calculate market value and total cost if quantity is provided
      let marketValue = data.marketValue;
      let totalCost = data.totalCost;
      let averageCost = data.averageCost;
      
      if (data.quantity && data.quantity !== "") {
        const qty = parseFloat(data.quantity.replace(/,/g, ""));
        if (!isNaN(qty)) {
          marketValue = (price * qty).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          
          // If average cost is provided, calculate total cost
          if (data.averageCost && data.averageCost !== "") {
            const avgCost = parseFloat(data.averageCost.replace(/,/g, ""));
            if (!isNaN(avgCost)) {
              totalCost = (avgCost * qty).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            }
          }
        }
      }

      // Auto-fill current price and calculated values
      onChange({
        ...data,
        currentPrice: stockData.currentPrice,
        percentage: absPercentage.toFixed(2),
        marketValue,
        totalCost,
      });

      toast({
        title: "Price Updated!",
        description: `${stockData.symbol}: $${stockData.currentPrice} (${stockData.changePercent > 0 ? '+' : ''}${stockData.changePercent}%)`,
      });
    } catch (error) {
      toast({
        title: "Stock Fetch Failed",
        description: error instanceof Error ? error.message : "Failed to fetch stock price. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getRelevantFields = () => {
    switch (data.template) {
      case "daily-pl":
        return ["profit"];
      case "account-summary":
        return ["accountType", "totalValue", "sharesOwned", "averageCost", "totalGain", "percentage", "todayGain", "date"];
      case "gain-loss":
        return ["date", "proceeds", "costBasis", "profit", "percentage"];
      case "realized-pl":
        return ["profit", "date"];
      case "position-details":
        return ["profit", "accountType"];
      case "portfolio-value":
        return ["totalValue", "todayGain", "percentage", "timePeriod"];
      case "profit-chart":
        return ["profit", "percentage", "timePeriod"];
      case "stock-position":
        return ["symbol", "accountType", "profit", "percentage", "marketValue", "totalCost", "quantity", "currentPrice", "averageCost", "date"];
      case "watchlist-item":
        return ["symbol", "accountType", "currentPrice", "openPL", "dayRPL"];
      case "options-position":
        return ["symbol", "strikePrice", "expirationDate", "quantity", "currentPrice", "averageCost", "marketValue", "date", "todayGain", "profit", "percentage"];
      case "day-pl-simple":
        return ["openPL", "dayRPL"];
      case "brokerage-account":
        return ["accountType", "totalValue", "todayGain", "percentage"];
      case "filled-order":
        return ["orderType", "symbol", "strikePrice", "expirationDate", "contractType", "date", "quantity", "filledQuantity", "filledPrice", "proceeds", "costBasis", "profit"];
      default:
        return [];
    }
  };

  const relevantFields = getRelevantFields();

  return (
    <div className="space-y-6" data-testid="form-trading">
      <div className="space-y-2">
        <Label htmlFor="template" data-testid="label-template">Template</Label>
        <Select
          value={data.template}
          onValueChange={(value) => updateField('template', value as TemplateType)}
        >
          <SelectTrigger id="template" data-testid="select-template">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {TEMPLATE_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {relevantFields.includes("profit") && (
        <div className="space-y-2">
          <Label htmlFor="profit" data-testid="label-profit">Profit/Loss Amount</Label>
          <Input
            id="profit"
            data-testid="input-profit"
            value={data.profit}
            onChange={(e) => updateField('profit', e.target.value)}
            placeholder="e.g., 11,415"
          />
        </div>
      )}

      {relevantFields.includes("percentage") && (
        <div className="space-y-2">
          <Label htmlFor="percentage" data-testid="label-percentage">Percentage</Label>
          <Input
            id="percentage"
            data-testid="input-percentage"
            value={data.percentage}
            onChange={(e) => updateField('percentage', e.target.value)}
            placeholder="e.g., 30.69"
          />
        </div>
      )}

      {relevantFields.includes("accountType") && (
        <div className="space-y-2">
          <Label htmlFor="accountType" data-testid="label-account-type">Account Type</Label>
          <Input
            id="accountType"
            data-testid="input-account-type"
            value={data.accountType}
            onChange={(e) => updateField('accountType', e.target.value)}
            placeholder="e.g., ROTH IRA"
          />
        </div>
      )}

      {relevantFields.includes("totalValue") && (
        <div className="space-y-2">
          <Label htmlFor="totalValue" data-testid="label-total-value">Total Value</Label>
          <Input
            id="totalValue"
            data-testid="input-total-value"
            value={data.totalValue}
            onChange={(e) => updateField('totalValue', e.target.value)}
            placeholder="e.g., 46,316.19"
          />
        </div>
      )}

      {relevantFields.includes("sharesOwned") && (
        <div className="space-y-2">
          <Label htmlFor="sharesOwned" data-testid="label-shares-owned">Shares Owned</Label>
          <Input
            id="sharesOwned"
            data-testid="input-shares-owned"
            value={data.sharesOwned}
            onChange={(e) => updateField('sharesOwned', e.target.value)}
            placeholder="e.g., 1,504.261"
          />
        </div>
      )}

      {relevantFields.includes("averageCost") && (
        <div className="space-y-2">
          <Label htmlFor="averageCost" data-testid="label-average-cost">Average Cost</Label>
          <Input
            id="averageCost"
            data-testid="input-average-cost"
            value={data.averageCost}
            onChange={(e) => updateField('averageCost', e.target.value)}
            placeholder="e.g., 8.19"
          />
        </div>
      )}

      {relevantFields.includes("totalGain") && (
        <div className="space-y-2">
          <Label htmlFor="totalGain" data-testid="label-total-gain">Total Gain</Label>
          <Input
            id="totalGain"
            data-testid="input-total-gain"
            value={data.totalGain}
            onChange={(e) => updateField('totalGain', e.target.value)}
            placeholder="e.g., 34,002.50"
          />
        </div>
      )}

      {relevantFields.includes("todayGain") && (
        <div className="space-y-2">
          <Label htmlFor="todayGain" data-testid="label-today-gain">Today's Gain</Label>
          <Input
            id="todayGain"
            data-testid="input-today-gain"
            value={data.todayGain}
            onChange={(e) => updateField('todayGain', e.target.value)}
            placeholder="e.g., 1,188.36"
          />
        </div>
      )}

      {relevantFields.includes("date") && (
        <div className="space-y-2">
          <Label htmlFor="date" data-testid="label-date">Date</Label>
          <Input
            id="date"
            data-testid="input-date"
            value={data.date}
            onChange={(e) => updateField('date', e.target.value)}
            placeholder="e.g., 11/06/2025"
          />
        </div>
      )}

      {relevantFields.includes("proceeds") && (
        <div className="space-y-2">
          <Label htmlFor="proceeds" data-testid="label-proceeds">Total Proceeds</Label>
          <Input
            id="proceeds"
            data-testid="input-proceeds"
            value={data.proceeds}
            onChange={(e) => updateField('proceeds', e.target.value)}
            placeholder="e.g., 21,055.01"
          />
        </div>
      )}

      {relevantFields.includes("costBasis") && (
        <div className="space-y-2">
          <Label htmlFor="costBasis" data-testid="label-cost-basis">Total Cost Basis</Label>
          <Input
            id="costBasis"
            data-testid="input-cost-basis"
            value={data.costBasis}
            onChange={(e) => updateField('costBasis', e.target.value)}
            placeholder="e.g., 14,592.49"
          />
        </div>
      )}

      {relevantFields.includes("symbol") && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="symbol" data-testid="label-symbol">Stock Symbol</Label>
            <Button
              size="sm"
              variant="outline"
              onClick={fetchStockPrice}
              disabled={isLoading}
              data-testid="button-fetch-price"
            >
              <RefreshCw className={`w-3 h-3 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
              Fetch Price
            </Button>
          </div>
          <Input
            id="symbol"
            data-testid="input-symbol"
            value={data.symbol}
            onChange={(e) => updateField('symbol', e.target.value)}
            placeholder="e.g., META, AAPL, SPY"
          />
        </div>
      )}

      {relevantFields.includes("quantity") && (
        <div className="space-y-2">
          <Label htmlFor="quantity" data-testid="label-quantity">Quantity/Contracts</Label>
          <Input
            id="quantity"
            data-testid="input-quantity"
            value={data.quantity}
            onChange={(e) => updateField('quantity', e.target.value)}
            placeholder="e.g., 175,916 or 40"
          />
        </div>
      )}

      {relevantFields.includes("currentPrice") && (
        <div className="space-y-2">
          <Label htmlFor="currentPrice" data-testid="label-current-price">Current Price</Label>
          <Input
            id="currentPrice"
            data-testid="input-current-price"
            value={data.currentPrice}
            onChange={(e) => updateField('currentPrice', e.target.value)}
            placeholder="e.g., 657.97"
          />
        </div>
      )}

      {relevantFields.includes("openPL") && (
        <div className="space-y-2">
          <Label htmlFor="openPL" data-testid="label-open-pl">Open P&L</Label>
          <Input
            id="openPL"
            data-testid="input-open-pl"
            value={data.openPL}
            onChange={(e) => updateField('openPL', e.target.value)}
            placeholder="e.g., 0.00"
          />
        </div>
      )}

      {relevantFields.includes("dayRPL") && (
        <div className="space-y-2">
          <Label htmlFor="dayRPL" data-testid="label-day-rpl">Day Realized P&L</Label>
          <Input
            id="dayRPL"
            data-testid="input-day-rpl"
            value={data.dayRPL}
            onChange={(e) => updateField('dayRPL', e.target.value)}
            placeholder="e.g., 903.00"
          />
        </div>
      )}

      {relevantFields.includes("marketValue") && (
        <div className="space-y-2">
          <Label htmlFor="marketValue" data-testid="label-market-value">Market Value</Label>
          <Input
            id="marketValue"
            data-testid="input-market-value"
            value={data.marketValue}
            onChange={(e) => updateField('marketValue', e.target.value)}
            placeholder="e.g., 1,138,176.52"
          />
        </div>
      )}

      {relevantFields.includes("totalCost") && (
        <div className="space-y-2">
          <Label htmlFor="totalCost" data-testid="label-total-cost">Total Cost</Label>
          <Input
            id="totalCost"
            data-testid="input-total-cost"
            value={data.totalCost}
            onChange={(e) => updateField('totalCost', e.target.value)}
            placeholder="e.g., 1,044,941.04"
          />
        </div>
      )}

      {relevantFields.includes("strikePrice") && (
        <div className="space-y-2">
          <Label htmlFor="strikePrice" data-testid="label-strike-price">Strike Price</Label>
          <Input
            id="strikePrice"
            data-testid="input-strike-price"
            value={data.strikePrice}
            onChange={(e) => updateField('strikePrice', e.target.value)}
            placeholder="e.g., 1,000"
          />
        </div>
      )}

      {relevantFields.includes("expirationDate") && (
        <div className="space-y-2">
          <Label htmlFor="expirationDate" data-testid="label-expiration-date">Expiration Date</Label>
          <Input
            id="expirationDate"
            data-testid="input-expiration-date"
            value={data.expirationDate}
            onChange={(e) => updateField('expirationDate', e.target.value)}
            placeholder="e.g., 11/21"
          />
        </div>
      )}

      {relevantFields.includes("contractType") && (
        <div className="space-y-2">
          <Label htmlFor="contractType" data-testid="label-contract-type">Contract/Order Type</Label>
          <Input
            id="contractType"
            data-testid="input-contract-type"
            value={data.contractType}
            onChange={(e) => updateField('contractType', e.target.value)}
            placeholder="e.g., Limit sell"
          />
        </div>
      )}

      {relevantFields.includes("filledPrice") && (
        <div className="space-y-2">
          <Label htmlFor="filledPrice" data-testid="label-filled-price">Filled Price</Label>
          <Input
            id="filledPrice"
            data-testid="input-filled-price"
            value={data.filledPrice}
            onChange={(e) => updateField('filledPrice', e.target.value)}
            placeholder="e.g., 1.85"
          />
        </div>
      )}

      {relevantFields.includes("filledQuantity") && (
        <div className="space-y-2">
          <Label htmlFor="filledQuantity" data-testid="label-filled-quantity">Filled Quantity</Label>
          <Input
            id="filledQuantity"
            data-testid="input-filled-quantity"
            value={data.filledQuantity}
            onChange={(e) => updateField('filledQuantity', e.target.value)}
            placeholder="e.g., 3 contracts at $1.85"
          />
        </div>
      )}

      {relevantFields.includes("orderType") && (
        <div className="space-y-2">
          <Label htmlFor="orderType" data-testid="label-order-type">Order Type</Label>
          <Input
            id="orderType"
            data-testid="input-order-type"
            value={data.orderType}
            onChange={(e) => updateField('orderType', e.target.value)}
            placeholder="e.g., Sell, Buy"
          />
        </div>
      )}

      {relevantFields.includes("timePeriod") && (
        <div className="space-y-2">
          <Label htmlFor="timePeriod" data-testid="label-time-period">Time Period Label</Label>
          <Input
            id="timePeriod"
            data-testid="input-time-period"
            value={data.timePeriod}
            onChange={(e) => updateField('timePeriod', e.target.value)}
            placeholder="e.g., Today, YTD, 3M, past week"
          />
        </div>
      )}

    </div>
  );
}
