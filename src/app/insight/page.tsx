'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useInsightStore } from './store/insightState';
import { getSectionSummary, getMockInsightData } from './utils/parseInsightData';
import { SectionType } from '@/types/insightTypes';
import InsightCard from './components/InsightCard';
import InsightDetail from './components/InsightDetail';
import { useLanguage } from '@/context/LanguageContext';

const sections: SectionType[] = [
  'emotion', 'goal', 'cognitive', 'relation',
  'temporal', 'identity', 'growth', 'meta'
];

export default function InsightPage() {
  const router = useRouter();
  const {
    insights,
    activeSection,
    setActiveSection,
    setInsights,
    error,
    setError
  } = useInsightStore();
  const { language } = useLanguage();
  const isKorean = language === 'ko';
  const labels = isKorean
    ? {
        errorTitle: '오류가 발생했습니다',
        errorButton: '다시 시도',
        loading: '인사이트를 로딩 중...',
        headingSubtitleDefault: '당신의 하루를 8가지 관점에서 분석했습니다',
        headingSubtitleDetail: '상세 분석',
        backToList: '← 인사이트 목록',
        backToHome: '← 새 일기 작성',
        cardsHint: '각 카드를 클릭하면 더 자세한 분석을 볼 수 있습니다',
      }
    : {
        errorTitle: 'An error occurred',
        errorButton: 'Try again',
        loading: 'Loading insights...',
        headingSubtitleDefault: 'We analyzed your day from eight perspectives',
        headingSubtitleDetail: 'Detailed analysis',
        backToList: '← Back to insights',
        backToHome: '← Write a new diary',
        cardsHint: 'Select any card to explore the detailed insights',
      };

  useEffect(() => {
    if (!insights) {
      const mockData = getMockInsightData();
      setInsights(mockData);
    }
  }, [insights, setInsights]);

  const handleCardClick = (section: SectionType) => {
    setActiveSection(section);
  };

  const handleBackToCards = () => {
    setActiveSection(null);
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-light mb-4">{labels.errorTitle}</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <button
            onClick={() => {
              setError(null);
              router.push('/');
            }}
            className="px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors"
          >
            {labels.errorButton}
          </button>
        </div>
      </div>
    );
  }

  if (!insights) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-300">{labels.loading}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <motion.h1
                className="text-4xl md:text-6xl font-light mb-2"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Insight
                <span className="text-purple-400">.</span>
              </motion.h1>
              <motion.p
                className="text-gray-300 text-lg"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                {activeSection ? labels.headingSubtitleDetail : labels.headingSubtitleDefault}
              </motion.p>
            </div>

            <motion.button
              onClick={activeSection ? handleBackToCards : handleBackToHome}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 transition-all"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeSection ? labels.backToList : labels.backToHome}
            </motion.button>
          </div>

          <AnimatePresence mode="wait">
            {!activeSection ? (
              <motion.div
                key="cards"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {sections.map((section, index) => (
                  <InsightCard
                    key={section}
                    section={section}
                    summary={getSectionSummary(insights, section, language)}
                    onClick={() => handleCardClick(section)}
                    index={index}
                    language={language}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="detail"
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -30 }}
                transition={{ duration: 0.6, type: "spring", damping: 20 }}
              >
                <InsightDetail
                  section={activeSection}
                  data={insights}
                  onBack={handleBackToCards}
                  language={language}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {!activeSection && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mt-12 text-center"
            >
              <p className="text-gray-400 text-sm">
                {labels.cardsHint}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
