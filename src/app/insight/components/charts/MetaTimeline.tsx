'use client';

import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { MetaData } from '@/types/insightTypes';

interface MetaTimelineProps {
  data: MetaData;
}

export default function MetaTimeline({ data }: MetaTimelineProps) {
  const consistencyPercentage = Math.round(data.mood_consistency * 100);

  const weeklyData = [
    { day: '월', words: 420, duration: 12 },
    { day: '화', words: 380, duration: 10 },
    { day: '수', words: 0, duration: 0 },
    { day: '목', words: 510, duration: 18 },
    { day: '금', words: 340, duration: 8 },
    { day: '토', words: 600, duration: 25 },
    { day: '일', words: data.word_count, duration: data.writing_duration || 15 }
  ];

  const platformIcon = {
    mobile: '📱',
    desktop: '💻',
    tablet: '📲',
    web: '🌐'
  }[data.platform] || '📝';

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-white text-xl font-medium mb-6">메타 데이터 분석</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white/10 rounded-xl p-4 border border-white/20 text-center"
          >
            <div className="text-white/80 text-sm mb-2">작성 글자수</div>
            <div className="text-2xl font-light text-white">{data.word_count}</div>
            <div className="text-white/60 text-xs">글자</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white/10 rounded-xl p-4 border border-white/20 text-center"
          >
            <div className="text-white/80 text-sm mb-2">작성 시간</div>
            <div className="text-2xl font-light text-white">{data.writing_duration || '--'}</div>
            <div className="text-white/60 text-xs">분</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-white/10 rounded-xl p-4 border border-white/20 text-center"
          >
            <div className="text-white/80 text-sm mb-2">플랫폼</div>
            <div className="text-2xl mb-1">{platformIcon}</div>
            <div className="text-white text-xs capitalize">{data.platform}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="bg-white/10 rounded-xl p-4 border border-white/20 text-center"
          >
            <div className="text-white/80 text-sm mb-2">일관성</div>
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
            <h4 className="text-white text-sm font-medium mb-4">주간 작성 패턴</h4>
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
                  <Bar
                    dataKey="words"
                    fill="#8B5CF6"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <h4 className="text-white text-sm font-medium mb-4">작성 습관 분석</h4>
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="bg-white/10 rounded-lg p-3 border border-white/20"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/80 text-sm">평균 글자수</span>
                  <span className="text-white text-sm">
                    {Math.round(weeklyData.reduce((sum, day) => sum + day.words, 0) / weeklyData.filter(day => day.words > 0).length)}
                  </span>
                </div>
                <div className="text-white/60 text-xs">
                  오늘: {data.word_count > 400 ? '평균 이상' : '평균 이하'}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="bg-white/10 rounded-lg p-3 border border-white/20"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/80 text-sm">연속 작성</span>
                  <span className="text-white text-sm">5일</span>
                </div>
                <div className="text-white/60 text-xs">
                  이번 주 작성률: {Math.round((weeklyData.filter(day => day.words > 0).length / 7) * 100)}%
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="bg-white/10 rounded-lg p-3 border border-white/20"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/80 text-sm">선호 시간대</span>
                  <span className="text-white text-sm">저녁</span>
                </div>
                <div className="text-white/60 text-xs">
                  가장 활발한 요일: 토요일
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/10 rounded-xl p-4 border border-white/20">
          <h4 className="text-white text-sm font-medium mb-3">작성 효율</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-white/80 text-sm">분당 글자수</span>
              <span className="text-white text-sm">
                {data.writing_duration ? Math.round(data.word_count / data.writing_duration) : '--'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/80 text-sm">작성 속도</span>
              <span className="text-white text-sm">
                {data.writing_duration && data.word_count / data.writing_duration > 30 ? '빠름' :
                 data.writing_duration && data.word_count / data.writing_duration > 20 ? '보통' : '천천히'}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white/10 rounded-xl p-4 border border-white/20">
          <h4 className="text-white text-sm font-medium mb-3">디지털 습관</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-white/80 text-sm">주 플랫폼</span>
              <span className="text-white text-sm flex items-center space-x-1">
                <span>{platformIcon}</span>
                <span className="capitalize">{data.platform}</span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/80 text-sm">기분 일관성</span>
              <span className="text-white text-sm">{consistencyPercentage}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
        <h4 className="text-white text-sm font-medium mb-2">메타 분석 요약</h4>
        <p className="text-white/80 text-sm leading-relaxed">
          오늘 {data.word_count}글자의 일기를 {data.platform}에서
          {data.writing_duration ? ` ${data.writing_duration}분 동안` : ''} 작성했습니다.
          기분 일관성은 {consistencyPercentage}%로,
          {consistencyPercentage > 80 ? ' 매우 안정적인' :
           consistencyPercentage > 60 ? ' 비교적 일관된' :
           consistencyPercentage > 40 ? ' 다소 변화가 있는' : ' 기복이 있는'}
          감정 상태를 보이고 있습니다.
          {data.word_count > 500 ? ' 평소보다 상세한 기록을 남겼으며,' :
           data.word_count > 300 ? ' 적당한 분량의 기록을 남겼으며,' : ' 간결한 기록을 남겼으며,'}
          {data.writing_duration && data.word_count / data.writing_duration > 25 ? ' 빠른 속도로 작성했습니다.' : ' 신중하게 작성했습니다.'}
        </p>
      </div>
    </div>
  );
}