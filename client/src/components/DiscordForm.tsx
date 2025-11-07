import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import youngTrader from '@assets/generated_images/Young_trader_avatar_21c86166.png';
import womanTrader from '@assets/generated_images/Woman_trader_avatar_d2763a2e.png';
import businessman from '@assets/generated_images/Businessman_avatar_4ef3acbe.png';
import youngProfessional from '@assets/generated_images/Young_professional_avatar_1ceab23f.png';
import experiencedTrader from '@assets/generated_images/Experienced_trader_avatar_4275ec5b.png';

const AVATAR_PRESETS = [
  { name: "Young Trader", url: youngTrader },
  { name: "Woman Trader", url: womanTrader },
  { name: "Businessman", url: businessman },
  { name: "Young Professional", url: youngProfessional },
  { name: "Experienced Trader", url: experiencedTrader },
];

const EMOJI_PRESETS = ["💰", "🔥", "😊", "👍", "🚀", "💪", "🎯", "⭐"];

export interface DiscordFormData {
  username: string;
  avatarUrl: string;
  message: string;
  timestamp: string;
  reactions: { emoji: string; count: number }[];
  verified: boolean;
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
        <Label data-testid="label-avatar">Avatar</Label>
        <Select value={data.avatarUrl} onValueChange={(value) => updateField('avatarUrl', value)}>
          <SelectTrigger data-testid="select-avatar">
            <SelectValue placeholder="Select avatar" />
          </SelectTrigger>
          <SelectContent>
            {AVATAR_PRESETS.map((preset) => (
              <SelectItem key={preset.url} value={preset.url}>
                <div className="flex items-center gap-2">
                  <img src={preset.url} alt={preset.name} className="w-6 h-6 rounded-full" />
                  {preset.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
