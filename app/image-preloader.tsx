'use client';

import { useEffect } from 'react';

// Preload images to improve loading performance
export function useImagePreloader(imageUrls: string[]) {
  useEffect(() => {
    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, [imageUrls]);
}

// Preload all ghost images
export function preloadGhostImages() {
  const ghostImages = [
    '/ghosts/ผีนางรำ.png',
    '/ghosts/ผีแม่นาค.png',
    '/ghosts/แวมไพร์.png',
    '/ghosts/ซอมบี้.png',
    '/ghosts/ผีญี่ปุ่นคอยาว.png',
    '/ghosts/ผีปอบ.png',
    '/ghosts/zatan.png',
    '/ghosts/default.png',
  ];

  ghostImages.forEach((url) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  });
}

// Preload all question images
export function preloadQuestionImages() {
  const questionImages = Array.from({ length: 10 }, (_, i) => `/questions/q${i + 1}.png`);

  questionImages.forEach((url) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  });
}
