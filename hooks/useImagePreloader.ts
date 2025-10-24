'use client';

import { useEffect, useState } from 'react';

// Preload all images in the background
export function useGlobalImagePreloader() {
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

  useEffect(() => {
    const imagesToPreload = [
      // Ghost images
      '/ghosts/ผีนางรำ.png',
      '/ghosts/ผีแม่นาค.png',
      '/ghosts/แวมไพร์.png',
      '/ghosts/ซอมบี้.png',
      '/ghosts/ผีญี่ปุ่นคอยาว.png',
      '/ghosts/ผีปอบ.png',
      '/ghosts/zatan.png',
      '/ghosts/default.png',
      // Question images
      ...Array.from({ length: 10 }, (_, i) => `/questions/q${i + 1}.png`),
    ];

    let loadedCount = 0;
    const totalImages = imagesToPreload.length;

    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setAllImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setAllImagesLoaded(true);
        }
      };
      img.src = src;
    });
  }, []);

  return allImagesLoaded;
}
