export const runtime = "nodejs"  // This line is mandatory for Vite projects

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const { GoogleGenerativeAI } = await import("@google/generative-ai")
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const { prompt } = JSON.parse(req.body)

    const result = await model.generateContent(prompt)

    res.status(200).json({ text: result.response.text() })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Gemini failed" })
  }
}
