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

const EMOJI_PRESETS = ["💰", "🔥", "😊", "👍", "🚀", "💪", "🎯", "⭐"];

export interface DiscordFormData {
  username: string;
  avatarColor: string;
  message: string;
  timestamp: string;
  reactions: { emoji: string; count: number }[];
  verified: boolean;
  channelName: string;
  embeddedImageDataUrl?: string;
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
        <Label htmlFor="message" data-testid="label-message">Message</Label>
        <Textarea
          id="message"
          data-testid="input-message"
          value={data.message}
          onChange={(e) => updateField('message', e.target.value)}
          placeholder="Enter message (use @username for mentions)"
          rows={4}
        />
        <p className="text-xs text-muted-foreground">Use @username to create mentions</p>
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
    </div>
  );
}
