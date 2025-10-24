export interface Registration {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  student_id: string;
  department?: string;
  gender?: string;
  year?: string;
  referral_source?: string;
  interested_activities?: string;
  transportation?: string;
  qr_code: string;
  attended: boolean;
  attended_at?: string;
  ghost_result?: string;
}

export interface QuizResult {
  title: string;
  description: string;
  image: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  image: string;
  options: {
    text: string;
    value: string;
  }[];
}
