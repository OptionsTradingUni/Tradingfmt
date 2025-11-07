import { DiscordMessage } from '../DiscordMessage';

export default function DiscordMessageExample() {
  return (
    <DiscordMessage
      username="Dr. Sugandese"
      avatarColor="#5865F2"
      message="first day in here😂😂 i regret not going heavier but ah well nice one bro @MDT™"
      timestamp="11:05 AM"
      channelName="profits"
      reactions={[
        { emoji: "💰", count: 1 },
        { emoji: "🔥", count: 2 },
        { emoji: "😊", count: 1 }
      ]}
      verified={true}
    />
  );
}
