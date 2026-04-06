import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Save, LayoutTemplate, Clock, Award, PanelBottom } from 'lucide-react';
import { ExperienceManager } from './ExperienceManager';
import { ProjectManager } from './ProjectManager';
import { CertificationManager } from './CertificationManager';
import { FooterManager } from './FooterManager';
import { FolderGit2 } from 'lucide-react';

export interface HeroData {
  name: string;
  imageSrc: string;
  leftText: string;
  rightText: string;
  twitterUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  buttonText: string;
  buttonUrl: string;
}

interface CMSProps {
  data: HeroData;
  onSave: (data: HeroData) => void;
  onClose: () => void;
}

export function CMS({ data, onSave, onClose }: CMSProps) {
  const [activeTab, setActiveTab] = useState<'hero' | 'timeline' | 'projects' | 'certifications' | 'footer'>('hero');
  const [formData, setFormData] = useState<HeroData>(data);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
    >
      <div className="bg-[#131313] border border-white/10 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col md:flex-row">
        
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 bg-black/20 border-b md:border-b-0 md:border-r border-white/10 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-white font-sans">CMS Admin</h2>
            <button onClick={onClose} className="md:hidden text-white/50 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>
          
          <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
            <button 
              onClick={() => setActiveTab('hero')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                activeTab === 'hero' 
                  ? 'bg-[#00e1ab]/10 text-[#00e1ab]' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <LayoutTemplate size={18} />
              Hero Section
            </button>
            <button 
              onClick={() => setActiveTab('projects')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                activeTab === 'projects' 
                  ? 'bg-[#00e1ab]/10 text-[#00e1ab]' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <FolderGit2 size={18} />
              Projects
            </button>
            <button 
              onClick={() => setActiveTab('certifications')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                activeTab === 'certifications' 
                  ? 'bg-[#00e1ab]/10 text-[#00e1ab]' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Award size={18} />
              Certifications
            </button>
            <button 
              onClick={() => setActiveTab('timeline')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                activeTab === 'timeline' 
                  ? 'bg-[#00e1ab]/10 text-[#00e1ab]' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Clock size={18} />
              Timeline
            </button>
            <button 
              onClick={() => setActiveTab('footer')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                activeTab === 'footer' 
                  ? 'bg-[#00e1ab]/10 text-[#00e1ab]' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <PanelBottom size={18} />
              Footer
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto relative">
          <div className="sticky top-0 bg-[#131313]/90 backdrop-blur-sm border-b border-white/10 p-6 flex justify-between items-center z-10 hidden md:flex">
            <h2 className="text-lg font-bold text-white font-sans">
              {activeTab === 'hero' ? 'Edit Hero Section' : activeTab === 'projects' ? 'Manage Projects' : activeTab === 'certifications' ? 'Manage Certifications' : activeTab === 'timeline' ? 'Manage Timeline' : 'Manage Footer'}
            </h2>
            <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'hero' && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70 font-mono uppercase tracking-wider">Main Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00e1ab] transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70 font-mono uppercase tracking-wider">Hero Image URL</label>
                    <input 
                      type="text" 
                      name="imageSrc" 
                      value={formData.imageSrc} 
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00e1ab] transition-colors"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-white/70 font-mono uppercase tracking-wider">Left Text Content</label>
                    <textarea 
                      name="leftText" 
                      value={formData.leftText} 
                      onChange={handleChange}
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00e1ab] transition-colors resize-none"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-white/70 font-mono uppercase tracking-wider">Right Text Content</label>
                    <textarea 
                      name="rightText" 
                      value={formData.rightText} 
                      onChange={handleChange}
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00e1ab] transition-colors resize-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70 font-mono uppercase tracking-wider">Twitter URL</label>
                    <input 
                      type="text" 
                      name="twitterUrl" 
                      value={formData.twitterUrl} 
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00e1ab] transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70 font-mono uppercase tracking-wider">Instagram URL</label>
                    <input 
                      type="text" 
                      name="instagramUrl" 
                      value={formData.instagramUrl} 
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00e1ab] transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70 font-mono uppercase tracking-wider">YouTube URL</label>
                    <input 
                      type="text" 
                      name="youtubeUrl" 
                      value={formData.youtubeUrl} 
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00e1ab] transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70 font-mono uppercase tracking-wider">Button Text</label>
                    <input 
                      type="text" 
                      name="buttonText" 
                      value={formData.buttonText} 
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00e1ab] transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70 font-mono uppercase tracking-wider">Button URL</label>
                    <input 
                      type="text" 
                      name="buttonUrl" 
                      value={formData.buttonUrl} 
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00e1ab] transition-colors"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 flex justify-end">
                  <button 
                    type="submit"
                    className="px-6 py-3 bg-[#00e1ab] hover:bg-[#00f0b7] text-[#004a36] font-bold rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <Save size={20} />
                    Save Changes
                  </button>
                </div>
              </form>
            )}

            {activeTab === 'projects' && (
              <ProjectManager />
            )}

            {activeTab === 'certifications' && (
              <CertificationManager />
            )}

            {activeTab === 'timeline' && (
              <ExperienceManager />
            )}

            {activeTab === 'footer' && (
              <FooterManager />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
