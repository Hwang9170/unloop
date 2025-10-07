'use client';

import { motion } from 'framer-motion';
import { GoalData } from '@/types/insightTypes';

interface GoalTreeProps {
  data: GoalData;
}

export default function GoalTree({ data }: GoalTreeProps) {
  const completionPercentage = Math.round((data.completion || 0) * 100);
  const priorityColor = {
    high: 'from-red-500 to-orange-500',
    medium: 'from-yellow-500 to-orange-500',
    low: 'from-green-500 to-teal-500'
  }[data.priority || 'medium'];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-white text-xl font-medium mb-6">목표 구조도</h3>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className={`
              relative p-6 rounded-2xl bg-gradient-to-br ${priorityColor}
              border border-white/20 text-center mb-8
            `}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl" />
            <div className="relative z-10">
              <div className="text-sm text-white/80 mb-2">메인 목표</div>
              <div className="text-2xl font-light text-white mb-3">{data.high}</div>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-white/80 text-sm">완성도</span>
                <span className="text-white font-medium">{completionPercentage}%</span>
              </div>
              <div className="w-full bg-white/30 rounded-full h-2 mt-2">
                <motion.div
                  className="bg-white h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${completionPercentage}%` }}
                  transition={{ delay: 0.5, duration: 1 }}
                />
              </div>
            </div>
          </motion.div>

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-8 w-px h-8 bg-white/30" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.sub.map((subGoal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.2, duration: 0.6 }}
                className="relative"
              >
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-px h-4 bg-white/30" />
                <div className="bg-white/10 rounded-xl p-4 border border-white/20 text-center">
                  <div className="text-white text-sm font-medium">{subGoal}</div>
                  <div className="w-full bg-white/20 rounded-full h-1 mt-3">
                    <motion.div
                      className="bg-gradient-to-r from-purple-400 to-pink-400 h-1 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.random() * 60 + 40}%` }}
                      transition={{ delay: 1.2 + index * 0.2, duration: 0.8 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/10 rounded-xl p-4 border border-white/20">
          <h4 className="text-white text-sm font-medium mb-3">우선순위</h4>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${priorityColor}`} />
            <span className="text-white capitalize">{data.priority || 'medium'}</span>
          </div>
        </div>

        <div className="bg-white/10 rounded-xl p-4 border border-white/20">
          <h4 className="text-white text-sm font-medium mb-3">하위 목표 수</h4>
          <div className="text-2xl font-light text-white">{data.sub.length}개</div>
        </div>
      </div>

      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
        <h4 className="text-white text-sm font-medium mb-2">목표 분석</h4>
        <p className="text-white/80 text-sm leading-relaxed">
          메인 목표 &ldquo;{data.high}&rdquo;의 현재 달성률은 {completionPercentage}%입니다.
          {data.sub.length}개의 하위 목표가 설정되어 있으며,
          우선순위는 {data.priority === 'high' ? '높음' : data.priority === 'medium' ? '보통' : '낮음'}으로 설정되어 있습니다.
          {completionPercentage > 70 ? ' 목표 달성이 순조롭게 진행되고 있습니다.' :
           completionPercentage > 40 ? ' 목표 달성을 위해 지속적인 노력이 필요합니다.' :
           ' 목표 달성을 위한 구체적인 계획 수립이 필요합니다.'}
        </p>
      </div>
    </div>
  );
}
