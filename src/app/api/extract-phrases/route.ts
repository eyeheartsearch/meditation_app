import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: NextRequest) {
  try {
    const { question } = await request.json();
    console.log('Received question:', question);

    if (!question) {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
    });

    const gptRes = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content:
            'You are a meditation assistant. Extract 3–5 short search phrases from the user\'s question. Respond ONLY with a plain JSON array (e.g., ["impermanence", "letting go"]). Do NOT include Markdown formatting or any other explanation.',
        },
        {
          role: 'user',
          content: question,
        },
      ],
    });

    let raw = gptRes.choices[0].message.content ?? '[]';

    // Remove leading/trailing Markdown code fences like ```json
    raw = raw.trim().replace(/^```json\s*|\s*```$/g, '');

    console.log('Cleaned GPT response:', raw);

    const phrases = JSON.parse(raw);

    if (!Array.isArray(phrases) || phrases.length === 0) {
      return NextResponse.json({ error: 'No valid phrases extracted' }, { status: 400 });
    }

    return NextResponse.json({ phrases });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json(
      {
        error: 'Failed to extract phrases',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
