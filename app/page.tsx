'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import LoadingScreen from '@/components/LoadingScreen';
import Sponsors from '@/components/Sponsors';
import { useGlobalImagePreloader } from '@/hooks/useImagePreloader';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [studentId, setStudentId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  // Preload all images in background
  useGlobalImagePreloader();

  useEffect(() => {
    // Check if redirected from successful registration
    if (searchParams.get('registered') === 'true') {
      setShowSuccess(true);
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('studentId', studentId);
        localStorage.setItem('userData', JSON.stringify(data.user));
        router.push('/menu');
      } else {
        setError(data.error || 'Student ID not found');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    router.push('/registration');
  };

  return (
    <>
      {/* Full-screen Loading Overlay */}
      {loading && <LoadingScreen message="Logging in..." />}

      <div className="w-full max-w-md mx-auto">
        <div className="bg-halloween-charcoal border-2 border-halloween-orange rounded-lg p-6 sm:p-8 shadow-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-halloween-orange mb-5 sm:mb-6 text-center">
              Login
            </h2>

            {/* Success Message */}
            {showSuccess && (
              <div className="mb-4 bg-green-900/50 border border-green-600 rounded p-3">
                <div className="flex items-center gap-2 text-sm text-green-400">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>ลงทะเบียนสำเร็จ กรุณาเข้าสู่ระบบ</span>
                </div>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
              <div>
                <label
                  htmlFor="studentId"
                  className="block text-sm sm:text-base text-halloween-cream font-bold mb-2"
                >
                  Student ID
                </label>
                <input
                  type="text"
                  id="studentId"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="w-full bg-halloween-dark border-2 border-halloween-purple rounded px-3 sm:px-4 py-2.5 sm:py-3 text-halloween-cream text-base sm:text-lg focus:border-halloween-orange focus:outline-none transition-colors"
                  placeholder="Enter your student ID"
                  required
                  suppressHydrationWarning
                />
              </div>

              {error && (
                <div className="bg-halloween-red border border-halloween-orange rounded p-3 text-halloween-cream text-sm sm:text-base text-center">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-halloween-orange hover:bg-halloween-red text-halloween-dark font-bold text-lg sm:text-xl py-3 sm:py-4 rounded-lg transition-colors disabled:opacity-50 active:scale-95"
              >
                Login
              </button>
            </form>

            <div className="my-5 sm:my-6 flex items-center">
              <div className="flex-1 border-t border-halloween-purple"></div>
              <span className="px-4 text-halloween-gray text-xs sm:text-sm">or</span>
              <div className="flex-1 border-t border-halloween-purple"></div>
            </div>

            <button
              type="button"
              onClick={handleRegister}
              className="w-full text-halloween-orange hover:text-halloween-red font-semibold text-sm sm:text-base transition-colors underline text-center"
            >
              Sign up for SHIVIDTIDPHEE
            </button>
        </div>
      </div>
    </>
  );
}

export default function Home() {
  return (
    <main className="gradient-background min-h-screen flex flex-col items-center justify-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header Section */}
        <header className="mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-center px-2">
          <p className="text-xs sm:text-sm text-halloween-moon mb-2 tracking-wide sm:tracking-widest uppercase">
            VIDVAxBANSHI
          </p>
          <h1 className="title-font text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-halloween-bone mb-2 sm:mb-3 md:mb-4 haunted-text leading-tight">
            <span className="inline">SHIVID</span>
            <span className="inline">TIDPHEE</span>
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-halloween-gray italic">
            28th October | 16:00 - 21:00 PM
          </p>
          <p className="text-xs sm:text-sm md:text-base text-halloween-gray italic">
            Larngear, Faculty of Engineering
          </p>
        </header>

        {/* Auth Section */}
        <Suspense fallback={
          <div className="w-full max-w-md mx-auto">
            <div className="bg-halloween-charcoal border-2 border-halloween-orange rounded-lg p-6 sm:p-8 shadow-2xl text-center">
              <div className="animate-spin h-8 w-8 border-4 border-halloween-orange border-t-transparent rounded-full mx-auto"></div>
              <p className="mt-4 text-halloween-cream">Loading...</p>
            </div>
          </div>
        }>
          <LoginForm />
        </Suspense>

        {/* Sponsors Section */}
        <div className="mt-8 sm:mt-10 md:mt-12">
          <Sponsors />
        </div>
      </div>
    </main>
  );
}
