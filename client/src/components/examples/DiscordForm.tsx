import { useState } from 'react';
import { DiscordForm, type DiscordFormData } from '../DiscordForm';

export default function DiscordFormExample() {
  const [data, setData] = useState<DiscordFormData>({
    username: "Dr. Sugandese",
    avatarColor: "#5865F2",
    message: "first day in here😂😂 i regret not going heavier but ah well nice one bro @MDT™",
    timestamp: "11:05 AM",
    channelName: "profits",
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
