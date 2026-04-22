"use client";

import React, { useState, useEffect } from 'react';
import { Save, Loader2 } from 'lucide-react';

export interface ContactData {
  heading: string;
  description: string;
  email: string;
  linkedin: string;
  location: string;
  labelName: string;
  labelEmail: string;
  labelMessage: string;
  labelButton: string;
}

export function ContactManager() {
  const [formData, setFormData] = useState<ContactData>({
    heading: '',
    description: '',
    email: '',
    linkedin: '',
    location: '',
    labelName: '',
    labelEmail: '',
    labelMessage: '',
    labelButton: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/cms/contact')
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await fetch('/api/cms/contact', {
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

  if (loading) return <div className="text-white/50 p-8">Loading Contact data...</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-white/70 uppercase tracking-widest">Contact Heading</label>
          <input 
            type="text" 
            name="heading" 
            value={formData.heading} 
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00e1ab] transition-colors"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-white/70 uppercase tracking-widest">Description</label>
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange}
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00e1ab] transition-colors resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/70 uppercase tracking-widest">Email Address</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00e1ab] transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/70 uppercase tracking-widest">LinkedIn Profile Name</label>
          <input 
            type="text" 
            name="linkedin" 
            value={formData.linkedin} 
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00e1ab] transition-colors"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-white/70 uppercase tracking-widest">Location</label>
          <input 
            type="text" 
            name="location" 
            value={formData.location} 
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00e1ab] transition-colors"
          />
        </div>

        <div className="pt-4 md:col-span-2 border-t border-white/5">
          <h4 className="text-xs font-bold text-[#00e1ab] uppercase tracking-widest mb-4">Form Labels</h4>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/70 uppercase tracking-widest">Name Field Label</label>
          <input 
            type="text" 
            name="labelName" 
            value={formData.labelName} 
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00e1ab] transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/70 uppercase tracking-widest">Email Field Label</label>
          <input 
            type="text" 
            name="labelEmail" 
            value={formData.labelEmail} 
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00e1ab] transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/70 uppercase tracking-widest">Message Field Label</label>
          <input 
            type="text" 
            name="labelMessage" 
            value={formData.labelMessage} 
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00e1ab] transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/70 uppercase tracking-widest">Button Label</label>
          <input 
            type="text" 
            name="labelButton" 
            value={formData.labelButton} 
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
          {saving ? 'Saving...' : 'Save Contact Data'}
        </button>
      </div>
    </form>
  );
}
