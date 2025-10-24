'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EventMapPage() {
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
                Event Map
              </h2>

              <div className="bg-halloween-dark rounded-lg p-6 sm:p-8 min-h-[300px] sm:min-h-[400px] flex items-center justify-center border-2 border-dashed border-halloween-purple">
                <p className="text-halloween-gray text-center text-sm sm:text-base">
                  [แผนที่งานจะแสดงที่นี่]
                  <br />
                  <span className="text-xs sm:text-sm">
                    กรุณาใส่รูปภาพแผนที่ในโฟลเดอร์ /public
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
