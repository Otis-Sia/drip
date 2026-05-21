import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  const { data, error } = await supabase.from('company_stats').select('*');
  const { data: aboutData, error: aboutError } = await supabase.from('about_stats').select('*');
  return NextResponse.json({ 
    companyStats: { data, error },
    aboutStats: { data: aboutData, error: aboutError }
  });
}
