import React, { useState, useEffect } from 'react';
import { X, Mail, Check, Copy, Send, Github, MapPin, MessageSquare, ArrowUpRight } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'AI Agents & LLMs',
    message: '',
  });

  const emailAddress = 'yasvanthkumar2306@gmail.com';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const [deliveryResult, setDeliveryResult] = useState<{
    delivered: boolean;
    mailtoUrl?: string;
    gmailComposeUrl?: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    setDeliveryResult(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.projectType,
          message: formData.message,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (data.emailDelivered) {
        setSubmitted(true);
      } else {
        const mailtoFallback =
          data.mailtoUrl ||
          `mailto:${emailAddress}?subject=${encodeURIComponent(
            `[Portfolio] ${formData.projectType} - ${formData.name}`
          )}&body=${encodeURIComponent(
            `Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.projectType}\n\nMessage:\n${formData.message}`
          )}`;
        const gmailFallback =
          data.gmailComposeUrl ||
          `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}&su=${encodeURIComponent(
            `[Portfolio] ${formData.projectType} - ${formData.name}`
          )}&body=${encodeURIComponent(
            `Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.projectType}\n\nMessage:\n${formData.message}`
          )}`;

        setDeliveryResult({
          delivered: false,
          mailtoUrl: mailtoFallback,
          gmailComposeUrl: gmailFallback,
        });
      }
    } catch (err: any) {
      console.error('Modal contact submission error:', err);
      const mailtoFallback = `mailto:${emailAddress}?subject=${encodeURIComponent(
        `[Portfolio] ${formData.projectType} - ${formData.name}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      setDeliveryResult({
        delivered: false,
        mailtoUrl: mailtoFallback,
      });
      setErrorMessage(
        err?.message || 'Could not send message automatically. Please open in your mail app below.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-2.5 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-xl w-full p-4 sm:p-7 md:p-9 shadow-2xl border border-slate-200 relative my-auto sm:my-8 max-h-[92vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Contact Dialog"
          className="absolute top-3.5 right-3.5 sm:top-6 sm:right-6 p-1.5 sm:p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-800 transition-colors cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-3.5 sm:mb-6 pr-8 sm:pr-0">
          <div className="text-[11px] sm:text-xs uppercase tracking-widest font-semibold text-[#2563eb] mb-0.5 sm:mb-1">
            Let's Collaborate
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0a0f1c] tracking-tight">
            Start a Conversation
          </h3>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5 sm:mt-1">
            Have a project in mind, need custom AI engineering, or looking for a dedicated Python specialist? Reach out directly.
          </p>
        </div>

        {/* Quick Email Copy Strip */}
        <div className="bg-slate-50 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border border-slate-100 flex items-center justify-between gap-2.5 sm:gap-3 mb-3.5 sm:mb-6">
          <div className="flex items-center gap-2 sm:gap-2.5 overflow-hidden">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-blue-100/60 text-[#2563eb] flex items-center justify-center shrink-0">
              <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div className="truncate">
              <div className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-400 tracking-wider">Direct Email</div>
              <div className="text-xs sm:text-sm font-semibold text-[#0a0f1c] truncate">{emailAddress}</div>
            </div>
          </div>

          <button
            onClick={handleCopyEmail}
            className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-white border border-slate-200 hover:border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:text-[#0a0f1c] transition-all flex items-center gap-1.5 shrink-0 shadow-sm cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {deliveryResult && !deliveryResult.delivered ? (
          <div className="bg-slate-50 border border-blue-200/80 rounded-2xl p-5 text-center space-y-3.5 animate-in fade-in duration-300">
            <div className="w-10 h-10 bg-blue-100 text-[#2563eb] rounded-full flex items-center justify-center mx-auto">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900">Message Ready to Send</h4>
              <p className="text-xs text-slate-500 mt-1">
                Dispatch directly to <span className="font-semibold text-slate-800">{emailAddress}</span> via your preferred client:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
              {deliveryResult.gmailComposeUrl && (
                <a
                  href={deliveryResult.gmailComposeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 bg-[#2563eb] hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Open in Gmail</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
              {deliveryResult.mailtoUrl && (
                <a
                  href={deliveryResult.mailtoUrl}
                  className="py-2.5 px-3 bg-[#0a0f1c] hover:bg-black text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Open in Mail App</span>
                </a>
              )}
            </div>

            <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="text-slate-600 hover:text-[#2563eb] font-medium flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Email'}</span>
              </button>
              <button
                type="button"
                onClick={() => setDeliveryResult(null)}
                className="text-slate-500 hover:text-slate-800 underline cursor-pointer"
              >
                Edit message
              </button>
            </div>
          </div>
        ) : submitted ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3 animate-in fade-in duration-300">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-emerald-900">Message Received!</h4>
            <p className="text-xs sm:text-sm text-emerald-700 max-w-md mx-auto">
              Thank you for reaching out. Yasvanth Kumar will review your note and respond back to <span className="font-semibold">{formData.email}</span> shortly.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: '', email: '', projectType: 'AI Agents & LLMs', message: '' });
                onClose();
              }}
              className="mt-4 px-5 py-2 bg-[#0a0f1c] text-white text-xs font-semibold rounded-full hover:bg-black transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            {errorMessage && (
              <div className="p-2.5 sm:p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs">
                {errorMessage}
              </div>
            )}
            <div>
              <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Alex Morgan"
                className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-[#0a0f1c] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Your Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="alex@company.com"
                className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-[#0a0f1c] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Project Focus
              </label>
              <select
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-[#0a0f1c] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:bg-white transition-all"
              >
                <option value="AI Agents & LLMs">Autonomous AI Agents &amp; LLM Systems</option>
                <option value="Python Microservices">Python Microservices &amp; APIs</option>
                <option value="Computer Vision">Computer Vision &amp; Deep Learning</option>
                <option value="Full-Stack Application">Full-Stack Application Development</option>
                <option value="Consulting & Advisory">Engineering Consultation / Other</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Project Details
              </label>
              <textarea
                required
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell me about your timeline, tech requirements, or goals..."
                className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-[#0a0f1c] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:bg-white transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 sm:py-3 bg-[#0a0f1c] hover:bg-black text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Sending Message...</span>
                </span>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send className="w-4 h-4 text-slate-300" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Social Links Footer */}
        <div className="mt-4 sm:mt-6 pt-3.5 sm:pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] sm:text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#2563eb]" />
            <span>Tamil Nadu, India</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="https://www.linkedin.com/in/yasvanth-kumar/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-700 hover:text-[#2563eb] font-semibold transition-colors"
            >
              <img
                src="/linkedin.png"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 'https://cdn-icons-png.flaticon.com/512/3536/3536505.png';
                }}
                alt="LinkedIn"
                className="w-3.5 h-3.5 object-contain"
                referrerPolicy="no-referrer"
              />
              <span>LinkedIn</span>
            </a>

            <a
              href="https://github.com/YASVANTHKUMAR23"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-slate-700 hover:text-[#2563eb] font-semibold transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
