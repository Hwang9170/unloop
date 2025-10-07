# 🌿 UnLooped — Self reflection visualization diary app

> “나의 하루를 쓰면, 나를 이해하는 데이터가 된다.”
> **Unlooped**는 사용자의 일기를 기반으로
> 감정, 목표, 사고패턴, 관계, 성장 등 다층적인 인사이트를 시각화해주는 AI 기반 자기성찰 플랫폼입니다.

---

## 🧠 프로젝트 개요

| 항목                   | 내용                           |
| -------------------- | ---------------------------- |
| **Framework**        | Next.js 14 (App Router 기반)   |
| **Language**         | TypeScript                   |
| **UI Library**       | Tailwind CSS + Framer Motion |
| **Charting**         | Recharts / D3.js             |
| **State Management** | Zustand                      |
| **Backend (Later)**  | NestJS                       |
| **AI API**           | OpenAI GPT (초기엔 프론트에서 직접 호출) |

---

## 🎯 핵심 목표

1. 사용자가 일기를 작성하면 AI가 **감정, 목표, 사고패턴, 관계, 정체성, 성장, 습관 패턴**을 분석
2. 한눈에 볼 수 있는 **인사이트 대시보드** 제공
3. 클릭 시 섹션별로 다른 **시각화 뷰(Emotion, Goal, Cognitive 등)** 표시
4. 초기 MVP는 프론트에서 API Key 입력 후 직접 호출 → 이후 백엔드 프록시 구조로 확장

---

## 🧩 주요 기능

| 기능                 | 설명                                                |
| ------------------ | ------------------------------------------------- |
| **일기 작성 및 저장**     | 사용자가 텍스트 입력 후 AI 분석 요청                            |
| **AI 분석 (OpenAI)** | 감정, 목표, 사고패턴, 관계, 시간리듬, 정체성, 성장, 습관 등 JSON 형태로 응답 |
| **인사이트 요약 대시보드**   | 8개 인사이트 영역이 카드형으로 요약 표시                           |
| **클릭 시 상세 시각화 뷰**  | 각 섹션별 그래프, 네트워크, 히트맵 등 다른 시각화 제공                  |
| **SPA 인터랙션**       | 페이지 전환 없이 상태 기반 렌더링 (Framer Motion 전환 효과)         |

---

## 🧭 페이지 구조 개요

| 페이지                                   | 역할                                  |
| ------------------------------------- | ----------------------------------- |
| `/`                                   | 일기 입력 페이지 (API Key + 일기 입력 + 분석 요청) |
| `/insight`                            | 인사이트 요약 대시보드 (카드형)                  |
| `/insight/[section]` *(SPA 내부 상태 기반)* | 클릭 시 상세 인사이트 시각화                    |

---

## 📁 프로젝트 구조

```
src/
 ├── app/
 │   ├── layout.tsx
 │   ├── page.tsx                      # 일기 입력 페이지
 │   ├── insight/
 │   │   ├── page.tsx                 # 인사이트 대시보드
 │   │   ├── components/
 │   │   │   ├── InsightCard.tsx      # 인사이트 카드 (요약)
 │   │   │   ├── InsightDetail.tsx    # 상세 시각화 뷰
 │   │   │   ├── SectionTabs.tsx      # 상단 네비게이션
 │   │   │   └── charts/              # 섹션별 차트 컴포넌트
 │   │   │       ├── EmotionChart.tsx
 │   │   │       ├── GoalTree.tsx
 │   │   │       ├── CognitiveChart.tsx
 │   │   │       ├── RelationGraph.tsx
 │   │   │       ├── TemporalHeatmap.tsx
 │   │   │       ├── IdentityWheel.tsx
 │   │   │       ├── GrowthArc.tsx
 │   │   │       └── MetaTimeline.tsx
 │   │   ├── sections/                # 섹션별 시각화 레이아웃
 │   │   │   ├── EmotionSection.tsx
 │   │   │   ├── GoalSection.tsx
 │   │   │   ├── CognitiveSection.tsx
 │   │   │   ├── RelationSection.tsx
 │   │   │   ├── TemporalSection.tsx
 │   │   │   ├── IdentitySection.tsx
 │   │   │   ├── GrowthSection.tsx
 │   │   │   └── MetaSection.tsx
 │   │   ├── utils/
 │   │   │   ├── openaiClient.ts      # OpenAI API 호출 (API Key 기반)
 │   │   │   └── parseInsightData.ts  # 모델 응답 파싱 로직
 │   │   └── store/
 │   │       └── insightState.ts      # Zustand 상태 저장
 │   ├── api/
 │   │   └── analyze/route.ts         # (추후 백엔드 프록시 라우트)
 ├── components/
 │   ├── Header.tsx
 │   ├── Footer.tsx
 │   └── Loader.tsx
 ├── hooks/
 │   ├── useInsightState.ts
 │   └── useDiaryInput.ts
 ├── types/
 │   └── insightTypes.ts
 ├── utils/
 │   ├── dateUtils.ts
 │   └── textUtils.ts
 ├── styles/
 │   └── globals.css
 └── env.example
```

---

## 🔑 OpenAI API 연동 방식

* **1단계 (MVP):**
  프론트에서 직접 Key를 입력받아 호출
  → `src/app/insight/utils/openaiClient.ts`

* **2단계 (이후):**
  Next.js `/api/analyze` 라우트 or NestJS 백엔드로 Key 보안 처리 후 프록시 요청

**OpenAI 요청 예시**

```ts
const res = await fetch("https://api.openai.com/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
  body: JSON.stringify({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "일기 내용을 감정, 목표, 사고패턴, 관계, 시간, 정체성, 성장, 습관으로 분석해 JSON 형태로 요약하라.",
      },
      { role: "user", content: diaryText },
    ],
  }),
});
```

**응답 포맷 예시**

```json
{
  "emotion": { "joy": 0.7, "sadness": 0.3 },
  "goal": {
    "high": "꾸준함",
    "sub": ["운동", "기록"]
  },
  "cognitive": {
    "tone": "긍정",
    "causal_sentences": 4
  },
  "relation": {
    "main_person": "가족",
    "emotion": "감사"
  },
  "temporal": { "time": "밤", "weekday": "일요일" },
  "identity": { "roles": ["학생"], "adjectives": ["성실한", "조용한"] },
  "growth": { "reflection": 0.3, "stability": 0.8 },
  "meta": { "word_count": 540, "platform": "mobile" }
}
```

---

## 📊 섹션별 시각화 요약

| 섹션                   | 주요 목적               | 시각화 형태                               | 예시 컴포넌트               |
| -------------------- | ------------------- | ------------------------------------ | --------------------- |
| **감정 (Emotion)**     | 감정 스펙트럼 및 흐름        | Emotion Bar, 감정 Timeline, Word Cloud | `EmotionChart.tsx`    |
| **목표 (Goal)**        | 상·하위 목표 구조, 변화      | Goal Tree, Goal Network              | `GoalTree.tsx`        |
| **사고패턴 (Cognitive)** | 언어 톤, 인과 문장, 문체 복잡도 | Sentiment Bar, Complexity Heatmap    | `CognitiveChart.tsx`  |
| **관계 (Relation)**    | 관계 중심 서사, 감정 연결     | Relationship Graph, Emotion Map      | `RelationGraph.tsx`   |
| **시간·리듬 (Temporal)** | 감정/행동의 시간 패턴        | 24h Clock Chart, Emotion Heatmap     | `TemporalHeatmap.tsx` |
| **정체성 (Identity)**   | 자기 이미지, 역할 변화       | Identity Wheel, Adjective Trend      | `IdentityWheel.tsx`   |
| **성장 (Growth)**      | 감정 안정성, 반성 문장 비율    | Reflection Graph, Growth Arc         | `GrowthArc.tsx`       |
| **메타 (Meta)**        | 습관, 작성 빈도, 플랫폼 비율   | Streak Calendar, Usage Chart         | `MetaTimeline.tsx`    |

---

## 🎨 UX 설계 원칙

| UX 요소                | 설명                                           |
| -------------------- | -------------------------------------------- |
| **카드형 요약 → 상세 전환**   | 인사이트를 한눈에 보고 클릭 시 깊이 있는 시각화                  |
| **Framer Motion 전환** | SPA의 부드러운 슬라이드·페이드 효과                        |
| **SectionTabs**      | 상단 탭으로 빠른 이동                                 |
| **Responsive UI**    | 모바일·PC 모두 대응                                 |
| **Color Mapping**    | 감정별 색상 일관성 (예: joy → yellow, sadness → blue) |

---

## ⚙️ 상태 관리 흐름

1. 사용자가 일기 입력 → `analyzeDiaryEntry()` 호출
2. OpenAI 응답을 JSON으로 파싱 → Zustand `setInsights()` 저장
3. `/insight` 페이지에서 `insights`를 받아 요약 카드 렌더링
4. 클릭 시 `activeSection` 변경 → 해당 Section 시각화 컴포넌트 렌더링

---

## 🧩 MVP → 확장 로드맵

| 단계            | 내용                                    |
| ------------- | ------------------------------------- |
| **1단계 (MVP)** | 일기 입력 → 감정·목표 시각화 (프론트 API Key 직접 입력) |
| **2단계**       | 사고·관계·시간 섹션 추가                        |
| **3단계**       | 정체성·성장·메타 섹션 완성                       |
| **4단계**       | 백엔드 통합 (NestJS + DB) / LLM 결과 저장·학습화  |
| **5단계**       | “AI 리플렉션 코멘트” 자동 생성 기능 추가             |

---

## 💡 개발자에게 요청사항 (Claude / 개발자용)

* [ ] 위 구조로 **Next.js + TypeScript** 프로젝트 생성
* [ ] Tailwind, Framer Motion, Recharts 설치
* [ ] `/app/page.tsx`에 **일기 입력 + API Key 입력 UI** 구현
* [ ] `/app/insight/page.tsx`에서 **요약 카드 8개 렌더링 + 클릭 시 전환** 구현
* [ ] 각 섹션별 차트 컴포넌트 틀만 생성 (Mock 데이터로 시각화 가능)
* [ ] Zustand 상태관리 및 OpenAI API 연결 테스트
* [ ] 추후 `/api/analyze` 라우트로 백엔드 프록시 구조 준비

---

이 문서를 Claude에 그대로 입력하면

> “이 README를 기반으로 Next.js 프로젝트를 스캐폴딩해줘.”
> 라고 요청했을 때, Claude가 구조·파일·코드를 자동으로 만들어낼 수 있습니다.

---

필요하시면,
👉 `README.md` 안에 Claude용 **setup prompt** (예: “이 파일 기반으로 폴더/파일을 생성해줘”)를
자동으로 추가한 버전도 만들어드릴 수 있습니다.
그렇게 할까요?
