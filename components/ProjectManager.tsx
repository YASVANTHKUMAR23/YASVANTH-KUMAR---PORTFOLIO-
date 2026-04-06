"use client";

import { useState, useEffect } from 'react';
import { Project } from '@/lib/types';
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Loader2, 
  X,
  Save
} from 'lucide-react';

export function ProjectManager() {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Project | null>(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState<Partial<Project>>({});

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/cms/projects');
        if (res.ok) {
          const data = await res.json();
          setItems(data);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const handleOpenModal = (item?: Project) => {
    if (item) {
      setEditingItem(item);
      setFormData({ ...item, tech: item.tech || [] });
    } else {
      setEditingItem(null);
      setFormData({
        title: '',
        description: '',
        folderLabel: '',
        tag: '',
        date: '',
        imageUrl: '',
        location: '',
        tech: [],
        github: '',
        demo: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTechChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const techString = e.target.value;
    const techArray = techString.split(',').map(t => t.trim()).filter(t => t !== '');
    setFormData(prev => ({ ...prev, tech: techArray }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const method = editingItem ? 'PUT' : 'POST';
      const res = await fetch('/api/cms/projects', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const savedItem = await res.json();
        if (editingItem) {
          setItems(items.map(item => item.id === savedItem.id ? savedItem : item));
        } else {
          setItems([...items, savedItem]);
        }
        handleCloseModal();
      }
    } catch (error) {
      console.error("Failed to save project:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    try {
      const res = await fetch(`/api/cms/projects?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setItems(items.filter(item => item.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 text-[#00e1ab] animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-white">Projects</h3>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm font-medium"
        >
          <Plus size={16} />
          Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-white font-bold text-lg">{item.title}</h4>
                <p className="text-[#00e1ab] text-sm">{item.tag} • {item.date}</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleOpenModal(item)}
                  className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <Edit2 size={16} />
                </button>
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-white/50 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <p className="text-white/70 text-sm line-clamp-2">{item.description}</p>
          </div>
        ))}
        {items.length === 0 && (
          <div className="col-span-full text-center py-12 text-white/50 border border-dashed border-white/10 rounded-xl">
            No projects found. Add one to get started.
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">
                {editingItem ? 'Edit Project' : 'Add New Project'}
              </h2>
              <button onClick={handleCloseModal} className="text-white/50 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <form id="project-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70">Title *</label>
                    <input 
                      required
                      type="text" 
                      name="title" 
                      value={formData.title || ''} 
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00e1ab]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70">Folder Label (Finder)</label>
                    <input 
                      type="text" 
                      name="folderLabel" 
                      value={formData.folderLabel || ''} 
                      onChange={handleChange}
                      placeholder="Short name for desktop"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00e1ab]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70">Tag / Category *</label>
                    <input 
                      required
                      type="text" 
                      name="tag" 
                      value={formData.tag || ''} 
                      onChange={handleChange}
                      placeholder="e.g. Web App"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00e1ab]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70">Date *</label>
                    <input 
                      required
                      type="text" 
                      name="date" 
                      value={formData.date || ''} 
                      onChange={handleChange}
                      placeholder="e.g. 2024"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00e1ab]"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-white/70">Image URL *</label>
                    <input 
                      required
                      type="text" 
                      name="imageUrl" 
                      value={formData.imageUrl || ''} 
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00e1ab]"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-white/70">Description *</label>
                    <textarea 
                      required
                      name="description" 
                      value={formData.description || ''} 
                      onChange={handleChange}
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00e1ab] resize-none"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-white/70">Technologies (comma separated)</label>
                    <input 
                      type="text" 
                      value={formData.tech?.join(', ') || ''} 
                      onChange={handleTechChange}
                      placeholder="React, Next.js, Tailwind"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00e1ab]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70">GitHub URL</label>
                    <input 
                      type="text" 
                      name="github" 
                      value={formData.github || ''} 
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00e1ab]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/70">Live Demo URL</label>
                    <input 
                      type="text" 
                      name="demo" 
                      value={formData.demo || ''} 
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00e1ab]"
                    />
                  </div>
                </div>
              </form>
            </div>
            
            <div className="p-6 border-t border-white/10 flex justify-end gap-4 bg-[#131313]">
              <button 
                type="button"
                onClick={handleCloseModal}
                className="px-6 py-3 text-white hover:bg-white/5 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button 
                form="project-form"
                type="submit"
                disabled={saving}
                className="px-6 py-3 bg-[#00e1ab] hover:bg-[#00f0b7] text-[#004a36] font-bold rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save size={20} />}
                {saving ? 'Saving...' : 'Save Project'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
