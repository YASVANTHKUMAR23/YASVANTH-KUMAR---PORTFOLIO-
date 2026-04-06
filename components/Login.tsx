import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, X } from 'lucide-react';

interface LoginProps {
  onSuccess: () => void;
  onClose: () => void;
}

export function Login({ onSuccess, onClose }: LoginProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple hardcoded password for demonstration
    if (password === 'admin123') {
      onSuccess();
    } else {
      setError(true);
      setPassword('');
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-[#131313] border border-white/10 rounded-2xl w-full max-w-md p-8 relative shadow-2xl"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors">
          <X size={20} />
        </button>

        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
            <Lock size={28} className="text-[#00e1ab]" />
          </div>
          <h2 className="text-2xl font-bold text-white font-sans">Admin Access</h2>
          <p className="text-white/50 text-sm mt-2 text-center">Enter password to access the CMS dashboard.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className={`w-full bg-white/5 border ${error ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00e1ab] transition-colors text-center tracking-widest`}
              autoFocus
            />
            {error && <p className="text-red-500 text-xs text-center mt-2">Incorrect password</p>}
          </div>

          <button 
            type="submit"
            className="w-full py-3 bg-[#00e1ab] hover:bg-[#00f0b7] text-[#004a36] font-bold rounded-lg transition-colors"
          >
            Login
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
