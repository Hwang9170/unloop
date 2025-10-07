'use client';

import { motion } from 'framer-motion';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { EmotionData } from '@/types/insightTypes';
import { SupportedLanguage } from '@/types/language';

interface EmotionChartProps {
  data: EmotionData;
  language: SupportedLanguage;
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

const emotionLabels: Record<SupportedLanguage, Record<keyof EmotionData, string>> = {
  ko: {
    joy: '기쁨',
    sadness: '슬픔',
    anger: '분노',
    fear: '두려움',
    surprise: '놀라움',
    trust: '신뢰',
    disgust: '혐오',
    anticipation: '기대',
  },
  en: {
    joy: 'Joy',
    sadness: 'Sadness',
    anger: 'Anger',
    fear: 'Fear',
    surprise: 'Surprise',
    trust: 'Trust',
    disgust: 'Disgust',
    anticipation: 'Anticipation',
  },
};

export default function EmotionChart({ data, language }: EmotionChartProps) {
  const labels = emotionLabels[language];
  const isKorean = language === 'ko';
  const copy = isKorean
    ? {
        title: '감정 분포',
        radarName: '감정 강도',
        summaryTitle: '감정 분석 요약',
        strongestPrefix: '오늘 가장 강하게 느낀 감정은 ',
        overallIntensity: ['매우 강한', '보통', '약한'],
        positiveLabel: ' 긍정적',
        neutralLabel: ' 감정적',
        fallback: '데이터가 충분하지 않습니다.',
      }
    : {
        title: 'Emotion Distribution',
        radarName: 'Emotion intensity',
        summaryTitle: 'Summary',
        strongestPrefix: 'Your strongest emotion today is ',
        overallIntensity: ['very strong', 'moderate', 'low'],
        positiveLabel: ' positive',
        neutralLabel: ' emotional',
        fallback: 'Not enough data to summarise emotions.',
      };

  const chartData = Object.entries(data).map(([emotion, value]) => ({
    emotion: labels[emotion as keyof EmotionData],
    value: value * 100,
    fullMark: 100
  }));

  const topEmotions = Object.entries(data)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3);

  const primaryEmotion = topEmotions[0];
  const primaryKey = primaryEmotion?.[0] as keyof EmotionData | undefined;
  const primaryValue = primaryEmotion ? Math.round(primaryEmotion[1] * 100) : 0;
  const intensityDescriptor = primaryEmotion
    ? primaryEmotion[1] > 0.7
      ? copy.overallIntensity[0]
      : primaryEmotion[1] > 0.5
        ? copy.overallIntensity[1]
        : copy.overallIntensity[2]
    : '';
  const positivityDescriptor = primaryEmotion
    ? (primaryEmotion[0] === 'joy' || primaryEmotion[0] === 'trust' || primaryEmotion[0] === 'anticipation')
      ? copy.positiveLabel
      : copy.neutralLabel
    : '';

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-white text-xl font-medium mb-4">{copy.title}</h3>
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
                name={copy.radarName}
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
                {labels[emotion as keyof EmotionData]}
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
        <h4 className="text-white text-sm font-medium mb-2">{copy.summaryTitle}</h4>
        <p className="text-white/80 text-sm leading-relaxed">
          {primaryEmotion ? (
            <>
              {copy.strongestPrefix}
              <strong>{labels[primaryKey ?? 'joy']}</strong>
              ({primaryValue}%). {isKorean ? '전반적인 감정 상태는 ' : 'Overall, your emotional tone feels '}
              {intensityDescriptor}
              {positivityDescriptor}
              {isKorean ? ' 표현에 가까워요.' : ' in tone.'}
            </>
          ) : (
            copy.fallback
          )}
        </p>
      </div>
    </div>
  );
}
