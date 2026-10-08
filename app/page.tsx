'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import ChatPanel from '@/components/chat/ChatPanel'
import BrowserWindow from '@/components/browser/BrowserWindow'

// Dinamik import xterm.js için
const TerminalWindow = dynamic(() => import('@/components/terminal/TerminalWindow'), {
  ssr: false,
})

export default function Home() {
  const [browserUrl, setBrowserUrl] = useState('https://example.com')
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    '$ Live Browser AI Assistant v0.1.0',
    '$ Hoş geldiniz! (Welcome!)',
    '$ Type your command...',
  ])

  return (
    <div className="split-layout">
      {/* Sol Panel - Chat */}
      <div className="split-left">
        <ChatPanel
          onBrowserNavigate={setBrowserUrl}
          onTerminalCommand={(cmd) => {
            setTerminalOutput(prev => [...prev, `$ ${cmd}`])
          }}
        />
      </div>

      {/* Sağ Panel - Browser ve Terminal */}
      <div className="split-right">
        {/* Sağ Üst - Live Browser */}
        <div className="split-right-top">
          <BrowserWindow url={browserUrl} />
        </div>

        {/* Sağ Alt - Terminal */}
        <div className="split-right-bottom">
          <TerminalWindow output={terminalOutput} />
        </div>
      </div>
    </div>
  )
}
