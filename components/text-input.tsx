"use client"

import { Button } from "@/components/ui/button"
import { useRef, useState } from "react"

interface TextInputProps {
  value: string
  onChange: (value: string) => void
  onExplain: () => void
  isLoading?: boolean
}

export function TextInput({ value, onChange, onExplain, isLoading }: TextInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [floatingCard, setFloatingCard] = useState<{ text: string; x: number; y: number } | null>(null)

  const handleTextSelection = () => {
    const selection = window.getSelection()?.toString()
    if (selection && selection.length > 3) {
      const range = window.getSelection()?.getRangeAt(0)
      if (range) {
        const rect = range.getBoundingClientRect()
        setFloatingCard({
          text: selection,
          x: rect.left + window.scrollX,
          y: rect.top + window.scrollY - 60,
        })
      }
    }
  }

  return (
    <div className="relative">
      <div className="relative group">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onMouseUp={handleTextSelection}
          placeholder="Paste any text here... Try pasting an article, code snippet, or anything you want explained."
          className="w-full h-48 p-6 rounded-xl bg-card border border-border/50 text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all duration-300 font-mono text-sm leading-relaxed"
        />
        <div className="absolute inset-0 rounded-xl bg-linear-to-r from-cyan-500/0 via-cyan-500/0 to-cyan-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
      </div>

      {/* Floating explanation card for selected text */}
      {floatingCard && (
        <div
          className="fixed bg-card border border-cyan-500/30 rounded-lg p-3 shadow-xl z-50 animate-fade-in"
          style={{ left: `${floatingCard.x}px`, top: `${floatingCard.y}px` }}
        >
          <p className="text-xs text-muted-foreground mb-2">Quick explanation</p>
          <p className="text-sm font-medium text-foreground mb-2">{floatingCard.text}</p>
          <button
            onClick={() => {
              onChange(floatingCard.text)
              setFloatingCard(null)
            }}
            className="text-xs bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 px-3 py-1 rounded transition-colors"
          >
            Explain This
          </button>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 mt-6 flex-wrap">
        <Button
          onClick={onExplain}
          disabled={!value.trim() || isLoading}
          className="flex-1 md:flex-initial bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Explaining..." : "Explain It"}
        </Button>
        <Button
          variant="outline"
          onClick={() => onChange("")}
          className="flex-1 md:flex-initial border-border/50 hover:bg-muted/50 py-6 rounded-xl transition-all duration-300"
        >
          Clear
        </Button>
      </div>
    </div>
  )
}
