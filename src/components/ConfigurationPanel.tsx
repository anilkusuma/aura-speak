import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Phone, Mic, MicOff } from "lucide-react";

interface ConfigurationPanelProps {
  onConnect: (config: ConnectionConfig) => void;
  onDisconnect: () => void;
  isConnected: boolean;
}

export interface ConnectionConfig {
  agent: string;
  phoneNumber: string;
  context: string;
  userId: string;
}

const agents = [
  { id: "agent-1", name: "Customer Support Agent" },
  { id: "agent-2", name: "Sales Assistant" },
  { id: "agent-3", name: "Technical Support" },
  { id: "agent-4", name: "General Assistant" },
];

export function ConfigurationPanel({
  onConnect,
  onDisconnect,
  isConnected,
}: ConfigurationPanelProps) {
  const [config, setConfig] = useState<ConnectionConfig>({
    agent: "",
    phoneNumber: "",
    context: "",
    userId: "",
  });

  const handleConnect = () => {
    if (config.agent) {
      onConnect(config);
    }
  };

  return (
    <div className="w-80 h-full border-r bg-card/50 backdrop-blur-sm">
      <div className="p-6 space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-bold">Configuration</h2>
          <p className="text-sm text-muted-foreground">
            Set up your voice agent
          </p>
        </div>

        <div className="space-y-4">
          {/* Agent Selection */}
          <div className="space-y-2">
            <Label htmlFor="agent">Agent Pipeline</Label>
            <Select
              value={config.agent}
              onValueChange={(value) =>
                setConfig((prev) => ({ ...prev, agent: value }))
              }
              disabled={isConnected}
            >
              <SelectTrigger id="agent">
                <SelectValue placeholder="Select agent" />
              </SelectTrigger>
              <SelectContent>
                {agents.map((agent) => (
                  <SelectItem key={agent.id} value={agent.id}>
                    {agent.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="phone"
                type="tel"
                placeholder="+1234567890"
                value={config.phoneNumber}
                onChange={(e) =>
                  setConfig((prev) => ({ ...prev, phoneNumber: e.target.value }))
                }
                className="pl-10"
                disabled={isConnected}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Optional. For Exotel mode.
            </p>
          </div>

          {/* Context */}
          <div className="space-y-2">
            <Label htmlFor="context">Context</Label>
            <Textarea
              id="context"
              placeholder="Enter conversation context or instructions..."
              value={config.context}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, context: e.target.value }))
              }
              className="min-h-[100px] resize-none"
              disabled={isConnected}
            />
          </div>

          {/* User ID */}
          <div className="space-y-2">
            <Label htmlFor="userId">User ID</Label>
            <Input
              id="userId"
              type="text"
              placeholder="Optional"
              value={config.userId}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, userId: e.target.value }))
              }
              disabled={isConnected}
            />
          </div>

          {/* Connect/Disconnect Button */}
          {!isConnected ? (
            <Button
              onClick={handleConnect}
              disabled={!config.agent}
              className="w-full"
              size="lg"
            >
              <Mic className="mr-2 h-4 w-4" />
              Connect
            </Button>
          ) : (
            <Button
              onClick={onDisconnect}
              variant="destructive"
              className="w-full"
              size="lg"
            >
              <MicOff className="mr-2 h-4 w-4" />
              Disconnect
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
