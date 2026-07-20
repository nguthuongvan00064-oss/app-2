import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { MarketTicker } from './components/MarketTicker';
import { Hero } from './components/Hero';
import { CompanyScreener } from './components/CompanyScreener';
import { CompanyCompare } from './components/CompanyCompare';
import { IndustryRankings } from './components/IndustryRankings';
import { WorldMap } from './components/WorldMap';
import { PortfolioManager } from './components/PortfolioManager';
import { CompanyProfileModal } from './components/CompanyProfileModal';
import { BattleModeModal } from './components/BattleModeModal';
import { ExportModal } from './components/ExportModal';
import { AiChatWidget } from './components/AiChatWidget';
import { Footer } from './components/Footer';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <main className="min-h-screen flex flex-col justify-between">
      <div>
        {activeTab === 'hero' && (
          <>
            <Hero />
            <div className="pt-6">
              <CompanyScreener />
            </div>
          </>
        )}

        {activeTab === 'screener' && <CompanyScreener />}
        {activeTab === 'compare' && <CompanyCompare />}
        {activeTab === 'rankings' && <IndustryRankings />}
        {activeTab === 'map' && <WorldMap />}
        {activeTab === 'portfolio' && <PortfolioManager />}
      </div>

      {/* Persistent Floating Modals & Assistant */}
      <CompanyProfileModal />
      <BattleModeModal />
      <ExportModal />
      <AiChatWidget />

      <Footer />
    </main>
  );
};

export function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-[#0a0d14] text-slate-100 font-sans antialiased selection:bg-cyan-500 selection:text-black">
        <Navbar />
        <MarketTicker />
        <MainContent />
      </div>
    </AppProvider>
  );
}

export default App;
