"use client";

import React, { useState, useEffect } from 'react';
import { Save, Loader2 } from 'lucide-react';
import { FileUpload } from './FileUpload';

export interface AboutData {
  heading: string;
  imageSrc: string;
  desc1: string;
  desc2: string;
  twitter: string;
  facebook: string;
  instagram: string;
}

export function AboutManager() {
  const [formData, setFormData] = useState<AboutData>({
    heading: '',
    imageSrc: '',
    desc1: '',
    desc2: '',
    twitter: '',
    facebook: '',
    instagram: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/cms/about')
      .then(res => res.json())
      .then(data => {
        if (data && !data.error) setFormData(data);
        setLoading(false);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (url: string) => {
    setFormData(prev => ({ ...prev, imageSrc: url }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await fetch('/api/cms/about', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-white/50 p-8">Loading About data...</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-white/70 uppercase tracking-widest">About Me Heading</label>
          <input 
            type="text" 
            name="heading" 
            value={formData.heading} 
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00e1ab] transition-colors"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <FileUpload 
            label="Profile Image" 
            currentValue={formData.imageSrc} 
            onUploadComplete={handleImageUpload} 
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-white/70 uppercase tracking-widest">Description Paragraph 1</label>
          <textarea 
            name="desc1" 
            value={formData.desc1} 
            onChange={handleChange}
            rows={4}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00e1ab] transition-colors resize-none"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-white/70 uppercase tracking-widest">Description Paragraph 2</label>
          <textarea 
            name="desc2" 
            value={formData.desc2} 
            onChange={handleChange}
            rows={4}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00e1ab] transition-colors resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/70 uppercase tracking-widest">Twitter URL</label>
          <input 
            type="text" 
            name="twitter" 
            value={formData.twitter} 
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00e1ab] transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/70 uppercase tracking-widest">Facebook URL</label>
          <input 
            type="text" 
            name="facebook" 
            value={formData.facebook} 
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00e1ab] transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/70 uppercase tracking-widest">Instagram URL</label>
          <input 
            type="text" 
            name="instagram" 
            value={formData.instagram} 
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00e1ab] transition-colors"
          />
        </div>
      </div>

      <div className="pt-6 border-t border-white/10 flex justify-end">
        <button 
          type="submit"
          disabled={saving}
          className="px-6 py-3 bg-[#00e1ab] hover:bg-[#00f0b7] text-[#004a36] font-bold rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save size={20} />}
          {saving ? 'Saving...' : 'Save About Data'}
        </button>
      </div>
    </form>
  );
}
