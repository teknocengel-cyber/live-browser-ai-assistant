import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/ai/chat
 * Chat endpoint - Faz 5'te Gemini/Groq API ile bağlanacak
 */
export async function POST(request: NextRequest) {
  try {
    const { message, context } = await request.json()

    if (!message || !message.trim()) {
      return NextResponse.json(
        { error: 'Mesaj boş olamaz' },
        { status: 400 }
      )
    }

    // Faz 5'te burada AI API çağrısı yapılacak
    // Şu anda placeholder yanıt dön
    const reply = `[Faz 5 Placeholder] "${message}" mesajınız alındı. AI modeli Faz 5'te entegre edilecektir.`

    return NextResponse.json(
      { reply, status: 'ok', phase: 'Phase 5 (Pending)' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Chat API hatası:', error)
    return NextResponse.json(
      { error: 'İç sunucu hatası' },
      { status: 500 }
    )
  }
}

/**
 * GET /api/ai/chat
 * Health check
 */
export async function GET() {
  return NextResponse.json({
    message: 'Chat API çalışıyor',
    phase: 'Phase 1 - UI Setup',
    nextPhase: 'Phase 5 - AI Integration',
  })
}
