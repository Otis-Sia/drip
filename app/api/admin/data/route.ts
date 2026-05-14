import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { supabase } from '@/lib/supabase';

const DATA_DIR = path.join(process.cwd(), 'lib', 'data');

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const file = searchParams.get('file');

  if (!file) {
    return NextResponse.json({ error: 'File parameter is required' }, { status: 400 });
  }

  try {
    let data: any = null;

    // 1. Try to fetch from Supabase
    try {
      if (file === 'products') {
        const { data: dbData } = await supabase.from('products').select('*').order('created_at', { ascending: true });
        if (dbData) data = dbData.map(p => ({
          ...p,
          category: p.category_id,
          longDescription: p.long_description
        }));
      } else if (file === 'categories') {
        const { data: dbData } = await supabase.from('categories').select('*').order('created_at', { ascending: true });
        data = dbData;
      } else if (file === 'branches') {
        const { data: dbData } = await supabase.from('branches').select('*').order('created_at', { ascending: true });
        data = dbData;
      } else if (file === 'services') {
        const { data: dbData } = await supabase.from('services').select('*').order('created_at', { ascending: true });
        if (dbData) data = dbData.map(s => ({
          ...s,
          iconBg: s.icon_bg
        }));
      } else if (file === 'serviceSummaries') {
        const { data: dbData } = await supabase.from('service_summaries').select('*').order('created_at', { ascending: true });
        data = dbData;
      } else if (file === 'alerts') {
        const { data: alerts } = await supabase.from('alerts').select('*').order('date', { ascending: false });
        const { data: news } = await supabase.from('news').select('*').order('date', { ascending: false });
        if (alerts || news) data = { alerts: alerts || [], news: news || [] };
      } else if (file === 'company') {
        const { data: companyValues } = await supabase.from('company_values').select('*').order('created_at', { ascending: true });
        const { data: targetMarkets } = await supabase.from('target_markets').select('*').order('created_at', { ascending: true });
        if (companyValues || targetMarkets) data = { companyValues: companyValues || [], targetMarkets: targetMarkets || [] };
      } else if (file === 'calendar') {
        const { data: dbData } = await supabase.from('calendar_events').select('*').order('date', { ascending: true });
        data = dbData;
      } else if (file === 'resources') {
        const { data: dbData } = await supabase.from('resources').select('*').order('created_at', { ascending: true });
        data = dbData;
      }
    } catch (supabaseError) {
      console.error('Error fetching from Supabase:', supabaseError);
    }

    // 2. Fallback to Local JSON if Supabase has no data or it's a local-only file
    if (!data || (Array.isArray(data) && data.length === 0)) {
      const filePath = path.join(DATA_DIR, `${file}.json`);
      const content = await fs.readFile(filePath, 'utf-8');
      data = JSON.parse(content);
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error reading data for ${file}:`, error);
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const file = searchParams.get('file');
  const data = await request.json();

  if (!file) {
    return NextResponse.json({ error: 'File parameter is required' }, { status: 400 });
  }

  try {
    // 1. Update JSON File (Only in Development)
    if (process.env.NODE_ENV === 'development') {
      try {
        const filePath = path.join(DATA_DIR, `${file}.json`);
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
      } catch (fsError) {
        console.error(`Local file write failed for ${file}:`, fsError);
        // We continue anyway so Supabase can still be updated
      }
    }

    // 2. Sync to Supabase (Database source of truth)
    try {
      if (file === 'products') {
        const products = data.map((p: any) => ({
          id: p.id,
          category_id: p.category,
          name: p.name,
          description: p.description,
          long_description: p.longDescription,
          tags: p.tags,
          features: p.features,
          specs: p.specs,
          image: p.image || null
        }));
        await supabase.from('products').upsert(products);
      } else if (file === 'categories') {
        await supabase.from('categories').upsert(data);
      } else if (file === 'branches') {
        await supabase.from('branches').upsert(data);
      } else if (file === 'services') {
        const services = data.map((s: any, i: number) => ({
          id: s.id || `service-${i}`,
          icon: s.icon,
          title: s.title,
          tagline: s.tagline,
          problem: s.problem,
          approach: s.approach,
          features: s.features,
          outcomes: s.outcomes,
          gradient: s.gradient,
          icon_bg: s.iconBg,
          image: s.image
        }));
        await supabase.from('services').upsert(services);
      } else if (file === 'serviceSummaries') {
        await supabase.from('service_summaries').upsert(data);
      } else if (file === 'alerts') {
        if (data.alerts) await supabase.from('alerts').upsert(data.alerts);
        if (data.news) await supabase.from('news').upsert(data.news);
      } else if (file === 'company') {
        if (data.companyValues) await supabase.from('company_values').upsert(data.companyValues);
        if (data.targetMarkets) {
          await supabase.from('target_markets').upsert(data.targetMarkets.map((m: any) => ({
            icon: m.icon,
            title: m.title,
            desc: m.desc
          })));
        }
      } else if (file === 'calendar') {
        await supabase.from('calendar_events').upsert(data);
      } else if (file === 'resources') {
        await supabase.from('resources').upsert(data);
      }
    } catch (syncError) {
      console.error(`Supabase sync error for ${file}:`, syncError);
      // We still return success if JSON was written, but log the sync error
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Error writing file ${file}:`, error);
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}
