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
        cloud: '#E9ECF4',
        nightCloud: '#DDE3EF',
        slateInk: '#1F2937',
        mint: '#4BD4B0',
        peach: '#FFB082'
      },
      borderRadius: {
        soft: '28px'
      },
      boxShadow: {
        neu: '14px 14px 34px rgba(15, 23, 42, 0.28), -14px -14px 34px rgba(255,255,255,0.8)',
        neuInset: 'inset 7px 7px 18px rgba(15, 23, 42, 0.2), inset -7px -7px 18px rgba(255,255,255,0.75)',
        glass: '0 8px 30px rgba(15, 23, 42, 0.22)'
      }
    }
  },
  plugins: []
};

export default config;
