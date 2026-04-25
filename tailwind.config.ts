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
        peach: '#FFB082'
      },
      borderRadius: {
        soft: '24px'
      },
      boxShadow: {
        neu: '8px 8px 24px rgba(16,24,40,0.10), -8px -8px 24px rgba(255,255,255,0.90)',
        neuInset: 'inset 5px 5px 14px rgba(16,24,40,0.10), inset -5px -5px 14px rgba(255,255,255,0.95)'
      }
    }
  },
  plugins: []
};

export default config;
