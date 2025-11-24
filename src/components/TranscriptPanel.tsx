import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export interface TranscriptMessage {
  id: string;
  role: "user" | "agent";
  text: string;
  timestamp: Date;
}

interface TranscriptPanelProps {
  messages: TranscriptMessage[];
}

export function TranscriptPanel({ messages }: TranscriptPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="w-96 min-h-screen border-l bg-card/50 backdrop-blur-sm">
      <div className="p-6 h-screen flex flex-col">
        <div className="space-y-1 mb-6">
          <h2 className="text-xl font-bold">Transcript</h2>
          <p className="text-sm text-muted-foreground">
            Real-time conversation
          </p>
        </div>

        <ScrollArea className="flex-1" ref={scrollRef}>
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-40 text-muted-foreground text-sm">
              Transcript will appear here
            </div>
          ) : (
            <div className="space-y-4 pr-2">
              {messages.map((message) => (
                <div key={message.id} className="space-y-2 animate-fade-in">
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      message.role === "user" ? "bg-primary" : "bg-accent-foreground"
                    )} />
                    <span
                      className={cn(
                        "text-xs font-semibold",
                        message.role === "user"
                          ? "text-primary"
                          : "text-accent-foreground"
                      )}
                    >
                      {message.role === "user" ? "You" : "Agent"}
                    </span>
                    <span className="text-xs text-muted-foreground ml-auto">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-foreground bg-accent/20 rounded-lg p-3 leading-relaxed">
                    {message.text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}
