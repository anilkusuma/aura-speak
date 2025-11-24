import { cn } from "@/lib/utils";

interface VoiceOrbProps {
  isActive: boolean;
  status: "idle" | "connecting" | "listening" | "speaking";
}

export function VoiceOrb({ isActive, status }: VoiceOrbProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="relative">
        {/* Outer glow effect */}
        <div
          className={cn(
            "absolute inset-0 rounded-full blur-3xl transition-all duration-700",
            isActive ? "orb-gradient opacity-40 scale-110" : "bg-primary/20 opacity-20"
          )}
        />
        
        {/* Main orb */}
        <div
          className={cn(
            "relative w-64 h-64 rounded-full orb-gradient shadow-2xl transition-all duration-500",
            isActive && "animate-orb-spin",
            status === "listening" && "animate-orb-pulse",
            status === "speaking" && "animate-orb-glow"
          )}
        >
          {/* Inner overlay for depth */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-background/20 to-transparent" />
          
          {/* Status badge */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-background/90 backdrop-blur-sm px-6 py-2 rounded-full shadow-lg">
              <span className="text-sm font-semibold text-foreground capitalize">
                {status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Status text */}
      <p className="text-muted-foreground text-sm">
        {status === "idle" && "Ready to connect"}
        {status === "connecting" && "Establishing connection..."}
        {status === "listening" && "Listening to your voice"}
        {status === "speaking" && "Agent is speaking"}
      </p>
    </div>
  );
}
