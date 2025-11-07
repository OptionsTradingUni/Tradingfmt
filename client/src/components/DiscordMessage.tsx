import { forwardRef } from "react";

export interface DiscordMessageProps {
  username: string;
  avatarUrl: string;
  message: string;
  timestamp: string;
  reactions?: { emoji: string; count: number }[];
  verified?: boolean;
}

export const DiscordMessage = forwardRef<HTMLDivElement, DiscordMessageProps>(
  ({ username, avatarUrl, message, timestamp, reactions = [], verified = false }, ref) => {
    const renderMessage = () => {
      const parts = message.split(/(@\w+)/g);
      return parts.map((part, i) => {
        if (part.startsWith('@')) {
          return (
            <span
              key={i}
              className="bg-[#5865F2]/20 text-[#5865F2] rounded px-0.5 hover:bg-[#5865F2]/30 cursor-pointer"
            >
              {part}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      });
    };

    return (
      <div ref={ref} className="bg-[#313338] min-h-[600px] w-[600px] p-4 font-sans">
        <div className="flex gap-4">
          <img
            src={avatarUrl}
            alt={username}
            className="w-10 h-10 rounded-full flex-shrink-0"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[#F2F3F5] font-semibold text-[15px]">{username}</span>
              {verified && (
                <svg className="w-4 h-4 text-[#5865F2]" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.97 5.53-5 5a.75.75 0 0 1-1.06 0l-2-2a.75.75 0 1 1 1.06-1.06L6.5 8.94l4.47-4.47a.75.75 0 0 1 1.06 1.06z" />
                </svg>
              )}
              <span className="text-[#949BA4] text-xs">{timestamp}</span>
            </div>
            <div className="text-[#DBDEE1] text-[15px] leading-[1.375] whitespace-pre-wrap">
              {renderMessage()}
            </div>
            {reactions.length > 0 && (
              <div className="flex gap-1 mt-2">
                {reactions.map((reaction, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 bg-[#2B2D31] hover:bg-[#35373C] border border-[#3F4147] rounded px-1.5 py-0.5 cursor-pointer transition-colors"
                  >
                    <span className="text-sm">{reaction.emoji}</span>
                    <span className="text-[#B5BAC1] text-xs font-medium">{reaction.count}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

DiscordMessage.displayName = "DiscordMessage";
