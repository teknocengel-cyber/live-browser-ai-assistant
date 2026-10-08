'use client'

import { useState } from 'react'

interface BrowserWindowProps {
  url: string
}

export default function BrowserWindow({ url }: BrowserWindowProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [currentUrl, setCurrentUrl] = useState(url)

  const handleNavigate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newUrl = formData.get('url') as string

    if (newUrl) {
      setIsLoading(true)
      setCurrentUrl(newUrl)
      // Simulate loading
      setTimeout(() => setIsLoading(false), 1000)
    }
  }

  return (
    <div className="flex flex-col h-full bg-darker">
      {/* Browser Address Bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-dark">
        <button
          className="px-3 py-1 text-accent hover:opacity-80 disabled:opacity-50"
          disabled
          title="Geri (Faz 3'te aktif olacak)"
        >
          ←
        </button>
        <button
          className="px-3 py-1 text-accent hover:opacity-80 disabled:opacity-50"
          disabled
          title="İleri (Faz 3'te aktif olacak)"
        >
          →
        </button>

        <form onSubmit={handleNavigate} className="flex-1 flex gap-2">
          <input
            type="text"
            name="url"
            defaultValue={currentUrl}
            placeholder="URL girin..."
            className="flex-1 bg-darker border border-border rounded px-3 py-1 text-sm text-text-primary focus:outline-none focus:border-accent"
          />
          <button
            type="submit"
            className="bg-accent text-dark font-medium px-3 py-1 rounded text-sm hover:opacity-90"
          >
            Git
          </button>
        </form>

        {isLoading && (
          <div className="flex items-center gap-2 px-3 text-xs text-success">
            <span className="animate-pulse">●</span>
            Yükleniyor...
          </div>
        )}
      </div>

      {/* Browser Content Area */}
      <div className="flex-1 flex items-center justify-center bg-darker overflow-hidden relative">
        {/* Placeholder - Faz 3'te Playwright CDP Screencast bağlanacak */}
        <div className="text-center">
          <div className="text-6xl mb-4 opacity-50">🔄</div>
          <p className="text-text-secondary text-sm mb-2">Live Browser Engine</p>
          <p className="text-xs text-text-secondary">
            Faz 3: Playwright CDP Screencast entegrasyonu
          </p>
          <p className="text-xs text-warning mt-4">
            Şu anda iframe ile basit sayfa gösterimi (Demo)
          </p>
        </div>

        {/* Fallback - Basic iframe (Demo purposes) */}
        <iframe
          src={currentUrl}
          className="absolute inset-0 w-full h-full border-none"
          title="Browser Preview"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false)
            console.warn(`URL yüklenemedi: ${currentUrl}`)
          }}
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      </div>
    </div>
  )
}
