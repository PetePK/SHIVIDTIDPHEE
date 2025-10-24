'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Html5QrcodeScanner } from 'html5-qrcode';
import BackButton from '@/components/BackButton';

type Registration = {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  student_id: string;
  department: string;
  qr_code: string;
  attended: boolean;
  attended_at: string | null;
};

type TabType = 'attendance' | 'scanner';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('attendance');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Server-side password verification for security
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsAuthenticated(true);
        setError('');
      } else {
        setError('รหัสผ่านไม่ถูกต้อง');
      }
    } catch (err) {
      console.error(err);
      setError('เกิดข้อผิดพลาด');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-halloween-dark px-4 py-8">
        <div className="max-w-md mx-auto">
          <BackButton />
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-halloween-orange mb-2">
              Admin Access
            </h1>
            <p className="text-halloween-gray">SHIVIDTIDPHEE 2025</p>
          </div>

          <div className="bg-halloween-charcoal border-2 border-halloween-orange rounded-lg p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-halloween-cream font-bold mb-2">
                  รหัสผ่าน
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-halloween-dark border-2 border-halloween-purple rounded px-4 py-3 text-halloween-cream focus:border-halloween-orange focus:outline-none"
                  placeholder="กรอกรหัสผ่าน"
                  required
                />
              </div>

              {error && (
                <div className="bg-halloween-red border border-halloween-orange rounded p-3 text-halloween-cream text-center">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-halloween-orange hover:bg-halloween-red text-halloween-dark font-bold text-xl py-4 rounded-lg transition-colors"
              >
                เข้าสู่ระบบ
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-halloween-dark">
      {/* Header */}
      <div className="bg-halloween-charcoal border-b-2 border-halloween-orange">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-halloween-orange">
            Admin Dashboard - SHIVIDTIDPHEE 2025
          </h1>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="bg-halloween-red hover:bg-halloween-orange text-halloween-cream px-4 py-2 rounded transition-colors"
          >
            ออกจากระบบ
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-halloween-charcoal border-b border-halloween-purple">
        <div className="container mx-auto px-4">
          <div className="flex gap-2">
            {[
              { id: 'attendance' as TabType, label: 'Attendance Table' },
              { id: 'scanner' as TabType, label: 'QR Scanner' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-bold transition-colors ${
                  activeTab === tab.id
                    ? 'text-halloween-orange border-b-4 border-halloween-orange'
                    : 'text-halloween-gray hover:text-halloween-bone'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === 'attendance' && <AttendanceTable />}
        {activeTab === 'scanner' && <QRScanner />}
      </div>
    </div>
  );
}

// Attendance Table Component
function AttendanceTable() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [hiddenColumns, setHiddenColumns] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 50;

  useEffect(() => {
    fetchRegistrations();

    // Optimized: Only update the changed row instead of refetching everything
    const channel = supabase
      .channel('registrations-changes')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'registrations' },
        (payload) => {
          // Update only the changed record
          setRegistrations((prev) =>
            prev.map((reg) =>
              reg.id === payload.new.id ? (payload.new as Registration) : reg
            )
          );
        }
      )
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'registrations' },
        () => {
          // Refetch on new registration
          fetchRegistrations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentPage]);

  const fetchRegistrations = async () => {
    try {
      // Get total count
      const { count } = await supabase
        .from('registrations')
        .select('*', { count: 'exact', head: true });

      setTotalCount(count || 0);

      // Fetch paginated data
      const from = (currentPage - 1) * itemsPerPage;
      const to = from + itemsPerPage - 1;

      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) throw error;
      setRegistrations(data || []);
    } catch (error) {
      console.error('Error fetching registrations:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleAttendance = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('registrations')
        .update({
          attended: !currentStatus,
          attended_at: !currentStatus ? new Date().toISOString() : null,
        })
        .eq('id', id);

      if (error) throw error;
      // No need to refetch - real-time subscription will update automatically
    } catch (error) {
      console.error('Error updating attendance:', error);
    }
  };

  const toggleColumn = (column: string) => {
    setHiddenColumns((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(column)) {
        newSet.delete(column);
      } else {
        newSet.add(column);
      }
      return newSet;
    });
  };

  const columns = [
    { id: 'attended', label: 'เข้าร่วม' },
    { id: 'student_id', label: 'รหัสนิสิต' },
    { id: 'full_name', label: 'ชื่อ-นามสกุล' },
    { id: 'email', label: 'อีเมล' },
    { id: 'department', label: 'คณะ' },
    { id: 'attended_at', label: 'เวลาเช็คอิน' },
  ];

  if (loading) {
    return <div className="text-halloween-cream text-center">กำลังโหลด...</div>;
  }

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-halloween-orange">
          ผู้ลงทะเบียนทั้งหมด: {totalCount} คน
        </h2>
        <div className="flex gap-2">
          <span className="text-halloween-cream">แสดง/ซ่อนคอลัมน์:</span>
          {columns.map((col) => (
            <button
              type="button"
              key={col.id}
              onClick={() => toggleColumn(col.id)}
              className={`px-3 py-1 rounded text-sm ${
                hiddenColumns.has(col.id)
                  ? 'bg-halloween-gray text-halloween-dark'
                  : 'bg-halloween-orange text-halloween-dark'
              }`}
            >
              {col.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-halloween-charcoal border-2 border-halloween-orange rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-halloween-dark">
              <tr>
                {columns.map(
                  (col) =>
                    !hiddenColumns.has(col.id) && (
                      <th
                        key={col.id}
                        className="px-4 py-3 text-left text-halloween-orange font-bold"
                      >
                        {col.label}
                      </th>
                    )
                )}
              </tr>
            </thead>
            <tbody>
              {registrations.map((reg, index) => (
                <tr
                  key={reg.id}
                  className={`border-t border-halloween-purple ${
                    index % 2 === 0 ? 'bg-halloween-charcoal' : 'bg-halloween-dark'
                  }`}
                >
                  {!hiddenColumns.has('attended') && (
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={reg.attended}
                        onChange={() => toggleAttendance(reg.id, reg.attended)}
                        className="w-5 h-5 cursor-pointer"
                        aria-label={`Mark ${reg.full_name} as attended`}
                      />
                    </td>
                  )}
                  {!hiddenColumns.has('student_id') && (
                    <td className="px-4 py-3 text-halloween-cream">{reg.student_id}</td>
                  )}
                  {!hiddenColumns.has('full_name') && (
                    <td className="px-4 py-3 text-halloween-cream">{reg.full_name}</td>
                  )}
                  {!hiddenColumns.has('email') && (
                    <td className="px-4 py-3 text-halloween-cream">{reg.email}</td>
                  )}
                  {!hiddenColumns.has('department') && (
                    <td className="px-4 py-3 text-halloween-cream">{reg.department}</td>
                  )}
                  {!hiddenColumns.has('attended_at') && (
                    <td className="px-4 py-3 text-halloween-cream">
                      {reg.attended_at
                        ? new Date(reg.attended_at).toLocaleString('th-TH')
                        : '-'}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-halloween-orange text-halloween-dark font-bold rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-halloween-red transition-colors"
          >
            ← ก่อนหน้า
          </button>
          <span className="text-halloween-cream px-4">
            หน้า {currentPage} / {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-halloween-orange text-halloween-dark font-bold rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-halloween-red transition-colors"
          >
            ถัดไป →
          </button>
        </div>
      )}
    </div>
  );
}

// QR Scanner Component
function QRScanner() {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (scanning) {
      const scanner = new Html5QrcodeScanner(
        'qr-reader',
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        false
      );

      scanner.render(onScanSuccess, onScanError);

      return () => {
        scanner.clear();
      };
    }
  }, [scanning]);

  const onScanSuccess = async (decodedText: string) => {
    // Prevent processing multiple scans at once
    if (processing) return;

    setProcessing(true);

    try {
      // Optimistic update: Update directly using QR code (indexed column)
      const { data, error } = await supabase
        .from('registrations')
        .select('id, full_name, attended')
        .eq('qr_code', decodedText)
        .single();

      if (error || !data) {
        setResult({ success: false, message: 'ไม่พบ QR Code นี้ในระบบ' });
        setProcessing(false);
        setTimeout(() => setResult(null), 3000);
        return;
      }

      if (data.attended) {
        setResult({
          success: false,
          message: `${data.full_name} เช็คอินแล้ว`,
        });
        setProcessing(false);
        setTimeout(() => setResult(null), 3000);
        return;
      }

      // Update using QR code directly (faster, uses index)
      const { error: updateError } = await supabase
        .from('registrations')
        .update({
          attended: true,
          attended_at: new Date().toISOString(),
        })
        .eq('qr_code', decodedText)
        .eq('attended', false); // Double-check to prevent race conditions

      if (updateError) throw updateError;

      setResult({
        success: true,
        message: `เช็คอินสำเร็จ! ${data.full_name}`,
      });

      // Clear result and allow next scan after 2 seconds
      setTimeout(() => {
        setResult(null);
        setProcessing(false);
      }, 2000);
    } catch (error) {
      console.error('Error processing QR code:', error);
      setResult({ success: false, message: 'เกิดข้อผิดพลาด' });
      setProcessing(false);
      setTimeout(() => setResult(null), 3000);
    }
  };

  const onScanError = () => {
    // Ignore scan errors (they happen constantly while scanning)
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-halloween-orange mb-6 text-center">
        สแกน QR Code เพื่อเช็คอิน
      </h2>

      {!scanning ? (
        <button
          type="button"
          onClick={() => setScanning(true)}
          className="w-full bg-halloween-orange hover:bg-halloween-red text-halloween-dark font-bold text-xl py-4 rounded-lg transition-colors"
        >
          เปิดกล้อง
        </button>
      ) : (
        <>
          <div className="bg-halloween-charcoal border-2 border-halloween-orange rounded-lg p-4 mb-4">
            <div id="qr-reader"></div>
            {processing && (
              <div className="mt-4 text-center text-halloween-orange font-bold">
                กำลังประมวลผล...
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => setScanning(false)}
            className="w-full bg-halloween-gray hover:bg-halloween-blue text-halloween-dark font-bold py-3 rounded-lg transition-colors"
          >
            ปิดกล้อง
          </button>
        </>
      )}

      {result && (
        <div
          className={`mt-6 p-6 rounded-lg text-center text-xl font-bold ${
            result.success
              ? 'bg-green-600 text-white'
              : 'bg-halloween-red text-halloween-cream'
          }`}
        >
          {result.message}
        </div>
      )}
    </div>
  );
}
