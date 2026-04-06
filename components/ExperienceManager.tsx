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
  Star,
  PenTool
} from 'lucide-react';

const availableIcons = [
  { name: 'Briefcase', icon: Briefcase },
  { name: 'Trophy', icon: Trophy },
  { name: 'Code', icon: Code },
  { name: 'Layout', icon: Layout },
  { name: 'Star', icon: Star },
  { name: 'PenTool', icon: PenTool },
];

export function ExperienceManager() {
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
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#00e1ab]" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Timeline Entries</h3>
          <p className="text-gray-500 text-sm">Manage your career milestones and achievements.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-[#00e1ab] text-[#004a36] rounded-lg font-bold hover:bg-[#00f0b7] transition-colors"
        >
          <Plus size={18} /> Add Entry
        </button>
      </div>

      <div className="space-y-4">
        {items.map((item) => {
          const Icon = availableIcons.find(i => i.name === item.icon)?.icon || Briefcase;
          return (
            <div 
              key={item.id}
              className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4"
            >
              <div className="p-3 bg-white/5 rounded-lg text-[#00e1ab]">
                <Icon size={20} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="font-bold text-white truncate">{item.title}</h4>
                  <span className="px-2 py-0.5 bg-white/10 rounded text-[10px] text-gray-400 font-mono">{item.date}</span>
                </div>
                <p className="text-gray-500 text-sm truncate">{item.description}</p>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleOpenModal(item)}
                  className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                >
                  <Edit2 size={16} />
                </button>
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="p-2 hover:bg-red-500/20 rounded-lg text-gray-400 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl bg-[#131313] border border-white/10 rounded-2xl flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <History className="text-[#00e1ab]" /> {editingItem ? 'Edit Entry' : 'New Entry'}
              </h3>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Icon</label>
                <div className="flex flex-wrap gap-3">
                  {availableIcons.map((ico) => (
                    <button
                      key={ico.name}
                      onClick={() => setFormData({ ...formData, icon: ico.name })}
                      className={`p-3 rounded-xl border transition-all ${
                        formData.icon === ico.name 
                        ? 'bg-[#00e1ab]/20 border-[#00e1ab] text-[#00e1ab]' 
                        : 'bg-white/5 border-white/10 text-gray-500 hover:border-white/20'
                      }`}
                    >
                      <ico.icon size={20} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00e1ab] transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1"><Calendar size={12} /> Date</label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00e1ab] transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1"><MapPin size={12} /> Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00e1ab] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Description</label>
                <textarea
                  value={formData.description}
                  rows={3}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00e1ab] transition-colors resize-none"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                <div>
                  <span className="text-sm font-bold text-white block">Left Node Alignment</span>
                  <span className="text-xs text-gray-500">Position on the left side (desktop only).</span>
                </div>
                <button
                  onClick={() => setFormData({ ...formData, isLeftNode: !formData.isLeftNode })}
                  className={`relative w-12 h-6 rounded-full transition-colors ${formData.isLeftNode ? 'bg-[#00e1ab]' : 'bg-gray-700'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.isLeftNode ? 'left-7' : 'left-1'}`}></div>
                </button>
              </div>
            </div>

            <div className="p-6 border-t border-white/10 flex justify-end gap-3">
              <button 
                onClick={handleCloseModal}
                className="px-6 py-2 bg-white/5 rounded-lg font-bold text-white hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-2 bg-[#00e1ab] text-[#004a36] rounded-lg font-bold hover:bg-[#00f0b7] transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
