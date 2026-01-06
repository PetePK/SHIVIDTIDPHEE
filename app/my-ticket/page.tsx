'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import QRCode from 'qrcode';

export default function MyTicketPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    // Check if user is logged in
    const studentId = localStorage.getItem('studentId');
    const userDataStr = localStorage.getItem('userData');

    if (!studentId || !userDataStr) {
      router.push('/');
      return;
    }

    const data = JSON.parse(userDataStr);
    setUserData(data);

    // Generate QR code
    QRCode.toDataURL(data.qr_code, {
      width: 400,
      margin: 2,
      color: {
        dark: '#c17850',
        light: '#1a0f0f',
      },
    }).then((url) => setQrCodeUrl(url));
  }, [router]);

  if (!userData) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-halloween-dark">
        <p className="text-halloween-cream text-xl font-iannnnn-owl">กำลังโหลด...</p>
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
          <div className="w-full max-w-md">
            <div className="bg-halloween-charcoal/95 border-2 border-halloween-orange rounded-lg p-6 sm:p-8 text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
                My Ticket
              </h2>

              <p className="text-sm sm:text-base text-halloween-bone mb-6 font-iannnnn-owl">
                แสดง QR Code นี้เมื่อเข้างาน
              </p>

              {qrCodeUrl && (
                <div className="bg-halloween-dark p-4 sm:p-6 rounded-lg inline-block mb-6">
                  <img
                    src={qrCodeUrl}
                    alt="QR Code"
                    className="border-4 border-halloween-orange rounded w-full max-w-xs mx-auto"
                  />
                </div>
              )}

              <div className="bg-halloween-dark p-4 sm:p-5 rounded border border-halloween-purple space-y-3">
                <div>
                  <p className="text-halloween-gray text-xs sm:text-sm mb-1 font-iannnnn-owl">ชื่อ-นามสกุล</p>
                  <p className="text-halloween-cream text-lg sm:text-xl font-semibold">
                    {userData.full_name}
                  </p>
                </div>
                <div>
                  <p className="text-halloween-gray text-xs sm:text-sm mb-1 font-iannnnn-owl">รหัสนิสิต</p>
                  <p className="text-halloween-orange text-xl sm:text-2xl font-mono font-bold tracking-wide">
                    {userData.student_id}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
