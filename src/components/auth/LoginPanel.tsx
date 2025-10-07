'use client';

import { FormEvent, useState } from 'react';
import { useSupabaseAuth } from '@/context/SupabaseAuthContext';

type AuthMode = 'signin' | 'signup';

export default function LoginPanel() {
  const { signInWithPassword, signUpWithPassword, signInWithGoogle } = useSupabaseAuth();
  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);

  const toggleMode = () => {
    setMode((prev) => (prev === 'signin' ? 'signup' : 'signin'));
    setError(null);
    setSuccessMessage(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    const action = mode === 'signin' ? signInWithPassword : signUpWithPassword;
    const { error: authError } = await action(email, password);

    if (authError) {
      setError(authError);
    } else if (mode === 'signup') {
      setSuccessMessage('회원가입이 완료되었습니다. 확인 메일을 확인해주세요.');
    }

    setIsSubmitting(false);
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleSubmitting(true);
      setError(null);
      await signInWithGoogle();
    } catch (googleError) {
      if (googleError instanceof Error) {
        setError(googleError.message);
      } else {
        setError('Google 로그인 중 오류가 발생했습니다.');
      }
    } finally {
      setIsGoogleSubmitting(false);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 max-w-md mx-auto">
      <h2 className="text-3xl font-light text-center mb-6">
        {mode === 'signin' ? '로그인' : '회원가입'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            이메일
          </label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-3 bg-white/10 rounded-xl border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            비밀번호
          </label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="최소 6자 이상 입력하세요"
            className="w-full px-4 py-3 bg-white/10 rounded-xl border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
          />
        </div>

        {error && (
          <p className="text-sm text-red-300 text-center">
            {error}
          </p>
        )}

        {successMessage && (
          <p className="text-sm text-purple-300 text-center">
            {successMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl font-medium text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? '처리 중...' : mode === 'signin' ? '로그인' : '회원가입'}
        </button>
      </form>

      <div className="mt-6">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <span className="h-px w-16 bg-white/10" />
          <span className="text-xs text-gray-400">또는</span>
          <span className="h-px w-16 bg-white/10" />
        </div>
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isGoogleSubmitting}
          className="w-full flex items-center justify-center space-x-3 py-3 bg-white text-gray-900 rounded-xl font-medium transition-all duration-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 533.5 544.3"
            className="w-5 h-5"
          >
            <path fill="#4285f4" d="M533.5 278.4c0-17.4-1.6-34.1-4.7-50.4H272v95.3h146.9c-6.4 34.5-25.7 63.8-54.8 83.4l88.4 68.6c51.8-47.8 81-118.4 81-196.9z"/>
            <path fill="#34a853" d="M272 544.3c73.5 0 135.3-24.3 180.4-66.1l-88.4-68.6c-24.5 16.5-55.8 26.2-92 26.2-70.8 0-130.9-47.9-152.4-112.1l-90.5 69.7c43.6 86.4 133.5 150.9 243 150.9z"/>
            <path fill="#fbbc04" d="M119.6 323.7c-10.3-30.5-10.3-63.4 0-94l-90.5-69.7c-39.2 77.8-39.2 169.7 0 247.5l90.5-69.8z"/>
            <path fill="#ea4335" d="M272 107.7c39.9-.6 78.2 14.1 107.6 41.5l80.2-80.2C424.7 24.6 355.5-1.7 272 0 162.5 0 72.6 64.5 29.1 150.9l90.5 69.7C141 156.4 201.1 108.5 272 107.7z"/>
          </svg>
          <span>Google 계정으로 계속하기</span>
        </button>
      </div>

      <div className="mt-6 text-center text-sm text-gray-400">
        {mode === 'signin' ? (
          <button onClick={toggleMode} className="text-purple-300 hover:text-purple-200 transition-colors">
            아직 계정이 없으신가요? 회원가입
          </button>
        ) : (
          <button onClick={toggleMode} className="text-purple-300 hover:text-purple-200 transition-colors">
            이미 계정이 있으신가요? 로그인
          </button>
        )}
      </div>
    </div>
  );
}
