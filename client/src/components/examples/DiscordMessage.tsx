import { DiscordMessage } from '../DiscordMessage';
import avatarUrl from '@assets/generated_images/Young_trader_avatar_21c86166.png';

export default function DiscordMessageExample() {
  return (
    <DiscordMessage
      username="Dr. Sugandese"
      avatarUrl={avatarUrl}
      message="first day in here😂😂 i regret not going heavier but ah well nice one bro @MDT™"
      timestamp="11:05 AM"
      reactions={[
        { emoji: "💰", count: 1 },
        { emoji: "🔥", count: 2 },
        { emoji: "😊", count: 1 }
      ]}
      verified={true}
    />
  );
}
