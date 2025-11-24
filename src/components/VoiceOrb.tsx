import { cn } from "@/lib/utils";

interface VoiceOrbProps {
  isActive: boolean;
  status: "idle" | "connecting" | "listening" | "speaking";
}

export function VoiceOrb({ isActive, status }: VoiceOrbProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-12">
      <div className="relative">
        {/* Animated glow rings for voice activity */}
        {status === "listening" && (
          <>
            <div className="absolute inset-0 rounded-full orb-gradient opacity-30 blur-2xl animate-orb-pulse" />
            <div className="absolute inset-0 rounded-full orb-gradient opacity-20 blur-3xl animate-orb-pulse" style={{ animationDelay: '0.5s' }} />
          </>
        )}
        
        {status === "speaking" && (
          <>
            <div className="absolute inset-0 rounded-full orb-gradient opacity-40 blur-2xl animate-orb-glow" />
            <div className="absolute inset-0 rounded-full orb-gradient opacity-30 blur-3xl animate-orb-glow" style={{ animationDelay: '0.3s' }} />
            <div className="absolute inset-0 rounded-full orb-gradient opacity-20 blur-[100px] animate-orb-glow" style={{ animationDelay: '0.6s' }} />
          </>
        )}

        {/* Outer subtle glow */}
        <div
          className={cn(
            "absolute inset-0 rounded-full blur-3xl transition-all duration-700",
            isActive ? "orb-gradient opacity-20" : "bg-primary/10 opacity-10"
          )}
        />
        
        {/* Main orb - NO ROTATION */}
        <div
          className={cn(
            "relative w-64 h-64 rounded-full orb-gradient shadow-2xl transition-all duration-500",
            status === "listening" && "scale-105",
            status === "speaking" && "scale-110"
          )}
        >
          {/* Inner overlay for depth */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-background/30 to-transparent" />
          <div className="absolute inset-8 rounded-full bg-gradient-to-tl from-background/20 to-transparent" />
        </div>
      </div>

      {/* Status text below orb */}
      <div className="text-center space-y-2">
        <p className="text-2xl font-semibold text-foreground capitalize">
          {status}
        </p>
        <p className="text-muted-foreground text-sm">
          {status === "idle" && "Ready to connect"}
          {status === "connecting" && "Establishing connection..."}
          {status === "listening" && "Listening to your voice"}
          {status === "speaking" && "Agent is speaking"}
        </p>
      </div>
    </div>
  );
}
