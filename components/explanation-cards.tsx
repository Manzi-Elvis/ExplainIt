"use client"
import { ChevronDown } from "lucide-react"

interface ExplanationCardsProps {
  explanations: Record<string, string>
  expandedCard: string | null
  onToggle: (card: string | null) => void
}

export function ExplanationCards({ explanations, expandedCard, onToggle }: ExplanationCardsProps) {
  const cards = [
    { id: "what", title: "✨ What is this?", key: "what" },
    { id: "why", title: "💡 Why it matters", key: "why" },
    { id: "how", title: "⚙️ How it works", key: "how" },
    { id: "mistakes", title: "⚠️ Common mistakes", key: "mistakes" },
    { id: "analogy", title: "🎯 Simple analogy", key: "analogy" },
  ]

  return (
    <div className="grid md:grid-cols-2 gap-4 animate-fade-in-up">
      {cards.map((card) => (
        <div
          key={card.id}
          className="group cursor-pointer"
          onClick={() => onToggle(expandedCard === card.id ? null : card.id)}
        >
          <div className="relative h-full bg-card/40 border border-border/30 rounded-xl p-5 hover:border-cyan-500/30 hover:bg-card/60 transition-all duration-300 backdrop-blur-sm overflow-hidden">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-linear-to-br from-cyan-500/0 via-cyan-500/0 to-cyan-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground text-sm">{card.title}</h3>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${
                    expandedCard === card.id ? "rotate-180" : ""
                  }`}
                />
              </div>

              {/* Preview text (always visible) */}
              <p className="text-sm text-muted-foreground line-clamp-2">
                {explanations[card.key as keyof typeof explanations] || "Loading..."}
              </p>

              {/* Expanded content */}
              {expandedCard === card.id && (
                <div className="mt-4 pt-4 border-t border-border/30 animate-fade-in">
                  <p className="text-sm text-foreground leading-relaxed">
                    {explanations[card.key as keyof typeof explanations]}
                  </p>
                </div>
              )}

              {/* Share button in expanded view */}
              {expandedCard === card.id && (
                <button className="mt-4 text-xs bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 px-3 py-1 rounded transition-colors">
                  Share
                </button>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* "I'm still confused" button */}
      <div className="md:col-span-2 mt-4">
        <button className="w-full py-4 px-6 border border-dashed border-muted-foreground/30 rounded-xl text-muted-foreground hover:text-foreground hover:border-muted-foreground/50 transition-all duration-300 font-medium">
          🤔 I'm still confused – Expand explanations
        </button>
      </div>
    </div>
  )
}
