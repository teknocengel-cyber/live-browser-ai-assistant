import { NextRequest, NextResponse } from 'next/server'

// OpenRouter chat completions endpoint (OpenAI uyumlu)
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'

// Varsayılan model; OPENROUTER_MODEL env değişkeniyle değiştirilebilir
const DEFAULT_MODEL = 'openrouter/auto'

const SYSTEM_PROMPT =
  'Sen Live Browser & Terminal AI Assistant\'sın. Kullanıcıya Türkçe, kısa ve net yanıt ver. ' +
  'Şu an yalnızca sohbet edebiliyorsun; tarayıcı ve terminal kontrolü Faz 3 ve Faz 5\'te eklenecek.'

/**
 * POST /api/ai/chat
 * Kullanıcı mesajını OpenRouter'a gönderir ve yanıtı döner.
 * Gerekli env: OPENROUTER_API_KEY (Vercel > Settings > Environment Variables)
 */
export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message || !message.trim()) {
      return NextResponse.json({ error: 'Mesaj boş olamaz' }, { status: 400 })
    }

    const apiKey = process.env.OPENROUTER_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { reply: 'OPENROUTER_API_KEY tanımlı değil. Vercel ortam değişkenlerine ekleyin.' },
        { status: 500 }
      )
    }

    const upstream = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://live-browser-ai-assistant.vercel.app',
        'X-Title': 'Live Browser AI Assistant',
      },
      body: JSON.stringify({
        model: process.env.OPENROUTER_MODEL || DEFAULT_MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: message },
        ],
      }),
    })

    if (!upstream.ok) {
      const detail = await upstream.text()
      console.error('OpenRouter hatası:', upstream.status, detail)
      return NextResponse.json(
        { reply: `OpenRouter hatası (${upstream.status}). Logları kontrol edin.` },
        { status: 502 }
      )
    }

    const data = await upstream.json()
    const reply: string = data?.choices?.[0]?.message?.content ?? 'Yanıt alınamadı.'

    return NextResponse.json({ reply, model: data?.model ?? null }, { status: 200 })
  } catch (error) {
    console.error('Chat API hatası:', error)
    return NextResponse.json({ error: 'İç sunucu hatası' }, { status: 500 })
  }
}

/**
 * GET /api/ai/chat
 * Health check; API anahtarının tanımlı olup olmadığını gösterir (değerini değil).
 */
export async function GET() {
  return NextResponse.json({
    message: 'Chat API çalışıyor',
    openrouterConfigured: Boolean(process.env.OPENROUTER_API_KEY),
    model: process.env.OPENROUTER_MODEL || DEFAULT_MODEL,
  })
}
