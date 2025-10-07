'use client';

import { motion } from 'framer-motion';
import { GoalData } from '@/types/insightTypes';
import { SupportedLanguage } from '@/types/language';

interface GoalTreeProps {
  data: GoalData;
  language: SupportedLanguage;
}

export default function GoalTree({ data, language }: GoalTreeProps) {
  const completionPercentage = Math.round((data.completion || 0) * 100);
  const priorityColor = {
    high: 'from-red-500 to-orange-500',
    medium: 'from-yellow-500 to-orange-500',
    low: 'from-green-500 to-teal-500'
  }[data.priority || 'medium'];
  const isKorean = language === 'ko';
  const labels = isKorean
    ? {
        title: '목표 구조도',
        mainGoal: '메인 목표',
        completion: '완성도',
        priority: '우선순위',
        subGoalCount: '하위 목표 수',
        subGoalUnit: '개',
        analysisTitle: '목표 분석',
        priorityMap: { high: '높음', medium: '보통', low: '낮음' } as Record<string, string>,
        progress: completionPercentage > 70
          ? ' 목표 달성이 순조롭게 진행되고 있습니다.'
          : completionPercentage > 40
            ? ' 목표 달성을 위해 지속적인 노력이 필요합니다.'
            : ' 목표 달성을 위한 구체적인 계획 수립이 필요합니다.',
        summaryPrefix: (goal: string, percent: number, subCount: number, priority: string) =>
          `메인 목표 “${goal}”의 현재 달성률은 ${percent}%입니다. ${subCount}개의 하위 목표가 설정되어 있으며, 우선순위는 ${priority}으로 설정되어 있습니다.`,
      }
    : {
        title: 'Goal Structure',
        mainGoal: 'Main goal',
        completion: 'Completion',
        priority: 'Priority',
        subGoalCount: 'Number of sub goals',
        subGoalUnit: '',
        analysisTitle: 'Goal analysis',
        priorityMap: { high: 'High', medium: 'Medium', low: 'Low' } as Record<string, string>,
        progress: completionPercentage > 70
          ? ' Progress is on track.'
          : completionPercentage > 40
            ? ' Stay focused to keep momentum.'
            : ' Consider planning concrete next steps to move forward.',
        summaryPrefix: (goal: string, percent: number, subCount: number, priority: string) =>
          `Your main goal “${goal}” is ${percent}% complete. You have ${subCount} sub goals, and the priority level is set to ${priority}.`,
      };
  const priorityLabel = labels.priorityMap[data.priority || 'medium'];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-white text-xl font-medium mb-6">{labels.title}</h3>

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
              <div className="text-sm text-white/80 mb-2">{labels.mainGoal}</div>
              <div className="text-2xl font-light text-white mb-3">{data.high}</div>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-white/80 text-sm">{labels.completion}</span>
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
          <h4 className="text-white text-sm font-medium mb-3">{labels.priority}</h4>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${priorityColor}`} />
            <span className="text-white capitalize">{priorityLabel}</span>
          </div>
        </div>

        <div className="bg-white/10 rounded-xl p-4 border border-white/20">
          <h4 className="text-white text-sm font-medium mb-3">{labels.subGoalCount}</h4>
          <div className="text-2xl font-light text-white">
            {data.sub.length}
            {labels.subGoalUnit}
          </div>
        </div>
      </div>

      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
        <h4 className="text-white text-sm font-medium mb-2">{labels.analysisTitle}</h4>
        <p className="text-white/80 text-sm leading-relaxed">
          {labels.summaryPrefix(data.high, completionPercentage, data.sub.length, priorityLabel)}
          {labels.progress}
        </p>
      </div>
    </div>
  );
}
