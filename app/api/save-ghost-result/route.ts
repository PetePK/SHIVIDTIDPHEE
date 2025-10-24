import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { studentId, ghostResult } = body;

    if (!studentId || !ghostResult) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Update the user's ghost result
    const { data, error } = await supabase
      .from('registrations')
      .update({ ghost_result: ghostResult })
      .eq('student_id', studentId)
      .select()
      .single();

    if (error) {
      console.error('Error saving ghost result:', error);
      return NextResponse.json(
        { error: 'Failed to save ghost result' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Save ghost result error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
