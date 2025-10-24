import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { studentId } = body;

    // Find user by student ID
    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .eq('student_id', studentId)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: 'ไม่พบรหัสนิสิตนี้ในระบบ' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, user: data });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
