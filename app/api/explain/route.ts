import { generateText } from "ai"

export async function POST(req: Request) {
  try {
    const { text, level } = await req.json()

    if (!text?.trim()) {
      return Response.json({ error: "No text provided" }, { status: 400 })
    }

    const levelPrompts = {
      kid: "Explain this in very simple terms a 5-year-old could understand. Use simple words and fun comparisons.",
      student: "Explain this clearly for a high school student. Be accurate but accessible.",
      expert: "Provide a detailed technical explanation for an expert audience.",
    }

    const basePrompt = levelPrompts[level as keyof typeof levelPrompts] || levelPrompts.student

    // Generate all explanations in parallel
    const [what, why, how, mistakes, analogy] = await Promise.all([
      generateText({
        model: "openai/gpt-4o-mini",
        prompt: `${basePrompt}\n\nText: "${text}"\n\nProvide a brief, clear answer (2-3 sentences) to: What is this?`,
        temperature: 0.7,
        // maxTokens: 150,
      }),
      generateText({
        model: "openai/gpt-4o-mini",
        prompt: `${basePrompt}\n\nText: "${text}"\n\nWhy does this matter? What's the practical importance? (2-3 sentences)`,
        temperature: 0.7,
        // maxTokens: 150,
      }),
      generateText({
        model: "openai/gpt-4o-mini",
        prompt: `${basePrompt}\n\nText: "${text}"\n\nHow does this work? Explain the mechanism or process. (2-3 sentences)`,
        temperature: 0.7,
        // maxTokens: 150,
      }),
      generateText({
        model: "openai/gpt-4o-mini",
        prompt: `${basePrompt}\n\nText: "${text}"\n\nWhat are common mistakes people make about this? (2-3 sentences)`,
        temperature: 0.7,
        // maxTokens: 150,
      }),
      generateText({
        model: "openai/gpt-4o-mini",
        prompt: `${basePrompt}\n\nText: "${text}"\n\nProvide a simple analogy that explains this concept. (1-2 sentences)`,
        temperature: 0.7,
        // maxTokens: 150,
      }),
    ])

    return Response.json({
      explanations: {
        what: what.text.trim(),
        why: why.text.trim(),
        how: how.text.trim(),
        mistakes: mistakes.text.trim(),
        analogy: analogy.text.trim(),
      },
    })
  } catch (error) {
    console.error("Error:", error)
    return Response.json({ error: "Failed to generate explanations" }, { status: 500 })
  }
}
