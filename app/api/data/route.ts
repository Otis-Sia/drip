import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const file = searchParams.get('file');

  if (!file) {
    return NextResponse.json({ error: 'File parameter is required' }, { status: 400 });
  }

  try {
    let data: any = null;

    if (file === 'products') {
      const { data: dbData } = await supabase.from('products').select('*').order('created_at', { ascending: true });
      if (dbData) data = dbData.map(p => {
        const { category_id, long_description, ...rest } = p;
        return {
          ...rest,
          category: category_id,
          longDescription: long_description
        };
      });
    } else if (file === 'categories') {
      const { data: dbData } = await supabase.from('categories').select('*').order('created_at', { ascending: true });
      data = dbData;
    } else if (file === 'branches') {
      const { data: dbData } = await supabase.from('branches').select('*').order('created_at', { ascending: true });
      data = dbData;
    } else if (file === 'services') {
      const { data: dbData } = await supabase.from('services').select('*').order('created_at', { ascending: true });
      if (dbData) data = dbData.map(s => {
        const { icon_bg, ...rest } = s;
        return {
          ...rest,
          iconBg: icon_bg
        };
      });
    } else if (file === 'serviceSummaries') {
      const { data: dbData } = await supabase.from('service_summaries').select('*').order('created_at', { ascending: true });
      data = dbData;
    } else if (file === 'alerts') {
      const { data: alerts } = await supabase.from('alerts').select('*').order('date', { ascending: false });
      const { data: news } = await supabase.from('news').select('*').order('date', { ascending: false });
      data = { alerts: alerts || [], news: news || [] };
    } else if (file === 'company') {
      const { data: companyValues } = await supabase.from('company_values').select('*').order('created_at', { ascending: true });
      const { data: targetMarkets } = await supabase.from('target_markets').select('*').order('created_at', { ascending: true });
      
      data = {
        companyValues: companyValues || [],
        targetMarkets: targetMarkets || [],
        aboutStats: [
          ['250+', 'Projects Done'],
          ['15k+', 'Farmers Reached'],
          ['16+', 'Branches']
        ]
      };
    } else if (file === 'teamMembers') {
      const { data: dbData } = await supabase.from('team_members').select('*').order('created_at', { ascending: true });
      data = dbData || [];
    } else if (file === 'calendar') {
      const { data: dbData } = await supabase.from('calendar_events').select('*').order('date', { ascending: true });
      data = dbData;
    } else if (file === 'resources') {
      const { data: dbData } = await supabase.from('resources').select('*').order('created_at', { ascending: true });
      data = dbData;
    }

    return NextResponse.json(data || []);
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
    if (file === 'products') {
      const products = data.map((p: any) => {
        const item: any = {
          category_id: p.category,
          name: p.name,
          description: p.description,
          long_description: p.longDescription,
          tags: p.tags,
          features: p.features,
          specs: p.specs,
          image: p.image || null
        };
        if (p.id && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(p.id)) {
          item.id = p.id;
        }
        return item;
      });
      await supabase.from('products').upsert(products);
    } else if (file === 'categories') {
      await supabase.from('categories').upsert(data.map((c: any) => {
        const item = { ...c };
        if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(c.id)) {
          delete item.id;
        }
        return item;
      }));
    } else if (file === 'branches') {
      await supabase.from('branches').upsert(data.map((b: any) => {
        const item = { ...b };
        if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(b.id)) {
          delete item.id;
        }
        return item;
      }));
    } else if (file === 'services') {
      const services = data.map((s: any) => {
        const item: any = {
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
        };
        if (s.id && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s.id)) {
          item.id = s.id;
        }
        return item;
      });
      await supabase.from('services').upsert(services);
    } else if (file === 'serviceSummaries') {
      await supabase.from('service_summaries').upsert(data.map((s: any) => {
        const item = { ...s };
        if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s.id)) {
          delete item.id;
        }
        return item;
      }));
    } else if (file === 'alerts') {
      if (data.alerts) await supabase.from('alerts').upsert(data.alerts);
      if (data.news) await supabase.from('news').upsert(data.news);
    } else if (file === 'company') {
      if (data.companyValues) {
        await supabase.from('company_values').upsert(data.companyValues.map((v: any) => {
          const item: any = {
            icon: v.icon,
            title: v.title,
            description: v.description
          };
          if (v.id && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v.id)) {
            item.id = v.id;
          }
          return item;
        }));
      }
      if (data.targetMarkets) {
        await supabase.from('target_markets').upsert(data.targetMarkets.map((m: any) => {
          const item: any = {
            icon: m.icon,
            title: m.title,
            desc: m.desc
          };
          if (m.id && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(m.id)) {
            item.id = m.id;
          }
          return item;
        }));
      }
    } else if (file === 'teamMembers') {
      if (!Array.isArray(data)) throw new Error('Array expected');
      const upsertData = data.map((t: any) => {
        const item: any = {
          name: t.name,
          role: t.role,
          department: t.department,
          bio: t.bio,
          image: t.image || null
        };
        if (t.id && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(t.id)) {
          item.id = t.id;
        }
        return item;
      });
      await supabase.from('team_members').upsert(upsertData);
    } else if (file === 'calendar') {
      await supabase.from('calendar_events').upsert(data.map((e: any) => {
        const item = { ...e };
        if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e.id)) {
          delete item.id;
        }
        return item;
      }));
    } else if (file === 'resources') {
      await supabase.from('resources').upsert(data.map((r: any) => {
        const item = { ...r };
        if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(r.id)) {
          delete item.id;
        }
        return item;
      }));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Error saving data for ${file}:`, error);
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}
