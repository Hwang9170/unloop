# 🌿 UnLooped — AI-Powered Self-Reflection Diary App

> "나의 하루를 쓰면, 나를 이해하는 데이터가 된다."
> **UnLooped**는 사용자의 일기를 기반으로 감정, 목표, 사고패턴, 관계, 성장 등 다층적인 인사이트를 시각화해주는 AI 기반 자기성찰 플랫폼입니다.

## ✨ Features

- **AI 분석**: OpenAI GPT를 활용한 8가지 인사이트 자동 분석
- **아름다운 시각화**: Recharts와 Framer Motion을 활용한 인터랙티브 차트
- **현대적 디자인**: Yugo Nakamura에서 영감받은 미니멀하고 세련된 UI
- **실시간 분석**: 일기 작성 즉시 인사이트 생성
- **모바일 반응형**: 모든 디바이스에서 최적화된 경험

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

1. **API Key 입력**: OpenAI API Key를 입력하세요
2. **일기 작성**: 오늘의 일기를 자유롭게 작성하세요
3. **분석 실행**: "인사이트 분석하기" 버튼을 클릭하세요
4. **결과 확인**: 8개 카테고리의 인사이트 카드를 확인하세요
5. **상세 보기**: 각 카드를 클릭하여 상세 시각화를 확인하세요

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Charts**: Recharts
- **State Management**: Zustand
- **AI API**: OpenAI GPT-4o-mini

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

Create a `.env.local` file in the root directory:

```env
# Optional: You can set a default API key
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here
```

## 🎨 Design Philosophy

이 프로젝트는 Yugo Nakamura의 디자인 철학에서 영감을 받아:

- **미니멀리즘**: 불필요한 요소 제거, 핵심에 집중
- **움직임**: 의미있는 애니메이션과 마이크로 인터랙션
- **공간감**: 여백을 활용한 우아한 레이아웃
- **색상**: 절제된 팔레트와 그라데이션 활용

## 🚧 Development Roadmap

- [x] MVP 구현 (일기 입력 + 8가지 인사이트 시각화)
- [ ] 백엔드 통합 (NestJS + Database)
- [ ] 사용자 인증 및 데이터 저장
- [ ] 히스토리 기능 (과거 인사이트 비교)
- [ ] AI 리플렉션 코멘트 자동 생성
- [ ] PWA 지원
- [ ] 다국어 지원

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
