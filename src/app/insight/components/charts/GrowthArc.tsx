'use client';

import { motion } from 'framer-motion';
import { XAxis, YAxis, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { GrowthData } from '@/types/insightTypes';

interface GrowthArcProps {
  data: GrowthData;
}

export default function GrowthArc({ data }: GrowthArcProps) {
  const reflectionPercentage = Math.round(data.reflection * 100);
  const stabilityPercentage = Math.round(data.stability * 100);

  const mockTimelineData = [
    { date: '1주전', reflection: 40, stability: 60 },
    { date: '6일전', reflection: 45, stability: 65 },
    { date: '5일전', reflection: 50, stability: 55 },
    { date: '4일전', reflection: 60, stability: 70 },
    { date: '3일전', reflection: 65, stability: 75 },
    { date: '2일전', reflection: 70, stability: 68 },
    { date: '어제', reflection: 75, stability: 72 },
    { date: '오늘', reflection: reflectionPercentage, stability: stabilityPercentage }
  ];

  const challengeResponseColor = {
    적극적: '#10B981',
    보통: '#F59E0B',
    소극적: '#EF4444',
    회피적: '#6B7280'
  }[data.challenge_response] || '#6B7280';

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-white text-xl font-medium mb-6">성장 지표</h3>

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
            <div className="text-white/80 text-sm mb-2">반성도</div>
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
            <div className="text-white/80 text-sm mb-2">안정성</div>
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
            <div className="text-white/80 text-sm mb-2">학습 언급</div>
            <div className="text-2xl font-light text-white">{data.learning_mentions}</div>
            <div className="text-white/60 text-xs">회</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="bg-white/10 rounded-xl p-4 border border-white/20 text-center"
          >
            <div className="text-white/80 text-sm mb-2">도전 대응</div>
            <div
              className="w-6 h-6 rounded-full mx-auto mb-1"
              style={{ backgroundColor: challengeResponseColor }}
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
            <h4 className="text-white text-sm font-medium mb-3">성장 지수</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white/80 text-sm">자기성찰</span>
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
                <span className="text-white/80 text-sm">감정 안정</span>
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
            <h4 className="text-white text-sm font-medium mb-3">성장 패턴</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white/80 text-sm">학습 태도</span>
                <span className="text-white text-sm">
                  {data.learning_mentions > 3 ? '적극적' : data.learning_mentions > 1 ? '보통' : '소극적'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/80 text-sm">변화 수용</span>
                <span className="text-white text-sm">{data.challenge_response}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
        <h4 className="text-white text-sm font-medium mb-2">성장 분석</h4>
        <p className="text-white/80 text-sm leading-relaxed">
          현재 자기성찰 수준은 {reflectionPercentage}%이며, 감정 안정성은 {stabilityPercentage}%를 보이고 있습니다.
          일기에서 학습과 관련된 언급이 {data.learning_mentions}회 나타났으며,
          도전에 대한 대응 방식은 <strong>{data.challenge_response}</strong>적입니다.
          {reflectionPercentage > stabilityPercentage ?
            ' 성찰적 사고가 감정 안정성보다 높아 자기 개발에 적극적인 상태입니다.' :
            ' 감정적 안정성이 높아 균형잡힌 성장을 보이고 있습니다.'}
        </p>
      </div>
    </div>
  );
}
