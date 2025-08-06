'use client';

import { useState } from 'react';
import Homepage from '../components/Homepage';
import Tabs from '../components/Tabs';
import MeditationAssistant from '../components/MeditationAssistant';
import SearchResults from '../components/SearchResults';
import Glossary from '../components/Glossary';
import About from '../components/About';

export default function App() {
  const [currentSection, setCurrentSection] = useState('home');

  const handleNavigate = (section: string) => {
    setCurrentSection(section);
  };

  const handleBackToHome = () => {
    setCurrentSection('home');
  };

  const renderContent = () => {
    switch (currentSection) {
      case 'home':
        return <Homepage onNavigate={handleNavigate} />;
      case 'assistant':
        return (
          <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
            <NavigationHeader currentSection="Seek Guidance" onBack={handleBackToHome} />
            <MeditationAssistant />
          </div>
        );
      case 'search':
        return <ExploreTeachings onBack={handleBackToHome} />;
      case 'about':
        return (
          <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
            <NavigationHeader currentSection="Discover the Lineage" onBack={handleBackToHome} />
            <About />
          </div>
        );
      default:
        return <Homepage onNavigate={handleNavigate} />;
    }
  };

  return <main>{renderContent()}</main>;
}

function ExploreTeachings({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState('search');

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <NavigationHeader currentSection="Explore Teachings" onBack={onBack} />
      <div className="px-4">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === 'search' ? <SearchResults /> : <Glossary />}
      </div>
    </div>
  );
}

function NavigationHeader({ currentSection, onBack }: { currentSection: string; onBack: () => void }) {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-amber-100 px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center text-amber-700 hover:text-amber-900 transition-colors font-medium"
        >
          <span className="mr-2">←</span>
          Return to Sanctuary
        </button>
        <h1 className="text-xl font-serif text-amber-900">{currentSection}</h1>
        <div className="w-32"></div> {/* Spacer for centering */}
      </div>
    </header>
  );
}
