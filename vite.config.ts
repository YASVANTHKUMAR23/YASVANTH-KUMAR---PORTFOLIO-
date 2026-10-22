import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const serviceId = env.Email_JS || env.EMAILJS_SERVICE_ID || process.env.Email_JS || process.env.EMAILJS_SERVICE_ID || 'service_jvlpok3';
  const publicKey = env.EMAILJS_PUBLIC_KEY || env.Email_JS_Public_Key || process.env.EMAILJS_PUBLIC_KEY || process.env.Email_JS_Public_Key || '';
  const templateId = env.EMAILJS_TEMPLATE_ID || env.Email_JS_Template_ID || process.env.EMAILJS_TEMPLATE_ID || process.env.Email_JS_Template_ID || 'template_mbno1sz';

  return {
    plugins: [react(), tailwindcss()],
    define: {
      'import.meta.env.VITE_EMAILJS_SERVICE_ID': JSON.stringify(serviceId),
      'import.meta.env.VITE_EMAILJS_PUBLIC_KEY': JSON.stringify(publicKey),
      'import.meta.env.VITE_EMAILJS_TEMPLATE_ID': JSON.stringify(templateId),
    },
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
