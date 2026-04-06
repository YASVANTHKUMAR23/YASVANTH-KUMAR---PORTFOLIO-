'use client';

import React, { useState, useEffect } from 'react';
import { Save, Loader2, Plus, Trash2 } from 'lucide-react';
import { FooterData } from '@/lib/types';

export function FooterManager() {
  const [formData, setFormData] = useState<FooterData>({
    name: 'YASVANTH KUMAR N',
    description: 'Crafting intuitive, user-centered digital experiences that drive engagement and business value.',
    navLinks: [],
    socialLinks: [],
    copyright: '© 2026 YASVANTH KUMAR N. ALL RIGHTS RESERVED.'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchFooterData();
  }, []);

  const fetchFooterData = async () => {
    try {
      const response = await fetch('/api/cms/footer');
      if (response.ok) {
        const data = await response.json();
        setFormData(data);
      }
    } catch (error) {
      console.error('Failed to fetch footer data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/cms/footer', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Footer saved successfully!');
      }
    } catch (error) {
      console.error('Failed to save footer:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="text-white/50 text-center py-8">Loading footer data...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-white">Footer Settings</h3>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-4 py-2 bg-[#00e1ab] text-[#004a36] hover:bg-[#00f0b7] rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
        >
          {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          Save Footer
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/70">Name / Brand</label>
          <input
            type="text"
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value || 'YASVANTH KUMAR N'})}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#00e1ab] outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/70">Copyright Text</label>
          <input
            type="text"
            value={formData.copyright}
            onChange={e => setFormData({...formData, copyright: e.target.value || '© 2026 YASVANTH KUMAR N. ALL RIGHTS RESERVED.'})}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#00e1ab] outline-none"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-white/70">Description</label>
          <textarea
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value || 'Crafting intuitive, user-centered digital experiences that drive engagement and business value.'})}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#00e1ab] outline-none h-24 resize-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Nav Links */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-white/70">Navigation Links</label>
            <button 
              onClick={() => setFormData({...formData, navLinks: [...formData.navLinks, { label: '', href: '' }]})}
              className="text-xs flex items-center gap-1 text-[#00e1ab] hover:text-[#00f0b7]"
            >
              <Plus size={14} /> Add Link
            </button>
          </div>
          {formData.navLinks.map((link, idx) => (
            <div key={idx} className="flex gap-2">
              <input
                type="text"
                placeholder="Label"
                value={link.label}
                onChange={e => {
                  const newLinks = [...formData.navLinks];
                  newLinks[idx].label = e.target.value;
                  setFormData({...formData, navLinks: newLinks});
                }}
                className="w-1/2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-[#00e1ab] outline-none"
              />
              <input
                type="text"
                placeholder="URL"
                value={link.href}
                onChange={e => {
                  const newLinks = [...formData.navLinks];
                  newLinks[idx].href = e.target.value;
                  setFormData({...formData, navLinks: newLinks});
                }}
                className="w-1/2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-[#00e1ab] outline-none"
              />
              <button 
                onClick={() => {
                  const newLinks = [...formData.navLinks];
                  newLinks.splice(idx, 1);
                  setFormData({...formData, navLinks: newLinks});
                }}
                className="p-2 text-white/50 hover:text-red-400 bg-white/5 rounded-lg"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-white/70">Social Links</label>
            <button 
              onClick={() => setFormData({...formData, socialLinks: [...formData.socialLinks, { label: '', url: '' }]})}
              className="text-xs flex items-center gap-1 text-[#00e1ab] hover:text-[#00f0b7]"
            >
              <Plus size={14} /> Add Social
            </button>
          </div>
          {formData.socialLinks.map((link, idx) => (
            <div key={idx} className="flex gap-2">
              <input
                type="text"
                placeholder="Platform"
                value={link.label}
                onChange={e => {
                  const newLinks = [...formData.socialLinks];
                  newLinks[idx].label = e.target.value;
                  setFormData({...formData, socialLinks: newLinks});
                }}
                className="w-1/2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-[#00e1ab] outline-none"
              />
              <input
                type="text"
                placeholder="URL"
                value={link.url}
                onChange={e => {
                  const newLinks = [...formData.socialLinks];
                  newLinks[idx].url = e.target.value;
                  setFormData({...formData, socialLinks: newLinks});
                }}
                className="w-1/2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-[#00e1ab] outline-none"
              />
              <button 
                onClick={() => {
                  const newLinks = [...formData.socialLinks];
                  newLinks.splice(idx, 1);
                  setFormData({...formData, socialLinks: newLinks});
                }}
                className="p-2 text-white/50 hover:text-red-400 bg-white/5 rounded-lg"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
