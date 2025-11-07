import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Shuffle } from "lucide-react";
import { DiscordMessage } from "@/components/DiscordMessage";
import { DiscordForm, type DiscordFormData } from "@/components/DiscordForm";
import { TradingScreenshot } from "@/components/TradingScreenshot";
import { TradingForm, type TradingFormData } from "@/components/TradingForm";
import { toPng } from "html-to-image";
import { useToast } from "@/hooks/use-toast";

const USERNAMES = [
  "Dr. Sugandese", "Luke587", "Fistful of Dollars", "Convertible",
  "TraderPro", "MoneyMoves", "BullMarket", "GainzKing"
];

const MESSAGES = [
  "first day in here😂😂 i regret not going heavier but ah well nice one bro @{mention}",
  "Reminder that shavings make a pile especially on shitty PA days. Shoutout @{mention} perfect entry and exit",
  "My share account hit 5 figures of profits in a day for the first time (: started this account with 20k halfway through June",
  "Not bad for 1 minute @{mention}",
  "Cheers @{mention} thanks again @{mention}",
  "🔥🔥🔥 killed it today thanks to @{mention}",
];

const AVATAR_COLORS = ["#5865F2", "#57F287", "#FEE75C", "#EB459E", "#ED4245"];

export default function Generator() {
  const { toast } = useToast();
  const discordRef = useRef<HTMLDivElement>(null);
  const tradingRef = useRef<HTMLDivElement>(null);

  const [mode, setMode] = useState<"discord" | "trading">("discord");
  
  const [discordData, setDiscordData] = useState<DiscordFormData>({
    username: "Dr. Sugandese",
    avatarColor: "#5865F2",
    message: "first day in here😂😂 i regret not going heavier but ah well nice one bro @MDT™",
    timestamp: "11:05 AM",
    channelName: "profits",
    reactions: [
      { emoji: "💰", count: 1 },
      { emoji: "🔥", count: 2 }
    ],
    verified: true,
    embeddedImageDataUrl: undefined,
    notificationCount: "99",
    showNotificationBadge: true,
    typingUsers: ["Boog"],
    showTypingIndicator: true
  });

  const [tradingData, setTradingData] = useState<TradingFormData>({
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
    costBasis: "14,592.49",
    symbol: "META",
    quantity: "175,916",
    currentPrice: "657.97",
    openPL: "0.00",
    dayRPL: "903.00",
    marketValue: "1,138,176.52",
    totalCost: "1,044,941.04",
    strikePrice: "1,000",
    expirationDate: "11/21",
    contractType: "Limit sell",
    filledPrice: "1.85",
    filledQuantity: "3 contracts at $1.85",
    orderType: "Sell",
    afterHoursChange: "399.51"
  });

  const tradingScreenshotRef = useRef<HTMLDivElement>(null);

  // Generate embedded trading image whenever trading data changes
  useEffect(() => {
    const generateEmbeddedImage = async () => {
      if (!tradingScreenshotRef.current) return;
      
      try {
        const dataUrl = await toPng(tradingScreenshotRef.current, {
          quality: 1,
          pixelRatio: 2,
        });
        setDiscordData(prev => ({ ...prev, embeddedImageDataUrl: dataUrl }));
      } catch (error) {
        console.error('Failed to generate embedded image:', error);
      }
    };

    const timeoutId = setTimeout(generateEmbeddedImage, 100);
    return () => clearTimeout(timeoutId);
  }, [tradingData]);

  const randomizeDiscord = () => {
    const username = USERNAMES[Math.floor(Math.random() * USERNAMES.length)];
    const message = MESSAGES[Math.floor(Math.random() * MESSAGES.length)].replace(
      /{mention}/g,
      "@" + USERNAMES[Math.floor(Math.random() * USERNAMES.length)]
    );
    const avatarColor = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
    const hours = Math.floor(Math.random() * 12) + 1;
    const minutes = Math.floor(Math.random() * 60);
    const ampm = Math.random() > 0.5 ? "AM" : "PM";
    
    setDiscordData({
      ...discordData,
      username,
      message,
      avatarColor,
      timestamp: `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`,
      verified: Math.random() > 0.5,
    });
    
    toast({
      title: "Randomized!",
      description: "Discord testimonial has been randomized",
    });
  };

  const randomizeTrading = () => {
    const profit = (Math.random() * 50000 + 1000).toFixed(2);
    const percentage = (Math.random() * 300 + 10).toFixed(2);
    
    setTradingData({
      ...tradingData,
      profit: parseFloat(profit).toLocaleString(),
      percentage: percentage,
      totalValue: (Math.random() * 100000 + 10000).toFixed(2),
      totalGain: (Math.random() * 50000 + 5000).toFixed(2),
      todayGain: (Math.random() * 10000 + 500).toFixed(2),
    });
    
    toast({
      title: "Randomized!",
      description: "Trading figures have been randomized",
    });
  };

  const handleDownload = async () => {
    const ref = mode === "discord" ? discordRef : tradingRef;
    if (!ref.current) return;

    try {
      const dataUrl = await toPng(ref.current, {
        quality: 1,
        pixelRatio: 2,
      });
      
      const link = document.createElement('a');
      link.download = `${mode}-screenshot-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      
      toast({
        title: "Downloaded!",
        description: "Screenshot saved successfully",
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Error",
        description: "Failed to download screenshot",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold" data-testid="text-title">Screenshot Generator</h1>
            <Tabs value={mode} onValueChange={(v) => setMode(v as "discord" | "trading")}>
              <TabsList data-testid="tabs-mode">
                <TabsTrigger value="discord" data-testid="tab-discord">Discord</TabsTrigger>
                <TabsTrigger value="trading" data-testid="tab-trading">Trading</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-[400px_1fr] gap-8">
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4" data-testid="text-controls-title">Controls</h2>
              {mode === "discord" ? (
                <DiscordForm data={discordData} onChange={setDiscordData} />
              ) : (
                <TradingForm data={tradingData} onChange={setTradingData} />
              )}
            </Card>

            <div className="flex gap-3">
              <Button
                onClick={mode === "discord" ? randomizeDiscord : randomizeTrading}
                variant="outline"
                className="flex-1"
                data-testid="button-randomize"
              >
                <Shuffle className="w-4 h-4 mr-2" />
                Randomize
              </Button>
              <Button
                onClick={handleDownload}
                className="flex-1"
                data-testid="button-download"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PNG
              </Button>
            </div>
          </div>

          <div className="flex items-start justify-center">
            <Card className="p-8 inline-block">
              <h2 className="text-lg font-semibold mb-4" data-testid="text-preview-title">Preview</h2>
              {mode === "discord" ? (
                <DiscordMessage
                  ref={discordRef}
                  username={discordData.username}
                  avatarColor={discordData.avatarColor}
                  message={discordData.message}
                  timestamp={discordData.timestamp}
                  channelName={discordData.channelName}
                  reactions={discordData.reactions}
                  verified={discordData.verified}
                  embeddedImageUrl={discordData.embeddedImageDataUrl}
                  notificationCount={discordData.notificationCount}
                  showNotificationBadge={discordData.showNotificationBadge}
                  typingUsers={discordData.typingUsers}
                  showTypingIndicator={discordData.showTypingIndicator}
                />
              ) : (
                <TradingScreenshot
                  ref={tradingRef}
                  template={tradingData.template}
                  data={{
                    profit: tradingData.profit,
                    percentage: tradingData.percentage,
                    accountType: tradingData.accountType,
                    totalValue: tradingData.totalValue,
                    sharesOwned: tradingData.sharesOwned,
                    averageCost: tradingData.averageCost,
                    totalGain: tradingData.totalGain,
                    todayGain: tradingData.todayGain,
                    date: tradingData.date,
                    proceeds: tradingData.proceeds,
                    costBasis: tradingData.costBasis,
                    symbol: tradingData.symbol,
                    quantity: tradingData.quantity,
                    currentPrice: tradingData.currentPrice,
                    openPL: tradingData.openPL,
                    dayRPL: tradingData.dayRPL,
                    marketValue: tradingData.marketValue,
                    totalCost: tradingData.totalCost,
                    strikePrice: tradingData.strikePrice,
                    expirationDate: tradingData.expirationDate,
                    contractType: tradingData.contractType,
                    filledPrice: tradingData.filledPrice,
                    filledQuantity: tradingData.filledQuantity,
                    orderType: tradingData.orderType,
                    afterHoursChange: tradingData.afterHoursChange,
                  }}
                />
              )}
            </Card>
          </div>
          
          {/* Hidden trading screenshot for embedded image generation */}
          <div className="fixed -left-[9999px]">
            <TradingScreenshot
              ref={tradingScreenshotRef}
              template={tradingData.template}
              data={{
                profit: tradingData.profit,
                percentage: tradingData.percentage,
                accountType: tradingData.accountType,
                totalValue: tradingData.totalValue,
                sharesOwned: tradingData.sharesOwned,
                averageCost: tradingData.averageCost,
                totalGain: tradingData.totalGain,
                todayGain: tradingData.todayGain,
                date: tradingData.date,
                proceeds: tradingData.proceeds,
                costBasis: tradingData.costBasis,
                symbol: tradingData.symbol,
                quantity: tradingData.quantity,
                currentPrice: tradingData.currentPrice,
                openPL: tradingData.openPL,
                dayRPL: tradingData.dayRPL,
                marketValue: tradingData.marketValue,
                totalCost: tradingData.totalCost,
                strikePrice: tradingData.strikePrice,
                expirationDate: tradingData.expirationDate,
                contractType: tradingData.contractType,
                filledPrice: tradingData.filledPrice,
                filledQuantity: tradingData.filledQuantity,
                orderType: tradingData.orderType,
                afterHoursChange: tradingData.afterHoursChange,
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
