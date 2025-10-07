'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useInsightStore } from './insight/store/insightState';
import { analyzeDiaryEntry } from './insight/utils/openaiClient';

export default function Home() {
  const [diaryText, setDiaryText] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const router = useRouter();
  const { setInsights, setCurrentEntry, setApiKey: storeApiKey, setError, setLoading } = useInsightStore();

  const handleAnalyze = async () => {
    if (!diaryText.trim() || !apiKey.trim()) {
      setError('일기 내용과 API Key를 모두 입력해주세요.');
      return;
    }

    setIsAnalyzing(true);
    setLoading(true);
    setError(null);

    try {
      const insights = await analyzeDiaryEntry(diaryText, apiKey);
      const entry = {
        id: Date.now().toString(),
        content: diaryText,
        date: new Date().toISOString(),
        insights
      };

      setInsights(insights);
      setCurrentEntry(entry);
      storeApiKey(apiKey);
      router.push('/insight');
    } catch (error) {
      setError(error instanceof Error ? error.message : '분석 중 오류가 발생했습니다.');
    } finally {
      setIsAnalyzing(false);
      setLoading(false);
    }
  };

  const handleDemo = () => {
    setDiaryText(`오늘은 정말 의미 있는 하루였다. 아침에 일찍 일어나서 운동을 하고, 가족과 함께 아침을 먹었다.
아버지와 오랜만에 깊은 대화를 나눴는데, 내가 최근에 고민하고 있던 진로 문제에 대해 많은 조언을 해주셨다.

오후에는 새로 시작한 프로젝트에 집중했다. 처음엔 막막했지만, 차근차근 계획을 세우고 하나씩 해결해나가니 점점 재미있어졌다. 특히 새로운 기술을 배우는 과정에서 성취감을 많이 느꼈다.

저녁에는 친구들과 만나서 오랜만에 수다를 떨었다. 서로의 근황을 나누고, 함께 웃으며 스트레스도 많이 풀렸다. 이런 소소한 행복이 정말 소중하다는 걸 다시 한번 느꼈다.

요즘 들어 감사할 일들이 많다는 생각이 든다. 건강하고, 사랑하는 사람들이 곁에 있고, 하고 싶은 일을 할 수 있는 환경이 있다는 것만으로도 충분히 행복하다.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <motion.h1
              className="text-6xl md:text-8xl font-light mb-6 tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Un
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Looped
              </span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              나의 하루를 쓰면, 나를 이해하는 데이터가 된다
              <br />
              <span className="text-lg text-gray-400 mt-4 block">
                AI 기반 자기성찰 플랫폼
              </span>
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="space-y-8"
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  OpenAI API Key
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-..."
                  className="w-full px-4 py-3 bg-white/10 rounded-xl border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                />
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-300">
                    오늘의 일기
                  </label>
                  <button
                    onClick={handleDemo}
                    className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    데모 텍스트 불러오기
                  </button>
                </div>
                <textarea
                  value={diaryText}
                  onChange={(e) => setDiaryText(e.target.value)}
                  placeholder="오늘 하루는 어떠셨나요? 자유롭게 적어보세요..."
                  rows={12}
                  className="w-full px-4 py-3 bg-white/10 rounded-xl border border-white/20 text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                />
                <div className="text-xs text-gray-400 mt-2 text-right">
                  {diaryText.length} 글자
                </div>
              </div>

              <motion.button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !diaryText.trim() || !apiKey.trim()}
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-600 disabled:to-gray-600 rounded-xl font-medium text-white transition-all duration-300 disabled:cursor-not-allowed"
                whileHover={!isAnalyzing ? { scale: 1.02 } : {}}
                whileTap={!isAnalyzing ? { scale: 0.98 } : {}}
              >
                {isAnalyzing ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>분석 중...</span>
                  </div>
                ) : (
                  '인사이트 분석하기'
                )}
              </motion.button>
            </div>

            <div className="text-center">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                {['감정', '목표', '사고패턴', '관계', '시간리듬', '정체성', '성장', '메타'].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                    className="bg-white/5 rounded-lg p-3 border border-white/10"
                  >
                    <span className="text-sm text-gray-300">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
