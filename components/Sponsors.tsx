'use client';

import Image from 'next/image';

const sponsors = [
  { src: '/sponsors/cqk-hotpot-logo-2-copy.png', alt: 'CQK Hotpot' },
  { src: '/sponsors/escaperoomlogo.png', alt: 'Escape Room' },
  { src: '/sponsors/tri-petch-isuzu-sales-.png', alt: 'Tri Petch Isuzu Sales' },
  { src: '/sponsors/img_0628.jpg', alt: 'Sponsor' },
  { src: '/sponsors/img_7475.jpg', alt: 'Sponsor' },
  { src: '/sponsors/img_7476.jpg', alt: 'Sponsor' },
  { src: '/sponsors/img_7484.jpg', alt: 'Sponsor' },
];

interface SponsorsProps {
  title?: string;
  className?: string;
}

export default function Sponsors({ title = 'ผู้สนับสนุน', className = '' }: SponsorsProps) {
  return (
    <div className={`fixed bottom-4 left-1/2 -translate-x-1/2 md:left-auto md:right-4 md:translate-x-0 z-40 ${className}`}>
      {title && (
        <p className="text-halloween-orange font-bold text-xs mb-2 text-center md:text-right">
          {title}
        </p>
      )}
      <div className="flex items-center justify-center md:justify-end gap-2">
        {sponsors.map((sponsor, index) => (
          <div
            key={index}
            className="hover:scale-110 transition-transform"
            style={{ width: '45px', height: '45px' }}
          >
            <Image
              src={sponsor.src}
              alt={sponsor.alt}
              width={45}
              height={45}
              className="w-full h-full object-contain"
              quality={90}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
