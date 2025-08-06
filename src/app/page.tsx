'use client';

import { useState } from 'react';
import Tabs from '../components/Tabs';
import MeditationAssistant from '../components/MeditationAssistant';
import SearchResults from '../components/SearchResults';
import Glossary from '../components/Glossary';
import About from '../components/About';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('assistant');

  const renderContent = () => {
    switch (activeTab) {
      case 'assistant':
        return <MeditationAssistant />;
      case 'search':
        return <SearchResults />;
      case 'glossary':
        return <Glossary />;
      case 'about':
        return <About />;
      default:
        return <MeditationAssistant />;
    }
  };

  return (
    <main className="min-h-screen bg-orange-50 px-4">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {renderContent()}
    </main>
  );
}
