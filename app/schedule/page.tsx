'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sponsors from '@/components/Sponsors';

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
      <div className="relative z-10 min-h-screen flex flex-col p-4 sm:p-6">
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

              <div className="bg-halloween-dark rounded-lg p-6 sm:p-8 min-h-[300px] sm:min-h-[400px] flex items-center justify-center border-2 border-dashed border-halloween-purple">
                <div className="text-center">
                  <svg
                    className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 text-halloween-gray"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-halloween-cream text-base sm:text-xl font-bold mb-2">
                    📅 Event Timeline
                  </p>
                  <p className="text-halloween-gray text-xs sm:text-sm mb-4">
                    กำหนดการจะแสดงที่นี่
                  </p>
                  <div className="mt-4 sm:mt-6 text-halloween-bone">
                    <p className="text-xs sm:text-sm text-halloween-gray mb-2">
                      📍 28th October 2025
                    </p>
                    <p className="text-xs sm:text-sm text-halloween-gray">
                      🕐 16:00 - 21:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Sponsors Section */}
              <div className="mt-6 sm:mt-8">
                <Sponsors />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
