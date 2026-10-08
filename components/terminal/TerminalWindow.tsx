'use client'

import { useEffect, useRef } from 'react'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import 'xterm/css/xterm.css'

interface TerminalWindowProps {
  output: string[]
}

export default function TerminalWindow({ output }: TerminalWindowProps) {
  const terminalRef = useRef<HTMLDivElement>(null)
  const terminalInstanceRef = useRef<Terminal | null>(null)

  useEffect(() => {
    if (!terminalRef.current) return

    // Terminal örneğini oluştur
    const term = new Terminal({
      cursorBlink: true,
      theme: {
        background: '#050812',
        foreground: '#e0e0e0',
        cursor: '#00d9ff',
        cursorAccent: '#050812',
        selectionBackground: 'rgba(0, 217, 255, 0.3)',
      },
      fontFamily: 'Fira Code, JetBrains Mono, monospace',
      fontSize: 13,
      lineHeight: 1.4,
    })

    // Fit addon'ı ekle
    const fitAddon = new FitAddon()
    term.loadAddon(fitAddon)

    // Terminal'ı DOM'a mount et
    term.open(terminalRef.current)
    fitAddon.fit()

    // Çıktıları yazı
    output.forEach((line, index) => {
      if (index > 0) term.writeln('')
      term.write(line)
    })

    terminalInstanceRef.current = term

    // Resize handling
    const handleResize = () => {
      try {
        fitAddon.fit()
      } catch (e) {
        console.error('Terminal resize hatası:', e)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      term.dispose()
    }
  }, [output])

  return (
    <div className="flex flex-col h-full bg-darker">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-dark">
        <div className="flex items-center gap-2">
          <span className="text-success text-sm">●</span>
          <span className="text-text-secondary text-sm font-medium">Terminal</span>
        </div>
        <span className="text-xs text-text-secondary">
          Faz 3: Live Terminal Output
        </span>
      </div>

      {/* Terminal Container */}
      <div className="flex-1 overflow-hidden">
        <div
          ref={terminalRef}
          className="w-full h-full"
          style={{
            backgroundColor: '#050812',
          }}
        />
      </div>

      {/* Terminal Footer Info */}
      <div className="px-4 py-2 border-t border-border bg-dark">
        <p className="text-xs text-text-secondary">
          Faz 5'te: AI komutları, paket kurulumları ve ANSI renklendirilmesi
        </p>
      </div>
    </div>
  )
}
