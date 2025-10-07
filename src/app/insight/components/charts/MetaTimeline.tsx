'use client';

import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { MetaData } from '@/types/insightTypes';
import { SupportedLanguage } from '@/types/language';

interface MetaTimelineProps {
  data: MetaData;
  language: SupportedLanguage;
}

const platformIconMap: Record<string, string> = {
  mobile: '📱',
  desktop: '💻',
  tablet: '📲',
  web: '🌐',
};

export default function MetaTimeline({ data, language }: MetaTimelineProps) {
  const isKorean = language === 'ko';
  const consistencyPercentage = Math.round((data.mood_consistency ?? 0) * 100);
  const platformIcon = platformIconMap[data.platform] || '📝';

  const weeklyLabels = [
    { ko: '월요일', en: 'Monday' },
    { ko: '화요일', en: 'Tuesday' },
    { ko: '수요일', en: 'Wednesday' },
    { ko: '목요일', en: 'Thursday' },
    { ko: '금요일', en: 'Friday' },
    { ko: '토요일', en: 'Saturday' },
    { ko: '일요일', en: 'Sunday' },
  ];

  const weeklyData = weeklyLabels.map((label, index) => ({
    day: label[language],
    words: [420, 380, 0, 510, 340, 600, data.word_count][index],
    duration: [12, 10, 0, 18, 8, 25, data.writing_duration || 15][index],
  }));

  const averageWords = (() => {
    const entries = weeklyData.filter((entry) => entry.words > 0);
    if (entries.length === 0) return 0;
    return Math.round(entries.reduce((sum, entry) => sum + entry.words, 0) / entries.length);
  })();

  const writingSpeed = data.writing_duration ? data.word_count / data.writing_duration : 0;
  const writingSpeedLabel = isKorean
    ? writingSpeed > 30
      ? '빠름'
      : writingSpeed > 20
        ? '보통'
        : '천천히'
    : writingSpeed > 30
      ? 'Fast'
      : writingSpeed > 20
        ? 'Moderate'
        : 'Slow';

  const writingSummary = isKorean
    ? data.word_count > 500
      ? ' 평소보다 상세한 기록을 남겼으며,'
      : data.word_count > 300
        ? ' 적당한 분량의 기록을 남겼으며,'
        : ' 간결한 기록을 남겼으며,'
    : data.word_count > 500
      ? ' You wrote more than usual today,'
      : data.word_count > 300
        ? ' You captured a balanced amount of detail,'
        : ' You kept today’s entry concise,';

  const speedSummary = isKorean
    ? writingSpeed > 25
      ? ' 빠른 속도로 작성했습니다.'
      : ' 신중하게 작성했습니다.'
    : writingSpeed > 25
      ? ' writing at a brisk pace.'
      : ' taking time to reflect.';

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-white text-xl font-medium mb-6">
          {isKorean ? '메타 데이터 분석' : 'Meta insights'}
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white/10 rounded-xl p-4 border border-white/20 text-center"
          >
            <div className="text-white/80 text-sm mb-2">
              {isKorean ? '작성 글자수' : 'Word count'}
            </div>
            <div className="text-2xl font-light text-white">{data.word_count}</div>
            <div className="text-white/60 text-xs">
              {isKorean ? '글자' : 'words'}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white/10 rounded-xl p-4 border border-white/20 text-center"
          >
            <div className="text-white/80 text-sm mb-2">
              {isKorean ? '작성 시간' : 'Writing time'}
            </div>
            <div className="text-2xl font-light text-white">{data.writing_duration || '--'}</div>
            <div className="text-white/60 text-xs">{isKorean ? '분' : 'minutes'}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-white/10 rounded-xl p-4 border border-white/20 text-center"
          >
            <div className="text-white/80 text-sm mb-2">
              {isKorean ? '플랫폼' : 'Platform'}
            </div>
            <div className="text-2xl mb-1">{platformIcon}</div>
            <div className="text-white text-xs capitalize">{data.platform}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="bg-white/10 rounded-xl p-4 border border-white/20 text-center"
          >
            <div className="text-white/80 text-sm mb-2">
              {isKorean ? '일관성' : 'Consistency'}
            </div>
            <div className="text-2xl font-light text-white mb-1">{consistencyPercentage}%</div>
            <div className="w-full bg-white/20 rounded-full h-1">
              <motion.div
                className="bg-green-400 h-1 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${consistencyPercentage}%` }}
                transition={{ delay: 0.8, duration: 0.8 }}
              />
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-white text-sm font-medium mb-4">
              {isKorean ? '주간 작성 패턴' : 'Weekly writing pattern'}
            </h4>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'white', fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 10 }}
                  />
                  <Bar dataKey="words" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <h4 className="text-white text-sm font-medium mb-4">
              {isKorean ? '작성 습관 분석' : 'Habit insights'}
            </h4>
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="bg-white/10 rounded-lg p-3 border border-white/20"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/80 text-sm">
                    {isKorean ? '평균 글자수' : 'Average words'}
                  </span>
                  <span className="text-white text-sm">{averageWords}</span>
                </div>
                <div className="text-white/60 text-xs">
                  {isKorean ? '오늘: ' : 'Today: '}
                  {data.word_count > averageWords
                    ? isKorean ? '평균 이상' : 'above average'
                    : isKorean ? '평균 이하' : 'below average'}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="bg-white/10 rounded-lg p-3 border border-white/20"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/80 text-sm">
                    {isKorean ? '연속 작성' : 'Writing streak'}
                  </span>
                  <span className="text-white text-sm">5</span>
                </div>
                <div className="text-white/60 text-xs">
                  {isKorean ? '이번 주 작성률: ' : 'Weekly completion: '}
                  {Math.round((weeklyData.filter((day) => day.words > 0).length / 7) * 100)}%
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="bg-white/10 rounded-lg p-3 border border-white/20"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/80 text-sm">
                    {isKorean ? '선호 시간대' : 'Preferred time'}
                  </span>
                  <span className="text-white text-sm">{isKorean ? '저녁' : 'Evening'}</span>
                </div>
                <div className="text-white/60 text-xs">
                  {isKorean ? '가장 활발한 요일: 토요일' : 'Most active day: Saturday'}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/10 rounded-xl p-4 border border-white/20">
          <h4 className="text-white text-sm font-medium mb-3">
            {isKorean ? '작성 효율' : 'Writing efficiency'}
          </h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-white/80 text-sm">
                {isKorean ? '분당 글자수' : 'Words per minute'}
              </span>
              <span className="text-white text-sm">
                {data.writing_duration ? Math.round(data.word_count / data.writing_duration) : '--'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/80 text-sm">
                {isKorean ? '작성 속도' : 'Writing pace'}
              </span>
              <span className="text-white text-sm">{writingSpeedLabel}</span>
            </div>
          </div>
        </div>

        <div className="bg-white/10 rounded-xl p-4 border border-white/20">
          <h4 className="text-white text-sm font-medium mb-3">
            {isKorean ? '디지털 습관' : 'Digital habits'}
          </h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-white/80 text-sm">
                {isKorean ? '주 플랫폼' : 'Primary platform'}
              </span>
              <span className="text-white text-sm flex items-center space-x-1">
                <span>{platformIcon}</span>
                <span className="capitalize">{data.platform}</span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/80 text-sm">
                {isKorean ? '기분 일관성' : 'Mood consistency'}
              </span>
              <span className="text-white text-sm">{consistencyPercentage}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
        <h4 className="text-white text-sm font-medium mb-2">
          {isKorean ? '메타 분석 요약' : 'Summary'}
        </h4>
        <p className="text-white/80 text-sm leading-relaxed">
          {isKorean ? '오늘 ' : 'Today you wrote '}
          {data.word_count}
          {isKorean ? '글자의 일기를 ' : ' words on '}
          {data.platform}
          {isKorean ? '에서' : ', spending '}
          {data.writing_duration ? ` ${data.writing_duration}${isKorean ? '분 동안' : ' minutes'}` : ''}
          {isKorean ? ' 작성했습니다. 기분 일관성은 ' : ' . Mood consistency is '}
          {consistencyPercentage}%
          {isKorean
            ? '로,'
            : ', suggesting '}
          {isKorean
            ? consistencyPercentage > 80
              ? ' 매우 안정적인 감정 상태를 유지하고 있습니다.'
              : consistencyPercentage > 60
                ? ' 비교적 일관된 감정 흐름을 보이고 있습니다.'
                : consistencyPercentage > 40
                  ? ' 다소 감정의 파동이 있습니다.'
                  : ' 감정 기복이 큰 하루였습니다.'
            : consistencyPercentage > 80
              ? ' a very steady emotional rhythm.'
              : consistencyPercentage > 60
                ? ' a mostly consistent emotional rhythm.'
                : consistencyPercentage > 40
                  ? ' some emotional variability.'
                  : ' noticeable emotional swings today.'}
          {writingSummary}
          {speedSummary}
        </p>
      </div>
    </div>
  );
}
