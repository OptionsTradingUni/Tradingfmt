import { useState } from 'react';
import { DiscordForm, type DiscordFormData } from '../DiscordForm';
import youngTrader from '@assets/generated_images/Young_trader_avatar_21c86166.png';

export default function DiscordFormExample() {
  const [data, setData] = useState<DiscordFormData>({
    username: "Dr. Sugandese",
    avatarUrl: youngTrader,
    message: "first day in here😂😂 i regret not going heavier but ah well nice one bro @MDT™",
    timestamp: "11:05 AM",
    reactions: [
      { emoji: "💰", count: 1 },
      { emoji: "🔥", count: 2 }
    ],
    verified: true
  });

  return (
    <div className="max-w-md p-4">
      <DiscordForm data={data} onChange={setData} />
    </div>
  );
}
