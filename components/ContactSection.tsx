'use client';

import { motion } from 'motion/react';
import { Mail, MessageSquare, Send, User } from 'lucide-react';
import { ContactData } from '@/lib/types';

export function ContactSection({ data }: { data: ContactData }) {
  return (
    <section id="contact" className="relative w-full py-32 md:py-48 bg-[#05040a] overflow-hidden z-30">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-[#6930c3] blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-[#00e1ab] blur-[120px]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative flex flex-col lg:flex-row gap-16 md:gap-32">
        {/* Left Side: Text & Info */}
        <div className="w-full lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            {data.heading && (
              <h2 className="text-5xl md:text-8xl font-display font-bold text-white mb-8 tracking-tighter uppercase leading-[0.9]">
                {data.heading.split(' ').map((word, i) => (
                  <span key={i} className={i === 1 ? "text-transparent bg-clip-text bg-gradient-to-r from-[#00e1ab] to-[#6930c3]" : ""}>
                    {word}{' '}
                  </span>
                ))}
              </h2>
            )}
            {data.description && (
              <p className="text-xl md:text-2xl text-gray-300 font-instrument max-w-lg mb-12 leading-relaxed">
                {data.description}
              </p>
            )}

            <div className="space-y-6">
              <ContactInfoItem icon={<Mail size={20} />} label="Email Me" value="yasvanthkumar2306@gmail.com" />
              <ContactInfoItem icon={<MessageSquare size={20} />} label="LinkedIn" value="Yasvanth Kumar N" />
            </div>
          </motion.div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-1/2">
          <motion.form
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="p-8 md:p-12 rounded-[2.5rem] bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] space-y-8"
          >
            <div className="space-y-6">
              <div className="relative">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-3 block">{data.formLabels.name}</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#00e1ab] transition-colors" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full bg-[#0a0a0f] border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:border-[#00e1ab]/50 transition-all font-instrument placeholder:text-gray-700"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-3 block">{data.formLabels.email}</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#00e1ab] transition-colors" />
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full bg-[#0a0a0f] border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:border-[#00e1ab]/50 transition-all font-instrument placeholder:text-gray-700"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-3 block">{data.formLabels.message}</label>
                <textarea
                  rows={4}
                  placeholder="How can I help you?"
                  className="w-full bg-[#0a0a0f] border border-white/5 rounded-2xl p-6 text-white focus:outline-none focus:border-[#00e1ab]/50 transition-all font-instrument placeholder:text-gray-700 resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              onClick={(e) => e.preventDefault()}
              className="w-full py-5 rounded-2xl bg-white text-black font-bold text-lg hover:bg-[#00e1ab] hover:text-black transition-all duration-500 flex items-center justify-center gap-4 group"
            >
              Send Message
              <Send size={20} className="transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2" />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function ContactInfoItem({ icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center gap-6 group cursor-pointer">
      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00e1ab] group-hover:bg-[#00e1ab] group-hover:text-black transition-all duration-500 group-hover:scale-110">
        {icon}
      </div>
      <div>
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">{label}</span>
        <span className="text-xl font-instrument text-white">{value}</span>
      </div>
    </div>
  );
}
