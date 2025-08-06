type TabsProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export default function Tabs({ activeTab, setActiveTab }: TabsProps) {
  const tabs = [
    { id: 'search', label: 'Search Teachings', icon: '🔍' },
    { id: 'glossary', label: 'All Talks', icon: '📚' }
  ];

  return (
    <div className="flex justify-center py-8">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-amber-100">
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md transform scale-105'
                  : 'text-amber-700 hover:bg-amber-50 hover:text-amber-800'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="font-serif">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
