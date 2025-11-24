import { useState } from "react";
import { ConfigurationPanel, ConnectionConfig } from "@/components/ConfigurationPanel";
import { TranscriptPanel, TranscriptMessage } from "@/components/TranscriptPanel";
import { VoiceOrb } from "@/components/VoiceOrb";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Mic } from "lucide-react";
import { toast } from "sonner";

type ConnectionStatus = "idle" | "connecting" | "listening" | "speaking";

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [status, setStatus] = useState<ConnectionStatus>("idle");
  const [messages, setMessages] = useState<TranscriptMessage[]>([]);

  const handleConnect = (config: ConnectionConfig) => {
    setStatus("connecting");
    
    // Simulate connection
    setTimeout(() => {
      setIsConnected(true);
      setStatus("listening");
      toast.success("Connected to agent", {
        description: `Connected to ${config.agent}`,
      });

      // Add welcome message
      addMessage("agent", "Hello! I'm ready to assist you. How can I help today?");
    }, 1500);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setStatus("idle");
    setMessages([]);
    toast.info("Disconnected", {
      description: "Voice connection ended",
    });
  };

  const addMessage = (role: "user" | "agent", text: string) => {
    const newMessage: TranscriptMessage = {
      id: `${Date.now()}-${Math.random()}`,
      role,
      text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  // Simulate voice activity for demo
  const simulateVoiceActivity = () => {
    if (!isConnected) return;

    // Simulate user speaking
    setStatus("listening");
    setTimeout(() => {
      addMessage("user", "This is a simulated user message for demonstration.");
      
      // Simulate agent response
      setStatus("speaking");
      setTimeout(() => {
        addMessage("agent", "Thank you for your message. This is a simulated agent response.");
        setStatus("listening");
      }, 2000);
    }, 2000);
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Left Panel - Configuration */}
      <ConfigurationPanel
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
        isConnected={isConnected}
      />

      {/* Center - Voice Orb */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b bg-card/50 backdrop-blur-sm px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Mic className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Voice Playground</h1>
              <p className="text-xs text-muted-foreground">
                AI Voice Agent Testing Environment
              </p>
            </div>
          </div>
          <ThemeToggle />
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center p-8">
          <VoiceOrb isActive={isConnected} status={status} />
        </main>

        {/* Footer with demo button */}
        {isConnected && (
          <div className="border-t bg-card/50 backdrop-blur-sm px-6 py-4 flex justify-center">
            <button
              onClick={simulateVoiceActivity}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Click to simulate voice activity
            </button>
          </div>
        )}
      </div>

      {/* Right Panel - Transcript */}
      <TranscriptPanel messages={messages} />
    </div>
  );
};

export default Index;
