import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        cloud: '#F5F7FB',
        slateInk: '#344054',
        mint: '#4BD4B0',
        peach: '#FFB082',
        // MEMBRA-inspired terminal palette
        terminalBg: '#0A0A0B',
        terminalSurface: '#111113',
        terminalBorder: '#1F1F23',
        terminalGold: '#C9A962',
        terminalGoldMuted: '#8B7355',
        terminalText: '#E8E6E3',
        terminalMuted: '#6B6B6B',
        terminalSuccess: '#4BD4B0',
        terminalError: '#FF6B6B',
        terminalWarning: '#FFB082'
      },
      borderRadius: {
        soft: '24px'
      },
      boxShadow: {
        neu: '8px 8px 24px rgba(16,24,40,0.10), -8px -8px 24px rgba(255,255,255,0.90)',
        neuInset: 'inset 5px 5px 14px rgba(16,24,40,0.10), inset -5px -5px 14px rgba(255,255,255,0.95)',
        terminalGlow: '0 0 20px rgba(201,169,98,0.15)',
        terminalInset: 'inset 0 1px 0 rgba(255,255,255,0.03)'
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', 'monospace']
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'terminal-blink': 'blink 1s step-end infinite'
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' }
        }
      }
    }
  },
  plugins: []
};

export default config;
