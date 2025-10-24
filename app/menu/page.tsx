'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import LoadingScreen from '@/components/LoadingScreen';

// Ghost image mapping - All 7 ghosts
const ghostImages: Record<string, string> = {
  'ผีนางรำ': '/ghosts/ผีนางรำ.png',
  'ผีแม่นาค': '/ghosts/ผีแม่นาค.png',
  'แวมไพร์': '/ghosts/แวมไพร์.png',
  'ซอมบี้': '/ghosts/ซอมบี้.png',
  'ผีสาวญี่ปุ่นคอยาว': '/ghosts/ผีญี่ปุ่นคอยาว.png',
  'ผีปอบ': '/ghosts/ผีปอบ.png',
  'Zatan': '/ghosts/zatan.png',
};

const defaultGhostImage = '/ghosts/default.png';

export default function MenuPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [navigating, setNavigating] = useState(false);

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
  }, [router]);

  const handleLogout = () => {
    setNavigating(true);
    localStorage.removeItem('studentId');
    localStorage.removeItem('userData');
    router.push('/');
  };

  const handleNavigate = (path: string) => {
    setNavigating(true);
    router.push(path);
  };

  if (!userData) {
    return <LoadingScreen message="กำลังโหลด..." />;
  }

  if (navigating) {
    return <LoadingScreen />;
  }

  const menuItems = [
    { title: 'My Ticket', path: '/my-ticket', icon: '🎫' },
    { title: 'Event Map', path: '/event-map', icon: '🗺️' },
    { title: 'Schedule', path: '/schedule', icon: '📅' },
  ];

  return (
    <div className="image-background min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-black/40 pointer-events-none" aria-hidden="true"></div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 px-3 sm:px-4 md:px-6 py-12 sm:py-16 md:py-16 lg:py-8 overflow-hidden">
        {/* Logout Icon - Top Right (Scrolls with content) */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 z-20">
          <button
            type="button"
            onClick={handleLogout}
            className="p-1.5 sm:p-2 md:p-3 rounded-full bg-halloween-charcoal/80 hover:bg-halloween-red/90 border-2 border-halloween-orange transition-all active:scale-95 group"
            aria-label="Sign out"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-halloween-cream group-hover:text-halloween-dark transition-colors"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>

        {/* Header */}
        <div className="text-center shrink-0">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-bold text-white">
            SHIVIDTIDPHEE
          </h1>
        </div>

        {/* Ghost Display Section */}
        <div className="shrink-0 flex justify-center w-full">
          <div className="w-full max-w-[240px] sm:max-w-[280px] md:max-w-[340px] lg:max-w-[340px] bg-halloween-charcoal/90 border-2 border-halloween-orange rounded-lg flex flex-col items-center justify-center p-3 sm:p-4 md:p-6 lg:p-5">
            {/* Ghost Image */}
            <div className="w-full flex items-center justify-center mb-2 sm:mb-3 pt-2 sm:pt-3">
              <Image
                src={userData.ghost_result ? ghostImages[userData.ghost_result] : defaultGhostImage}
                alt={userData.ghost_result || 'Mystery Ghost'}
                width={200}
                height={200}
                className="rounded-lg w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain"
                priority
                quality={85}
              />
            </div>

            {/* Ghost Name or Question */}
            {userData.ghost_result ? (
              <>
                <p className="text-sm sm:text-base md:text-xl lg:text-xl font-bold text-halloween-orange mb-1.5 sm:mb-2 md:mb-3">
                  {userData.ghost_result}
                </p>
                <button
                  type="button"
                  onClick={() => handleNavigate('/what-ghost')}
                  className="bg-halloween-purple hover:bg-halloween-orange border-2 border-halloween-orange text-halloween-cream hover:text-halloween-dark font-bold text-[10px] sm:text-xs md:text-sm px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 rounded-full transition-all active:scale-95 shadow-lg flex items-center gap-1.5 sm:gap-2"
                >
                  <span>👻</span>
                  <span>เล่นอีกครั้ง</span>
                </button>
              </>
            ) : (
              <>
                <p className="text-xs sm:text-sm md:text-base text-white font-medium mb-1.5 sm:mb-2">
                  What Ghost Am I?
                </p>
                {/* Button - Different style when not played yet */}
                <button
                  type="button"
                  onClick={() => handleNavigate('/what-ghost')}
                  className="bg-halloween-purple hover:bg-halloween-orange border-2 border-halloween-orange text-halloween-cream hover:text-halloween-dark font-bold text-[10px] sm:text-xs md:text-sm px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 rounded-full transition-all active:scale-95 shadow-lg flex items-center gap-1.5 sm:gap-2 relative"
                >
                  {/* Notification Dot */}
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-red-600 rounded-full"></span>
                  <span>👻</span>
                  <span>Let's Find Out!</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Menu - Single Column Vertical */}
        <div className="shrink-0 flex justify-center w-full">
          <div className="w-full max-w-[240px] sm:max-w-[280px] md:max-w-[340px] lg:max-w-[340px] space-y-1.5 sm:space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigate(item.path)}
                className="w-full bg-halloween-charcoal/90 hover:bg-halloween-orange/90 border-2 border-halloween-orange rounded-lg p-2 sm:p-3 md:p-4 lg:p-4 flex items-center gap-2 sm:gap-3 md:gap-4 transition-all active:scale-98 group"
              >
                <span className="text-xl sm:text-2xl md:text-3xl lg:text-3xl group-hover:scale-110 transition-transform shrink-0">
                  {item.icon}
                </span>
                <span className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-halloween-cream group-hover:text-halloween-dark text-left flex-1">
                  {item.title}
                </span>
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-halloween-orange group-hover:text-halloween-dark transition-colors shrink-0"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
