'use client';

import { InstantSearchNext } from 'react-instantsearch-nextjs';
import { SearchBox, useHits, RefinementList } from 'react-instantsearch';
import { liteClient as algoliasearch } from 'algoliasearch/lite';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!
);

const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME!;

const conceptsClassNames = {
  root: 'space-y-2',
  label: 'flex justify-between items-center text-sm font-medium text-gray-800',
  checkbox: 'mr-2',
  count:
    'ml-2 inline-block bg-orange-100 text-orange-700 text-xs font-semibold px-2 py-0.5 rounded-full',
  list: 'space-y-2',
  item: 'flex items-center justify-between',
  selectedItem: 'font-semibold',
  searchBox:
    'w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white shadow-sm focus:ring-1 focus:ring-indigo-300 focus:outline-none',
};

const tagsClassNames = {
  ...conceptsClassNames,
  count:
    'ml-2 inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold px-2 py-0.5 rounded-full',
  searchBox:
    'w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white shadow-sm focus:ring-1 focus:ring-orange-300 focus:outline-none',
};

export default function SearchResults() {
  return (
    <InstantSearchNext searchClient={searchClient} indexName={indexName} routing>
      <div className="flex flex-col gap-6 p-4 md:flex-row">
        {/* Facets sidebar */}
        <aside className="w-full flex-shrink-0 space-y-6 md:w-1/4">
          {/* Desktop filters */}
          <div className="hidden space-y-6 md:block">
            {/* Concepts */}
            <div>
              <h2 className="mb-2 text-lg font-semibold">Spiritual Concepts</h2>
              <RefinementList
                attribute="ai_concepts"
                searchable
                showMore
                showMoreLimit={30}
                searchablePlaceholder="Search concepts"
                classNames={conceptsClassNames}
              />
            </div>

            {/* Tags */}
            <div>
              <h2 className="mb-2 text-lg font-semibold">Tags</h2>
              <RefinementList
                attribute="ai_tags"
                searchable
                showMore
                showMoreLimit={30}
                searchablePlaceholder="Search tags"
                classNames={tagsClassNames}
              />
            </div>

            {/* US/EU */}
            <div>
              <h2 className="mb-2 text-lg font-semibold">US or EU</h2>
              <RefinementList
                attribute="us_or_eu"
                searchable={false}
                showMore={false}
                transformItems={(items) =>
                  items.map((item) => ({
                    ...item,
                    label: item.label === 'us' ? 'US Class' : 'Europe Class',
                  }))
                }
                classNames={{
                  ...conceptsClassNames,
                  count:
                    'ml-2 inline-block bg-gray-200 text-gray-800 text-xs font-semibold px-2 py-0.5 rounded-full',
                }}
              />
            </div>
          </div>

          {/* Mobile Filters */}
          <div className="block space-y-4 md:hidden">
            {[
              {
                label: 'Spiritual Concepts',
                attribute: 'ai_concepts',
                searchable: true,
                placeholder: 'Search concepts',
                classNames: conceptsClassNames,
              },
              {
                label: 'Tags',
                attribute: 'ai_tags',
                searchable: true,
                placeholder: 'Search tags',
                classNames: tagsClassNames,
              },
              {
                label: 'US or EU',
                attribute: 'us_or_eu',
                searchable: false,
                transformItems: (items: any[]) =>
                  items.map((item) => ({
                    ...item,
                    label: item.label === 'us' ? 'US Class' : 'Europe Class',
                  })),
                classNames: {
                  ...conceptsClassNames,
                  count:
                    'ml-2 inline-block bg-gray-200 text-gray-800 text-xs font-semibold px-2 py-0.5 rounded-full',
                },
              },
            ].map((facet) => (
              <Disclosure key={facet.attribute}>
                {({ open }) => (
                  <div className="rounded border shadow-sm">
                    <Disclosure.Button className="flex w-full items-center justify-between bg-white px-4 py-2 text-left font-medium text-gray-700">
                      {facet.label}
                      <ChevronDownIcon
                        className={`h-5 w-5 transform transition-transform duration-200 ${
                          open ? 'rotate-180' : ''
                        }`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="bg-white px-4 py-2">
                      <RefinementList
                        attribute={facet.attribute}
                        searchable={facet.searchable}
                        showMore={false}
                        searchablePlaceholder={facet.placeholder}
                        transformItems={facet.transformItems}
                        classNames={facet.classNames}
                      />
                    </Disclosure.Panel>
                  </div>
                )}
              </Disclosure>
            ))}
          </div>
        </aside>

        {/* Hits and search box */}
        <section className="w-full md:w-3/4">
          <SearchBox
            classNames={{
              root: 'mb-6',
              form: 'relative',
              input:
                'w-full border border-gray-300 rounded-lg px-4 py-3 text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-300 bg-white shadow-sm',
              submit: 'hidden',
              reset: 'hidden',
            }}
            placeholder="Search for themes, spiritual concepts, or keywords from Stuart's past talks..."
          />

          <CustomHits />
        </section>
      </div>
    </InstantSearchNext>
  );
}

function CustomHits() {
  const { hits } = useHits();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {hits.map((hit: any) => {
        const videoId = extractYouTubeID(hit.youtube_url);
        const aiConcepts = hit.ai_concepts || [];
        const aiTags = hit.ai_tags || [];

        return (
          <div key={hit.objectID} className="rounded border p-4 shadow">
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
            <h3 className="mt-2 font-semibold">{hit.title_normalized}</h3>
            <p className="text-sm text-gray-600">{hit.ai_summary || 'No description available.'}</p>

            {/* AI Concepts: Orange / Saffron badges */}
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

            {/* AI Tags: Blue / Indigo badges */}
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

// Utility function to extract YouTube video ID
function extractYouTubeID(url: string): string | null {
  try {
    const parsed = new URL(url);
    return parsed.searchParams.get('v');
  } catch {
    return null;
  }
}

// 'use client';

// import { InstantSearchNext } from 'react-instantsearch-nextjs';
// import { SearchBox, useHits, RefinementList } from 'react-instantsearch';
// import { liteClient as algoliasearch } from 'algoliasearch/lite';
// // import { Disclosure } from '@headlessui/react';
// // import { ChevronDownIcon } from '@heroicons/react/solid';

// const searchClient = algoliasearch(
//   process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
//   process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!
// );

// const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME!;

// export default function SearchResults() {
//   return (
//     <InstantSearchNext searchClient={searchClient} indexName={indexName} routing>
//       <div className="flex flex-col md:flex-row gap-6 p-4">
//         {/* Facets sidebar */}
//         <aside className="w-full md:w-1/4 flex-shrink-0 space-y-6">
//   {/* Concepts */}
//   <div>
//     <h2 className="text-lg font-semibold mb-2">Spiritual Concepts</h2>
//     <RefinementList
//       attribute="ai_concepts"
//       searchable={true}
//       showMore={true}
//       showMoreLimit={30}
//       searchablePlaceholder="Search concepts"
//       classNames={{
//         root: 'space-y-2',
//         label: 'flex justify-between items-center text-sm font-medium text-gray-800',
//         checkbox: 'mr-2',
//         count:
//           'ml-2 inline-block bg-orange-100 text-orange-700 text-xs font-semibold px-2 py-0.5 rounded-full',
//         list: 'space-y-2',
//         item: 'flex items-center justify-between',
//         selectedItem: 'font-semibold',
//         searchBox:
//           'w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white shadow-sm focus:ring-1 focus:ring-indigo-300 focus:outline-none',
//       }}
//     />
//   </div>

//   {/* Tags */}
//   <div>
//     <h2 className="text-lg font-semibold mb-2">Tags</h2>
//     <RefinementList
//       attribute="ai_tags"
//       searchable={true}
//       showMore={true}
//       showMoreLimit={30}
//       searchablePlaceholder="Search tags"
//       classNames={{
//         root: 'space-y-2',
//         label: 'flex justify-between items-center text-sm font-medium text-gray-800',
//         checkbox: 'mr-2',
//         count:
//           'ml-2 inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold px-2 py-0.5 rounded-full',
//         list: 'space-y-2',
//         item: 'flex items-center justify-between',
//         selectedItem: 'font-semibold',
//         searchBox:
//           'w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white shadow-sm focus:ring-1 focus:ring-orange-300 focus:outline-none',
//       }}
//     />
//   </div>
// </aside>

//         {/* Hits and search box */}
//         <section className="w-full md:w-3/4">
//           <SearchBox
//   classNames={{
//     root: 'mb-6',
//     form: 'relative',
//     input:
//       'w-full border border-gray-300 rounded-lg px-4 py-3 text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-300 bg-white shadow-sm',
//     submit: 'hidden',
//     reset: 'hidden',
//   }}
//   placeholder="Search for themes, spiritual concepts, or keywords from Stuart's past talks..."
// />

//           <CustomHits />
//         </section>
//       </div>
//     </InstantSearchNext>
//   );
// }

// function CustomHits() {
//   const { hits } = useHits();

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
//       {hits.map((hit: any) => {
//         const videoId = extractYouTubeID(hit.youtube_url);
//         const aiConcepts = hit.ai_concepts || [];
//         const aiTags = hit.ai_tags || [];

//         return (
//           <div key={hit.objectID} className="p-4 border rounded shadow">
//             {videoId && (
//               <a
//                 href={`https://www.youtube.com/embed/${videoId}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="block mb-2"
//               >
//                 <img
//                   src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
//                   alt={hit.title_normalized}
//                   className="w-full h-auto rounded"
//                 />
//               </a>
//             )}
//             <h3 className="font-semibold mt-2">{hit.title_normalized}</h3>
//             <p className="text-sm text-gray-600">
//               {hit.ai_summary || 'No description available.'}
//             </p>

//             {/* AI Concepts: Orange / Saffron badges */}
//             <div className="flex flex-wrap mt-3 gap-2">
//               {aiConcepts.map((concept: string, idx: number) => (
//                 <span
//                   key={`concept-${idx}`}
//                   className="bg-orange-200 text-orange-800 text-xs font-medium px-3 py-1 rounded-full"
//                 >
//                   {concept}
//                 </span>
//               ))}
//             </div>

//             {/* AI Tags: Blue / Indigo badges */}
//             <div className="flex flex-wrap mt-2 gap-2">
//               {aiTags.map((tag: string, idx: number) => (
//                 <span
//                   key={`tag-${idx}`}
//                   className="bg-indigo-100 text-indigo-700 text-xs font-medium px-3 py-1 rounded-full"
//                 >
//                   {tag}
//                 </span>
//               ))}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// // Utility function to extract YouTube video ID
// function extractYouTubeID(url: string): string | null {
//   try {
//     const parsed = new URL(url);
//     return parsed.searchParams.get('v');
//   } catch {
//     return null;
//   }
// }
