import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
      'process.env.WHATSAPP_TOKEN': JSON.stringify(env.WHATSAPP_TOKEN)
    }
  };
});
async function askGemini(prompt) {
  const response = await fetch("/api/gemini", {
    method: "POST",
    body: JSON.stringify({ prompt })
  })

  const data = await response.json()
  return data.text
}

// Example usage
askGemini("Write a short motivational quote").then(console.log)
