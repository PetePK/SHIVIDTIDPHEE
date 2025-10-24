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
    <div className={`w-full ${className}`}>
      {title && (
        <h3 className="text-center text-halloween-orange font-bold text-sm sm:text-base mb-3 sm:mb-4">
          {title}
        </h3>
      )}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6">
        {sponsors.map((sponsor, index) => (
          <div
            key={index}
            className="bg-white/90 rounded-lg p-2 sm:p-3 flex items-center justify-center hover:scale-105 transition-transform"
            style={{ width: '80px', height: '80px' }}
          >
            <Image
              src={sponsor.src}
              alt={sponsor.alt}
              width={80}
              height={80}
              className="w-full h-full object-contain"
              quality={90}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
