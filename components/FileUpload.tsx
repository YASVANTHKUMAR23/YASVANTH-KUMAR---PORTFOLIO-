"use client";

import React, { useState, useRef } from 'react';
import { Upload, X, Check, Loader2, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface FileUploadProps {
  onUploadComplete: (url: string) => void;
  currentValue?: string;
  label?: string;
  bucket?: string;
}

export function FileUpload({ onUploadComplete, currentValue, label, bucket = 'portfolio' }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentValue || null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Local preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload
    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('bucket', bucket);

    try {
      const res = await fetch('/api/cms/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Upload failed');
      }

      const data = await res.json();
      onUploadComplete(data.url);
      setPreview(data.url);
    } catch (err: any) {
      setError(err.message);
      setPreview(currentValue || null);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    onUploadComplete('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium text-white/70 font-mono uppercase tracking-wider">{label}</label>}
      
      <div 
        onClick={() => fileInputRef.current?.click()}
        className={`relative group cursor-pointer border-2 border-dashed rounded-xl transition-all duration-300 min-h-[160px] flex flex-col items-center justify-center p-4 overflow-hidden ${
          preview ? 'border-[#00e1ab]/50 bg-[#00e1ab]/5' : 'border-white/10 hover:border-white/30 bg-white/5'
        }`}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
          accept="image/*"
        />

        {preview ? (
          <div className="absolute inset-0 w-full h-full">
            <Image 
              src={preview} 
              alt="Preview" 
              fill 
              className={`object-cover transition-opacity duration-300 ${uploading ? 'opacity-40' : 'opacity-100'}`}
              unoptimized
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <button 
                onClick={handleRemove}
                className="p-2 bg-red-500/80 hover:bg-red-500 rounded-full text-white transition-colors"
                title="Remove Image"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 text-white/50 group-hover:text-white/80 transition-colors">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
              <Upload size={20} />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium">Click to upload from desktop</p>
              <p className="text-xs mt-1">Images only (PNG, JPG, SVG)</p>
            </div>
          </div>
        )}

        {uploading && (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-3 z-10 backdrop-blur-sm">
            <Loader2 className="w-8 h-8 text-[#00e1ab] animate-spin" />
            <p className="text-[#00e1ab] font-medium text-sm">Uploading...</p>
          </div>
        )}

        {error && (
          <div className="absolute bottom-4 left-4 right-4 p-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-xs text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
