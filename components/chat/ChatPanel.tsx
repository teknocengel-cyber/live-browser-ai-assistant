'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface ChatPanelProps {
  onBrowserNavigate: (url: string) => void
  onTerminalCommand: (command: string) => void
}

export default function ChatPanel({ onBrowserNavigate, onTerminalCommand }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Merhaba! Ben Live Browser AI Assistant\'ım. Size nasıl yardımcı olabilirim?',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    // User message'i ekle
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      // API'ye gönder (Faz 5'te AI entegrasyonu yapılacak)
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, context: { browserUrl: 'current' } }),
      }).catch(() => ({
        ok: false,
        json: async () => ({ reply: 'API bağlantısı kurulmadı. Lütfen Faz 5\'ı bekleyin.' }),
      }))

      const data = await response.json()

      // Assistant message'i ekle
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: data.reply || 'Yanıt alınamadı.',
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, assistantMessage])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full bg-darker px-4 py-4">
      {/* Header */}
      <div className="mb-4 pb-4 border-b border-border">
        <h1 className="text-xl font-bold text-accent">Live Browser AI</h1>
        <p className="text-xs text-text-secondary mt-1">v0.1.0 - Faz 1</p>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                msg.role === 'user'
                  ? 'bg-accent text-dark font-medium'
                  : 'bg-border text-text-primary'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-border text-text-primary px-3 py-2 rounded-lg text-sm">
              <span className="animate-pulse">Yazıyor...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSendMessage} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Komut girin..."
          className="flex-1 bg-dark border border-border rounded px-3 py-2 text-sm text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="bg-accent text-dark font-medium px-4 py-2 rounded text-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Gönder
        </button>
      </form>
    </div>
  )
}
