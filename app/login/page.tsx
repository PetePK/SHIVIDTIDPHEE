'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BackButton from '@/components/BackButton';

export default function LoginPage() {
  const router = useRouter();
  const [studentId, setStudentId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
        // Store student ID in localStorage
        localStorage.setItem('studentId', studentId);
        localStorage.setItem('userData', JSON.stringify(data.user));
        router.push('/menu');
      } else {
        setError(data.error || 'ไม่พบรหัสนิสิตนี้ในระบบ');
      }
    } catch (err) {
      console.error(err);
      setError('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gradient-background min-h-screen px-4 py-8">
      <div className="max-w-md mx-auto">
        <BackButton />
        <div className="text-center mb-6 sm:mb-8 px-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-halloween-orange mb-3 sm:mb-4 leading-tight">
            SHIVIDTIDPHEE 2025
          </h1>
          <p className="text-halloween-bone text-base sm:text-lg">เข้าสู่ระบบด้วยรหัสนิสิต</p>
        </div>

        <div className="bg-halloween-charcoal border-2 border-halloween-orange rounded-lg p-5 sm:p-6 md:p-8">
          <form onSubmit={handleLogin} className="space-y-5 sm:space-y-6">
            <div>
              <label
                htmlFor="studentId"
                className="block text-halloween-cream font-bold mb-2 text-sm sm:text-base"
              >
                รหัสนิสิต
              </label>
              <input
                type="text"
                id="studentId"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full bg-halloween-dark border-2 border-halloween-purple rounded px-3 sm:px-4 py-2.5 sm:py-3 text-halloween-cream text-base sm:text-lg focus:border-halloween-orange focus:outline-none"
                placeholder="กรอกรหัสนิสิต"
                required
              />
            </div>

            {error && (
              <div className="bg-halloween-red border border-halloween-orange rounded p-3 text-halloween-cream text-center text-sm sm:text-base">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-halloween-orange hover:bg-halloween-red text-halloween-dark font-bold text-lg sm:text-xl py-3 sm:py-4 rounded-lg transition-colors disabled:opacity-50 active:scale-95"
            >
              {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
            </button>
          </form>

          <div className="mt-5 sm:mt-6 text-center">
            <p className="text-halloween-gray text-sm sm:text-base">ยังไม่ได้ลงทะเบียน?</p>
            <a
              href="/registration"
              className="text-halloween-orange hover:text-halloween-red font-bold underline text-sm sm:text-base"
            >
              ลงทะเบียนที่นี่
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
