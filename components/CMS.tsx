import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Save, LayoutTemplate, Clock, Award, PanelBottom, User, Mail, FileDown } from 'lucide-react';
import { ExperienceManager } from './ExperienceManager';
import { ProjectManager } from './ProjectManager';
import { CertificationManager } from './CertificationManager';
import { FooterManager } from './FooterManager';
import { AboutManager } from './AboutManager';
import { ContactManager } from './ContactManager';
import { FileUpload } from './FileUpload';
import { FolderGit2, Loader2 } from 'lucide-react';

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
  resumeUrl?: string;
}

interface CMSProps {
  data: HeroData;
  onSave: (data: HeroData) => void;
  onClose: () => void;
}

export function CMS({ data: initialData, onSave, onClose }: CMSProps) {
  const [activeTab, setActiveTab] = useState<'hero' | 'about' | 'contact' | 'timeline' | 'projects' | 'certifications' | 'footer'>('hero');
  const [formData, setFormData] = useState<HeroData>(initialData);
  const [saving, setSaving] = useState(false);

  // Fetch Hero data on mount to ensure we are editing the latest synced data
  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await fetch('/api/cms/hero');
        if (res.ok) {
          const data = await res.json();
          setFormData(data);
        }
      } catch (error) {
        console.error("Failed to fetch hero data:", error);
      }
    };
    fetchHero();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (url: string) => {
    setFormData(prev => ({ ...prev, imageSrc: url }));
  };

  const handleResumeUpload = (url: string) => {
    setFormData(prev => ({ ...prev, resumeUrl: url }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/cms/hero', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const savedData = await res.json();
        onSave(savedData);
      }
    } catch (error) {
      console.error("Failed to save hero data:", error);
    } finally {
      setSaving(false);
    }
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
          
          <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-hide">
            <TabButton active={activeTab === 'hero'} onClick={() => setActiveTab('hero')} icon={<LayoutTemplate size={18} />} label="Hero Section" />
            <TabButton active={activeTab === 'about'} onClick={() => setActiveTab('about')} icon={<User size={18} />} label="About Me" />
            <TabButton active={activeTab === 'contact'} onClick={() => setActiveTab('contact')} icon={<Mail size={18} />} label="Contact" />
            <TabButton active={activeTab === 'projects'} onClick={() => setActiveTab('projects')} icon={<FolderGit2 size={18} />} label="Projects" />
            <TabButton active={activeTab === 'certifications'} onClick={() => setActiveTab('certifications')} icon={<Award size={18} />} label="Certifications" />
            <TabButton active={activeTab === 'timeline'} onClick={() => setActiveTab('timeline')} icon={<Clock size={18} />} label="Timeline" />
            <TabButton active={activeTab === 'footer'} onClick={() => setActiveTab('footer')} icon={<PanelBottom size={18} />} label="Footer" />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto relative">
          <div className="sticky top-0 bg-[#131313]/90 backdrop-blur-sm border-b border-white/10 p-6 flex justify-between items-center z-10 hidden md:flex">
            <h2 className="text-lg font-bold text-white font-sans uppercase tracking-widest">
              {activeTab === 'hero' ? 'Edit Hero Section' : activeTab === 'about' ? 'Manage About Me' : activeTab === 'contact' ? 'Manage Contact Info' : activeTab === 'projects' ? 'Manage Projects' : activeTab === 'certifications' ? 'Manage Certifications' : activeTab === 'timeline' ? 'Manage Timeline' : 'Manage Footer'}
            </h2>
            <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="p-0">
            {activeTab === 'hero' && (
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/40 uppercase tracking-[0.2em]">Main Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00e1ab] transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/40 uppercase tracking-[0.2em]">Button Text</label>
                    <input 
                      type="text" 
                      name="buttonText" 
                      value={formData.buttonText} 
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00e1ab] transition-colors"
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <FileUpload 
                      label="Hero Profile Image" 
                      currentValue={formData.imageSrc} 
                      onUploadComplete={handleImageUpload} 
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <FileUpload 
                      label="Resume (PDF File)" 
                      currentValue={formData.resumeUrl} 
                      onUploadComplete={handleResumeUpload} 
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold text-white/40 uppercase tracking-[0.2em]">Left Text Content</label>
                    <textarea 
                      name="leftText" 
                      value={formData.leftText} 
                      onChange={handleChange}
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00e1ab] transition-colors resize-none"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold text-white/40 uppercase tracking-[0.2em]">Right Text Content</label>
                    <textarea 
                      name="rightText" 
                      value={formData.rightText} 
                      onChange={handleChange}
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00e1ab] transition-colors resize-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/40 uppercase tracking-[0.2em]">Twitter URL</label>
                    <input type="text" name="twitterUrl" value={formData.twitterUrl} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00e1ab]/50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/40 uppercase tracking-[0.2em]">Instagram URL</label>
                    <input type="text" name="instagramUrl" value={formData.instagramUrl} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00e1ab]/50" />
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 flex justify-end">
                  <button 
                    type="submit"
                    disabled={saving}
                    className="px-6 py-3 bg-[#00e1ab] hover:bg-[#00f0b7] text-[#004a36] font-bold rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
                  >
                    {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save size={20} />}
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            )}

            {activeTab === 'about' && <AboutManager />}
            {activeTab === 'contact' && <ContactManager />}
            {activeTab === 'projects' && <ProjectManager />}
            {activeTab === 'certifications' && <CertificationManager />}
            {activeTab === 'timeline' && <ExperienceManager />}
            {activeTab === 'footer' && <FooterManager />}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
        active 
          ? 'bg-[#00e1ab]/10 text-[#00e1ab]' 
          : 'text-gray-400 hover:bg-white/5 hover:text-white'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
