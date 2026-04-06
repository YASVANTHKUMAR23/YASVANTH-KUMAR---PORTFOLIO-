'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Pencil, Trash2, Save, X, Image as ImageIcon } from 'lucide-react';
import { Certification } from '@/lib/types';

export function CertificationManager() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCert, setCurrentCert] = useState<Partial<Certification>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      const response = await fetch('/api/cms/certifications');
      const data = await response.json();
      setCertifications(data);
    } catch (error) {
      console.error('Failed to fetch certifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const method = currentCert.id ? 'PUT' : 'POST';
      const response = await fetch('/api/cms/certifications', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentCert),
      });
      
      if (response.ok) {
        await fetchCertifications();
        setIsEditing(false);
        setCurrentCert({});
      }
    } catch (error) {
      console.error('Failed to save certification:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this certification?')) return;
    
    try {
      const response = await fetch(`/api/cms/certifications?id=${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        await fetchCertifications();
      }
    } catch (error) {
      console.error('Failed to delete certification:', error);
    }
  };

  if (isLoading) {
    return <div className="text-white/50 text-center py-8">Loading certifications...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-white">Certifications List</h3>
        <button
          onClick={() => {
            setCurrentCert({});
            setIsEditing(true);
          }}
          className="px-4 py-2 bg-[#00e1ab]/10 text-[#00e1ab] hover:bg-[#00e1ab]/20 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus size={18} />
          Add Certification
        </button>
      </div>

      <div className="grid gap-4">
        {certifications.map((cert) => (
          <div key={cert.id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex justify-between items-center group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-black/50 overflow-hidden relative border border-white/10 flex items-center justify-center">
                {cert.img ? (
                  <Image src={cert.img} alt={cert.title} fill className="object-cover" unoptimized />
                ) : (
                  <ImageIcon size={20} className="text-white/20" />
                )}
              </div>
              <div>
                <h4 className="text-white font-medium">{cert.title}</h4>
                <p className="text-white/50 text-sm">{cert.issuer} • {cert.date}</p>
              </div>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => {
                  setCurrentCert(cert);
                  setIsEditing(true);
                }}
                className="p-2 text-white/50 hover:text-[#00e1ab] hover:bg-[#00e1ab]/10 rounded-lg transition-colors"
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={() => handleDelete(cert.id)}
                className="p-2 text-white/50 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <div className="bg-[#131313] border border-white/10 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
              <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">
                  {currentCert.id ? 'Edit Certification' : 'Add Certification'}
                </h3>
                <button onClick={() => setIsEditing(false)} className="text-white/50 hover:text-white">
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">Title</label>
                  <input
                    type="text"
                    value={currentCert.title || ''}
                    onChange={e => setCurrentCert({...currentCert, title: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#00e1ab] outline-none"
                    placeholder="e.g. Google Cloud Professional Data Engineer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70">Issuer</label>
                    <input
                      type="text"
                      value={currentCert.issuer || ''}
                      onChange={e => setCurrentCert({...currentCert, issuer: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#00e1ab] outline-none"
                      placeholder="e.g. Google Cloud"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70">Date</label>
                    <input
                      type="text"
                      value={currentCert.date || ''}
                      onChange={e => setCurrentCert({...currentCert, date: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#00e1ab] outline-none"
                      placeholder="e.g. 2025"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">Description</label>
                  <textarea
                    value={currentCert.desc || ''}
                    onChange={e => setCurrentCert({...currentCert, desc: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#00e1ab] outline-none h-24 resize-none"
                    placeholder="Brief description of the certification..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">Image URL</label>
                  <input
                    type="text"
                    value={currentCert.img || ''}
                    onChange={e => setCurrentCert({...currentCert, img: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#00e1ab] outline-none"
                    placeholder="https://..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">Credential Link</label>
                  <input
                    type="text"
                    value={currentCert.link || ''}
                    onChange={e => setCurrentCert({...currentCert, link: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#00e1ab] outline-none"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="p-6 border-t border-white/10 flex justify-end gap-4">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2 text-white/70 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-[#00e1ab] hover:bg-[#00f0b7] text-[#004a36] font-bold rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Save size={18} />
                  Save
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
