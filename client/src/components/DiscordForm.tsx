import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X } from "lucide-react";

const AVATAR_COLORS = [
  { name: "Blurple", value: "#5865F2" },
  { name: "Green", value: "#57F287" },
  { name: "Yellow", value: "#FEE75C" },
  { name: "Pink", value: "#EB459E" },
  { name: "Red", value: "#ED4245" },
];

const DISCORD_THEMES = [
  { name: "Default Dark", value: "dark", bg: "#313338", lighter: "#2B2D31" },
  { name: "Midnight", value: "#1E1F22", bg: "#1E1F22", lighter: "#232428" },
  { name: "Darker", value: "#0A0A0A", bg: "#0A0A0A", lighter: "#111111" },
];


const EMOJI_PRESETS = ["💰", "🔥", "😊", "👍", "🚀", "💪", "🎯", "⭐"];

const MESSAGE_TEMPLATES = [
  { name: "Entry Signal - Calls", value: "Bought {symbol} ${strikePrice} Calls {expiration}\nEntry: ${entryPrice}\n{quantity} contracts\nLet's see how this plays out" },
  { name: "Entry Signal - Stock", value: "Just opened a position in {symbol}\nEntry: ${price}\nQuantity: {shares} shares\nTarget: ${target}" },
  { name: "Exit Signal - Profit", value: "Closed {symbol} position\nProfit: +${profit} ({percentage}%)\nEntry: ${entry} → Exit: ${exit}\nThanks for the play @{mention}" },
  { name: "Exit Signal - Big Win", value: "{symbol} ${strikePrice} Calls {expiration}\nClosed for +{percentage}% gain\nFrom ${cost} to ${sold}\nProfit: +${profit}\nAbsolute monster play!" },
  { name: "Hold Update", value: "{symbol} update:\nCurrently up +{percentage}% on this position\nStill holding, target not hit yet\nEntry: ${entry} | Current: ${current}" },
  { name: "Day P&L", value: "Day's P&L: +${profit}\n{wins} wins, {losses} losses\nAnother solid trading day!" },
  { name: "Weekly Recap", value: "Week in review:\nTotal P&L: +${profit} ({percentage}%)\nBest trade: {symbol} +${bestProfit}\nAccount size: ${accountValue}\nOn to the next week!" },
];

export interface DiscordFormData {
  username: string;
  avatarColor: string;
  message: string;
  timestamp: string;
  reactions: { emoji: string; count: number }[];
  verified: boolean;
  channelName: string;
  embeddedImageDataUrl?: string;
  notificationCount?: string;
  showNotificationBadge: boolean;
  typingUsers: string[];
  showTypingIndicator: boolean;
  backgroundTheme: string;
}

interface DiscordFormProps {
  data: DiscordFormData;
  onChange: (data: DiscordFormData) => void;
}

export function DiscordForm({ data, onChange }: DiscordFormProps) {
  const updateField = (field: keyof DiscordFormData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const addReaction = () => {
    onChange({
      ...data,
      reactions: [...data.reactions, { emoji: "💰", count: 1 }]
    });
  };

  const updateReaction = (index: number, field: 'emoji' | 'count', value: string | number) => {
    const newReactions = [...data.reactions];
    newReactions[index] = { ...newReactions[index], [field]: value };
    onChange({ ...data, reactions: newReactions });
  };

  const removeReaction = (index: number) => {
    onChange({
      ...data,
      reactions: data.reactions.filter((_, i) => i !== index)
    });
  };

  const addTypingUser = () => {
    onChange({
      ...data,
      typingUsers: [...data.typingUsers, "User"]
    });
  };

  const updateTypingUser = (index: number, value: string) => {
    const newTypingUsers = [...data.typingUsers];
    newTypingUsers[index] = value;
    onChange({ ...data, typingUsers: newTypingUsers });
  };

  const removeTypingUser = (index: number) => {
    onChange({
      ...data,
      typingUsers: data.typingUsers.filter((_, i) => i !== index)
    });
  };

  const applyMessageTemplate = (template: string) => {
    if (template) {
      onChange({ ...data, message: template });
    }
  };

  return (
    <div className="space-y-6" data-testid="form-discord">
      <div className="space-y-2">
        <Label htmlFor="username" data-testid="label-username">Username</Label>
        <Input
          id="username"
          data-testid="input-username"
          value={data.username}
          onChange={(e) => updateField('username', e.target.value)}
          placeholder="Enter username"
        />
      </div>

      <div className="space-y-2">
        <Label data-testid="label-avatar-color">Avatar Color</Label>
        <Select value={data.avatarColor} onValueChange={(value) => updateField('avatarColor', value)}>
          <SelectTrigger data-testid="select-avatar-color">
            <SelectValue placeholder="Select avatar color" />
          </SelectTrigger>
          <SelectContent>
            {AVATAR_COLORS.map((color) => (
              <SelectItem key={color.value} value={color.value}>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: color.value }}
                  />
                  {color.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label data-testid="label-background-theme">Background Theme</Label>
        <Select value={data.backgroundTheme} onValueChange={(value) => updateField('backgroundTheme', value)}>
          <SelectTrigger data-testid="select-background-theme">
            <SelectValue placeholder="Select theme" />
          </SelectTrigger>
          <SelectContent>
            {DISCORD_THEMES.map((theme) => (
              <SelectItem key={theme.value} value={theme.value}>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded" 
                    style={{ backgroundColor: theme.bg }}
                  />
                  {theme.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="channelName" data-testid="label-channel-name">Channel Name</Label>
        <Input
          id="channelName"
          data-testid="input-channel-name"
          value={data.channelName}
          onChange={(e) => updateField('channelName', e.target.value)}
          placeholder="e.g., profits"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="message" data-testid="label-message">Message</Label>
          <Select onValueChange={applyMessageTemplate}>
            <SelectTrigger className="w-[200px]" data-testid="select-message-template">
              <SelectValue placeholder="Signal Templates" />
            </SelectTrigger>
            <SelectContent>
              {MESSAGE_TEMPLATES.map((template) => (
                <SelectItem key={template.name} value={template.value}>
                  {template.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Textarea
          id="message"
          data-testid="input-message"
          value={data.message}
          onChange={(e) => updateField('message', e.target.value)}
          placeholder="Enter message or select a signal template above"
          rows={6}
        />
        <p className="text-xs text-muted-foreground">Use @username for mentions. Templates support {`{symbol}`}, {`{profit}`}, {`{percentage}`}, etc.</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="timestamp" data-testid="label-timestamp">Timestamp</Label>
        <Input
          id="timestamp"
          data-testid="input-timestamp"
          value={data.timestamp}
          onChange={(e) => updateField('timestamp', e.target.value)}
          placeholder="e.g., 11:05 AM"
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label data-testid="label-reactions">Reactions</Label>
          <Button
            size="sm"
            variant="outline"
            onClick={addReaction}
            data-testid="button-add-reaction"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>
        {data.reactions.map((reaction, index) => (
          <div key={index} className="flex items-center gap-2">
            <Select
              value={reaction.emoji}
              onValueChange={(value) => updateReaction(index, 'emoji', value)}
            >
              <SelectTrigger className="w-20" data-testid={`select-reaction-emoji-${index}`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {EMOJI_PRESETS.map((emoji) => (
                  <SelectItem key={emoji} value={emoji}>
                    {emoji}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="number"
              min="1"
              value={reaction.count}
              onChange={(e) => updateReaction(index, 'count', parseInt(e.target.value) || 1)}
              className="w-20"
              data-testid={`input-reaction-count-${index}`}
            />
            <Button
              size="icon"
              variant="ghost"
              onClick={() => removeReaction(index)}
              data-testid={`button-remove-reaction-${index}`}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="verified"
          checked={data.verified}
          onChange={(e) => updateField('verified', e.target.checked)}
          className="w-4 h-4 rounded"
          data-testid="checkbox-verified"
        />
        <Label htmlFor="verified" className="cursor-pointer" data-testid="label-verified">
          Verified badge
        </Label>
      </div>

      <div className="space-y-3 border-t pt-6">
        <h3 className="font-semibold text-sm">Notification Badge</h3>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="showNotificationBadge"
            checked={data.showNotificationBadge}
            onChange={(e) => updateField('showNotificationBadge', e.target.checked)}
            className="w-4 h-4 rounded"
            data-testid="checkbox-show-notification"
          />
          <Label htmlFor="showNotificationBadge" className="cursor-pointer" data-testid="label-show-notification">
            Show notification badge
          </Label>
        </div>
        {data.showNotificationBadge && (
          <div className="space-y-2">
            <Label htmlFor="notificationCount" data-testid="label-notification-count">Notification Count</Label>
            <Input
              id="notificationCount"
              data-testid="input-notification-count"
              value={data.notificationCount || "99"}
              onChange={(e) => updateField('notificationCount', e.target.value)}
              placeholder="e.g., 99"
            />
          </div>
        )}
      </div>

      <div className="space-y-3 border-t pt-6">
        <h3 className="font-semibold text-sm">Typing Indicator</h3>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="showTypingIndicator"
            checked={data.showTypingIndicator}
            onChange={(e) => updateField('showTypingIndicator', e.target.checked)}
            className="w-4 h-4 rounded"
            data-testid="checkbox-show-typing"
          />
          <Label htmlFor="showTypingIndicator" className="cursor-pointer" data-testid="label-show-typing">
            Show typing indicator
          </Label>
        </div>
        {data.showTypingIndicator && (
          <>
            <div className="flex items-center justify-between">
              <Label data-testid="label-typing-users">Typing Users</Label>
              <Button
                size="sm"
                variant="outline"
                onClick={addTypingUser}
                data-testid="button-add-typing-user"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add User
              </Button>
            </div>
            {data.typingUsers.map((user, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={user}
                  onChange={(e) => updateTypingUser(index, e.target.value)}
                  placeholder="Username"
                  data-testid={`input-typing-user-${index}`}
                />
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => removeTypingUser(index)}
                  data-testid={`button-remove-typing-user-${index}`}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
