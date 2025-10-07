'use client';

import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { CognitiveData } from '@/types/insightTypes';

interface CognitiveChartProps {
  data: CognitiveData;
}

export default function CognitiveChart({ data }: CognitiveChartProps) {
  const toneColor = {
    긍정: '#10B981',
    부정: '#EF4444',
    중립: '#6B7280'
  }[data.tone] || '#6B7280';

  const chartData = [
    {
      name: '복잡도',
      value: data.complexity_score * 100,
      color: '#8B5CF6'
    },
    {
      name: '반성 깊이',
      value: data.reflection_depth * 100,
      color: '#06B6D4'
    },
    {
      name: '인과 문장',
      value: (data.causal_sentences / 10) * 100,
      color: '#F59E0B'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-white text-xl font-medium mb-6">사고 패턴 분석</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white/10 rounded-xl p-4 border border-white/20 text-center"
          >
            <div className="text-white/80 text-sm mb-2">언어 톤</div>
            <div
              className="w-8 h-8 rounded-full mx-auto mb-2"
              style={{ backgroundColor: toneColor }}
            />
            <div className="text-white font-medium">{data.tone}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white/10 rounded-xl p-4 border border-white/20 text-center"
          >
            <div className="text-white/80 text-sm mb-2">인과 문장</div>
            <div className="text-2xl font-light text-white">{data.causal_sentences}</div>
            <div className="text-white/60 text-xs">개</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-white/10 rounded-xl p-4 border border-white/20 text-center"
          >
            <div className="text-white/80 text-sm mb-2">복잡도</div>
            <div className="text-2xl font-light text-white">
              {Math.round(data.complexity_score * 100)}%
            </div>
          </motion.div>
        </div>

        <div className="h-64 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'white', fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 10 }}
                domain={[0, 100]}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-white/10 rounded-xl p-4 border border-white/20"
        >
          <h4 className="text-white text-sm font-medium mb-3">사고 스타일</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-white/80 text-sm">논리성</span>
              <span className="text-white text-sm">
                {data.causal_sentences > 5 ? '높음' : data.causal_sentences > 2 ? '보통' : '낮음'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/80 text-sm">깊이</span>
              <span className="text-white text-sm">
                {data.reflection_depth > 0.7 ? '깊음' : data.reflection_depth > 0.4 ? '보통' : '얕음'}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="bg-white/10 rounded-xl p-4 border border-white/20"
        >
          <h4 className="text-white text-sm font-medium mb-3">언어 특성</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-white/80 text-sm">감정 표현</span>
              <span className="text-white text-sm">{data.tone}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/80 text-sm">문체 복잡도</span>
              <span className="text-white text-sm">
                {Math.round(data.complexity_score * 100)}%
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
        <h4 className="text-white text-sm font-medium mb-2">사고 패턴 요약</h4>
        <p className="text-white/80 text-sm leading-relaxed">
          전체적으로 <strong>{data.tone}</strong> 언어 톤을 사용하고 있으며,
          {data.causal_sentences}개의 인과관계 문장이 포함되어 있어
          {data.causal_sentences > 5 ? ' 논리적이고 체계적인' : data.causal_sentences > 2 ? ' 적당히 구조화된' : ' 감정 중심의'}
          사고 패턴을 보입니다.
          문체 복잡도는 {Math.round(data.complexity_score * 100)}%로,
          {data.complexity_score > 0.7 ? ' 복잡하고 정교한' : data.complexity_score > 0.4 ? ' 적당한' : ' 간결한'}
          표현을 선호하는 것으로 분석됩니다.
        </p>
      </div>
    </div>
  );
}