'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function SchedulePage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const studentId = localStorage.getItem('studentId');
    if (!studentId) {
      router.push('/');
      return;
    }
    setIsLoggedIn(true);
  }, [router]);

  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-halloween-dark">
        <p className="text-halloween-cream text-xl">กำลังโหลด...</p>
      </div>
    );
  }

  return (
    <div className="image-background min-h-screen relative overflow-hidden">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" aria-hidden="true"></div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col overflow-hidden">
        <div className="flex-1 flex flex-col p-4 sm:p-6">
        {/* Back Button */}
        <button
          onClick={() => router.push('/menu')}
          className="self-start mb-4 sm:mb-6 flex items-center gap-2 text-halloween-orange hover:text-halloween-red transition-colors"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="text-sm sm:text-base font-semibold">Back</span>
        </button>

        {/* Centered Content */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-3xl">
            <div className="bg-halloween-charcoal/95 border-2 border-halloween-orange rounded-lg p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-halloween-orange mb-6 text-center">
                Event Schedule
              </h2>

              <div className="bg-halloween-dark rounded-lg p-6 sm:p-8 border-2 border-halloween-purple">
                <div className="space-y-6">
                  {/* Event Date */}
                  <div className="text-center pb-4 border-b border-halloween-purple">
                    <div className="inline-flex items-center gap-3 text-halloween-orange">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <div className="text-left">
                        <p className="font-bold text-lg sm:text-xl">28 ตุลาคม 2568</p>
                        <p className="text-sm">16:00 - 21:00 น.</p>
                      </div>
                    </div>
                  </div>

                  {/* Activities Preview */}
                  <div className="space-y-3">
                    <h3 className="font-bold text-halloween-orange text-center mb-4">🎃 กิจกรรมภายในงาน</h3>

                    <div className="flex items-center gap-3 p-3 bg-halloween-charcoal/50 rounded-lg">
                      <span className="text-2xl">🎬</span>
                      <span className="text-halloween-cream text-sm sm:text-base">หนังกลางแปลงสุดหลอน</span>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-halloween-charcoal/50 rounded-lg">
                      <span className="text-2xl">🏚️</span>
                      <span className="text-halloween-cream text-sm sm:text-base">บ้านผีสิง</span>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-halloween-charcoal/50 rounded-lg">
                      <span className="text-2xl">💃</span>
                      <span className="text-halloween-cream text-sm sm:text-base">โชว์สุดพิเศษ</span>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-halloween-charcoal/50 rounded-lg">
                      <span className="text-2xl">🛍️</span>
                      <span className="text-halloween-cream text-sm sm:text-base">ร้านค้านิสิต</span>
                    </div>
                  </div>

                  {/* Coming Soon */}
                  <div className="mt-6 p-4 bg-halloween-orange/10 rounded-lg border border-halloween-orange">
                    <p className="text-center text-halloween-orange font-bold">📋 กำหนดการโดยละเอียด</p>
                    <p className="text-center text-halloween-gray text-sm mt-1">Coming Soon</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* Sponsors Section - Same as menu page */}
        <div className="shrink-0 w-full">
          <div className="bg-halloween-charcoal/70 border-t-2 border-halloween-orange py-2 px-0">
            <p className="text-center text-halloween-orange font-bold text-xs mb-1.5">Our Sponsors</p>
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
              {[
                { src: '/sponsors/cqk-hotpot-logo-2-copy.png', alt: 'CQK Hotpot' },
                { src: '/sponsors/escaperoomlogo.png', alt: 'Escape Room' },
                { src: '/sponsors/tri-petch-isuzu-sales-.png', alt: 'Tri Petch Isuzu Sales' },
                { src: '/sponsors/img_0628.jpg', alt: 'Sponsor' },
                { src: '/sponsors/img_7475.jpg', alt: 'Sponsor' },
                { src: '/sponsors/img_7476.jpg', alt: 'Sponsor' },
                { src: '/sponsors/img_7484.jpg', alt: 'Sponsor' },
              ].map((sponsor, index) => (
                <div key={index} className="w-[35px] h-[35px] sm:w-[40px] sm:h-[40px] md:w-[45px] md:h-[45px] flex items-center justify-center">
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
        </div>
      </div>
    </div>
  );
}
