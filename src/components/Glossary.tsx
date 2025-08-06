'use client';

import { useEffect, useState } from 'react';
import { liteClient as algoliasearch } from 'algoliasearch/lite';

type GlossaryHit = {
  objectID: string;
  title_normalized: string;
  youtube_url: string;
  ai_summary?: string;
  talk_date: number; // timestamp
};

export default function Glossary() {
  const [talks, setTalks] = useState<GlossaryHit[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalHits, setTotalHits] = useState<number>(0);

  useEffect(() => {
    if (talks.length === 0) {
      fetchAllTalks();
    }
  }, [talks.length]);

  const fetchAllTalks = async () => {
    setIsLoading(true);
    try {
      const searchClient = algoliasearch(
        process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
        process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!
      );

      const searchResults = await searchClient.search({
        requests: [
          {
            indexName: process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME!,
            query: '',
            hitsPerPage: 1000, // Get all results
          },
        ],
      });

      const firstResult = searchResults.results[0];
      if ('hits' in firstResult) {
        const sortedTalks = (firstResult.hits as GlossaryHit[]).sort(
          (a, b) => b.talk_date - a.talk_date // Newest first
        );
        setTalks(sortedTalks);
        setTotalHits(firstResult.nbHits || 0);
      }
    } catch (error) {
      console.error('Error fetching talks:', error);
    } finally {
      setIsLoading(false);
    }
  };


  const handleDateClick = (youtubeUrl: string) => {
    window.open(youtubeUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-orange-50 min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            All Talks Glossary
          </h1>
          <p className="text-gray-600 mb-2">
            All talks listed chronologically. Hover for summary, click to watch.
          </p>
          {totalHits > 0 && (
            <p className="text-sm text-gray-500">
              {totalHits.toLocaleString()} talks total
            </p>
          )}
        </div>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-orange-500 border-opacity-50" />
          </div>
        ) : (
          <div className="space-y-2 bg-white rounded-lg p-6 shadow-sm">
            {talks.map((talk) => (
              <div
                key={talk.objectID}
                className="border-b border-gray-200 py-2 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between w-full">
                  <button
                    onClick={() => handleDateClick(talk.youtube_url)}
                    className="text-left group flex-shrink-0"
                  >
                    <span className="text-orange-600 hover:text-orange-700 font-medium group-hover:underline">
                      {talk.title_normalized}
                    </span>
                  </button>
                  <div className="ml-4 text-gray-600 text-sm flex-1">
                    {talk.ai_summary || 'No summary available'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}