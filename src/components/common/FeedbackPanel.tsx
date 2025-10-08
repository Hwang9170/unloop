'use client';

import { useEffect, useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';

const FORM_ID = 'mwprnknv';

export default function FeedbackPanel() {
  const { language } = useLanguage();
  const isKorean = language === 'ko';
  const [hasOpened, setHasOpened] = useState(false);
  const [state, handleSubmit] = useForm(FORM_ID);

  useEffect(() => {
    if (state.succeeded) {
      setHasOpened(false);
    }
  }, [state.succeeded]);

  const labels = isKorean
    ? {
        button: '피드백',
        title: 'UnLooped에 의견 남기기',
        subtitle: '도움이 될 만한 제안이나 불편한 점이 있다면 알려주세요.',
        emailLabel: '이메일 (선택)',
        messageLabel: '피드백 내용',
        messagePlaceholder: '개선하고 싶은 점이나 새로운 아이디어를 자유롭게 적어주세요.',
        submit: '보내기',
        sending: '전송 중...',
        success: '소중한 의견 감사합니다! 빠르게 반영해볼게요.',
      }
    : {
        button: 'Feedback',
        title: 'Share your thoughts',
        subtitle: 'Have an idea or issue? We’d love to hear from you.',
        emailLabel: 'Email (optional)',
        messageLabel: 'Your feedback',
        messagePlaceholder: 'Tell us what we can improve or add next.',
        submit: 'Send feedback',
        sending: 'Sending...',
        success: 'Thanks for helping us improve! We appreciate your thoughts.',
      };

  if (state.succeeded) {
    return (
      <motion.div
        className="fixed bottom-6 right-6 z-50 bg-white/10 backdrop-blur border border-white/20 rounded-2xl px-4 py-3 text-white shadow-lg max-w-xs"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {labels.success}
      </motion.div>
    );
  }
  

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {hasOpened ? (
        <motion.form
          onSubmit={handleSubmit}
          className="w-80 bg-white/10 backdrop-blur border border-white/20 rounded-3xl p-5 text-white shadow-2xl space-y-4"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
        >
          <div>
            <h3 className="text-lg font-medium">{labels.title}</h3>
            <p className="text-sm text-white/70 mt-1">{labels.subtitle}</p>
          </div>

          <div className="space-y-2">
            <label className="block text-xs text-white/70" htmlFor="email">
              {labels.emailLabel}
            </label>
            <input
              id="email"
              type="email"
              name="email"
              className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <ValidationError prefix="Email" field="email" errors={state.errors} />
          </div>

          <div className="space-y-2">
            <label className="block text-xs text-white/70" htmlFor="message">
              {labels.messageLabel}
            </label>
            <textarea
              id="message"
              name="message"
              placeholder={labels.messagePlaceholder}
              rows={4}
              required
              className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-white/40 resize-none"
            />
            <ValidationError prefix="Message" field="message" errors={state.errors} />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setHasOpened(false)}
              className="text-xs text-white/60 hover:text-white transition-colors"
            >
              ×
            </button>
            <button
              type="submit"
              disabled={state.submitting}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-sm font-medium disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {state.submitting ? labels.sending : labels.submit}
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          type="button"
          onClick={() => setHasOpened(true)}
          className="px-4 py-3 rounded-full bg-white/10 border border-white/20 text-sm text-white backdrop-blur shadow-lg hover:bg-white/20 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {labels.button}
        </motion.button>
      )}
    </div>
  );
}
