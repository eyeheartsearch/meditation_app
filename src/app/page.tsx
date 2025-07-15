'use client';

import { useState } from 'react';
import Tabs from '../components/Tabs';
import MeditationAssistant from '../components/MeditationAssistant';
import SearchResults from '../components/SearchResults';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('assistant');

  return (
    <main className="min-h-screen bg-orange-50 px-4">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'assistant' ? <MeditationAssistant /> : <SearchResults />}
    </main>
  );
}
