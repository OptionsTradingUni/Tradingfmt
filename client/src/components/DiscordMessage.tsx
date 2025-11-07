import { forwardRef } from "react";

export interface DiscordMessageProps {
  username: string;
  avatarColor?: string;
  message: string;
  timestamp: string;
  reactions?: { emoji: string; count: number }[];
  verified?: boolean;
  channelName?: string;
  embeddedImageUrl?: string;
  notificationCount?: string;
  showNotificationBadge?: boolean;
  typingUsers?: string[];
  showTypingIndicator?: boolean;
  backgroundTheme?: string;
}

const DEFAULT_COLORS = [
  "#5865F2", // Blurple
  "#57F287", // Green
  "#FEE75C", // Yellow
  "#EB459E", // Pink
  "#ED4245", // Red
];

const THEME_COLORS: Record<string, { bg: string; lighter: string; border: string; text: string; textSecondary: string; reactionBg: string; reactionBorder: string }> = {
  "dark": {
    bg: "#313338",
    lighter: "#2B2D31",
    border: "#26282C",
    text: "#F2F3F5",
    textSecondary: "#B5BAC1",
    reactionBg: "#2B2D31",
    reactionBorder: "#3F4147"
  },
  "#1E1F22": {
    bg: "#1E1F22",
    lighter: "#232428",
    border: "#1E1F22",
    text: "#F2F3F5",
    textSecondary: "#B5BAC1",
    reactionBg: "#232428",
    reactionBorder: "#3F4147"
  },
  "#0A0A0A": {
    bg: "#0A0A0A",
    lighter: "#111111",
    border: "#1A1A1A",
    text: "#F2F3F5",
    textSecondary: "#B5BAC1",
    reactionBg: "#1A1A1A",
    reactionBorder: "#2A2A2A"
  }
};

export const DiscordMessage = forwardRef<HTMLDivElement, DiscordMessageProps>(
  ({ 
    username, 
    avatarColor, 
    message, 
    timestamp, 
    reactions = [], 
    verified = false, 
    channelName = "profits", 
    embeddedImageUrl,
    notificationCount = "99",
    showNotificationBadge = true,
    typingUsers = ["Boog"],
    showTypingIndicator = true,
    backgroundTheme = "dark"
  }, ref) => {
    const theme = THEME_COLORS[backgroundTheme] || THEME_COLORS["dark"];
    
    const getAvatarColor = () => {
      if (avatarColor) return avatarColor;
      return DEFAULT_COLORS[username.length % DEFAULT_COLORS.length];
    };

    const getInitials = () => {
      return username.substring(0, 2).toUpperCase();
    };

    const renderMessage = () => {
      const parts = message.split(/(@[\w™]+)/g);
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

    const getTypingText = () => {
      if (typingUsers.length === 0) return "Someone is typing...";
      if (typingUsers.length === 1) return `${typingUsers[0]} is typing...`;
      if (typingUsers.length === 2) return `${typingUsers[0]} and ${typingUsers[1]} are typing...`;
      if (typingUsers.length === 3) return `${typingUsers[0]}, ${typingUsers[1]}, and ${typingUsers[2]} are typing...`;
      return `${typingUsers[0]}, ${typingUsers[1]}, and ${typingUsers.length - 2} others are typing...`;
    };

    return (
      <div ref={ref} className="w-[669px] font-sans overflow-hidden" style={{ backgroundColor: theme.bg }}>
        {/* Discord Header */}
        <div className="px-4 py-3 flex items-center justify-between" style={{ backgroundColor: theme.bg, borderBottom: `1px solid ${theme.border}` }}>
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5" style={{ color: theme.textSecondary }} viewBox="0 0 24 24" fill="currentColor">
              <path d="M10.296 7.71L14.621 12l-4.325 4.29 1.408 1.42L17.461 12l-5.757-5.71z"/>
            </svg>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" style={{ color: theme.textSecondary }} viewBox="0 0 24 24" fill="currentColor">
                <path d="M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.8709 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41045 9L8.35045 15H14.3504L15.4104 9H9.41045Z"/>
              </svg>
              <span className="font-semibold text-[16px]" style={{ color: theme.text }}>{channelName}</span>
            </div>
            {showNotificationBadge && (
              <div className="bg-[#F23F42] text-white text-xs font-bold rounded-full min-w-[24px] h-6 px-1.5 flex items-center justify-center">
                {notificationCount}
              </div>
            )}
          </div>
          <svg className="w-5 h-5" style={{ color: theme.textSecondary }} viewBox="0 0 24 24" fill="currentColor">
            <path d="M21.707 20.293l-6.388-6.388A7.455 7.455 0 0016 10a7.5 7.5 0 10-7.5 7.5 7.455 7.455 0 003.905-.681l6.388 6.388a1 1 0 001.414-1.414zM4 10a6 6 0 116 6 6.007 6.007 0 01-6-6z"/>
          </svg>
        </div>

        {/* Message Content */}
        <div className="px-4 py-3">
          <div className="flex gap-4">
            <div 
              className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-semibold text-white text-sm"
              style={{ backgroundColor: getAvatarColor() }}
            >
              {getInitials()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-[15px] whitespace-nowrap" style={{ color: theme.text }}>{username}</span>
                {verified && (
                  <svg className="w-4 h-4 text-[#5865F2] flex-shrink-0" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.97 5.53-5 5a.75.75 0 0 1-1.06 0l-2-2a.75.75 0 1 1 1.06-1.06L6.5 8.94l4.47-4.47a.75.75 0 0 1 1.06 1.06z" />
                  </svg>
                )}
                <span className="text-xs whitespace-nowrap" style={{ color: theme.textSecondary }}>{timestamp}</span>
              </div>
              <div className="text-[15px] leading-[1.375] mb-2" style={{ color: "#DBDEE1" }}>
                {renderMessage()}
              </div>
              {embeddedImageUrl && (
                <div className="mt-2 max-w-[432px]">
                  <img 
                    src={embeddedImageUrl} 
                    alt="Embedded" 
                    className="rounded-md w-full"
                  />
                </div>
              )}
              {reactions.length > 0 && (
                <div className="flex gap-1 mt-2">
                  {reactions.map((reaction, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1.5 rounded px-2 py-1 cursor-pointer transition-colors"
                      style={{ 
                        backgroundColor: theme.reactionBg, 
                        borderWidth: '1px', 
                        borderStyle: 'solid', 
                        borderColor: theme.reactionBorder 
                      }}
                    >
                      <span className="text-base">{reaction.emoji}</span>
                      <span className="text-xs font-medium" style={{ color: theme.textSecondary }}>{reaction.count}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar (typing indicator) */}
        {showTypingIndicator && (
          <div className="px-4 py-3" style={{ borderTop: `1px solid ${theme.border}` }}>
            <div className="flex items-center gap-2 text-sm" style={{ color: theme.textSecondary }}>
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.textSecondary }}></div>
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.textSecondary }}></div>
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.textSecondary }}></div>
              </div>
              <span>{getTypingText()}</span>
            </div>
          </div>
        )}
      </div>
    );
  }
);

DiscordMessage.displayName = "DiscordMessage";
