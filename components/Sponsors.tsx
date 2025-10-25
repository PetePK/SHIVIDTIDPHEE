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

export default function Sponsors({ title = 'Our Sponsors', className = '' }: SponsorsProps) {
  return (
    <div className={`fixed bottom-3 left-1/2 -translate-x-1/2 lg:bottom-5 z-40 max-w-[95vw] ${className}`}>
      {title && (
        <p className="text-halloween-orange font-bold text-xs mb-2 text-center">
          {title}
        </p>
      )}
      <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4">
        {sponsors.map((sponsor, index) => (
          <div
            key={index}
            className="w-[50px] h-[50px] sm:w-[55px] sm:h-[55px] md:w-[60px] md:h-[60px] lg:w-[65px] lg:h-[65px] hover:scale-110 transition-transform flex items-center justify-center"
          >
            <Image
              src={sponsor.src}
              alt={sponsor.alt}
              width={65}
              height={65}
              className="w-full h-full object-contain"
              quality={90}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
