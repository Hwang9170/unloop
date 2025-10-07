'use client';

import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';

export default function LanguageSwitcher() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <motion.button
      type="button"
      onClick={toggleLanguage}
      className="fixed top-6 right-6 z-50 px-3 py-2 text-xs md:text-sm rounded-full border border-white/20 bg-white/10 backdrop-blur text-white hover:bg-white/20 transition-colors"
      whileTap={{ scale: 0.95 }}
      aria-label={language === 'ko' ? '언어를 영어로 변경' : 'Switch language to Korean'}
    >
      {language === 'ko' ? '한국어 / English' : 'English / 한국어'}
    </motion.button>
  );
}
