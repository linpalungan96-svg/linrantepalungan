import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Server-Side Gemini Initialization
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// API Routes
app.post('/api/gemini/generate', async (req, res) => {
  try {
    const { prompt, systemInstruction } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    if (!ai) {
      // Fallback message if API key is not yet set in environment
      return res.status(503).json({
        error: 'GEMINI_API_KEY belum dikonfigurasi di environment server. Pastikan API key terdaftar.',
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction || 'Anda adalah Konsultan Ahli Kurikulum Merdeka dan Pengembang Pembelajaran Mendalam (Deep Learning) resmi Kemendikdasmen RI berlandaskan SK BSKAP No. 046/H/KR/2025.',
        temperature: 0.7,
      },
    });

    return res.json({ text: response.text });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({
      error: error?.message || 'Terjadi kesalahan saat memproses permintaan AI.',
    });
  }
});

app.post('/api/gemini/chat', async (req, res) => {
  try {
    const { message, history, systemInstruction } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!ai) {
      return res.status(503).json({
        error: 'GEMINI_API_KEY belum dikonfigurasi di environment server.',
      });
    }

    // Build chat contents from history + current message
    const formattedContents = [];
    if (Array.isArray(history) && history.length > 0) {
      for (const item of history) {
        formattedContents.push({
          role: item.role === 'user' ? 'user' : 'model',
          parts: [{ text: item.text }],
        });
      }
    }
    formattedContents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: formattedContents,
      config: {
        systemInstruction: systemInstruction || 'Anda adalah Konsultan Ahli Kurikulum Merdeka (SK BSKAP 046/H/KR/2025) & Sahabat Guru Pembelajaran Mendalam (Mindful, Meaningful, Joyful Learning). Berikan jawaban yang ramah, solutif, berbasis regulasi, dan praktis diaplikasikan di kelas.',
        temperature: 0.7,
      },
    });

    return res.json({ text: response.text });
  } catch (error: any) {
    console.error('Gemini Chat Error:', error);
    return res.status(500).json({
      error: error?.message || 'Gagal memproses percakapan konsultasi.',
    });
  }
});

// Vite middleware in dev or static files in production
async function setupViteOrStatic() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }
}

setupViteOrStatic().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
