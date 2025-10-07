import { NextRequest, NextResponse } from 'next/server';
import { InsightData } from '@/types/insightTypes';
import { SYSTEM_PROMPT, parseOpenAIInsight } from '@/app/insight/utils/openaiShared';

interface AnalyzeRequestBody {
  diaryText?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as AnalyzeRequestBody;
    const diaryText = body.diaryText ?? '';

    if (!diaryText.trim()) {
      return NextResponse.json(
        { error: '일기 내용을 입력해주세요.' },
        { status: 400 },
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: '서버에 OpenAI API Key가 설정되어 있지 않습니다.' },
        { status: 500 },
      );
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: diaryText },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage =
        (errorData as { error?: { message?: string } })?.error?.message ??
        `OpenAI API 요청 실패: ${response.status} ${response.statusText}`;

      return NextResponse.json({ error: errorMessage }, { status: response.status });
    }

    const data = await response.json() as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        { error: 'OpenAI 응답에서 콘텐츠를 찾을 수 없습니다.' },
        { status: 500 },
      );
    }

    const insights: InsightData = parseOpenAIInsight(content);

    return NextResponse.json({ insights });
  } catch (error) {
    console.error('일기 분석 API 오류:', error);
    const message = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
