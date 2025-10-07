'use client';

import { motion } from 'framer-motion';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { EmotionData } from '@/types/insightTypes';

interface EmotionChartProps {
  data: EmotionData;
}

const emotionColors = {
  joy: '#FFD700',
  sadness: '#4169E1',
  anger: '#DC143C',
  fear: '#9932CC',
  surprise: '#FF69B4',
  trust: '#32CD32',
  disgust: '#8B4513',
  anticipation: '#FF6347'
};

const emotionLabels = {
  joy: '기쁨',
  sadness: '슬픔',
  anger: '분노',
  fear: '두려움',
  surprise: '놀라움',
  trust: '신뢰',
  disgust: '혐오',
  anticipation: '기대'
};

export default function EmotionChart({ data }: EmotionChartProps) {
  const chartData = Object.entries(data).map(([emotion, value]) => ({
    emotion: emotionLabels[emotion as keyof typeof emotionLabels],
    value: value * 100,
    fullMark: 100
  }));

  const topEmotions = Object.entries(data)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-white text-xl font-medium mb-4">감정 분포</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={chartData}>
              <PolarGrid
                gridType="polygon"
                stroke="rgba(255,255,255,0.2)"
                radialLines={true}
              />
              <PolarAngleAxis
                dataKey="emotion"
                tick={{ fill: 'white', fontSize: 12 }}
                className="text-white"
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 10 }}
                tickCount={6}
              />
              <Radar
                name="감정 강도"
                dataKey="value"
                stroke="rgba(147, 51, 234, 0.8)"
                fill="rgba(147, 51, 234, 0.2)"
                strokeWidth={2}
                fillOpacity={0.3}
                dot={{ fill: '#9333ea', strokeWidth: 2, r: 4 }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {topEmotions.map(([emotion, value], index) => (
          <motion.div
            key={emotion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="bg-white/10 rounded-xl p-4 border border-white/20"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-white text-sm font-medium">
                {emotionLabels[emotion as keyof typeof emotionLabels]}
              </span>
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: emotionColors[emotion as keyof typeof emotionColors] }}
              />
            </div>
            <div className="text-2xl font-light text-white mb-1">
              {Math.round(value * 100)}%
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <motion.div
                className="h-2 rounded-full"
                style={{ backgroundColor: emotionColors[emotion as keyof typeof emotionColors] }}
                initial={{ width: 0 }}
                animate={{ width: `${value * 100}%` }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
        <h4 className="text-white text-sm font-medium mb-2">감정 분석 요약</h4>
        <p className="text-white/80 text-sm leading-relaxed">
          오늘 가장 강하게 느낀 감정은 <strong>{emotionLabels[topEmotions[0][0] as keyof typeof emotionLabels]}</strong>({Math.round(topEmotions[0][1] * 100)}%)입니다.
          전반적인 감정 상태는 {topEmotions[0][1] > 0.7 ? '매우 강한' : topEmotions[0][1] > 0.5 ? '보통' : '약한'}
          {topEmotions[0][0] === 'joy' || topEmotions[0][0] === 'trust' || topEmotions[0][0] === 'anticipation' ? ' 긍정적' : ' 감정적'}
          표현을 보이고 있습니다.
        </p>
      </div>
    </div>
  );
}