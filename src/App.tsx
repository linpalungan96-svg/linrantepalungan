import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar, MenuId } from './components/Sidebar';
import { dbService } from './services/dbService';

// Views
import { DashboardView } from './views/DashboardView';
import { SiswaView } from './views/SiswaView';
import { MapelView } from './views/MapelView';
import { JadwalView } from './views/JadwalView';
import { PresensiView } from './views/PresensiView';
import { KartuSiswaView } from './views/KartuSiswaView';
import { NilaiView } from './views/NilaiView';
import { AgendaView } from './views/AgendaView';
import { BimbinganView } from './views/BimbinganView';
import { PerangkatUnduhView } from './views/PerangkatUnduhView';
import { AiModulView } from './views/AiModulView';
import { AiMediaView } from './views/AiMediaView';
import { AiPerangkatView } from './views/AiPerangkatView';
import { AiKbcView } from './views/AiKbcView';
import { AiKokurikulerView } from './views/AiKokurikulerView';
import { AiSoalView } from './views/AiSoalView';
import { AiKartuSoalView } from './views/AiKartuSoalView';
import { AiLkpdView } from './views/AiLkpdView';
import { AiPptView } from './views/AiPptView';
import { AiChatView } from './views/AiChatView';
import { LaporanView } from './views/LaporanView';
import { PengaturanView } from './views/PengaturanView';

export default function App() {
  const [activeMenu, setActiveMenu] = useState<MenuId>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('lrp_dark_mode') === 'true';
  });

  // Reaktif listener for dbService
  const [, setDbVersion] = useState(0);

  useEffect(() => {
    dbService.init();
    const unsubscribe = dbService.subscribe(() => {
      setDbVersion(v => v + 1);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('lrp_dark_mode', darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  // Render view depending on activeMenu
  const renderView = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <DashboardView onNavigate={(m) => setActiveMenu(m)} />;
      case 'siswa':
        return <SiswaView />;
      case 'mapel':
        return <MapelView />;
      case 'jadwal':
        return <JadwalView />;
      case 'presensi':
        return <PresensiView />;
      case 'kartu-siswa':
        return <KartuSiswaView />;
      case 'nilai':
        return <NilaiView />;
      case 'agenda':
        return <AgendaView />;
      case 'bimbingan':
        return <BimbinganView />;
      case 'perangkat-unduh':
        return <PerangkatUnduhView />;
      case 'ai-modul':
        return <AiModulView />;
      case 'ai-media':
        return <AiMediaView />;
      case 'ai-perangkat':
        return <AiPerangkatView />;
      case 'ai-kbc':
        return <AiKbcView />;
      case 'ai-kokurikuler':
        return <AiKokurikulerView />;
      case 'ai-soal':
        return <AiSoalView />;
      case 'ai-kartu-soal':
        return <AiKartuSoalView />;
      case 'ai-lkpd':
        return <AiLkpdView />;
      case 'ai-ppt':
        return <AiPptView />;
      case 'ai-chat':
        return <AiChatView />;
      case 'laporan':
        return <LaporanView />;
      case 'pengaturan':
        return <PengaturanView />;
      default:
        return <DashboardView onNavigate={(m) => setActiveMenu(m)} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Top Navbar */}
      <Header
        onToggleSidebar={() => setIsSidebarOpen(prev => !prev)}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      <div className="flex-1 flex w-full">
        {/* Sidebar Nav */}
        <Sidebar
          activeMenu={activeMenu}
          onSelectMenu={(menu) => setActiveMenu(menu)}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <main className="flex-1 lg:pl-72 w-full max-w-full overflow-x-hidden p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {renderView()}
          </div>
        </main>
      </div>
    </div>
  );
}
