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
    <div className={`fixed bottom-4 right-4 z-40 ${className}`}>
      {title && (
        <p className="text-halloween-orange font-bold text-xs mb-2 text-right">
          {title}
        </p>
      )}
      <div className="flex flex-wrap items-center justify-end gap-1.5 max-w-[150px]">
        {sponsors.map((sponsor, index) => (
          <div
            key={index}
            className="hover:scale-110 transition-transform"
            style={{ width: '40px', height: '40px' }}
          >
            <Image
              src={sponsor.src}
              alt={sponsor.alt}
              width={40}
              height={40}
              className="w-full h-full object-contain"
              quality={90}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
