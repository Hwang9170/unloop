'use client';

import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { IdentityData } from '@/types/insightTypes';
import { SupportedLanguage } from '@/types/language';

interface IdentityWheelProps {
  data: IdentityData;
  language: SupportedLanguage;
}

const roleColors = ['#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444'];

export default function IdentityWheel({ data, language }: IdentityWheelProps) {
  const isKorean = language === 'ko';
  const selfPerceptionPercentage = Math.round((data.self_perception ?? 0) * 100);

  const roleData = data.roles.map((role, index) => ({
    name: role,
    value: data.roles.length > 0 ? 100 / data.roles.length : 0,
    color: roleColors[index % roleColors.length],
  }));

  const identityDescriptor = isKorean
    ? selfPerceptionPercentage > 80
      ? ' 매우 명확한 자아 정체성'
      : selfPerceptionPercentage > 60
        ? ' 좋은 자아 인식'
        : selfPerceptionPercentage > 40
          ? ' 적당한 자아 탐색'
          : ' 자아 정체성 개발이 필요한'
    : selfPerceptionPercentage > 80
      ? ' a very clear sense of self'
      : selfPerceptionPercentage > 60
        ? ' a solid sense of identity'
        : selfPerceptionPercentage > 40
          ? ' an evolving self-perception'
          : ' room to strengthen your identity awareness';

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-white text-xl font-medium mb-6">
          {isKorean ? '정체성 구조' : 'Identity landscape'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="text-white text-sm font-medium mb-4">
              {isKorean ? '역할 분포' : 'Role distribution'}
            </h4>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={roleData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {roleData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {data.roles.map((role, index) => (
                <motion.div
                  key={`${role}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex items-center space-x-2"
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: roleColors[index % roleColors.length] }}
                  />
                  <span className="text-white text-sm">{role}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white text-sm font-medium mb-4">
              {isKorean ? '자기 인식' : 'Self-perception'}
            </h4>
            <div className="relative h-48 flex items-center justify-center">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="8"
                    fill="none"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#9333EA"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - data.self_perception) }}
                    transition={{ delay: 0.5, duration: 1.5 }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-light text-white">{selfPerceptionPercentage}%</div>
                    <div className="text-white/60 text-xs">
                      {isKorean ? '자기 인식' : 'Self awareness'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-white text-sm font-medium mb-4">
            {isKorean ? '성격 특성' : 'Traits'}
          </h4>
          <div className="flex flex-wrap gap-2 mb-4">
            {data.adjectives.map((adjective, index) => (
              <motion.span
                key={`${adjective}-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                className="px-3 py-1 bg-white/10 rounded-full text-white text-sm border border-white/20"
              >
                {adjective}
              </motion.span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white text-sm font-medium mb-4">
            {isKorean ? '핵심 가치' : 'Core values'}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {data.core_values.map((value, index) => (
              <motion.div
                key={`${value}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                className="bg-white/10 rounded-lg p-3 border border-white/20 text-center"
              >
                <div className="text-white font-medium">{value}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
        <h4 className="text-white text-sm font-medium mb-2">
          {isKorean ? '정체성 분석' : 'Identity analysis'}
        </h4>
        <p className="text-white/80 text-sm leading-relaxed">
          {isKorean ? '현재 ' : 'You are currently balancing '}
          {data.roles.length}
          {isKorean ? '개의 주요 역할을 수행하고 있으며, 주요 역할은 ' : ' key roles. Lead roles include '}
          <strong>{data.roles.slice(0, 2).join(', ')}</strong>
          {isKorean ? '입니다. 자기 인식 수준은 ' : '. Your self-awareness level is '}
          {selfPerceptionPercentage}%
          {isKorean ? '로,' : ', indicating'}
          {identityDescriptor}
          {isKorean ? ' 상태입니다. 핵심 가치로는 ' : '. Core values such as '}
          <strong>{data.core_values.slice(0, 2).join(', ')}</strong>
          {isKorean ? ' 등을 중시하며, 성격적으로는 ' : ' shape your decisions, and traits like '}
          <strong>{data.adjectives.slice(0, 2).join(', ')}</strong>
          {isKorean ? '한 특성을 보입니다.' : ' stand out the most in your self-description.'}
        </p>
      </div>
    </div>
  );
}
