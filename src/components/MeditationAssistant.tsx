'use client';

import { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { MicrophoneIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { liteClient as algoliasearch } from 'algoliasearch/lite';
import OpenAI from 'openai';
import { extractYouTubeID } from '@/utils/extractYouTubeID';

type HitWithMetadata = {
  objectID: string;
  title_normalized: string;
  youtube_url: string;
  ai_summary?: string;
  ai_concepts?: string[];
  ai_tags?: string[];
};

export default function MeditationAssistant() {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, dangerouslyAllowBrowser: true });
  const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!
  );
  
  const [results, setResults] = useState<HitWithMetadata[]>([]);
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [justStopped, setJustStopped] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // Sync transcript into the question field
  useEffect(() => {
    if (listening) {
      setQuestion(transcript);
    }
  }, [transcript, listening]);

  const handleMicClick = () => {
    if (!browserSupportsSpeechRecognition) {
      alert('Your browser does not support speech recognition.');
      return;
    }

    if (listening) {
      SpeechRecognition.stopListening();
      setJustStopped(true);
      setTimeout(() => setJustStopped(false), 2000);
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: false, language: 'en-US' });
    }
  };

  const handleSubmit = async () => {
    if (!question.trim()) return;

    setIsLoading(true);
    setResults([]);
    try {
      // Step 1: Ask GPT for key phrases
      const gptRes = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content:
              'You are a meditation assistant. Extract 3–5 short search phrases from the user\'s question. Respond ONLY with a JSON array.',
          },
          {
            role: 'user',
            content: question,
          },
        ],
      });

      const raw = gptRes.choices[0].message.content ?? '[]';
      const phrases = JSON.parse(raw);

      if (!Array.isArray(phrases) || phrases.length === 0) {
        throw new Error('No valid phrases extracted.');
      }

      // Step 2: Run Algolia search using the lite client
      const searchResults = await searchClient.search({
        requests: [
          {
            indexName: process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME!,
            query: phrases.join(' '),
            hitsPerPage: 3,
          },
        ],
      });

      const firstResult = searchResults.results[0];
      if ('hits' in firstResult) {
        setResults(firstResult.hits as HitWithMetadata[]);
      } else {
        setResults([]);
      }
      setModalOpen(true);
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-orange-50 min-h-screen p-6 flex flex-col items-center">
      <h2 className="text-xl md:text-2xl font-semibold text-center animate-pulse text-orange-700 mb-6">
        Does anyone have a question they would like to ask?
      </h2>

      <p className="text-center text-gray-700 mb-4">
        Press the microphone to dictate your question or type your question. We'll do our very best to find the most relevant talk.
      </p>

      {/* Mic Icon */}
      <div className="relative my-4">
        <button
          onClick={handleMicClick}
          className={clsx(
            'w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300',
            'bg-white shadow-md border border-orange-300 relative z-10',
            listening && 'ring-4 ring-orange-300 animate-pulse'
          )}
        >
          <MicrophoneIcon className="w-10 h-10 text-orange-600" />
        </button>

        {/* Live transcript preview */}
        {listening && (
          <p className="mt-3 text-sm text-orange-700 text-center italic animate-fade-in-fast">
            {transcript || 'Listening...'}
          </p>
        )}

        {/* Just stopped listening cue */}
        {!listening && justStopped && (
          <p className="mt-3 text-sm text-gray-500 text-center italic animate-fade-out">
            Done listening
          </p>
        )}
      </div>

      {/* Text input */}
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        rows={4}
        placeholder="Type your question here..."
        className="mt-6 w-full max-w-xl p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-300 focus:outline-none bg-white"
      />

      <button
        onClick={handleSubmit}
        disabled={!question.trim()}
        className="mt-4 px-6 py-3 bg-orange-600 text-white font-medium rounded-lg shadow hover:bg-orange-700 transition"
      >
        Search
      </button>

      {/* Spinner */}
      {isLoading && (
        <div className="mt-6 animate-spin rounded-full h-10 w-10 border-t-2 border-orange-500 border-opacity-50" />
      )}

      {/* Results */}
      {results.map((hit: HitWithMetadata, i: number) => {
        const videoId = extractYouTubeID(hit.youtube_url);
        const aiConcepts = hit.ai_concepts || [];
        const aiTags = hit.ai_tags || [];

        return (
          <div
            key={hit.objectID}
            className="border p-4 rounded shadow-sm hover:shadow transition cursor-pointer"
          >
            {videoId && (
              <a
                href={`https://www.youtube.com/embed/${videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-2 block"
              >
                <img
                  src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                  alt={hit.title_normalized}
                  className="h-auto w-full rounded"
                />
              </a>
            )}

            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">{hit.title_normalized}</h3>
              {i === 0 && (
                <span className="ml-2 inline-block bg-orange-200 text-orange-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                  Recommended
                </span>
              )}
            </div>

            <p className="text-sm text-gray-600 mt-1">{hit.ai_summary || 'No summary available.'}</p>

            <div className="mt-3 flex flex-wrap gap-2">
              {aiConcepts.map((concept: string, idx: number) => (
                <span
                  key={`concept-${idx}`}
                  className="rounded-full bg-orange-200 px-3 py-1 text-xs font-medium text-orange-800"
                >
                  {concept}
                </span>
              ))}
            </div>

            <div className="mt-2 flex flex-wrap gap-2">
              {aiTags.map((tag: string, idx: number) => (
                <span
                  key={`tag-${idx}`}
                  className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}