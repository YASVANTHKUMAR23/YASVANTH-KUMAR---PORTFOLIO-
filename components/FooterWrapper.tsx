'use client';

import React, { useState, useEffect } from 'react';
import { StickyFooter } from './StickyFooter';
import { FooterData } from '@/lib/types';

export function FooterWrapper() {
  const [footerData, setFooterData] = useState<FooterData | null>(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await fetch('/api/cms/footer');
        if (response.ok) {
          const data = await response.json();
          setFooterData(data);
        }
      } catch (error) {
        console.error('Failed to fetch footer data:', error);
      }
    };

    fetchFooterData();
  }, []);

  if (!footerData) {
    return null;
  }

  return <StickyFooter data={footerData} />;
}
