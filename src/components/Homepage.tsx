'use client';

import { useState } from 'react';
import Image from 'next/image';

interface HomepageProps {
  onNavigate: (section: string) => void;
}

export default function Homepage({ onNavigate }: HomepageProps) {
  const [currentQuote] = useState({
    text: "The practice of meditation is not about becoming perfect; it's about becoming present. In that presence, we find the infinite depth of who we truly are.",
    session: "Evening Meditation • October 2024"
  });

  const gateways = [
    {
      id: 'assistant',
      title: 'Seek Guidance',
      description: 'This tool can be used after meditations. Ask questions freely and connect to the teachings.',
      icon: '🪷',
      gradient: 'from-amber-100 to-orange-100',
      hoverGradient: 'from-amber-200 to-orange-200',
      borderColor: 'border-amber-200',
      textColor: 'text-amber-900'
    },
    {
      id: 'search',
      title: 'Explore Teachings',
      description: 'Search through years of wisdom and guidance',
      icon: '📜',
      gradient: 'from-yellow-100 to-amber-100',
      hoverGradient: 'from-yellow-200 to-amber-200', 
      borderColor: 'border-yellow-200',
      textColor: 'text-amber-800'
    },
    {
      id: 'about',
      title: 'Discover the Lineage',
      description: 'Learn about the spiritual path from Rudi to Stuart',
      icon: '🕉️',
      gradient: 'from-orange-100 to-red-100',
      hoverGradient: 'from-orange-200 to-red-200',
      borderColor: 'border-orange-200', 
      textColor: 'text-orange-900'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D97706' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header with Logo */}
        <header className="text-center mb-16">
          <div className="flex justify-center items-center mb-8">
            <div className="bg-gradient-to-br from-amber-100 to-orange-200 p-4 rounded-full shadow-lg sacred-glow animate-lotus-breathe">
              <Image
                src="/lotus.png"
                alt="Lotus - Symbol of Spiritual Awakening"
                width={80}
                height={80}
                className="drop-shadow-sm"
                style={{
                  filter: 'brightness(0) saturate(100%) invert(47%) sepia(69%) saturate(3059%) hue-rotate(21deg) brightness(97%) contrast(101%)'
                }}
              />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-serif text-amber-900 mb-4 tracking-wide">
            The Teachings of
          </h1>
          <h2 className="text-4xl md:text-5xl font-serif text-orange-800 mb-6 font-medium">
            Stuart Perrin
          </h2>
          <p className="text-lg md:text-xl text-amber-700 max-w-2xl mx-auto leading-relaxed font-light">
            50 Years of Wisdom • Daily Meditation • Timeless Guidance
          </p>
        </header>

        {/* Hero Image Section */}
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <div className="w-64 h-64 md:w-80 md:h-80 mx-auto rounded-full overflow-hidden shadow-2xl ring-8 ring-amber-100/50 animate-sacred-breathe">
              <Image
                src="/stuart.jpg"
                alt="Stuart Perrin in meditation"
                width={320}
                height={320}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Sacred breathing aura */}
            <div className="absolute inset-0 rounded-full border-2 border-amber-300/40 animate-gentle-pulse"></div>
          </div>
        </div>

        {/* Three Gateways Navigation */}
        <section className="mb-16">
          <h3 className="text-2xl md:text-3xl font-serif text-center text-amber-900 mb-12">
            Enter the Sanctuary
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {gateways.map((gateway) => (
              <button
                key={gateway.id}
                onClick={() => onNavigate(gateway.id)}
                className={`group relative overflow-hidden rounded-2xl p-8 text-left transition-all duration-500 transform hover:scale-105 hover:shadow-xl bg-gradient-to-br ${gateway.gradient} hover:${gateway.hoverGradient} border-2 ${gateway.borderColor} shadow-lg`}
              >
                <div className="relative z-10">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {gateway.icon}
                  </div>
                  <h4 className={`text-2xl font-serif ${gateway.textColor} mb-3 group-hover:text-opacity-80`}>
                    {gateway.title}
                  </h4>
                  <p className={`${gateway.textColor} text-opacity-80 leading-relaxed`}>
                    {gateway.description}
                  </p>
                </div>
                
                {/* Subtle hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            ))}
          </div>
        </section>

        {/* Daily Wisdom Section */}
        <section className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-amber-100">
            <h3 className="text-2xl md:text-3xl font-serif text-center text-amber-900 mb-8">
              Today's Reflection
            </h3>
            
            <blockquote className="text-center">
              <div className="text-6xl text-amber-300 mb-4 font-serif leading-none">"</div>
              <p className="text-lg md:text-xl text-gray-700 italic leading-relaxed mb-6 font-serif">
                {currentQuote.text}
              </p>
              <footer className="text-sm text-amber-600 font-medium">
                — {currentQuote.session}
              </footer>
            </blockquote>
          </div>
        </section>

        {/* Ornamental Divider */}
        <div className="flex justify-center my-16">
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent"></div>
          <div className="w-2 h-2 bg-amber-300 rounded-full mx-4 -mt-1"></div>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent"></div>
        </div>

        {/* Footer */}
        <footer className="text-center text-amber-600 text-sm">
          <p>A digital sanctuary preserving 50 years of spiritual wisdom</p>
        </footer>
      </div>
    </div>
  );
}