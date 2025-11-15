import { useState } from 'react';
import { FaSignOutAlt, FaBlog, FaStar, FaProjectDiagram, FaHome } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { ReviewManager } from './ReviewManager';
import { BlogManager } from './BlogManager';
import { ProjectManager } from './ProjectManager';

interface AdminDashboardProps {
  onLogout: () => void;
}

export const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'reviews' | 'blogs'>('projects');

  const tabs = [
    { id: 'projects' as const, label: 'Projects', icon: FaProjectDiagram },
    { id: 'reviews' as const, label: 'Reviews', icon: FaStar },
    { id: 'blogs' as const, label: 'Blogs', icon: FaBlog },
  ];

  return (
    <div className="min-h-screen bg-[#0a0e1a]">
      {/* Header */}
      <header className="bg-[#1a1f2e] backdrop-blur-xl shadow-2xl border-b border-[#D4AF37]/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#D4AF37] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">Y</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#D4AF37] font-heading">Admin Dashboard</h1>
              <p className="text-xs text-[#D4AF37]/70">Yggdrasil Management Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="flex items-center gap-2 px-4 py-2 bg-[#20B2AA]/20 text-[#20B2AA] border border-[#20B2AA]/30 rounded-lg hover:bg-[#20B2AA]/30 transition-all"
            >
              <FaHome />
              <span className="hidden sm:inline">Home</span>
            </a>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-all"
            >
              <FaSignOutAlt />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-[#1a1f2e]/50 backdrop-blur-xl border-b border-[#D4AF37]/10 sticky top-[73px] z-40">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex gap-2 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all border-b-2 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-[#D4AF37] border-[#D4AF37] bg-[#D4AF37]/5'
                      : 'text-gray-400 border-transparent hover:text-[#D4AF37]/70 hover:bg-[#D4AF37]/5'
                  }`}
                >
                  <Icon />
                  {tab.label}
                </motion.button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'projects' && <ProjectManager />}
        {activeTab === 'reviews' && <ReviewManager />}
        {activeTab === 'blogs' && <BlogManager />}
      </main>
    </div>
  );
};
