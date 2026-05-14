import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const results: any = {};

  try {
    const dataDir = path.join(process.cwd(), 'lib', 'data');

    // Helper to read JSON
    const readJSON = (filename: string) => {
      const filePath = path.join(dataDir, filename);
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    };

    // 1. Categories
    const categories = readJSON('categories.json');
    const { error: catErr } = await supabase.from('categories').upsert(categories);
    results.categories = catErr || 'Success';

    // 2. Products
    const products = readJSON('products.json').map((p: any) => ({
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
    const { error: prodErr } = await supabase.from('products').upsert(products);
    results.products = prodErr || 'Success';

    // 3. Branches
    const branches = readJSON('branches.json');
    const { error: branchErr } = await supabase.from('branches').upsert(branches);
    results.branches = branchErr || 'Success';

    // 4. Services
    const services = readJSON('services.json').map((s: any, i: number) => ({
      id: s.id || `service-${i}`, // Ensure ID exists
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
    const { error: servErr } = await supabase.from('services').upsert(services);
    results.services = servErr || 'Success';

    // 5. Service Summaries
    const serviceSummaries = readJSON('serviceSummaries.json');
    const { error: sumErr } = await supabase.from('service_summaries').upsert(serviceSummaries);
    results.service_summaries = sumErr || 'Success';

    // 6. Company Data
    const company = readJSON('company.json');
    const { error: valErr } = await supabase.from('company_values').upsert(company.companyValues);
    results.company_values = valErr || 'Success';
    
    const { error: marketErr } = await supabase.from('target_markets').upsert(company.targetMarkets.map((m: any) => ({
      icon: m.icon,
      title: m.title,
      desc: m.desc
    })));
    results.target_markets = marketErr || 'Success';

    // 7. Alerts & News
    const alertsData = readJSON('alerts.json');
    const { error: alertErr } = await supabase.from('alerts').upsert(alertsData.alerts);
    results.alerts = alertErr || 'Success';
    
    const { error: newsErr } = await supabase.from('news').upsert(alertsData.news);
    results.news = newsErr || 'Success';

    // 8. Calendar
    const calendar = readJSON('calendar.json');
    const { error: calErr } = await supabase.from('calendar_events').upsert(calendar);
    results.calendar = calErr || 'Success';

    // 9. Resources
    const resources = readJSON('resources.json');
    const { error: resErr } = await supabase.from('resources').upsert(resources);
    results.resources = resErr || 'Success';

    return NextResponse.json({ message: 'Migration completed', results });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
