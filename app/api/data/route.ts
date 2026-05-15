import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

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
        const { category_id, long_description, use_cases, ...rest } = p;
        return {
          ...rest,
          category: category_id,
          longDescription: long_description,
          useCases: use_cases || [],
          images: p.images || []
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
    let error: any = null;

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
          image: p.image || null,
          images: p.images || [],
          use_cases: p.useCases || []
        };
        // Relaxed ID check for TEXT primary key
        if (p.id && typeof p.id === 'string' && p.id.length > 0) {
          item.id = p.id;
        }
        return item;
      });
      const result = await supabase.from('products').upsert(products);
      error = result.error;
      revalidatePath('/services-and-products');
      revalidatePath('/services-and-products/catalog');
    } else if (file === 'categories') {
      const categoriesData = data.map((c: any) => {
        const item = { ...c };
        // Relaxed ID check for TEXT primary key
        if (c.id && typeof c.id === 'string' && c.id.length > 0) {
          item.id = c.id;
        } else {
          delete item.id;
        }
        return item;
      });
      const result = await supabase.from('categories').upsert(categoriesData);
      error = result.error;
      revalidatePath('/services-and-products');
      revalidatePath('/services-and-products/catalog');
    } else if (file === 'branches') {
      const branchesData = data.map((b: any) => {
        const item = { ...b };
        if (b.id && typeof b.id === 'string' && b.id.length > 0) {
          item.id = b.id;
        } else {
          delete item.id;
        }
        return item;
      });
      const result = await supabase.from('branches').upsert(branchesData);
      error = result.error;
      revalidatePath('/about');
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
        if (s.id && typeof s.id === 'string' && s.id.length > 0) {
          item.id = s.id;
        }
        return item;
      });
      const result = await supabase.from('services').upsert(services);
      error = result.error;
      revalidatePath('/services-and-products');
    } else if (file === 'serviceSummaries') {
      const result = await supabase.from('service_summaries').upsert(data.map((s: any) => {
        const item = { ...s };
        if (s.id && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s.id)) {
          item.id = s.id;
        } else {
          delete item.id;
        }
        return item;
      }));
      error = result.error;
      revalidatePath('/');
    } else if (file === 'alerts') {
      if (data.alerts) {
        const r1 = await supabase.from('alerts').upsert(data.alerts);
        if (r1.error) error = r1.error;
      }
      if (data.news) {
        const r2 = await supabase.from('news').upsert(data.news);
        if (r2.error) error = r2.error;
      }
      revalidatePath('/communication');
    } else if (file === 'company') {
      if (data.companyValues) {
        const r1 = await supabase.from('company_values').upsert(data.companyValues.map((v: any) => {
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
        if (r1.error) error = r1.error;
      }
      if (data.targetMarkets) {
        const r2 = await supabase.from('target_markets').upsert(data.targetMarkets.map((m: any) => {
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
        if (r2.error) error = r2.error;
      }
      revalidatePath('/about');
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
      const result = await supabase.from('team_members').upsert(upsertData);
      error = result.error;
      revalidatePath('/about');
    } else if (file === 'calendar') {
      const result = await supabase.from('calendar_events').upsert(data.map((e: any) => {
        const item = { ...e };
        if (e.id && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e.id)) {
          item.id = e.id;
        } else {
          delete item.id;
        }
        return item;
      }));
      error = result.error;
      revalidatePath('/communication');
    } else if (file === 'resources') {
      const result = await supabase.from('resources').upsert(data.map((r: any) => {
        const item = { ...r };
        if (r.id && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(r.id)) {
          item.id = r.id;
        } else {
          delete item.id;
        }
        return item;
      }));
      error = result.error;
      revalidatePath('/communication');
    }

    if (error) {
      console.error(`Supabase error saving ${file}:`, error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    revalidatePath('/'); // Global revalidate as fallback
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error(`Error saving data for ${file}:`, error);
    return NextResponse.json({ error: error.message || 'Failed to save data' }, { status: 500 });
  }
}
