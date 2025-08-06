'use client';
//testing new build

import Image from 'next/image';

export default function About() {
  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">About the Lineage</h1>
          <p className="text-gray-600">
            A journey through the spiritual lineage from Swami Rudrananda to Stuart Perrin.
          </p>
        </div>

        {/* Rudi Section */}
        <div className="mb-8 rounded-lg bg-white p-8 shadow-sm">
          <div className="flex flex-col items-start gap-8 md:flex-row">
            <div className="flex-shrink-0">
              <Image
                src="/rudi.jpg"
                alt="Swami Rudrananda (Rudi)"
                width={250}
                height={300}
                className="rounded-lg shadow-md"
              />
            </div>
            <div className="flex-1">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Swami Rudrananda (Rudi)</h2>
              <div className="prose prose-gray max-w-none">
                <p className="mb-4">
                  Swami Rudrananda, affectionately known as &ldquo;Rudi,&rdquo; was a pioneering
                  spiritual teacher who developed a unique meditation practice centered around the
                  transformative power of breath work and inner surrender. Born Albert Rudolph, he
                  became one of the most influential American-born spiritual teachers of the 20th
                  century.
                </p>
                <p className="mb-4">
                  Rudi developed the revolutionary &ldquo;double breathing&rdquo; exercise, a
                  powerful technique that combines conscious breathing with deep meditative
                  awareness to create profound spiritual transformation. This practice became the
                  cornerstone of his teachings, helping countless students access deeper states of
                  consciousness and inner peace.
                </p>
                <p className="mb-4">
                  His approach emphasized practical spirituality—finding the divine through everyday
                  life experiences while maintaining a disciplined practice. Rudi taught that true
                  spiritual growth comes through complete surrender and the cultivation of inner
                  stillness through breath awareness.
                </p>
                <p>
                  Tragically, Rudi&rsquo;s physical journey ended in a plane crash in the mountains,
                  but his teachings and the profound impact he had on his students continue to this
                  day. Among his closest disciples was Stuart Perrin, who was with him during those
                  final moments and would carry forward the lineage.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stuart Section */}
        <div className="rounded-lg bg-white p-8 shadow-sm">
          <div className="flex flex-col items-start gap-8 md:flex-row">
            <div className="flex-shrink-0 md:order-2">
              <Image
                src="/stuart.jpg"
                alt="Stuart Perrin"
                width={250}
                height={300}
                className="rounded-lg shadow-md"
              />
            </div>
            <div className="flex-1 md:order-1">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Stuart Perrin</h2>
              <div className="prose prose-gray max-w-none">
                <p className="mb-4">
                  Stuart Perrin, one of Rudi&rsquo;s closest students and spiritual heirs, has
                  dedicated over 50 years to teaching and preserving the profound meditation
                  practices he learned from his master. Having been present during Rudi&rsquo;s
                  final moments, Stuart carries both the deep responsibility and the authentic
                  transmission of this powerful spiritual lineage.
                </p>
                <p className="mb-4">
                  For many years, Stuart taught at the Ashram in Denton, Texas, where he guided
                  countless students through the transformative practices of double breathing
                  meditation and spiritual surrender. His teaching style combines deep wisdom with
                  practical guidance, helping students navigate both their inner journey and their
                  everyday lives.
                </p>
                <p className="mb-4">
                  Stuart&rsquo;s life has been one of adventure and spiritual exploration, always
                  seeking to deepen his own practice while sharing these timeless teachings with
                  others. His approach emphasizes the importance of consistent practice, surrender,
                  and finding the extraordinary within the ordinary moments of life.
                </p>
                <p className="mb-4">
                  When COVID-19 forced changes to traditional in-person teaching, Stuart discovered
                  Zoom as a powerful medium to reach his global community of students. What began as
                  necessity became a blessing—Stuart now teaches classes almost every day of the
                  week, connecting with students from around the world who gather to meditate
                  together and receive his guidance.
                </p>
                <p>
                  This website is dedicated to preserving and sharing the deep wisdom that flows
                  through Stuart during the Q&A sessions that follow each meditation. These profound
                  exchanges, born from the stillness of deep practice, offer timeless insights into
                  the nature of consciousness, surrender, and the spiritual path. Here you can
                  search through years of these precious teachings, finding guidance and inspiration
                  for your own journey toward inner peace and spiritual awakening.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
