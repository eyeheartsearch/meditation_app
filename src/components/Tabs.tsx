type TabsProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export default function Tabs({ activeTab, setActiveTab }: TabsProps) {
  return (
    <div className="flex justify-center gap-4 py-4">
      <button
        className={`rounded px-4 py-2 ${activeTab === 'assistant' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        onClick={() => setActiveTab('assistant')}
      >
        Post Meditation Assistant
      </button>
      <button
        className={`rounded px-4 py-2 ${activeTab === 'search' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        onClick={() => setActiveTab('search')}
      >
        Search
      </button>
      <button
        className={`rounded px-4 py-2 ${activeTab === 'glossary' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        onClick={() => setActiveTab('glossary')}
      >
        Glossary
      </button>
      <button
        className={`rounded px-4 py-2 ${activeTab === 'about' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        onClick={() => setActiveTab('about')}
      >
        About
      </button>
    </div>
  );
}
