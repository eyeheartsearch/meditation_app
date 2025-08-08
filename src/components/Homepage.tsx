'use client';

import { useState } from 'react';
import Image from 'next/image';

interface HomepageProps {
  onNavigate: (section: string) => void;
}

export default function Homepage({ onNavigate }: HomepageProps) {
  const [currentQuote] = useState({
    text: "The practice of meditation is not about becoming perfect; it's about becoming present. In that presence, we find the infinite depth of who we truly are.",
    session: 'Evening Meditation • October 2024',
  });

  const gateways = [
    {
      id: 'assistant',
      title: 'Seek Guidance',
      description:
        'This tool can be used after meditations. Ask questions freely and connect to the teachings.',
      icon: '🪷',
      gradient: 'from-amber-100 to-orange-100',
      hoverGradient: 'from-amber-200 to-orange-200',
      borderColor: 'border-amber-200',
      textColor: 'text-amber-900',
    },
    {
      id: 'search',
      title: 'Explore Teachings',
      description: 'Search through years of wisdom and guidance',
      icon: '📜',
      gradient: 'from-yellow-100 to-amber-100',
      hoverGradient: 'from-yellow-200 to-amber-200',
      borderColor: 'border-yellow-200',
      textColor: 'text-amber-800',
    },
    {
      id: 'about',
      title: 'Discover the Lineage',
      description: 'Learn about the spiritual path from Rudi to Stuart',
      icon: '🛕',
      gradient: 'from-orange-100 to-red-100',
      hoverGradient: 'from-orange-200 to-red-200',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-900',
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D97706' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header with Logo */}
        <header className="mb-16 text-center">
          <div className="mb-8 flex items-center justify-center">
            <div className="sacred-glow animate-lotus-breathe rounded-full bg-gradient-to-br from-amber-100 to-orange-200 p-4 shadow-lg">
              <Image
                src="/lotus.png"
                alt="Lotus - Symbol of Spiritual Awakening"
                width={80}
                height={80}
                className="drop-shadow-sm"
                style={{
                  filter:
                    'brightness(0) saturate(100%) invert(47%) sepia(69%) saturate(3059%) hue-rotate(21deg) brightness(97%) contrast(101%)',
                }}
              />
            </div>
          </div>

          <h1 className="mb-4 font-serif text-5xl tracking-wide text-amber-900 md:text-6xl">
            The Teachings of
          </h1>
          <h2 className="mb-6 font-serif text-4xl font-medium text-orange-800 md:text-5xl">
            Stuart Perrin
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed font-light text-amber-700 md:text-xl">
            50 Years of Wisdom • Daily Meditation • Timeless Guidance
          </p>
        </header>

        {/* Hero Image Section */}
        <div className="mb-16 text-center">
          <div className="relative inline-block">
            <div className="animate-sacred-breathe mx-auto h-64 w-64 overflow-hidden rounded-full shadow-2xl ring-8 ring-amber-100/50 md:h-80 md:w-80">
              <Image
                src="/stuart.jpg"
                alt="Stuart Perrin in meditation"
                width={320}
                height={320}
                className="h-full w-full object-cover"
              />
            </div>
            {/* Sacred breathing aura */}
            <div className="animate-gentle-pulse absolute inset-0 rounded-full border-2 border-amber-300/40"></div>
          </div>
        </div>

        {/* Three Gateways Navigation */}
        <section className="mb-16">
          <h3 className="mb-12 text-center font-serif text-2xl text-amber-900 md:text-3xl">
            Enter the Sanctuary
          </h3>

          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
            {gateways.map((gateway) => (
              <button
                key={gateway.id}
                onClick={() => onNavigate(gateway.id)}
                className={`group relative transform overflow-hidden rounded-2xl bg-gradient-to-br p-8 text-left transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95 ${gateway.gradient} hover:${gateway.hoverGradient} border-4 ${gateway.borderColor} cursor-pointer shadow-xl ring-2 ring-amber-200 hover:border-amber-400 hover:shadow-2xl hover:ring-4 hover:ring-amber-300`}
              >
                <div className="relative z-10">
                  <div className="mb-4 text-6xl transition-transform duration-300 group-hover:scale-110">
                    {gateway.icon}
                  </div>
                  <h4
                    className={`font-serif text-2xl ${gateway.textColor} group-hover:text-opacity-80 mb-3`}
                  >
                    {gateway.title}
                  </h4>
                  <p className={`${gateway.textColor} text-opacity-80 mb-4 leading-relaxed`}>
                    {gateway.description}
                  </p>
                  <div
                    className={`text-base font-bold md:text-lg ${gateway.textColor} mt-4 flex items-center justify-center rounded-full border-2 border-amber-300 bg-white/90 px-4 py-2 shadow-md transition-all duration-300 group-hover:border-amber-500 group-hover:shadow-lg`}
                  >
                    <svg
                      className="mr-2 h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    <span className="transition-transform duration-300 group-hover:scale-105">
                      CLICK TO ENTER
                    </span>
                    <svg
                      className="ml-2 h-5 w-5 transform transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Enhanced hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </button>
            ))}
          </div>
        </section>

        {/* Daily Wisdom Section */}
        <section className="mx-auto max-w-4xl">
          <div className="rounded-3xl border border-amber-100 bg-white/80 p-8 shadow-xl backdrop-blur-sm md:p-12">
            <h3 className="mb-8 text-center font-serif text-2xl text-amber-900 md:text-3xl">
              Today&rsquo;s Reflection
            </h3>

            <blockquote className="text-center">
              <div className="mb-4 font-serif text-6xl leading-none text-amber-300">&ldquo;</div>
              <p className="mb-6 font-serif text-lg leading-relaxed text-gray-700 italic md:text-xl">
                {currentQuote.text}
              </p>
              <footer className="text-sm font-medium text-amber-600">
                — {currentQuote.session}
              </footer>
            </blockquote>
          </div>
        </section>

        {/* Ornamental Divider */}
        <div className="my-16 flex justify-center">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-300 to-transparent"></div>
          <div className="mx-4 -mt-1 h-2 w-2 rounded-full bg-amber-300"></div>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-300 to-transparent"></div>
        </div>

        {/* Footer */}
        <footer className="text-center text-sm text-amber-600">
          <p>A digital sanctuary preserving 50 years of spiritual wisdom</p>
        </footer>
      </div>
    </div>
  );
}
