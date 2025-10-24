'use client';

import { useState } from 'react';

type FormData = {
  studentId: string;
  fullName: string;
  faculty: string;
  gender: string;
  year: string;
  referralSource: string;
  interestedActivities: string[];
  transportation: string;
  email: string;
};

const FACULTIES = [
  'คณะวิศวกรรมศาสตร์',
  'คณะพาณิชยศาสตร์และบัญชี',
  'คณะครุศาสตร์',
  'คณะนิติศาสตร์',
  'คณะนิเทศศาสตร์',
  'คณะจิตวิทยา',
  'คณะทันตแพทย์ศาสตร์',
  'คณะพยาบาลศาสตร์',
  'คณะแพทย์ศาสตร์',
  'คณะเภสัชศาสตร์',
  'คณะรัฐศาสตร์',
  'คณะวิทยาศาสตร์',
  'คณะวิทยาศาสตร์การกีฬา',
  'คณะศิลปกรรมศาสตร์',
  'คณะเศรษฐศาสตร์',
  'คณะสถาปัตยกรรมศาสตร์',
  'คณะสหเวชศาสตร์',
  'คณะสัตวแพทยศาสตร์',
  'คณะอักษรศาสตร์',
  'School of Integrated Innovation (SCII)',
  'School of Agriculture Resources (SAR)',
  'อื่นๆ'
];

const GENDERS = ['ชาย', 'หญิง', 'ไม่ต้องการระบุ'];

const YEARS = ['ปี 1', 'ปี 2', 'ปี 3', 'ปี 4', 'มหาบัณฑิต (ป.โท)', 'ดุษฎีบัณฑิต (ป.เอก)', 'อื่นๆ'];

const REFERRAL_SOURCES = [
  'รุ่นพี่ / รุ่นน้อง',
  'เพื่อน',
  'Social media (IG, Facebook)',
  'อื่นๆ'
];

const ACTIVITIES = ['โชว์เปิดงาน', 'ตลาดขายของ', 'บ้านผีสิง', 'หนังกลางแปลง'];

const TRANSPORTATION = [
  'BTS / MRT',
  'CU POP BUS',
  'รถยนต์ส่วนตัว',
  'รถตู้',
  'รถโดยสารประจำทาง (รถเมย์)',
  'รถจักรยานยนต์',
  'เดินเท้า',
  'อื่นๆ'
];

export default function RegistrationPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    studentId: '',
    fullName: '',
    faculty: '',
    gender: '',
    year: '',
    referralSource: '',
    interestedActivities: [],
    transportation: '',
    email: '',
  });
  const [pdpaConsent, setPdpaConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData | 'pdpa' | 'interestedActivities', string>>>({});

  const updateField = (field: keyof FormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleCheckbox = (activity: string) => {
    const activities = formData.interestedActivities.includes(activity)
      ? formData.interestedActivities.filter((a) => a !== activity)
      : [...formData.interestedActivities, activity];
    updateField('interestedActivities', activities);
    // Clear activities error when user selects something
    if (errors.interestedActivities && activities.length > 0) {
      setErrors((prev) => ({ ...prev, interestedActivities: undefined }));
    }
  };

  // Validation for step 2
  const validateStep2 = () => {
    const newErrors: Partial<Record<keyof FormData | 'interestedActivities', string>> = {};

    if (!formData.studentId.trim()) {
      newErrors.studentId = 'กรุณากรอกรหัสนิสิต';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'กรุณากรอกอีเมล';
    }
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'กรุณากรอกชื่อ-นามสกุล';
    }
    if (!formData.faculty) {
      newErrors.faculty = 'กรุณาเลือกคณะ';
    }
    if (!formData.gender) {
      newErrors.gender = 'กรุณาเลือกเพศ';
    }
    if (!formData.year) {
      newErrors.year = 'กรุณาเลือกชั้นปี';
    }
    if (!formData.referralSource) {
      newErrors.referralSource = 'กรุณาเลือกช่องทางรับรู้งาน';
    }
    if (formData.interestedActivities.length === 0) {
      newErrors.interestedActivities = 'กรุณาเลือกกิจกรรมที่สนใจอย่างน้อย 1 กิจกรรม';
    }
    if (!formData.transportation) {
      newErrors.transportation = 'กรุณาเลือกวิธีการเดินทาง';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextToStep3 = () => {
    if (validateStep2()) {
      setStep(3);
    }
  };

  const handleSubmit = async () => {
    // Validate PDPA consent
    if (!pdpaConsent) {
      setErrors({ pdpa: 'กรุณายอมรับข้อตกลง PDPA' });
      return;
    }

    setLoading(true);

    try {
      // Register the user
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('✅ Registration successful:', responseData);

        // Redirect to home page (login) with success flag
        window.location.href = '/?registered=true';
      } else {
        const errorData = await response.json();
        console.error('❌ Registration failed:', errorData);
        alert('การลงทะเบียนล้มเหลว: ' + (errorData.error || 'เกิดข้อผิดพลาด'));
      }
    } catch (error) {
      console.error('❌ Registration error:', error);
      alert('เกิดข้อผิดพลาดในการลงทะเบียน กรุณาลองใหม่อีกครั้ง');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gradient-background min-h-screen px-4 py-8 sm:py-12">
      {/* Full-screen Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin h-16 w-16 border-4 border-halloween-orange border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-4 text-halloween-cream text-lg">กำลังส่งข้อมูล...</p>
          </div>
        </div>
      )}

      <div className="w-full max-w-2xl mx-auto">
        {/* Step 1: Event Details */}
        {step === 1 && (
          <div className="bg-halloween-charcoal border-2 border-halloween-orange rounded-lg p-6 sm:p-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-halloween-orange mb-5 sm:mb-6 text-center">
              SHIVIDTIDPHEE 2025
            </h1>

            <div className="text-halloween-cream space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                ครั้งแรกของ งานฮาโลวีนสุดหลอนแต่โคตรมันส์จาก{' '}
                <span className="text-halloween-orange font-bold">
                  &quot;คณะพาณิชยศาสตร์และการบัญชี&quot;
                </span>{' '}
                X{' '}
                <span className="text-halloween-orange font-bold">
                  &quot;คณะวิศวกรรมศาสตร์&quot;
                </span>
              </p>

              <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                เตรียมตัวให้พร้อม... เพราะความสนุกครั้งนี้มาพร้อมเสียงกรี๊ด ความหลอน
                และเซอร์ไพรส์สุดขนหัวลุก! 💀✨
              </p>

                <div className="flex items-start gap-2 mt-3 sm:mt-4 text-halloween-bone">
                <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 shrink-0 mt-0.5 text-halloween-orange"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <p className="text-xs sm:text-sm md:text-base">
                  Larngear, Faculty of Engineering, Chulalongkorn University
                </p>
              </div>

              <div className="bg-halloween-dark p-4 sm:p-5 md:p-6 rounded-lg border border-halloween-purple mt-4 sm:mt-5 md:mt-6">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-halloween-orange mb-3 sm:mb-4">
                  🕸️ กิจกรรมที่คุณต้องลอง
                </h2>
                <ul className="space-y-2 text-xs sm:text-sm md:text-base text-halloween-bone">
                  <li>🎬 หนังกลางแปลงสุดหลอน</li>
                  <li>🏚️ บ้านผีสิงที่แค่เดินผ่านก็ใจสั่น</li>
                  <li>💃 โชว์สุดพิเศษ</li>
                  <li>🛍️ ร้านค้านิสิตมากมาย</li>
                </ul>
              </div>

              <div className="mt-4 sm:mt-5 md:mt-6 text-center px-2">
                <p className="text-xs sm:text-sm md:text-base text-halloween-gray mb-2">
                  ติดตามรายละเอียดเพิ่มเติมได้ที่
                </p>
                <a
                  href="https://www.instagram.com/shividtidphee/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 text-sm sm:text-base md:text-lg text-halloween-orange font-bold hover:text-halloween-red transition-colors underline break-all"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span className="break-all">IG: @shividtidphee</span>
                </a>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full bg-halloween-orange hover:bg-halloween-red text-halloween-dark font-bold text-lg sm:text-xl py-3 sm:py-4 rounded-lg transition-colors active:scale-95"
            >
              ถัดไป
            </button>
          </div>
        )}

        {/* Step 2: Form */}
        {step === 2 && (
          <div className="bg-halloween-charcoal border-2 border-halloween-orange rounded-lg p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-halloween-orange mb-2 text-center">
              SHIVIDTIDPHEE 2025
            </h1>
            <p className="text-xs sm:text-sm text-halloween-gray text-center mb-5 sm:mb-6">
              * จำเป็นต้องกรอก
            </p>

            <form className="space-y-5 sm:space-y-6">
              {/* Student ID */}
              <div>
                <label className="block text-sm sm:text-base text-halloween-cream font-bold mb-2">
                  รหัสนิสิต *
                </label>
                <input
                  type="text"
                  value={formData.studentId}
                  onChange={(e) => updateField('studentId', e.target.value)}
                  className={`w-full bg-halloween-dark border-2 rounded px-3 sm:px-4 py-2.5 sm:py-3 text-halloween-cream text-base focus:border-halloween-orange focus:outline-none transition-colors ${
                    errors.studentId ? 'border-halloween-red' : 'border-halloween-purple'
                  }`}
                  placeholder="กรอกรหัสนิสิต"
                  required
                />
                {errors.studentId && (
                  <p className="mt-1 text-sm text-halloween-red">{errors.studentId}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm sm:text-base text-halloween-cream font-bold mb-2">
                  อีเมล *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className={`w-full bg-halloween-dark border-2 rounded px-3 sm:px-4 py-2.5 sm:py-3 text-halloween-cream text-base focus:border-halloween-orange focus:outline-none transition-colors ${
                    errors.email ? 'border-halloween-red' : 'border-halloween-purple'
                  }`}
                  placeholder="example@email.com"
                  required
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-halloween-red">{errors.email}</p>
                )}
              </div>

              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm sm:text-base text-halloween-cream font-bold mb-2">
                  ชื่อ - นามสกุล *
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => updateField('fullName', e.target.value)}
                  className={`w-full bg-halloween-dark border-2 rounded px-3 sm:px-4 py-2.5 sm:py-3 text-halloween-cream text-base focus:border-halloween-orange focus:outline-none transition-colors ${
                    errors.fullName ? 'border-halloween-red' : 'border-halloween-purple'
                  }`}
                  placeholder="กรอกชื่อ-นามสกุล"
                  required
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-halloween-red">{errors.fullName}</p>
                )}
              </div>

              {/* Faculty */}
              <div>
                <label htmlFor="faculty" className="block text-sm sm:text-base text-halloween-cream font-bold mb-2">
                  คณะ *
                </label>
                <select
                  id="faculty"
                  value={formData.faculty}
                  onChange={(e) => updateField('faculty', e.target.value)}
                  className={`w-full bg-halloween-dark border-2 rounded px-3 sm:px-4 py-2.5 sm:py-3 text-halloween-cream text-base focus:border-halloween-orange focus:outline-none transition-colors ${
                    errors.faculty ? 'border-halloween-red' : 'border-halloween-purple'
                  }`}
                  required
                >
                  <option value="">เลือกคณะ</option>
                  {FACULTIES.map((faculty) => (
                    <option key={faculty} value={faculty}>
                      {faculty}
                    </option>
                  ))}
                </select>
                {errors.faculty && (
                  <p className="mt-1 text-sm text-halloween-red">{errors.faculty}</p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm sm:text-base text-halloween-cream font-bold mb-2">
                  เพศ *
                </label>
                <div className={`space-y-2 ${errors.gender ? 'p-2 border-2 border-halloween-red rounded' : ''}`}>
                  {GENDERS.map((option) => (
                    <label key={option} className="flex items-center text-sm sm:text-base text-halloween-cream cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value={option}
                        checked={formData.gender === option}
                        onChange={(e) => updateField('gender', e.target.value)}
                        className="mr-3 cursor-pointer"
                      />
                      {option}
                    </label>
                  ))}
                </div>
                {errors.gender && (
                  <p className="mt-1 text-sm text-halloween-red">{errors.gender}</p>
                )}
              </div>

              {/* Year */}
              <div>
                <label htmlFor="year" className="block text-sm sm:text-base text-halloween-cream font-bold mb-2">
                  ชั้นปี *
                </label>
                <select
                  id="year"
                  value={formData.year}
                  onChange={(e) => updateField('year', e.target.value)}
                  className={`w-full bg-halloween-dark border-2 rounded px-3 sm:px-4 py-2.5 sm:py-3 text-halloween-cream text-base focus:border-halloween-orange focus:outline-none transition-colors ${
                    errors.year ? 'border-halloween-red' : 'border-halloween-purple'
                  }`}
                  required
                >
                  <option value="">เลือกชั้นปี</option>
                  {YEARS.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                {errors.year && (
                  <p className="mt-1 text-sm text-halloween-red">{errors.year}</p>
                )}
              </div>

              {/* Referral Source */}
              <div>
                <label htmlFor="referralSource" className="block text-sm sm:text-base text-halloween-cream font-bold mb-2">
                  ช่องทางรับรู้งาน *
                </label>
                <select
                  id="referralSource"
                  value={formData.referralSource}
                  onChange={(e) => updateField('referralSource', e.target.value)}
                  className={`w-full bg-halloween-dark border-2 rounded px-3 sm:px-4 py-2.5 sm:py-3 text-halloween-cream text-base focus:border-halloween-orange focus:outline-none transition-colors ${
                    errors.referralSource ? 'border-halloween-red' : 'border-halloween-purple'
                  }`}
                  required
                >
                  <option value="">เลือกช่องทาง</option>
                  {REFERRAL_SOURCES.map((source) => (
                    <option key={source} value={source}>
                      {source}
                    </option>
                  ))}
                </select>
                {errors.referralSource && (
                  <p className="mt-1 text-sm text-halloween-red">{errors.referralSource}</p>
                )}
              </div>

              {/* Interested Activities */}
              <div>
                <label className="block text-sm sm:text-base text-halloween-cream font-bold mb-2">
                  กิจกรรมที่สนใจ *
                </label>
                <div className={`space-y-2 ${errors.interestedActivities ? 'p-2 border-2 border-halloween-red rounded' : ''}`}>
                  {ACTIVITIES.map((activity) => (
                    <label key={activity} className="flex items-center text-sm sm:text-base text-halloween-cream cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.interestedActivities.includes(activity)}
                        onChange={() => handleCheckbox(activity)}
                        className="mr-3 cursor-pointer"
                      />
                      {activity}
                    </label>
                  ))}
                </div>
                {errors.interestedActivities && (
                  <p className="mt-1 text-sm text-halloween-red">{errors.interestedActivities}</p>
                )}
              </div>

              {/* Transportation */}
              <div>
                <label htmlFor="transportation" className="block text-sm sm:text-base text-halloween-cream font-bold mb-2">
                  วิธีการเดินทาง *
                </label>
                <select
                  id="transportation"
                  value={formData.transportation}
                  onChange={(e) => updateField('transportation', e.target.value)}
                  className={`w-full bg-halloween-dark border-2 rounded px-3 sm:px-4 py-2.5 sm:py-3 text-halloween-cream text-base focus:border-halloween-orange focus:outline-none transition-colors ${
                    errors.transportation ? 'border-halloween-red' : 'border-halloween-purple'
                  }`}
                  required
                >
                  <option value="">เลือกวิธีการเดินทาง</option>
                  {TRANSPORTATION.map((method) => (
                    <option key={method} value={method}>
                      {method}
                    </option>
                  ))}
                </select>
                {errors.transportation && (
                  <p className="mt-1 text-sm text-halloween-red">{errors.transportation}</p>
                )}
              </div>
            </form>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full sm:flex-1 bg-halloween-gray hover:bg-halloween-blue text-halloween-dark font-bold py-3 rounded-lg transition-colors active:scale-95"
              >
                ย้อนกลับ
              </button>
              <button
                type="button"
                onClick={handleNextToStep3}
                className="w-full sm:flex-1 bg-halloween-orange hover:bg-halloween-red text-halloween-dark font-bold py-3 rounded-lg transition-colors active:scale-95"
              >
                ถัดไป
              </button>
            </div>
          </div>
        )}

        {/* Step 3: PDPA */}
        {step === 3 && (
          <div className="bg-halloween-charcoal border-2 border-halloween-orange rounded-lg p-6 sm:p-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-halloween-orange mb-4 sm:mb-5 md:mb-6 text-center leading-tight px-2">
              ความยินยอมให้สิทธิ์ในการใช้กฎหมาย PDPA
            </h1>

            <div className="bg-halloween-dark p-4 sm:p-5 md:p-6 rounded-lg border border-halloween-purple mb-5 sm:mb-6 md:mb-8">
              <p className="text-xs sm:text-sm md:text-base text-halloween-cream leading-relaxed">
                พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ.2562 หรือ Personal Data Protection
                Act (PDPA) เป็นกฎหมายว่าด้วยการให้สิทธิ์กับเจ้าของข้อมูลส่วนบุคคล
                สร้างมาตรฐานการรักษาข้อมูลส่วนบุคคลให้ปลอดภัย
                และนำไปใช้ให้ถูกวัตถุประสงค์ตามคำยินยอมที่เจ้าของข้อมูลส่วนบุคคลอนุญาต
                ทางผู้จัดทำจึงต้องขอความยินยอม (Consent)
                ของผู้กรอกฟอร์มทุกท่านในการเก็บข้อมูลส่วนตัว
              </p>
            </div>

            <div className="mb-5 sm:mb-6 md:mb-8">
                <label className={`flex items-start text-xs sm:text-sm md:text-base text-halloween-cream cursor-pointer ${
                errors.pdpa ? 'p-2 border-2 border-halloween-red rounded' : ''
              }`}>
                <input
                  type="checkbox"
                  checked={pdpaConsent}
                  onChange={(e) => {
                    setPdpaConsent(e.target.checked);
                    if (e.target.checked && errors.pdpa) {
                      setErrors((prev) => ({ ...prev, pdpa: undefined }));
                    }
                  }}
                  required
                  className="mr-2 sm:mr-3 mt-1 cursor-pointer shrink-0"
                />
                <span>ข้าพเจ้ายอมรับและยินยอม *</span>
              </label>
              {errors.pdpa && (
                <p className="mt-1 text-xs sm:text-sm text-halloween-red">{errors.pdpa}</p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full sm:flex-1 bg-halloween-gray hover:bg-halloween-blue text-halloween-dark font-bold py-3 rounded-lg transition-colors active:scale-95"
              >
                ย้อนกลับ
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="w-full sm:flex-1 bg-halloween-orange hover:bg-halloween-red text-halloween-dark font-bold py-3 rounded-lg transition-colors disabled:opacity-50 active:scale-95"
              >
                ยืนยันการลงทะเบียน
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
