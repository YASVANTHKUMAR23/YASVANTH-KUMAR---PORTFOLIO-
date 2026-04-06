'use client';

import { useState, useEffect } from 'react';
import { Experience } from '@/lib/types';
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Loader2, 
  X,
  Save,
  Briefcase,
  Trophy,
  Code,
  MapPin,
  Calendar,
  History,
  Layout,
  Star
} from 'lucide-react';

const availableIcons = [
  { name: 'Briefcase', icon: Briefcase },
  { name: 'Trophy', icon: Trophy },
  { name: 'Code', icon: Code },
  { name: 'Layout', icon: Layout },
  { name: 'Star', icon: Star },
];

export function Timeline() {
  const [items, setItems] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Experience | null>(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState<Partial<Experience>>({});

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      const res = await fetch('/api/cms/experience');
      const data = await res.json();
      setItems(data);
      setLoading(false);
    };

    fetchItems();
  }, []);

  const refreshItems = async () => {
    const res = await fetch('/api/cms/experience');
    const data = await res.json();
    setItems(data);
  };

  const handleOpenModal = (item?: Experience) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({
        id: Date.now(),
        title: '',
        description: '',
        icon: 'Briefcase',
        isLeftNode: true,
        date: '',
        location: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({});
  };

  const handleSave = async () => {
    setSaving(true);
    const method = editingItem ? 'PUT' : 'POST';
    const res = await fetch('/api/cms/experience', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      await refreshItems();
      handleCloseModal();
    } else {
      alert('Failed to save experience.');
    }
    setSaving(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this experience?')) return;
    const res = await fetch('/api/cms/experience', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (res.ok) refreshItems();
  };

  if (loading) {
    return (
      <section className="relative w-full py-24 px-6 sm:px-12 lg:px-24 bg-[#030303] z-20 border-t border-white/5">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-[#6930c3]" />
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full py-24 px-6 sm:px-12 lg:px-24 bg-[#030303] z-20 border-t border-white/5">
      <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Experience Timeline</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#00e1ab] to-[#6E00FF] rounded-full mb-4" />
            <p className="text-gray-500">Manage your career milestones, internships, and hackathon achievements.</p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-3 px-6 py-3 bg-[#6930c3] text-white rounded-2xl font-bold shadow-[0_10px_30px_rgba(105,48,195,0.3)] hover:scale-105 active:scale-95 transition-all"
          >
            <Plus size={20} /> New Milestone
          </button>
        </div>

        <div className="space-y-4">
          {items.map((item) => {
            const Icon = availableIcons.find(i => i.name === item.icon)?.icon || Briefcase;
            return (
              <div 
                key={item.id}
                className="group bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 hover:border-[#6930c3]/50 transition-all flex items-center gap-6"
              >
                <div className="p-4 bg-white/5 rounded-2xl text-[#00e1ab] group-hover:scale-110 transition-transform duration-500">
                  <Icon size={24} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-bold text-white truncate">{item.title}</h3>
                    <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] text-gray-500 font-mono tracking-widest">{item.date}</span>
                  </div>
                  <p className="text-gray-500 text-sm truncate font-sans">{item.description}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleOpenModal(item)}
                    className="p-3 bg-white/5 hover:bg-[#6930c3] rounded-xl text-gray-400 hover:text-white transition-all shadow-lg"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="p-3 bg-white/5 hover:bg-red-500 rounded-xl text-gray-400 hover:text-white transition-all shadow-lg"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Experience Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-end bg-black/60 backdrop-blur-sm p-4">
            <div className="w-full max-w-xl h-full bg-[#0a0a0a] border-l border-white/10 animate-in slide-in-from-right duration-500 flex flex-col overflow-hidden rounded-[2.5rem] md:rounded-none md:rounded-l-[2.5rem]">
              <div className="p-10 border-b border-white/5 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1 flex items-center gap-3">
                    <History className="text-[#6930c3]" /> {editingItem ? 'Edit Milestone' : 'New Milestone'}
                  </h2>
                  <p className="text-xs text-gray-500 font-mono tracking-widest uppercase">Career Timeline</p>
                </div>
                <button onClick={handleCloseModal} className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-gray-500 transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-10 space-y-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Icon Selector</label>
                  <div className="flex gap-4">
                    {availableIcons.map((ico) => (
                      <button
                        key={ico.name}
                        onClick={() => setFormData({ ...formData, icon: ico.name })}
                        className={`p-4 rounded-2xl border transition-all ${
                          formData.icon === ico.name 
                          ? 'bg-[#6930c3] border-[#6930c3] text-white' 
                          : 'bg-white/5 border-white/10 text-gray-500 hover:border-white/20'
                        }`}
                      >
                        <ico.icon size={20} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#6930c3] transition-colors"
                    placeholder="e.g. Microsoft Elevate"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <label className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]"><Calendar size={12} /> Date / Period</label>
                    <input
                      type="text"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#6930c3] transition-colors"
                      placeholder="e.g. 2023 – 2027"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]"><MapPin size={12} /> Location / Type</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#6930c3] transition-colors"
                      placeholder="e.g. Internship"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Description</label>
                  <textarea
                    value={formData.description}
                    rows={4}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#6930c3] transition-colors resize-none"
                    placeholder="Summarize your role or achievement..."
                  />
                </div>

                <div className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/10">
                  <div className="space-y-1">
                    <span className="text-sm font-bold text-white">Left Node Alignment</span>
                    <p className="text-xs text-gray-500">Position card on the left side of timeline (desktop only).</p>
                  </div>
                  <button
                    onClick={() => setFormData({ ...formData, isLeftNode: !formData.isLeftNode })}
                    className={`relative w-12 h-6 rounded-full transition-colors ${formData.isLeftNode ? 'bg-[#6930c3]' : 'bg-gray-700'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.isLeftNode ? 'left-7' : 'left-1'}`}></div>
                  </button>
                </div>
              </div>

              <div className="p-10 border-t border-white/5 bg-white/[0.02] flex gap-4">
                <button 
                  onClick={handleCloseModal}
                  className="flex-1 py-4 bg-white/5 rounded-2xl font-bold text-white hover:bg-white/10 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-[2] py-4 bg-[#6930c3] rounded-2xl font-bold text-white shadow-[0_10px_30px_rgba(105,48,195,0.3)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {saving ? <Loader2 size={24} className="animate-spin" /> : <Save size={24} />}
                  {saving ? 'Saving...' : 'Save Milestone'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
