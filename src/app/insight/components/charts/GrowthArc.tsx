'use client';

import { motion } from 'framer-motion';
import { XAxis, YAxis, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { GrowthData } from '@/types/insightTypes';
import { SupportedLanguage } from '@/types/language';

interface GrowthArcProps {
  data: GrowthData;
  language: SupportedLanguage;
}

const challengeColors: Record<string, string> = {
  적극적: '#10B981',
  active: '#10B981',
  보통: '#F59E0B',
  moderate: '#F59E0B',
  소극적: '#EF4444',
  passive: '#EF4444',
  회피적: '#6B7280',
  avoidant: '#6B7280',
};

const timelineLabels = [
  { ko: '1주전', en: '7 days ago' },
  { ko: '6일전', en: '6 days ago' },
  { ko: '5일전', en: '5 days ago' },
  { ko: '4일전', en: '4 days ago' },
  { ko: '3일전', en: '3 days ago' },
  { ko: '2일전', en: '2 days ago' },
  { ko: '어제', en: 'Yesterday' },
  { ko: '오늘', en: 'Today' },
];

export default function GrowthArc({ data, language }: GrowthArcProps) {
  const isKorean = language === 'ko';
  const reflectionPercentage = Math.round((data.reflection ?? 0) * 100);
  const stabilityPercentage = Math.round((data.stability ?? 0) * 100);
  const challengeColor = challengeColors[data.challenge_response] || challengeColors[data.challenge_response?.toLowerCase() ?? ''] || '#6B7280';

  const mockTimelineData = timelineLabels.map((label, index) => ({
    date: label[language],
    reflection: index === timelineLabels.length - 1 ? reflectionPercentage : [40, 45, 50, 60, 65, 70, 75][index] ?? reflectionPercentage,
    stability: index === timelineLabels.length - 1 ? stabilityPercentage : [60, 65, 55, 70, 75, 68, 72][index] ?? stabilityPercentage,
  }));

  const learningAttitude = (() => {
    if (data.learning_mentions > 3) return isKorean ? '적극적' : 'Proactive';
    if (data.learning_mentions > 1) return isKorean ? '보통' : 'Moderate';
    return isKorean ? '소극적' : 'Passive';
  })();

  const reflectionVsStability = reflectionPercentage > stabilityPercentage
    ? isKorean
      ? ' 성찰적 사고가 감정 안정성보다 높아 자기 개발에 적극적인 상태입니다.'
      : ' Reflection is outpacing emotional stability, signaling an active growth phase.'
    : isKorean
      ? ' 감정적 안정성이 높아 균형잡힌 성장을 보이고 있습니다.'
      : ' Emotional stability leads, indicating a balanced growth rhythm.';

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-white text-xl font-medium mb-6">
          {isKorean ? '성장 지표' : 'Growth metrics'}
        </h3>

        <div className="h-64 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockTimelineData}>
              <defs>
                <linearGradient id="reflectionGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="stabilityGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'white', fontSize: 10 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 10 }}
                domain={[0, 100]}
              />
              <Area
                type="monotone"
                dataKey="reflection"
                stroke="#8B5CF6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#reflectionGradient)"
              />
              <Area
                type="monotone"
                dataKey="stability"
                stroke="#06B6D4"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#stabilityGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white/10 rounded-xl p-4 border border-white/20 text-center"
          >
            <div className="text-white/80 text-sm mb-2">
              {isKorean ? '반성도' : 'Reflection'}
            </div>
            <div className="text-2xl font-light text-white mb-2">{reflectionPercentage}%</div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <motion.div
                className="bg-purple-400 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${reflectionPercentage}%` }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white/10 rounded-xl p-4 border border-white/20 text-center"
          >
            <div className="text-white/80 text-sm mb-2">
              {isKorean ? '안정성' : 'Stability'}
            </div>
            <div className="text-2xl font-light text-white mb-2">{stabilityPercentage}%</div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <motion.div
                className="bg-cyan-400 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${stabilityPercentage}%` }}
                transition={{ delay: 0.7, duration: 0.8 }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-white/10 rounded-xl p-4 border border-white/20 text-center"
          >
            <div className="text-white/80 text-sm mb-2">
              {isKorean ? '학습 언급' : 'Learning mentions'}
            </div>
            <div className="text-2xl font-light text-white">{data.learning_mentions}</div>
            <div className="text-white/60 text-xs">{isKorean ? '회' : 'times'}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="bg-white/10 rounded-xl p-4 border border-white/20 text-center"
          >
            <div className="text-white/80 text-sm mb-2">
              {isKorean ? '도전 대응' : 'Response to challenge'}
            </div>
            <div
              className="w-6 h-6 rounded-full mx-auto mb-1"
              style={{ backgroundColor: challengeColor }}
            />
            <div className="text-white text-sm">{data.challenge_response}</div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="bg-white/10 rounded-xl p-4 border border-white/20"
          >
            <h4 className="text-white text-sm font-medium mb-3">
              {isKorean ? '성장 지수' : 'Growth index'}
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white/80 text-sm">
                  {isKorean ? '자기성찰' : 'Self-reflection'}
                </span>
                <div className="flex items-center space-x-2">
                  <div className="w-12 bg-white/20 rounded-full h-1">
                    <div
                      className="bg-purple-400 h-1 rounded-full"
                      style={{ width: `${reflectionPercentage}%` }}
                    />
                  </div>
                  <span className="text-white text-xs w-8">{reflectionPercentage}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/80 text-sm">
                  {isKorean ? '감정 안정' : 'Emotional balance'}
                </span>
                <div className="flex items-center space-x-2">
                  <div className="w-12 bg-white/20 rounded-full h-1">
                    <div
                      className="bg-cyan-400 h-1 rounded-full"
                      style={{ width: `${stabilityPercentage}%` }}
                    />
                  </div>
                  <span className="text-white text-xs w-8">{stabilityPercentage}%</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="bg-white/10 rounded-xl p-4 border border-white/20"
          >
            <h4 className="text-white text-sm font-medium mb-3">
              {isKorean ? '성장 패턴' : 'Growth pattern'}
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white/80 text-sm">
                  {isKorean ? '학습 태도' : 'Learning attitude'}
                </span>
                <span className="text-white text-sm">{learningAttitude}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/80 text-sm">
                  {isKorean ? '변화 수용' : 'Change response'}
                </span>
                <span className="text-white text-sm">{data.challenge_response}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
        <h4 className="text-white text-sm font-medium mb-2">
          {isKorean ? '성장 분석' : 'Growth analysis'}
        </h4>
        <p className="text-white/80 text-sm leading-relaxed">
          {isKorean ? '현재 자기성찰 수준은 ' : 'Your current reflection level sits at '}
          {reflectionPercentage}%
          {isKorean ? '이며, 감정 안정성은 ' : ' and emotional stability is '}
          {stabilityPercentage}%
          {isKorean ? '를 보이고 있습니다. 일기에서 학습과 관련된 언급은 ' : '. Your diary mentions learning '}
          {data.learning_mentions}
          {isKorean ? '회 나타났으며, 도전에 대한 대응 방식은 ' : ' times, and your challenge response feels '}
          <strong>{data.challenge_response}</strong>
          {isKorean ? '적입니다.' : '.'}
          {reflectionVsStability}
        </p>
      </div>
    </div>
  );
}
