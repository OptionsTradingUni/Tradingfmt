import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
];

export function TradingForm({ data, onChange }: TradingFormProps) {
  const updateField = (field: keyof TradingFormData, value: string) => {
    onChange({ ...data, [field]: value });
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
    </div>
  );
}
