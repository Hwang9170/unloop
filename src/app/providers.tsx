"use client";

import { SupabaseAuthProvider } from '@/context/SupabaseAuthContext';
import { LanguageProvider } from '@/context/LanguageContext';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';
import FeedbackPanel from '@/components/common/FeedbackPanel';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SupabaseAuthProvider>
      <LanguageProvider>
        <LanguageSwitcher />
        <FeedbackPanel />
        {children}
      </LanguageProvider>
    </SupabaseAuthProvider>
  );
}
