"use client"

interface ConfidenceSliderProps {
  value: string
  onChange: (value: string) => void
}

export function ConfidenceSlider({ value, onChange }: ConfidenceSliderProps) {
  const levels = [
    { id: "kid", label: "Like I'm 5", emoji: "👧" },
    { id: "student", label: "High School", emoji: "🎓" },
    { id: "expert", label: "Expert", emoji: "🧠" },
  ]

  return (
    <div className="bg-card/50 border border-border/30 rounded-xl p-6 backdrop-blur-sm">
      <p className="text-sm font-semibold text-foreground mb-4">Explain Like I'm...</p>
      <div className="flex gap-3">
        {levels.map((level) => (
          <button
            key={level.id}
            onClick={() => onChange(level.id)}
            className={`flex-1 py-3 px-4 rounded-lg transition-all duration-300 font-medium ${
              value === level.id
                ? "bg-linear-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25"
                : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
            }`}
          >
            <div className="text-2xl mb-1">{level.emoji}</div>
            <div className="text-sm">{level.label}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
