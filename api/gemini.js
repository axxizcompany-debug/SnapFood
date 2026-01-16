export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    // Import Gemini SDK
    const { GoogleGenerativeAI } = await import("@google/generative-ai")
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    // Get prompt from request body
    const { prompt } = JSON.parse(req.body)

    // Optional: Add instruction layer for Gemini behavior
    const adjustedPrompt = Respond concisely and clearly:\n\nUser asked: ${prompt}

    // Call Gemini
    const result = await model.generateContent(adjustedPrompt)

    // Send back the response
    res.status(200).json({ text: result.response.text() })
  } catch (error) {
    console.error("Gemini Error:", error)
    res.status(500).json({ error: "Gemini failed" })
  }
}
