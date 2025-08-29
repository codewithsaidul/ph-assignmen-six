// tailwind.config.js

/** @type {import('tailwindcss').Config} */
const config = {
  // ... আপনার অন্যান্য কনফিগারেশন
  theme: {
    extend: {
      // ... আপনার অন্যান্য extend
      keyframes: {
        // ধাপ ২.১: CSS-এ তৈরি করা keyframe-গুলোকে এখানে রেজিস্টার করুন
        pulse: {
          '50%': { opacity: '0.7' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
      },
      animation: {
        // ধাপ ২.২: keyframe-গুলোকে ব্যবহার করে নতুন অ্যানিমেশন ক্লাস তৈরি করুন
        'pulse-soft': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-subtle': 'bounce-subtle 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;