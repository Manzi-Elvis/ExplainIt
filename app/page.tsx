"use client"

import { useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { TextInput } from "@/components/text-input"
import { ExplanationCards } from "@/components/explanation-cards"
import { ConfidenceSlider } from "@/components/confidence-slider"
import { LoadingState } from "@/components/loading-state"

export default function Home() {
  const [text, setText] = useState("")
  const [explanations, setExplanations] = useState<Record<string, string> | null>(null)
  const [loading, setLoading] = useState(false)
  const [confidence, setConfidence] = useState("student")
  const [selectedText, setSelectedText] = useState("")
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  const handleExplain = async (inputText: string) => {
    if (!inputText.trim()) return

    setLoading(true)
    try {
      const response = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText, level: confidence }),
      })
      const data = await response.json()
      setExplanations(data.explanations)
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background transition-colors duration-500">
      <div className="fixed top-0 right-0 p-6 z-10">
        <ThemeToggle />
      </div>

      <div className="relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 bg-clip-text text-transparent">
              ExplainIt
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Understand any text instantly with AI-powered explanations tailored to your level
            </p>
          </div>

          {/* Main Input Section */}
          <div className="mb-8 animate-fade-in-up">
            <TextInput value={text} onChange={setText} onExplain={() => handleExplain(text)} isLoading={loading} />
          </div>

          {/* Confidence Slider */}
          {text && (
            <div className="mb-8 animate-fade-in-up">
              <ConfidenceSlider value={confidence} onChange={setConfidence} />
            </div>
          )}

          {/* Loading State */}
          {loading && <LoadingState />}

          {/* Explanations */}
          {explanations && !loading && (
            <ExplanationCards explanations={explanations} expandedCard={expandedCard} onToggle={setExpandedCard} />
          )}
        </div>
      </div>
    </div>
  )
}
