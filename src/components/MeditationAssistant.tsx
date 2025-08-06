'use client';

import { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { MicrophoneIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { liteClient as algoliasearch } from 'algoliasearch/lite';
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
      console.log('Starting wisdom search for:', question);
      
      // Step 1: Call API route to extract phrases
      const response = await fetch('/api/extract-phrases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      console.log('API Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown API error' }));
        console.error('API Error:', errorData);
        throw new Error(`Failed to extract phrases: ${errorData.error || response.statusText}`);
      }

      const { phrases } = await response.json();
      console.log('Extracted phrases:', phrases);

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
      console.error('Wisdom search error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      alert(`We encountered an issue while searching for wisdom: ${errorMessage}. Please check that your API keys are configured and try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="max-w-4xl mx-auto w-full text-center">
        <h2 className="text-2xl md:text-3xl font-serif text-amber-900 mb-6 animate-sacred-breathe">
          What wisdom do you seek today?
        </h2>

        <p className="text-lg text-amber-700 mb-8 max-w-2xl mx-auto leading-relaxed">
          Share your question through voice or words. Let the teachings guide you to understanding.
        </p>

        {/* Sacred Microphone */}
        <div className="relative my-8">
          <button
            onClick={handleMicClick}
            className={clsx(
              'w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 transform',
              'bg-gradient-to-br from-amber-100 to-orange-200 shadow-xl border-2 border-amber-300 sacred-glow relative z-10',
              listening && 'ring-4 ring-amber-400 animate-gentle-pulse scale-110',
              !listening && 'hover:scale-105 hover:shadow-2xl animate-sacred-breathe'
            )}
          >
            <MicrophoneIcon className="w-12 h-12 text-amber-700" />
          </button>

          {/* Sacred listening state */}
          {listening && (
            <p className="mt-4 text-amber-700 text-center italic font-serif animate-gentle-pulse">
              {transcript || 'Listening with reverence...'}
            </p>
          )}

          {/* Sacred completion state */}
          {!listening && justStopped && (
            <p className="mt-4 text-amber-600 text-center italic font-serif opacity-80">
              Your words have been received
            </p>
          )}
        </div>

        {/* Sacred Text Input */}
        <div className="w-full max-w-2xl mt-8">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={4}
            placeholder="Share your seeking with us..."
            className="w-full p-6 border-2 border-amber-200 rounded-2xl shadow-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 focus:outline-none bg-white/90 backdrop-blur-sm font-serif text-amber-900 placeholder-amber-500 transition-all duration-300"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!question.trim()}
          className="mt-6 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-serif font-medium rounded-2xl shadow-lg hover:from-amber-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 sacred-glow"
        >
          Seek Wisdom
        </button>

        {/* Sacred Loading */}
        {isLoading && (
          <div className="mt-8 flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-amber-500 sacred-glow" />
            <p className="mt-4 text-amber-700 font-serif italic animate-sacred-breathe">
              Searching the teachings...
            </p>
          </div>
        )}

        {/* Results Modal */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-6xl w-full bg-white rounded-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <Dialog.Title className="text-2xl font-bold text-gray-900">
                  We found a few talks for you
                </Dialog.Title>
                <p className="text-gray-600 mt-1">
                  Click a video or continue searching for the right recording.
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {results.map((hit: HitWithMetadata, i: number) => {
                const videoId = extractYouTubeID(hit.youtube_url);
                const aiConcepts = hit.ai_concepts || [];
                const aiTags = hit.ai_tags || [];

                return (
                  <div key={hit.objectID} className="rounded border p-4 shadow hover:shadow-lg transition">
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

                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg flex-1">{hit.title_normalized}</h3>
                      {i === 0 && (
                        <span className="ml-2 inline-block bg-orange-200 text-orange-800 text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0">
                          Recommended
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-gray-600 mb-3">{hit.ai_summary || 'No description available.'}</p>

                    {/* AI Concepts: Orange / Saffron badges */}
                    <div className="flex flex-wrap gap-2 mb-2">
                      {aiConcepts.map((concept: string, idx: number) => (
                        <span
                          key={`concept-${idx}`}
                          className="rounded-full bg-orange-200 px-3 py-1 text-xs font-medium text-orange-800"
                        >
                          {concept}
                        </span>
                      ))}
                    </div>

                    {/* AI Tags: Blue / Indigo badges */}
                    <div className="flex flex-wrap gap-2">
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
          </Dialog.Panel>
        </div>
      </Dialog>
      </div>
    </div>
  );
}