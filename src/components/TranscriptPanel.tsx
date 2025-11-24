import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

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
    <Card className="w-80 h-full border-l bg-card">
      <div className="p-6">
        <div>
          <h2 className="text-lg font-semibold mb-1">Transcript</h2>
          <p className="text-sm text-muted-foreground">
            Real-time conversation log
          </p>
        </div>

        <Separator className="my-4" />

        <ScrollArea className="h-[calc(100vh-200px)]" ref={scrollRef}>
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-40 text-muted-foreground text-sm">
              Transcript will appear here
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span
                      className={
                        message.role === "user"
                          ? "text-xs font-medium text-primary"
                          : "text-xs font-medium text-accent-foreground"
                      }
                    >
                      {message.role === "user" ? "You" : "Agent"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm text-foreground bg-accent/30 rounded-lg p-3">
                    {message.text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>
    </Card>
  );
}
