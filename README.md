# 🌿 UnLooped — AI-Powered Self-Reflection Diary App

> "나의 하루를 쓰면, 나를 이해하는 데이터가 된다."
> **UnLooped**는 사용자의 일기를 기반으로 감정, 목표, 사고패턴, 관계, 성장 등 다층적인 인사이트를 시각화해주는 AI 기반 자기성찰 플랫폼입니다.

## ✨ Features

- **AI Insight Engine**: OpenAI GPT-4o-mini를 사용해 감정, 목표, 사고 패턴 등 8개 카테고리 인사이트를 자동 생성합니다.
- **Interactive Visuals**: Framer Motion과 Recharts로 구현한 몰입형 차트 및 마이크로 인터랙션.
- **Supabase Auth & Storage**: 이메일/비밀번호, Google OAuth로 로그인하고 분석 결과와 일기를 Supabase `diary_entries` 테이블에 저장합니다.
- **Bilingual UI (KO/EN)**: 언어 스위처로 전체 인터페이스와 요약 문구를 한국어/영어로 즉시 전환.
- **Feedback Panel**: Formspree 연동 피드백 폼으로 사용자 의견을 실시간 수집.
- **Responsive & Accessible**: 모바일부터 데스크톱까지 동일한 경험을 제공하며, 키보드/스크린 리더 호환성을 고려합니다.

## 📊 인사이트 카테고리

1. **감정 분석** 💭 - 8가지 기본 감정의 분포와 강도
2. **목표 추적** 🎯 - 메인/서브 목표 구조와 달성률
3. **사고 패턴** 🧠 - 언어 톤, 복잡도, 논리성 분석
4. **관계 분석** 👥 - 인간관계 네트워크와 감정 연결
5. **시간 리듬** ⏰ - 시간대별 활동과 에너지 패턴
6. **정체성** 🌟 - 역할, 성격, 핵심 가치 분석
7. **성장 지표** 📈 - 자기성찰과 안정성 추이
8. **메타 데이터** 📊 - 작성 습관과 디지털 패턴

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- OpenAI API Key

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/unlooped-core.git
cd unlooped-core
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Usage

1. **로그인**: 이메일/비밀번호 또는 Google 계정으로 로그인합니다.
2. **언어 선택**: 상단 우측의 `한국어 / English` 토글로 선호 언어를 설정합니다.
3. **일기 작성**: 일기 입력창에 텍스트를 작성하거나 `데모 텍스트 불러오기`로 샘플을 확인합니다.
4. **인사이트 분석**: `인사이트 분석하기` 버튼을 클릭하면 서버에서 OpenAI 분석을 수행하고 결과가 Supabase에 저장됩니다.
5. **대시보드 탐색**: 8개 인사이트 카드를 살펴보고, 각 카드를 클릭해 상세 시각화를 확인합니다.
6. **히스토리 관리**: 하단 `저장된 일기` 목록에서 이전 일기를 다시 로드하여 과거 인사이트를 비교합니다.
7. **피드백 제출**: 화면 우측 하단 `Feedback` 버튼으로 개선 아이디어나 이슈를 Formspree에 전달합니다.

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript + ESLint + strict mode
- **Styling**: Tailwind CSS, custom gradients, glassmorphism
- **Animation**: Framer Motion for entrance/hover effects
- **Charts**: Recharts (radar, area, bar, pie 시각화)
- **State Management**: Zustand (insight 상태 & UI 컨텍스트)
- **Auth & DB**: Supabase (Postgres + Row Level Security)
- **Feedback**: Formspree React SDK
- **AI API**: OpenAI Chat Completions (GPT-4o-mini)

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                    # 일기 입력 페이지
│   ├── insight/
│   │   ├── page.tsx               # 인사이트 대시보드
│   │   ├── components/
│   │   │   ├── InsightCard.tsx    # 인사이트 카드
│   │   │   ├── InsightDetail.tsx  # 상세 시각화 뷰
│   │   │   └── charts/            # 섹션별 차트 컴포넌트
│   │   ├── store/
│   │   │   └── insightState.ts    # Zustand 상태 관리
│   │   └── utils/
│   │       ├── openaiClient.ts    # OpenAI API 클라이언트
│   │       └── parseInsightData.ts # 데이터 파싱 유틸
├── types/
│   └── insightTypes.ts            # TypeScript 타입 정의
└── components/                    # 공통 컴포넌트
```

## 🔑 Environment Variables

루트 경로에 `.env.local` 파일을 생성하고 아래 값을 채워주세요.

```env
# OpenAI API Key (서버 전용, 클라이언트에 노출 X)
OPENAI_API_KEY=sk-...

# Supabase Project 설정
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# (선택) Google OAuth 리디렉션 URL – 배포 도메인이 있다면 지정 가능
NEXT_PUBLIC_SUPABASE_REDIRECT_URL=https://unloop-rho.vercel.app
```

> **팁**: 로컬 개발 시에는 `NEXT_PUBLIC_SUPABASE_REDIRECT_URL`이 없어도 되며, Google 로그인은 자동으로 `http://localhost:3000`을 사용합니다.

### Secure storage

- `.env.local`은 Git에 커밋하지 않습니다.
- Vercel 또는 사용중인 호스팅 서비스의 Environment Variables 설정에 동일한 값을 등록하세요.
- OpenAI Key를 브라우저로 전달하지 않기 위해 서버 라우트(`/api/analyze`)에서만 사용합니다.

## 🔐 Supabase Setup

1. **프로젝트 생성**: Supabase에서 새 프로젝트를 만들고 `Project Settings → General`에서 `Project URL`을 확인합니다.
2. **인증 설정**:
   - `Authentication → Providers`에서 **Email/Password**와 **Google**을 활성화합니다.
   - Google OAuth를 사용할 경우 Google Cloud Console에서 OAuth 클라이언트를 생성하고 승인된 리디렉션에 `https://<project-ref>.supabase.co/auth/v1/callback`을 추가합니다.
   - 로컬 개발용으로 `http://localhost:3000`을 Additional Redirect URLs에 등록하세요.
3. **데이터베이스 테이블 생성**:

   ```sql
   create table if not exists public.diary_entries (
     id uuid primary key,
     user_id uuid references auth.users(id) on delete cascade,
     text text not null,
     summary text,
     emotion text,
     keywords jsonb not null,
     insight text,
     created_at timestamptz not null default timezone('utc', now())
   );

   create index if not exists diary_entries_user_id_idx on public.diary_entries (user_id);
   ```

4. **권한**: Supabase Dashboard → `Authentication → Policies`에서 `diary_entries` 테이블에 대해 로그인한 사용자만 본인 레코드에 접근하도록 RLS 정책을 설정하세요.
5. **키 복사**: `Project Settings → API`에서 `Project URL`과 `anon public` 키를 복사해 `.env.local`에 입력합니다.

## 🧪 Local Development & Workflow

| 작업 | 명령 |
| --- | --- |
| 개발 서버 실행 | `npm run dev` |
| 프로덕션 빌드 | `npm run build` |
| 프로덕션 서버 실행 | `npm run start` |
| ESLint 검사 | `npm run lint` |

> **Tip**: 첫 실행 전 `npm install`로 의존성을 설치해야 합니다.

### Testing the flow

1. `.env.local` 설정 후 `npm run dev` 실행.
2. 브라우저에서 `http://localhost:3000` 접속.
3. 회원가입 또는 기존 계정으로 로그인 (Google 로그인 시 Supabase Redirect 설정 필요).
4. 일기를 작성하고 분석 → 인사이트 페이지로 이동하는지 확인.
5. `Feedback` 버튼으로 Formspree 응답이 정상 수신되는지 테스트 (Formspree 대시보드 확인).

### Production checklist

- `npm run build`가 성공하는지 확인합니다.
- Vercel 배포 시 **Environment Variables**를 동일하게 등록합니다.
- Supabase RLS 정책 및 Google OAuth redirect가 배포 도메인을 포함하는지 확인합니다.

## 🗺 Roadmap & Ideas

- [x] 기본 인사이트 분석 및 시각화
- [x] Supabase 인증/저장 + Google OAuth
- [x] Formspree 피드백 패널
- [x] 한국어/영어 UI 지원
- [ ] 과거 인사이트 비교 및 추세 그래프
- [ ] AI 리플렉션 코멘트 자동 생성
- [ ] 오프라인/PWA 지원
- [ ] 모바일 앱 (React Native) 연동

## 🎨 Design Philosophy

- **Minimal & Immersive**: 감각적이면서 집중을 방해하지 않는 인터페이스
- **Meaningful Motion**: 사용자 행동을 자연스럽게 유도하는 모션 디자인
- **Clarity First**: 복잡한 데이터를 간결한 텍스트와 시각화로 전달

## 🙌 Feedback & Contribution

- 우측 하단 `Feedback` 버튼을 눌러 바로 의견을 남길 수 있습니다.
- 버그 제보, 기능 제안은 Formspree 또는 GitHub Issues로 환영합니다.
- PR에 앞서 `npm run lint`로 코드 스타일을 맞춰주세요.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
